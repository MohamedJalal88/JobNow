import { r as reactExports, W as jsxRuntimeExports } from "./server-D9f26qs9.js";
import { u as useAuth, s as supabase, B as Briefcase, m as motion, b as Link, t as toast } from "./router-D271R6tG.js";
import { B as Button } from "./button-DuUw4OSY.js";
import { L as LoaderCircle } from "./loader-circle-HNuWALzZ.js";
import { M as MessageSquare } from "./message-square-B7xO_Ubn.js";
import { I as IndianRupee } from "./indian-rupee-Qrm050TM.js";
import { C as CircleCheck } from "./circle-check-C8FZ7Hz2.js";
import { B as Bell } from "./bell-CDcnmgIL.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-C5Fgo2z4.js";
import "./index-t_H3gLFJ.js";
import "./index-B2wzRjJC.js";
const ICONS = {
  job: {
    icon: Briefcase,
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  accept: {
    icon: CircleCheck,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10"
  },
  payment: {
    icon: IndianRupee,
    color: "text-blue-600",
    bg: "bg-blue-600/10"
  },
  chat: {
    icon: MessageSquare,
    color: "text-sky-600",
    bg: "bg-sky-600/10"
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
      console.error("Error fetching contractor notifications:", err);
    } finally {
      setIsLoading(false);
    }
  }
  reactExports.useEffect(() => {
    if (!user) return;
    loadNotifications();
    const channel = supabase.channel(`contractor-notifications-${user.id}`).on("postgres_changes", {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 md:px-6 lg:px-8 pt-6 md:pt-8 pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-extrabold tracking-tight", children: "Notifications" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Stay updated on your jobs and workers." })
      ] }),
      notifications.some((n) => n.unread) && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", className: "rounded-full", onClick: handleMarkAllRead, children: "Mark all as read" })
    ] }),
    dbError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 p-4 rounded-2xl bg-warning/10 border border-warning/20 text-xs text-warning-foreground leading-relaxed", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold mb-1", children: "Database Table Missing" }),
      "To enable live notifications, make sure to execute the SQL query to create the ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "bg-black/10 px-1 py-0.5 rounded", children: "public.notifications" }),
      " table in your Supabase SQL Editor."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: notifications.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl bg-card border border-border p-10 text-center text-muted-foreground", children: "No notifications yet." }) : notifications.map((n, i) => {
      const meta = ICONS[n.type] ?? {
        icon: Bell,
        color: "text-muted-foreground",
        bg: "bg-muted/15"
      };
      const Icon = meta.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 10
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: i * 0.05
      }, className: `group flex gap-4 p-4 md:p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all shadow-sm ${n.unread ? "ring-1 ring-primary/20" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-12 w-12 rounded-full flex-shrink-0 grid place-items-center ${meta.bg} ${meta.color}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: n.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground whitespace-nowrap", children: formatTimeAgo(n.created_at) }),
              n.unread && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-primary" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: n.body }),
          n.type === "job" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "h-8 rounded-full bg-gradient-primary text-primary-foreground text-xs", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contractor/applications", children: "Review applications" }) }) }),
          n.type === "chat" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "h-8 rounded-full bg-gradient-primary text-primary-foreground text-xs", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contractor/messages", children: "Open Chat" }) }) })
        ] })
      ] }, n.id);
    }) })
  ] });
}
export {
  Notifications as component
};
