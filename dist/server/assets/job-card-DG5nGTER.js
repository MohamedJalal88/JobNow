import { W as jsxRuntimeExports } from "./server-DoqeQAMK.js";
import { a as useNavigate, h as useLanguage, m as motion } from "./router-DH6bADvP.js";
import { B as Badge } from "./badge-BZJL98W3.js";
import { B as Button } from "./button-BqkRPwal.js";
import { S as SKILLS } from "./skills-config-BDa8JOXu.js";
import { M as MapPin } from "./map-pin-CfxSGPPB.js";
import { C as Clock } from "./clock-eQ4LSrl4.js";
import { I as IndianRupee } from "./indian-rupee-DWr8pcEp.js";
import { U as Users } from "./users-CJDTEeDT.js";
function JobCard({ job, index = 0 }) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const skill = SKILLS.find((s) => s.id === job.skill);
  const Icon = skill?.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.05, duration: 0.4 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          onClick: () => navigate({ to: "/worker/jobs/$jobId", params: { jobId: job.id } }),
          className: "block rounded-3xl bg-card border border-border p-4 shadow-soft hover:shadow-elegant transition-all hover:-translate-y-0.5 cursor-pointer",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `h-12 w-12 shrink-0 rounded-2xl bg-gradient-to-br ${skill?.color ?? "from-primary to-primary"} grid place-items-center text-white shadow-soft`,
                children: Icon && /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm leading-tight truncate", children: job.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: job.contractor })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "shrink-0 rounded-full text-[10px]", children: [
                  job.distanceKm,
                  " ",
                  t("km")
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
                  job.location
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
                  job.postedMinsAgo,
                  " ",
                  t("m ago")
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center font-bold text-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "h-3.5 w-3.5" }),
                    job.payPerDay,
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-normal ml-0.5", children: t("/day") })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5" }),
                    job.workersNeeded
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    className: "rounded-full h-8 bg-gradient-primary text-primary-foreground hover:opacity-95",
                    onClick: (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      navigate({ to: "/worker/jobs/$jobId/apply", params: { jobId: job.id } });
                    },
                    children: t("Apply")
                  }
                )
              ] })
            ] })
          ] })
        }
      )
    }
  );
}
export {
  JobCard as J
};
