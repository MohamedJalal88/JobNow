import { r as reactExports, W as jsxRuntimeExports } from "./server-D9f26qs9.js";
import { c as createLucideIcon, G as useParams, b as Link, s as supabase, t as toast } from "./router-D271R6tG.js";
import { A as Avatar, a as AvatarFallback } from "./avatar-DP81uZtj.js";
import { B as Badge } from "./badge-Crs-jTDn.js";
import { B as Button } from "./button-DuUw4OSY.js";
import { J as JobCard } from "./job-card-ri3S3cLf.js";
import { S as SKILLS } from "./skills-config-DOGUmRoe.js";
import { a as googleGeocodeSearch, l as loadGoogleMaps } from "./google-maps-cnwS45eU.js";
import { A as ArrowLeft } from "./arrow-left-BcxA52cs.js";
import { M as MapPin } from "./map-pin-CnpljVeo.js";
import { I as IndianRupee } from "./indian-rupee-Qrm050TM.js";
import { C as Clock } from "./clock-R7DXfDgW.js";
import { U as Users } from "./users-BRRcbzZg.js";
import { C as Calendar } from "./calendar-mx7ySNzO.js";
import { C as CircleCheck } from "./circle-check-C8FZ7Hz2.js";
import { L as LoaderCircle } from "./loader-circle-HNuWALzZ.js";
import { S as Star } from "./star-FMmgCmSx.js";
import { P as Phone } from "./phone-5smvoopI.js";
import { M as MessageSquare } from "./message-square-B7xO_Ubn.js";
import { S as ShieldCheck } from "./shield-check-BDzzQ_gh.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-Bms23s2b.js";
import "./index-C63i5dPR.js";
import "./index-C5Fgo2z4.js";
import "./index-t_H3gLFJ.js";
import "./index-B2wzRjJC.js";
import "./zap-zDdlcnMY.js";
import "./sparkles-MY15IWyE.js";
import "./hard-hat-D-FoVE1C.js";
const __iconNode = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode);
function JobDetails() {
  const {
    jobId
  } = useParams({
    from: "/worker/jobs/$jobId/"
  });
  const [job, setJob] = reactExports.useState(null);
  const [related, setRelated] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [googleMapsLoaded, setGoogleMapsLoaded] = reactExports.useState(false);
  const mapRef = reactExports.useRef(null);
  const [isMounted, setIsMounted] = reactExports.useState(false);
  const [mapError, setMapError] = reactExports.useState(null);
  const [debugStatus, setDebugStatus] = reactExports.useState("Debug: Map Container Mounted");
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    async function loadGoogle() {
      try {
        await loadGoogleMaps();
        setGoogleMapsLoaded(true);
      } catch (err) {
        console.error("Failed to load Google Maps dynamically:", err);
      }
    }
    loadGoogle();
  }, []);
  const mapContainerRef = reactExports.useCallback((node) => {
    if (!node) {
      setIsMounted(false);
      if (mapRef.current) {
        mapRef.current = null;
      }
      return;
    }
    setIsMounted(true);
    if (!googleMapsLoaded || !window.google?.maps || !job) {
      return;
    }
    if (mapRef.current) {
      mapRef.current = null;
    }
    const initializeMapInstance = (latitude, longitude) => {
      setDebugStatus(`Debug: Map Initializing (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
      try {
        const mapInstance = new window.google.maps.Map(node, {
          center: {
            lat: latitude,
            lng: longitude
          },
          zoom: 15,
          disableDefaultUI: true,
          zoomControl: true
        });
        new window.google.maps.Marker({
          position: {
            lat: latitude,
            lng: longitude
          },
          map: mapInstance
        });
        mapRef.current = mapInstance;
        setDebugStatus(`Debug: Map Initialized (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
      } catch (err) {
        console.error("Google Maps initialization error:", err);
        setMapError(err instanceof Error ? err.message : String(err));
        setDebugStatus(`Debug: Map Error - ${err instanceof Error ? err.message : String(err)}`);
      }
    };
    const latVal = job.latitude ? Number(job.latitude) : null;
    const lngVal = job.longitude ? Number(job.longitude) : null;
    if (latVal && lngVal) {
      initializeMapInstance(latVal, lngVal);
    } else if (job.location) {
      googleGeocodeSearch(job.location).then((result) => {
        initializeMapInstance(result.latitude, result.longitude);
      }).catch(() => {
        initializeMapInstance(28.5355, 77.391);
      });
    } else {
      initializeMapInstance(28.5355, 77.391);
    }
  }, [googleMapsLoaded, job]);
  const skill = SKILLS.find((s) => s.id === job?.skill);
  const Icon = skill?.icon;
  reactExports.useEffect(() => {
    async function loadJob() {
      try {
        const {
          data: dbJob,
          error: jobErr
        } = await supabase.from("jobs").select("*, contractor:profiles(name, avatar)").eq("id", jobId).single();
        if (jobErr) throw jobErr;
        if (dbJob) {
          const formattedJob = {
            id: dbJob.id,
            title: dbJob.title,
            description: dbJob.description,
            skill: dbJob.skill,
            distanceKm: dbJob.distance_km || 1.2,
            location: dbJob.location,
            latitude: dbJob.latitude,
            longitude: dbJob.longitude,
            payPerDay: dbJob.pay_per_day,
            durationDays: dbJob.duration_days,
            workersNeeded: dbJob.workers_needed,
            startDate: new Date(dbJob.created_at).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short"
            }),
            contractor: dbJob.contractor?.name || "Contractor",
            contractorAvatar: dbJob.contractor?.avatar || "C",
            contractorId: dbJob.contractor_id
          };
          setJob(formattedJob);
          const {
            data: dbRelated,
            error: relatedErr
          } = await supabase.from("jobs").select("*, contractor:profiles(name, avatar)").eq("status", "open").neq("id", jobId).limit(3);
          if (!relatedErr && dbRelated) {
            const formattedRelated = dbRelated.map((r) => ({
              id: r.id,
              title: r.title,
              description: r.description,
              skill: r.skill,
              distanceKm: r.distance_km || 1.2,
              location: r.location,
              postedMinsAgo: Math.max(1, Math.floor((Date.now() - new Date(r.created_at).getTime()) / 6e4)),
              payPerDay: r.pay_per_day,
              workersNeeded: r.workers_needed,
              contractor: r.contractor?.name || "Contractor"
            }));
            setRelated(formattedRelated);
          }
        }
      } catch (err) {
        console.error("Error loading job details:", err);
        toast.error("Failed to load job details.");
      } finally {
        setIsLoading(false);
      }
    }
    loadJob();
  }, [jobId]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[50vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" }) });
  }
  if (!job) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-8 py-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Job not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: "This job posting may have been closed or deleted." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/worker/jobs", className: "mt-4 inline-flex h-10 px-5 items-center bg-primary text-primary-foreground rounded-full text-sm font-semibold", children: "Back to Jobs" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-dvh bg-muted/40 pb-32 md:pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: `relative text-white bg-gradient-to-br ${skill?.color ?? "from-primary to-primary"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-16 md:pb-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/worker/jobs", className: "h-10 w-10 rounded-full glass border border-white/20 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "h-10 w-10 rounded-full glass border border-white/20 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-white/20 grid place-items-center backdrop-blur", children: Icon && /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-8 w-8 md:h-10 md:w-10" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-white/20 border-white/20 rounded-full", children: skill?.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1.5 text-3xl md:text-4xl xl:text-5xl font-extrabold leading-tight", children: job.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm opacity-90 inline-flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
            " ",
            job.location,
            " · ",
            job.distanceKm,
            " km away"
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "max-w-7xl mx-auto px-4 md:px-8 -mt-8 md:-mt-12 grid lg:grid-cols-3 gap-5 relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { icon: IndianRupee, label: "Pay per day", value: `₹${job.payPerDay}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { icon: Clock, label: "Duration", value: `${job.durationDays} days` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { icon: Users, label: "Workers needed", value: String(job.workersNeeded) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { icon: Calendar, label: "Starts", value: job.startDate })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card border border-border p-6 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-lg", children: "About this job" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground leading-relaxed", children: job.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 grid sm:grid-cols-2 gap-3", children: ["Material provided on-site", "Lunch & water provided", "Safety equipment included", "Same-day payment after completion"].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-success mt-0.5 shrink-0" }),
            p
          ] }, p)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card border border-border p-6 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-bold text-lg inline-flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-5 w-5 text-primary" }),
              " Location"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "rounded-full", children: [
              job.distanceKm,
              " km"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: job.location }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: mapContainerRef, className: "mt-4 h-72 md:h-96 rounded-2xl border border-border overflow-hidden relative", style: {
            minHeight: "288px"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "absolute top-2 left-2 text-[10px] font-bold z-20 bg-white/90 px-2 py-0.5 rounded shadow-sm border border-border text-primary", children: [
              "Debug: loaded=",
              googleMapsLoaded ? "Y" : "N",
              " | sdk=",
              window.google?.maps ? "Y" : "N",
              " | job=",
              job ? "Y" : "N",
              " | ref=",
              isMounted ? "Y" : "N",
              " | ",
              debugStatus
            ] }),
            !googleMapsLoaded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-muted text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-primary" }),
              " Loading Map Interface..."
            ] }) }),
            mapError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex items-center justify-center bg-destructive/10 text-destructive text-xs p-4 text-center font-bold", children: [
              "Map Error: ",
              mapError
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-lg", children: "Similar jobs nearby" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-3", children: related.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(JobCard, { job: r, index: i }, r.id)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-4 lg:sticky lg:top-24 lg:self-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card border border-border p-6 shadow-elegant", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Posted by" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-14 w-14", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-gradient-primary text-primary-foreground font-bold", children: job.contractorAvatar }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold", children: job.contractor }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-amber-600 font-semibold inline-flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 fill-current" }),
                " 4.7 · 86 hires"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "rounded-full gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4" }),
              " Call"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "rounded-full gap-1.5", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/worker/messages", search: {
              userId: job.contractorId
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4" }),
              " Chat"
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-2xl bg-success/10 text-success p-3 text-xs inline-flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4" }),
            " ID verified · GST registered"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card border border-border p-6 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Total payout" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-3xl font-extrabold inline-flex items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "h-6 w-6" }),
            (job.payPerDay * job.durationDays).toLocaleString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "₹",
            job.payPerDay,
            "/day × ",
            job.durationDays,
            " days"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/worker/jobs/$jobId/apply", params: {
            jobId: job.id
          }, className: "mt-5 w-full inline-flex items-center justify-center h-12 rounded-full bg-gradient-primary text-primary-foreground font-semibold shadow-glow", children: "Apply now" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "mt-2 w-full h-12 rounded-full", children: "Save for later" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-card/90 backdrop-blur-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-5 py-3 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "rounded-full h-12 px-5", children: "Save" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/worker/jobs/$jobId/apply", params: {
        jobId: job.id
      }, className: "flex-1 inline-flex items-center justify-center h-12 rounded-full bg-gradient-primary text-primary-foreground font-semibold shadow-glow", children: [
        "Apply now · ₹",
        job.payPerDay,
        "/day"
      ] })
    ] }) })
  ] });
}
function Info({
  icon: Icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card border border-border p-4 shadow-soft hover:shadow-elegant transition-all", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", children: label })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-bold text-lg", children: value })
  ] });
}
export {
  JobDetails as component
};
