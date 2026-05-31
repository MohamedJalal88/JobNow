import { r as reactExports, W as jsxRuntimeExports } from "./server-Bdhs9obN.js";
import { c as createLucideIcon, u as useAuth, h as useLanguage, m as motion, b as Link, d as cn, s as supabase } from "./router-BRcjVh65.js";
import { S as Switch } from "./switch-f6dgj36a.js";
import { B as Badge } from "./badge-CeDEXXqn.js";
import { B as Button } from "./button-DVa_PMXS.js";
import { I as Input } from "./input-vd8UFKmU.js";
import { J as JobCard } from "./job-card-BbNCZ-Ux.js";
import { S as SKILLS } from "./skills-config-DxDgjwUf.js";
import { l as loadGoogleMaps } from "./google-maps-cnwS45eU.js";
import { M as MapPin } from "./map-pin-Dzjs76hk.js";
import { L as LoaderCircle } from "./loader-circle-Bo8SCPAJ.js";
import { C as ChevronRight } from "./chevron-right-CjNIn6MF.js";
import { T as TrendingUp } from "./trending-up-kaLTWONN.js";
import { I as IndianRupee } from "./indian-rupee-z7gq-JOs.js";
import { B as Bell } from "./bell-BuIkKKRo.js";
import { N as Navigation } from "./navigation-DXywWUFV.js";
import { A as AnimatePresence } from "./index-DsS2OOda.js";
import { S as Search } from "./search-C44Gwgth.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-CpkdkAgQ.js";
import "./index-JJn3Sn7e.js";
import "./index-lxwdXnt7.js";
import "./index-BohYWDhN.js";
import "./index-CSRB__ba.js";
import "./index-DjzVvyLV.js";
import "./clock-GskaRvHL.js";
import "./users-CiECk4c5.js";
import "./zap-B4WKiyj2.js";
import "./sparkles-DziH-1fm.js";
import "./hard-hat-D-NfbZSZ.js";
const __iconNode$1 = [
  ["path", { d: "M3 5h.01", key: "18ugdj" }],
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M3 19h.01", key: "noohij" }],
  ["path", { d: "M8 5h13", key: "1pao27" }],
  ["path", { d: "M8 12h13", key: "1za7za" }],
  ["path", { d: "M8 19h13", key: "m83p4d" }]
];
const List = createLucideIcon("list", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",
      key: "169xi5"
    }
  ],
  ["path", { d: "M15 5.764v15", key: "1pn4in" }],
  ["path", { d: "M9 3.236v15", key: "1uimfh" }]
];
const Map = createLucideIcon("map", __iconNode);
function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
function WorkerHome() {
  const {
    user
  } = useAuth();
  const {
    t
  } = useLanguage();
  const firstName = user?.name?.split(" ")[0] ?? "there";
  const [skill, setSkill] = reactExports.useState(null);
  const [available, setAvailable] = reactExports.useState(true);
  const [highContrast, setHighContrast] = reactExports.useState(false);
  const [jobs, setJobs] = reactExports.useState([]);
  const [activeJobs, setActiveJobs] = reactExports.useState([]);
  const [earningsStats, setEarningsStats] = reactExports.useState({
    thisWeek: 0,
    thisMonth: 0,
    pending: 0
  });
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [viewMode, setViewMode] = reactExports.useState("list");
  const [workerLat, setWorkerLat] = reactExports.useState(user?.latitude || null);
  const [workerLng, setWorkerLng] = reactExports.useState(user?.longitude || null);
  const [locationName, setLocationName] = reactExports.useState(user?.location || "Sector 22, Noida");
  const [gpsBlocked, setGpsBlocked] = reactExports.useState(false);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [isSearchingGps, setIsSearchingGps] = reactExports.useState(false);
  const mapRef = reactExports.useRef(null);
  const [googleMapsLoaded, setGoogleMapsLoaded] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    async function loadGoogle() {
      try {
        await loadGoogleMaps();
        setGoogleMapsLoaded(true);
      } catch (err) {
        console.error("Google Maps load error:", err);
      }
    }
    loadGoogle();
    detectLocation();
  }, []);
  const detectLocation = () => {
    setIsSearchingGps(true);
    navigator.geolocation.getCurrentPosition((pos) => {
      const latitude = pos.coords.latitude;
      const longitude = pos.coords.longitude;
      setWorkerLat(latitude);
      setWorkerLng(longitude);
      setGpsBlocked(false);
      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`).then((res) => res.json()).then((data) => {
        if (data && data.address) {
          const suburb = data.address.suburb || data.address.neighbourhood || "";
          const city = data.address.city || data.address.town || "";
          setLocationName([suburb, city].filter(Boolean).join(", ") || `${latitude.toFixed(3)}, ${longitude.toFixed(3)}`);
        }
      }).catch(() => {
      }).finally(() => setIsSearchingGps(false));
    }, (err) => {
      console.error("GPS blocked or denied:", err);
      if (!user?.latitude || !user?.longitude) {
        setGpsBlocked(true);
      }
      setIsSearchingGps(false);
    }, {
      timeout: 6e3
    });
  };
  const handleManualSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearchingGps(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1`);
      const data = await res.json();
      if (data && data.length > 0) {
        const item = data[0];
        const latitude = parseFloat(item.lat);
        const longitude = parseFloat(item.lon);
        setWorkerLat(latitude);
        setWorkerLng(longitude);
        setLocationName(item.display_name.split(",").slice(0, 2).join(","));
        setGpsBlocked(false);
      } else {
        toast.error("Location not found. Try another sector or city.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearchingGps(false);
    }
  };
  reactExports.useEffect(() => {
    if (viewMode !== "map" || !googleMapsLoaded || !window.google?.maps) {
      if (mapRef.current) {
        mapRef.current = null;
      }
      return;
    }
    const timer = setTimeout(() => {
      const container = document.getElementById("dashboard-map");
      if (!container || mapRef.current) return;
      const currentLat = workerLat || 28.5355;
      const currentLng = workerLng || 77.391;
      const mapInstance = new window.google.maps.Map(container, {
        center: {
          lat: currentLat,
          lng: currentLng
        },
        zoom: 13,
        disableDefaultUI: true,
        zoomControl: true
      });
      if (workerLat && workerLng) {
        new window.google.maps.Circle({
          strokeColor: "#3b82f6",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#3b82f6",
          fillOpacity: 0.15,
          map: mapInstance,
          center: {
            lat: workerLat,
            lng: workerLng
          },
          radius: 400
        });
        new window.google.maps.Marker({
          position: {
            lat: workerLat,
            lng: workerLng
          },
          map: mapInstance,
          title: "Your Location",
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 7,
            fillColor: "#3b82f6",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2
          }
        });
      }
      filtered.forEach((j) => {
        const jobLat = j.latitude || (workerLat ? workerLat + (Math.random() - 0.5) * 0.04 : 28.5355 + (Math.random() - 0.5) * 0.04);
        const jobLng = j.longitude || (workerLng ? workerLng + (Math.random() - 0.5) * 0.04 : 77.391 + (Math.random() - 0.5) * 0.04);
        const marker = new window.google.maps.Marker({
          position: {
            lat: jobLat,
            lng: jobLng
          },
          map: mapInstance,
          title: j.title
        });
        const infoWindowContent = `
          <div style="font-family: sans-serif; padding: 4px; min-width: 140px; color: black;">
            <h4 style="font-weight: 800; font-size: 13px; margin: 0; color: #1e293b;">${j.title}</h4>
            <p style="font-size: 11px; color: #64748b; margin: 2px 0 6px 0;">${j.contractor}</p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-weight: 700; color: #1e3a8a; font-size: 12px;">₹${j.payPerDay}/d</span>
              <span style="font-size: 10px; color: #94a3b8;">${j.distanceKm.toFixed(1)} km</span>
            </div>
            <hr style="margin: 8px 0; border: 0; border-top: 1px solid #e2e8f0;"/>
            <a href="/worker/jobs/${j.id}" style="display: block; text-align: center; background: #1e3a8a; color: white; padding: 5px 8px; border-radius: 9999px; text-decoration: none; font-size: 10px; font-weight: 700;">View Details</a>
          </div>
        `;
        const infoWindow = new window.google.maps.InfoWindow({
          content: infoWindowContent
        });
        marker.addListener("click", () => {
          infoWindow.open(mapInstance, marker);
        });
      });
      mapRef.current = mapInstance;
    }, 100);
    return () => {
      clearTimeout(timer);
      if (mapRef.current) {
        mapRef.current = null;
      }
    };
  }, [viewMode, googleMapsLoaded, workerLat, workerLng, jobs, skill]);
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
          let distance = j.distance_km || 1.2;
          if (workerLat && workerLng && j.latitude && j.longitude) {
            distance = getDistanceKm(workerLat, workerLng, parseFloat(j.latitude.toString()), parseFloat(j.longitude.toString()));
          }
          return {
            id: j.id,
            title: j.title,
            description: j.description,
            skill: j.skill,
            distanceKm: distance,
            location: j.location,
            postedMinsAgo: diffMins,
            payPerDay: j.pay_per_day,
            workersNeeded: j.workers_needed,
            contractor: j.contractor?.name || "Contractor",
            contractorAvatar: j.contractor?.avatar || "C",
            latitude: j.latitude,
            longitude: j.longitude
          };
        });
        formattedJobs.sort((a, b) => a.distanceKm - b.distanceKm);
        setJobs(formattedJobs);
        const {
          data: dbApps,
          error: appsErr
        } = await supabase.from("applications").select("*, job:jobs(*, contractor:profiles(name))").eq("worker_id", user.id);
        if (appsErr) throw appsErr;
        const formattedActive = (dbApps || []).filter((app) => app.status === "hired" || app.status === "applied").map((app) => ({
          id: app.job.id,
          title: app.job.title,
          contractor: app.job.contractor?.name || "Contractor",
          durationDays: app.job.duration_days,
          payPerDay: app.job.pay_per_day,
          status: app.status
        }));
        setActiveJobs(formattedActive);
        const completedJobs = (dbApps || []).filter((app) => app.status === "completed" || app.job?.status === "completed");
        const totalCompletedEarnings = completedJobs.reduce((acc, app) => acc + app.job.pay_per_day * app.job.duration_days, 0);
        const hiredJobs = (dbApps || []).filter((app) => app.status === "hired");
        const totalPendingEarnings = hiredJobs.reduce((acc, app) => acc + app.job.pay_per_day * app.job.duration_days, 0);
        setEarningsStats({
          thisWeek: totalCompletedEarnings,
          thisMonth: totalCompletedEarnings,
          pending: totalPendingEarnings
        });
      } catch (err) {
        console.error("Error loading worker data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [user, workerLat, workerLng]);
  const filtered = jobs.filter((j) => !skill || j.skill === skill);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-6 md:pt-8 pb-10", highContrast ? "bg-white text-black font-bold p-4 border-4 border-black rounded-3xl" : ""), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden rounded-3xl bg-gradient-hero text-white p-6 md:p-8 shadow-elegant", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-mesh opacity-40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col md:flex-row md:items-center md:justify-between gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest opacity-80", children: t("Good morning") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl md:text-3xl font-extrabold mt-1", children: [
            t("Welcome back"),
            ", ",
            firstName,
            " 👋"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1.5 inline-flex items-center gap-1.5 text-sm opacity-90", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5 text-white animate-pulse" }),
            " ",
            locationName,
            " · ",
            jobs.length,
            " jobs nearby"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass border border-white/20 rounded-2xl p-3 flex items-center gap-4 w-full sm:w-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest opacity-80", children: t("Sunlight Mode") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-xs", children: "High Contrast" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: highContrast, onCheckedChange: setHighContrast })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass border border-white/20 rounded-2xl p-3 flex items-center gap-4 w-full sm:w-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest opacity-80", children: t("Availability") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: available ? t("Available for work") : t("Offline") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: available, onCheckedChange: setAvailable })
          ] })
        ] })
      ] })
    ] }),
    gpsBlocked && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      opacity: 0,
      y: -10
    }, animate: {
      opacity: 1,
      y: 0
    }, className: "mt-5 rounded-2xl bg-destructive/10 border border-destructive/20 p-5 shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm text-destructive", children: "📍 Geolocation services are blocked" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Please type your sector/address below to match nearby jobs by GPS distance." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleManualSearch, className: "flex gap-2 w-full sm:w-80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search sector, e.g. Noida Sector 62", className: "h-10 rounded-xl bg-card text-xs", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), required: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: isSearchingGps, className: "h-10 rounded-xl px-4 text-xs bg-gradient-primary", children: isSearchingGps ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Search" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-2xl bg-card border-2 border-primary/40 p-5 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-primary/5 via-transparent to-primary/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-2xl bg-primary text-primary-foreground grid place-items-center shadow-lg shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "📍" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-extrabold text-base", children: "Geofenced QR Attendance & Escrow" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Clock in at your job site to verify GPS & unlock same-day ₹850 escrow payout." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/worker/accepted", className: "h-11 px-6 rounded-full bg-gradient-primary text-primary-foreground font-semibold shadow-glow flex items-center gap-2 hover:opacity-95 transition-opacity shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("Scan QR & Clock In") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: t("This week"), value: `₹${earningsStats.thisWeek.toLocaleString()}`, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: t("This month"), value: `₹${earningsStats.thisMonth.toLocaleString()}`, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: t("Active jobs"), value: activeJobs.length.toString(), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: t("Pending"), value: `₹${earningsStats.pending.toLocaleString()}`, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-lg", children: viewMode === "map" ? "Nearby Jobs (Map)" : t("Browse by skill") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        gpsBlocked && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "rounded-full h-9 gap-1 text-xs", onClick: detectLocation, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "h-3.5 w-3.5 text-primary" }),
          " Retry GPS"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", className: "rounded-full h-9 gap-1.5 text-xs font-semibold", onClick: () => setViewMode(viewMode === "list" ? "map" : "list"), children: viewMode === "list" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Map, { className: "h-3.5 w-3.5 text-primary" }),
          " View on Map"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "h-3.5 w-3.5 text-primary" }),
          " View List"
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: viewMode === "list" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0
    }, animate: {
      opacity: 1
    }, exit: {
      opacity: 0
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4 md:flex-wrap md:overflow-visible md:mx-0 md:px-0", children: SKILLS.map((s, i) => {
        const active = skill === s.id;
        const Icon = s.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.button, { initial: {
          opacity: 0,
          y: 8
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: i * 0.03
        }, onClick: () => setSkill(active ? null : s.id), className: cn("shrink-0 flex flex-col items-center gap-2 rounded-2xl p-4 w-24 md:w-28 border bg-card transition-all hover:shadow-soft", active ? "border-primary shadow-soft -translate-y-0.5" : "border-border hover:border-primary/40"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-12 w-12 rounded-2xl bg-gradient-to-br ${s.color} grid place-items-center text-white shadow-soft`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-center leading-tight", children: s.name })
        ] }, s.id);
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 grid grid-cols-1 xl:grid-cols-3 gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "xl:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: t("Nearby jobs"), actionTo: "/worker/jobs" }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-48", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl border border-dashed border-border bg-card p-12 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-muted-foreground", children: t("No jobs found matching your criteria.") }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: filtered.slice(0, 6).map((j, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(JobCard, { job: {
            ...j,
            distanceKm: j.distanceKm
          }, index: i }, j.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: t("Active jobs"), actionTo: "/worker/accepted" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            activeJobs.map((j) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-4 shadow-soft", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm truncate", children: j.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: j.contractor })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-success/15 text-success border-0 rounded-full", children: j.status === "hired" ? t("Hired") : t("Applied") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-1.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-gradient-primary", style: {
                width: j.status === "hired" ? "100%" : "30%"
              } }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: j.status === "hired" ? t("Confirmed slot!") : t("Pending approval") })
            ] }, j.id)),
            activeJobs.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-dashed border-border bg-card p-6 text-center text-sm text-muted-foreground", children: t("No active jobs yet") })
          ] })
        ] })
      ] })
    ] }, "list-view") : /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0
    }, animate: {
      opacity: 1
    }, exit: {
      opacity: 0
    }, className: "mt-4 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleManualSearch, className: "flex gap-2 max-w-md mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search sector or location, e.g. Noida Sector 15", className: "h-11 rounded-xl bg-card text-xs shadow-soft", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), required: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: isSearchingGps, className: "h-11 rounded-xl px-4 bg-gradient-primary shadow-soft", children: isSearchingGps ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "dashboard-map", className: "h-[60vh] w-full rounded-[2rem] border border-border shadow-soft relative overflow-hidden" })
    ] }, "map-view") })
  ] });
}
function SectionHeader({
  title,
  actionTo
}) {
  const {
    t
  } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-lg", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: actionTo, className: "text-xs text-primary font-semibold inline-flex items-center hover:gap-2 gap-1 transition-all", children: [
      t("See all"),
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5" })
    ] })
  ] });
}
function StatCard({
  label,
  value,
  icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card border border-border p-4 md:p-5 shadow-soft hover:shadow-elegant hover:-translate-y-0.5 transition-all", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-xl bg-primary/10 text-primary grid place-items-center", children: icon })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-2xl md:text-3xl font-extrabold tracking-tight", children: value })
  ] });
}
export {
  WorkerHome as component
};
