import { r as reactExports, W as jsxRuntimeExports } from "./server-asg8yyOI.js";
import { b as Link, s as supabase, d as cn } from "./router-CJiiTd-g.js";
import { A as Avatar, a as AvatarFallback } from "./avatar-DVQQtQPm.js";
import { I as Input } from "./input-B5XZA1L8.js";
import { B as Badge } from "./badge-K2Rxl4bs.js";
import { S as SKILLS } from "./skills-config-DPZBFJXa.js";
import { S as Search } from "./search-BFassG2r.js";
import { F as Funnel } from "./funnel-CTJW-Z8_.js";
import { L as LoaderCircle } from "./loader-circle-BApE_kuV.js";
import { M as MapPin } from "./map-pin-Dp4q3uSx.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-BCQuZvc9.js";
import "./index-BWHTYThd.js";
import "./index-xaKJNf22.js";
import "./index-BDj9T5Ow.js";
import "./index-MJfIt0uB.js";
import "./zap-BLSmICLD.js";
import "./sparkles-DITP6bCp.js";
import "./hard-hat-C4WqYtpT.js";
function WorkersPage() {
  const [skill, setSkill] = reactExports.useState(null);
  const [q, setQ] = reactExports.useState("");
  const [workers, setWorkers] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    async function fetchWorkers() {
      setIsLoading(true);
      try {
        const {
          data,
          error
        } = await supabase.from("profiles").select("*").eq("role", "worker");
        if (error) throw error;
        const mapped = (data || []).map((w) => ({
          id: w.id,
          name: w.name,
          avatar: w.avatar || w.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase(),
          skill: w.skill || "",
          jobs_done: w.jobs_done ?? 0,
          rating: w.rating ? parseFloat(w.rating.toString()) : 5,
          location: w.location || "Noida"
        }));
        setWorkers(mapped);
      } catch (err) {
        console.error("Error fetching workers:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchWorkers();
  }, []);
  const filtered = workers.filter((w) => (!skill || w.skill === skill) && w.name.toLowerCase().includes(q.toLowerCase()));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-5 pt-7", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: "Find workers" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Browse skilled workers near you." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 bg-card border border-border rounded-2xl p-2.5 flex items-center gap-2 shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-muted-foreground ml-1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search by name", className: "border-0 shadow-none px-0 h-9 focus-visible:ring-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "h-8 px-3 rounded-full bg-muted text-xs font-medium inline-flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-3.5 w-3.5" }),
        "Filters"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { active: !skill, onClick: () => setSkill(null), children: "All" }),
      SKILLS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { active: skill === s.id, onClick: () => setSkill(s.id), children: s.name }, s.id))
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 flex flex-col items-center justify-center gap-2 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 text-primary animate-spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Loading workers list..." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 space-y-3 pb-20", children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center text-sm text-muted-foreground", children: "No workers found matching criteria." }) : filtered.map((w) => {
      const sk = SKILLS.find((s) => s.id === w.skill);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card border border-border p-4 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-12 w-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-gradient-primary text-primary-foreground font-semibold", children: w.avatar }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm truncate", children: w.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-success" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              sk?.name || w.skill || "Helper",
              " · ",
              w.jobs_done,
              " jobs"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "rounded-full", children: [
            "★ ",
            w.rating
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
            w.location || "Noida"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contractor/messages", search: {
              userId: w.id
            }, className: "flex items-center justify-center h-9 px-3 rounded-full bg-muted text-xs font-medium", children: "Message" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contractor/worker-details", search: {
              id: w.id
            }, className: "flex items-center justify-center h-9 px-4 rounded-full bg-gradient-primary text-primary-foreground text-xs font-semibold shadow-soft", children: "Hire" })
          ] })
        ] })
      ] }, w.id);
    }) })
  ] });
}
function Chip({
  active,
  onClick,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick, className: cn("shrink-0 px-3.5 py-2 rounded-full text-xs font-medium border transition-all", active ? "bg-gradient-primary text-primary-foreground border-transparent shadow-soft" : "bg-card border-border"), children });
}
export {
  WorkersPage as component
};
