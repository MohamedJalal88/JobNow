import { r as reactExports, W as jsxRuntimeExports } from "./server-DlEMaIYL.js";
import { u as useAuth, h as useLanguage, b as Link, s as supabase, t as toast } from "./router-DgB0XHQ2.js";
import { A as Avatar, a as AvatarFallback } from "./avatar-BqHamw4d.js";
import { B as Badge } from "./badge-z9nJm1iG.js";
import { B as Button } from "./button-DwlwWLNZ.js";
import { L as Label } from "./label-COvxpxV7.js";
import { S as SKILLS } from "./skills-config-CI3Kods1.js";
import { L as LoaderCircle } from "./loader-circle-C_Krqs5O.js";
import { C as ClipboardCheck } from "./clipboard-check-zOQALFJX.js";
import { M as MapPin } from "./map-pin-CdjJXJEc.js";
import { I as IndianRupee } from "./indian-rupee-Dvf5kEID.js";
import { C as Clock } from "./clock-CF8piOhA.js";
import { C as CircleCheck } from "./circle-check-tFEIpwUX.js";
import { P as Phone } from "./phone-Bt42cpzR.js";
import { M as MessageSquare } from "./message-square-CzFK4SxR.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-VnBpWfiv.js";
import "./index-C8gRtJFo.js";
import "./index-BJ7KTwgS.js";
import "./index-CrZuCHr4.js";
import "./index-CYdrBDmt.js";
import "./zap-rs3gNe0R.js";
import "./sparkles-Z6Y-_kGU.js";
import "./hard-hat-MJmsfFuD.js";
function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
function Accepted() {
  const {
    user
  } = useAuth();
  const {
    t
  } = useLanguage();
  const [jobs, setJobs] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [isScanning, setIsScanning] = reactExports.useState(null);
  const [workerLat, setWorkerLat] = reactExports.useState(null);
  const [workerLng, setWorkerLng] = reactExports.useState(null);
  const mapsRef = reactExports.useRef({});
  const LRef = reactExports.useRef(null);
  const [leafletLoaded, setLeafletLoaded] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    async function loadLeaflet() {
      try {
        const L = await import("./leaflet-src-D1UHiP-f.js").then((n) => n.l);
        LRef.current = L.default || L;
        const DefaultIcon = LRef.current.icon({
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });
        LRef.current.Marker.prototype.options.icon = DefaultIcon;
        setLeafletLoaded(true);
      } catch (err) {
        console.error("Leaflet load error:", err);
      }
    }
    loadLeaflet();
  }, []);
  reactExports.useEffect(() => {
    async function loadActiveJobs() {
      if (!user) return;
      setIsLoading(true);
      try {
        const {
          data,
          error
        } = await supabase.from("applications").select("*, job:jobs(*, contractor:profiles(*))").eq("worker_id", user.id).eq("status", "hired");
        if (error) throw error;
        const mapped = (data || []).map((app) => {
          const j = app.job;
          const c = j.contractor || {};
          return {
            id: j.id,
            title: j.title,
            contractorName: c.name || "Contractor",
            contractorId: c.id || "",
            contractorAvatar: c.avatar || (c.name || "C").split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase(),
            skill: j.skill || "",
            distanceKm: j.distance_km ? parseFloat(j.distance_km.toString()) : 1,
            payPerDay: j.pay_per_day ? parseFloat(j.pay_per_day.toString()) : 0,
            durationDays: j.duration_days ?? 1,
            location: j.location || "Noida",
            attendance_status: j.attendance_status || "pending_clockin",
            escrow_status: j.escrow_status || "pending",
            startDate: "Tomorrow, 8:00 AM",
            latitude: j.latitude ? parseFloat(j.latitude.toString()) : null,
            longitude: j.longitude ? parseFloat(j.longitude.toString()) : null,
            geofenceRadiusMeters: j.geofence_radius_meters || 100
          };
        });
        setJobs(mapped);
      } catch (err) {
        console.error("Error loading accepted jobs:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadActiveJobs();
  }, [user]);
  reactExports.useEffect(() => {
    if (!leafletLoaded || !LRef.current) return;
    Object.values(mapsRef.current).forEach((m) => m.remove());
    mapsRef.current = {};
    if (jobs.length === 0) return;
    const L = LRef.current;
    jobs.forEach((j) => {
      const containerId = `radius-map-${j.id}`;
      const container = document.getElementById(containerId);
      if (!container) return;
      const jobLat = j.latitude || 28.5355;
      const jobLng = j.longitude || 77.391;
      const mapInstance = L.map(containerId, {
        center: [jobLat, jobLng],
        zoom: 15,
        zoomControl: false,
        attributionControl: false
      });
      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png").addTo(mapInstance);
      L.marker([jobLat, jobLng]).addTo(mapInstance).bindPopup("Job Site");
      L.circle([jobLat, jobLng], {
        color: "#10b981",
        fillColor: "#10b981",
        fillOpacity: 0.15,
        radius: j.geofenceRadiusMeters
      }).addTo(mapInstance);
      mapsRef.current[j.id] = mapInstance;
    });
    return () => {
      Object.values(mapsRef.current).forEach((m) => m.remove());
      mapsRef.current = {};
    };
  }, [jobs, leafletLoaded]);
  reactExports.useEffect(() => {
    if (!workerLat || !workerLng || !leafletLoaded || !LRef.current) return;
    const L = LRef.current;
    Object.entries(mapsRef.current).forEach(([jobId, mapInstance]) => {
      const job = jobs.find((jb) => jb.id === jobId);
      if (!job) return;
      L.marker([workerLat, workerLng], {
        icon: L.divIcon({
          className: "relative flex items-center justify-center h-4 w-4",
          html: '<span class="relative inline-flex rounded-full h-3 w-3 bg-primary border-2 border-white shadow-soft"></span>'
        })
      }).addTo(mapInstance).bindPopup("You");
      const jobLat = job.latitude || 28.5355;
      const jobLng = job.longitude || 77.391;
      const bounds = L.latLngBounds([[jobLat, jobLng], [workerLat, workerLng]]);
      mapInstance.fitBounds(bounds, {
        padding: [30, 30]
      });
    });
  }, [workerLat, workerLng, jobs, leafletLoaded]);
  const totalPayout = jobs.reduce((s, j) => s + j.payPerDay * j.durationDays, 0);
  const verifyGeofence = (job) => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((pos) => {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;
        setWorkerLat(latitude);
        setWorkerLng(longitude);
        if (job.latitude === null || job.longitude === null) {
          resolve({
            success: true,
            distance: 0
          });
          return;
        }
        const distKm = getDistanceKm(latitude, longitude, job.latitude, job.longitude);
        const distMeters = distKm * 1e3;
        if (distMeters <= job.geofenceRadiusMeters) {
          resolve({
            success: true,
            distance: distMeters
          });
        } else {
          resolve({
            success: false,
            distance: distMeters
          });
        }
      }, (err) => {
        console.error(err);
        reject(new Error("GPS Location access denied. Geofence clock-in requires location permissions."));
      }, {
        enableHighAccuracy: true,
        timeout: 6e3
      });
    });
  };
  async function handleClockIn(job) {
    setIsScanning(job.id);
    try {
      const check = await verifyGeofence(job);
      if (!check.success && check.distance > 0) {
        toast.error(`📍 GPS Verification Failed! You are ${check.distance.toFixed(0)}m away. You must be within ${job.geofenceRadiusMeters}m of the site to Clock In.`);
        return;
      }
      const {
        error
      } = await supabase.from("jobs").update({
        attendance_status: "clocked_in"
      }).eq("id", job.id);
      if (error) throw error;
      setJobs((prev) => prev.map((item) => item.id === job.id ? {
        ...item,
        attendance_status: "clocked_in"
      } : item));
      toast.success("📍 GPS verified! Clocked in successfully. Work session active.");
    } catch (err) {
      console.error("Error clocking in:", err);
      toast.error(err instanceof Error ? err.message : "Failed to verify clock in");
    } finally {
      setIsScanning(null);
    }
  }
  async function handleClockOut(job) {
    setIsScanning(job.id);
    try {
      const check = await verifyGeofence(job);
      if (!check.success && check.distance > 0) {
        toast.error(`📍 GPS Verification Failed! You are ${check.distance.toFixed(0)}m away. You must be within ${job.geofenceRadiusMeters}m of the site to Clock Out.`);
        return;
      }
      const {
        error
      } = await supabase.from("jobs").update({
        attendance_status: "clocked_out",
        escrow_status: "released"
      }).eq("id", job.id);
      if (error) throw error;
      setJobs((prev) => prev.map((item) => item.id === job.id ? {
        ...item,
        attendance_status: "clocked_out",
        escrow_status: "released"
      } : item));
      toast.success("✅ Clocked out! GPS verified. Same-day wages released via UPI.");
    } catch (err) {
      console.error("Error clocking out:", err);
      toast.error(err instanceof Error ? err.message : "Failed to clock out");
    } finally {
      setIsScanning(null);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-6 md:pt-8 pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-extrabold tracking-tight", children: t("Accepted Jobs") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: t("Jobs you've been hired for and are currently working on.") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "rounded-full border-0 bg-success/15 text-success", children: [
        jobs.length,
        " active"
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 flex flex-col items-center justify-center gap-2 py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 text-primary animate-spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Loading accepted jobs..." })
    ] }) : jobs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 rounded-3xl border border-dashed border-border bg-card p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardCheck, { className: "h-10 w-10 mx-auto text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-semibold", children: "No accepted jobs yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Apply to nearby jobs to get hired." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mt-5 rounded-full bg-gradient-primary text-primary-foreground", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/worker/jobs", children: "Browse jobs" }) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid lg:grid-cols-3 gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 space-y-4", children: jobs.map((j) => {
        const skill = SKILLS.find((s) => s.id === j.skill);
        const Icon = skill?.icon;
        const isClockedIn = j.attendance_status === "clocked_in";
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card border border-border shadow-soft hover:shadow-elegant transition-all overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-[auto_1fr_auto] gap-4 p-5 items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-14 w-14 rounded-2xl bg-gradient-to-br ${skill?.color || "from-primary to-primary-foreground"} text-white grid place-items-center shadow-soft shrink-0`, children: Icon ? /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardCheck, { className: "h-6 w-6" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "rounded-full border-0 bg-success/15 text-success capitalize", children: j.attendance_status.replace("_", " ") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "rounded-full", children: skill?.name || j.skill }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20", children: [
                  "🔒 ₹",
                  j.payPerDay,
                  " Locked in Escrow"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-bold text-lg truncate", children: j.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground inline-flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
                " ",
                j.location,
                " · ",
                j.distanceKm.toFixed(1),
                " km (Geofence: ",
                j.geofenceRadiusMeters,
                "m)"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid sm:grid-cols-3 gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: IndianRupee, label: "Per day", value: `₹${j.payPerDay}` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Clock, label: "Duration", value: `${j.durationDays}d` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: CircleCheck, label: "Starts", value: j.startDate.split(",")[0] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Contractor" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex md:justify-end items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-8 w-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-gradient-primary text-primary-foreground text-xs font-semibold", children: j.contractorAvatar }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold truncate", children: j.contractorName })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground", children: "Live Site Geofence Boundary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: `radius-map-${j.id}`, className: "h-44 w-full rounded-2xl border border-border mt-1.5 shadow-soft z-0" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-t border-b border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "📍" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-foreground", children: "Geofenced QR Attendance Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: isClockedIn ? "🟢 Clocked in (GPS Verified within 100m)" : j.attendance_status === "clocked_out" ? "✅ Clocked out successfully" : `🔴 Not clocked in yet (Must be within ${j.geofenceRadiusMeters}m)` })
              ] })
            ] }),
            j.attendance_status !== "clocked_out" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 w-full sm:w-auto justify-end", children: isClockedIn ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "destructive", className: "rounded-full shadow-soft font-bold w-full sm:w-auto text-xs", disabled: isScanning === j.id, onClick: () => handleClockOut(j), children: isScanning === j.id ? "Verifying GPS…" : "Scan QR & Clock Out" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "rounded-full bg-gradient-primary text-primary-foreground shadow-glow font-bold w-full sm:w-auto text-xs", disabled: isScanning === j.id, onClick: () => handleClockIn(j), children: isScanning === j.id ? "Verifying GPS…" : "Scan QR & Clock In" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3 bg-muted/30 flex flex-wrap gap-2 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "rounded-full gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3.5 w-3.5" }),
              " ",
              t("Call")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", className: "rounded-full gap-1.5", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/worker/messages", search: {
              userId: j.contractorId
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-3.5 w-3.5" }),
              " ",
              t("Message")
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", className: "rounded-full", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/worker/jobs/$jobId", params: {
              jobId: j.id
            }, children: t("View details") }) }),
            isClockedIn && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "rounded-full bg-success text-white hover:bg-success/90 ml-auto gap-1 text-xs", onClick: () => handleClockOut(j), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
              " Request Escrow Release"
            ] })
          ] })
        ] }, j.id);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-4 lg:sticky lg:top-24 lg:self-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-gradient-to-br from-blue-800 via-blue-900 to-slate-950 text-white p-6 shadow-elegant relative overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest opacity-90", children: t("Expected payout") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-extrabold mt-2 inline-flex items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "h-7 w-7" }),
            totalPayout.toLocaleString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs opacity-90 mt-2", children: t("From active jobs") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card border border-border p-6 shadow-soft space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold flex items-center gap-2 text-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: "🛡️" }),
              " ",
              t("Escrow & Trust Rules")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Your daily wages are locked in a digital escrow before you start. Payout is guaranteed upon QR clock-out." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-success mt-0.5 shrink-0" }),
              " Reach 15 minutes early."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-success mt-0.5 shrink-0" }),
              " Scan QR at site to verify GPS."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-success mt-0.5 shrink-0" }),
              " Clock out to release same-day UPI pay."
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function Stat({
  icon: Icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border p-2.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3 w-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-wider", children: label })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 font-bold text-sm", children: value })
  ] });
}
export {
  Accepted as component
};
