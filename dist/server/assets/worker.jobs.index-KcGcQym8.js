import { r as reactExports, W as jsxRuntimeExports } from "./server-DpY2U1qf.js";
import { I as Input } from "./input-CZae-Lgx.js";
import { u as useControllableState, P as Primitive, c as composeEventHandlers, a as createContextScope } from "./index-Dl0df6Vm.js";
import { R as Root, I as Item, c as createRovingFocusGroupScope } from "./index-1Iu961sw.js";
import { a as useDirection, u as useId, P as Presence } from "./index-N_wg-IRh.js";
import { d as cn, u as useAuth, h as useLanguage, s as supabase } from "./router-D3LitR0x.js";
import { J as JobCard } from "./job-card-BGan6dRe.js";
import { S as Search } from "./search-Dq9P95Ml.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-pHTNdtbh.js";
import "./index-Bmo-2YeU.js";
import "./index-BPUYWvFg.js";
import "./badge-BQQCTJQK.js";
import "./index-Ch2eyjOo.js";
import "./button-B2yVJBei.js";
import "./index-BxGiX0Oh.js";
import "./skills-config-COP2UjKP.js";
import "./zap-Ct6O5sL_.js";
import "./sparkles-LP3626hZ.js";
import "./hard-hat-DJu9bpeD.js";
import "./map-pin-B7wvYjZw.js";
import "./clock-BIvIybXN.js";
import "./indian-rupee-Cjm4sCxT.js";
import "./users-mp60krt8.js";
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
const Tabs = Root2;
const TabsList = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = List.displayName;
const TabsTrigger = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = Trigger.displayName;
const TabsContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = Content.displayName;
function WorkerJobs() {
  const {
    user
  } = useAuth();
  const [q, setQ] = reactExports.useState("");
  const {
    t
  } = useLanguage();
  const [jobs, setJobs] = reactExports.useState([]);
  const [activeJobs, setActiveJobs] = reactExports.useState([]);
  const [historyJobs, setHistoryJobs] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    async function loadData() {
      if (!user) return;
      try {
        const {
          data: dbJobs,
          error: jobsErr
        } = await supabase.from("jobs").select("*, contractor:profiles(name, avatar)").eq("status", "open").order("created_at", {
          ascending: false
        });
        if (jobsErr) throw jobsErr;
        const formattedJobs = (dbJobs || []).map((j) => {
          const createdTime = new Date(j.created_at).getTime();
          const diffMins = Math.max(1, Math.floor((Date.now() - createdTime) / 6e4));
          return {
            id: j.id,
            title: j.title,
            description: j.description,
            skill: j.skill,
            distanceKm: j.distance_km || 1.2,
            location: j.location,
            postedMinsAgo: diffMins,
            payPerDay: j.pay_per_day,
            workersNeeded: j.workers_needed,
            contractor: j.contractor?.name || "Contractor",
            contractorAvatar: j.contractor?.avatar || "C"
          };
        });
        setJobs(formattedJobs);
        const {
          data: dbApps,
          error: appsErr
        } = await supabase.from("applications").select("*, job:jobs(*, contractor:profiles(name))").eq("worker_id", user.id);
        if (appsErr) throw appsErr;
        const formattedApps = (dbApps || []).map((app) => ({
          id: app.job.id,
          title: app.job.title,
          description: app.job.description,
          skill: app.job.skill,
          distanceKm: app.job.distance_km || 1.2,
          location: app.job.location,
          postedMinsAgo: Math.max(1, Math.floor((Date.now() - new Date(app.job.created_at).getTime()) / 6e4)),
          payPerDay: app.job.pay_per_day,
          workersNeeded: app.job.workers_needed,
          contractor: app.job.contractor?.name || "Contractor",
          status: app.status,
          jobStatus: app.job.status
        }));
        const active = formattedApps.filter((app) => app.status === "hired" || app.status === "applied");
        const history = formattedApps.filter((app) => app.status === "completed" || app.jobStatus === "completed" || app.status === "declined");
        setActiveJobs(active);
        setHistoryJobs(history);
      } catch (err) {
        console.error("Error loading jobs feed:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [user]);
  const filter = (list) => list.filter((j) => j.title.toLowerCase().includes(q.toLowerCase()) || j.skill.toLowerCase().includes(q.toLowerCase()));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-5 pt-7", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: t("Jobs") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t("Browse and manage your work.") }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 bg-card border border-border rounded-2xl p-2.5 flex items-center gap-2 shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-muted-foreground ml-1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: q, onChange: (e) => setQ(e.target.value), placeholder: t("Search by title or skill"), className: "border-0 shadow-none px-0 h-9 focus-visible:ring-0" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "nearby", className: "mt-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid grid-cols-3 w-full bg-muted rounded-full h-11 p-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "nearby", className: "rounded-full data-[state=active]:bg-card data-[state=active]:shadow-soft", children: t("Nearby") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "active", className: "rounded-full data-[state=active]:bg-card data-[state=active]:shadow-soft", children: t("Active") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "history", className: "rounded-full data-[state=active]:bg-card data-[state=active]:shadow-soft", children: t("History") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "nearby", className: "mt-5 space-y-3", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" }) }) : filter(jobs).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { title: t("No jobs found"), body: t("Try adjusting your search criteria.") }) : filter(jobs).map((j, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(JobCard, { job: j, index: i }, j.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "active", className: "mt-5 space-y-3", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" }) }) : filter(activeJobs).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { title: t("No active jobs"), body: t("Claim a job slot to get started.") }) : filter(activeJobs).map((j, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(JobCard, { job: j, index: i }, j.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "history", className: "mt-5 space-y-3", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" }) }) : filter(historyJobs).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { title: t("No completed jobs yet"), body: t("Your finished work will appear here.") }) : filter(historyJobs).map((j, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(JobCard, { job: j, index: i }, j.id)) })
    ] })
  ] });
}
function EmptyState({
  title,
  body
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-dashed border-border bg-card p-8 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto h-14 w-14 rounded-2xl bg-gradient-mesh grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-6 w-6 text-muted-foreground" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-semibold", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: body })
  ] });
}
export {
  WorkerJobs as component
};
