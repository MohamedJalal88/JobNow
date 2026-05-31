import { r as reactExports, W as jsxRuntimeExports } from "./server-DS-IbV2l.js";
import { c as createLucideIcon, u as useAuth, s as supabase, m as motion, t as toast } from "./router-BmUDmUT9.js";
import { L as LoaderCircle } from "./loader-circle-CaerMl6X.js";
import { I as IndianRupee } from "./indian-rupee-CP7Yx1lh.js";
import { C as Check } from "./check-fi-QxR0t.js";
import { B as Bell } from "./bell-lTce6Spk.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$1 = [
  ["path", { d: "M12 12h.01", key: "1mp3jc" }],
  ["path", { d: "M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2", key: "1ksdt3" }],
  ["path", { d: "M22 13a18.15 18.15 0 0 1-20 0", key: "12hx5q" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
];
const BriefcaseBusiness = createLucideIcon("briefcase-business", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
      key: "1sd12s"
    }
  ]
];
const MessageCircle = createLucideIcon("message-circle", __iconNode);
const ICONS = {
  job: {
    icon: BriefcaseBusiness,
    tone: "from-blue-700 to-slate-800"
  },
  accept: {
    icon: Check,
    tone: "from-emerald-500 to-teal-600"
  },
  payment: {
    icon: IndianRupee,
    tone: "from-blue-600 to-sky-700"
  },
  chat: {
    icon: MessageCircle,
    tone: "from-sky-500 to-blue-600"
  }
};
function formatTimeAgo(dateString) {
  const now = /* @__PURE__ */ new Date();
  const past = new Date(dateString);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 6e4);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  return `${diffDays}d ago`;
}
function Notifications() {
  const {
    user
  } = useAuth();
  const [notifications, setNotifications] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [dbError, setDbError] = reactExports.useState(false);
  async function loadNotifications() {
    if (!user) return;
    try {
      const {
        data,
        error
      } = await supabase.from("notifications").select("*").eq("user_id", user.id).order("created_at", {
        ascending: false
      });
      if (error) {
        if (error.code === "P0001" || error.message.includes("does not exist")) {
          setDbError(true);
        }
        throw error;
      }
      setNotifications(data || []);
      setDbError(false);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setIsLoading(false);
    }
  }
  reactExports.useEffect(() => {
    if (!user) return;
    loadNotifications();
    const channel = supabase.channel(`worker-notifications-${user.id}`).on("postgres_changes", {
      event: "INSERT",
      schema: "public",
      table: "notifications"
    }, (payload) => {
      const newNotif = payload.new;
      if (newNotif && newNotif.user_id === user.id) {
        setNotifications((prev) => {
          if (prev.some((n) => n.id === newNotif.id)) return prev;
          return [newNotif, ...prev];
        });
      }
    }).subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);
  async function handleMarkAllRead() {
    if (!user || notifications.length === 0) return;
    try {
      const {
        error
      } = await supabase.from("notifications").update({
        unread: false
      }).eq("user_id", user.id).eq("unread", true);
      if (error) throw error;
      setNotifications((prev) => prev.map((n) => ({
        ...n,
        unread: false
      })));
      toast.success("All notifications marked as read");
    } catch (err) {
      console.error("Error marking read:", err);
      toast.error("Failed to update notifications");
    }
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center h-[50vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-5 pt-7", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: "Notifications" }),
      notifications.some((n) => n.unread) && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleMarkAllRead, className: "text-xs font-medium text-primary hover:underline", children: "Mark all read" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Latest job alerts and updates." }),
    dbError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 p-4 rounded-2xl bg-warning/10 border border-warning/20 text-xs text-warning-foreground leading-relaxed", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold mb-1", children: "Database Table Missing" }),
      "To enable live notifications, make sure to execute the SQL query to create the ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "bg-black/10 px-1 py-0.5 rounded", children: "public.notifications" }),
      " table in your Supabase SQL Editor. See the deployment guide in ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "bg-black/10 px-1 py-0.5 rounded", children: "walkthrough.md" }),
      " or ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "bg-black/10 px-1 py-0.5 rounded", children: "implementation_plan.md" }),
      " for the SQL schema."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 space-y-2.5", children: notifications.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-10 text-muted-foreground text-sm", children: "No notifications yet." }) : notifications.map((n, i) => {
      const meta = ICONS[n.type] ?? {
        icon: Bell,
        tone: "from-muted to-muted"
      };
      const Icon = meta.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 10
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: i * 0.04
      }, className: "rounded-2xl bg-card border border-border p-3.5 flex items-start gap-3 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-11 w-11 rounded-xl bg-gradient-to-br ${meta.tone} grid place-items-center text-white shrink-0`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: n.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground shrink-0", children: formatTimeAgo(n.created_at) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: n.body })
        ] }),
        n.unread && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-primary mt-1.5" })
      ] }, n.id);
    }) })
  ] });
}
export {
  Notifications as component
};
