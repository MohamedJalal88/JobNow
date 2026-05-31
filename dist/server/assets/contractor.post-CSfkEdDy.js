import { r as reactExports, W as jsxRuntimeExports } from "./server-DlEMaIYL.js";
import { a as useNavigate, u as useAuth, d as cn, o as objectType, e as stringType, t as toast, s as supabase } from "./router-DgB0XHQ2.js";
import { u as useForm, a } from "./zod-D56wAejt.js";
import { B as Button } from "./button-DwlwWLNZ.js";
import { I as Input } from "./input-DHnjfRJ5.js";
import { T as Textarea } from "./textarea-BJ-sUrNX.js";
import { L as Label } from "./label-COvxpxV7.js";
import { S as SKILLS } from "./skills-config-CI3Kods1.js";
import { R as RazorpayModal } from "./razorpay-modal-nncb5Wac.js";
import { L as LoaderCircle } from "./loader-circle-C_Krqs5O.js";
import { N as Navigation } from "./navigation-i6WnD9wU.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-BJ7KTwgS.js";
import "./index-CrZuCHr4.js";
import "./index-CYdrBDmt.js";
import "./zap-rs3gNe0R.js";
import "./sparkles-Z6Y-_kGU.js";
import "./hard-hat-MJmsfFuD.js";
import "./index-DLlEbUmI.js";
import "./x-Br_XQKhB.js";
import "./credit-card-BHf_js77.js";
import "./arrow-right-k_I1s-FC.js";
import "./circle-check-tFEIpwUX.js";
import "./shield-check-rS97jlck.js";
const postJobSchema = objectType({
  title: stringType().min(5, "Job title must be at least 5 characters"),
  description: stringType().min(20, "Please add at least 20 characters describing the job"),
  payPerDay: stringType().min(1, "Pay per day is required").refine((v) => Number(v) >= 200, "Pay must be at least ₹200/day"),
  workersNeeded: stringType().min(1, "Required").refine((v) => Number(v) >= 1 && Number(v) <= 100, "Workers must be between 1 and 100"),
  durationDays: stringType().min(1, "Required").refine((v) => Number(v) >= 1, "Duration must be at least 1 day"),
  startDate: stringType().min(1, "Start date is required"),
  location: stringType().min(3, "Enter a valid location")
});
function PostJob() {
  const nav = useNavigate();
  const {
    user
  } = useAuth();
  const [skill, setSkill] = reactExports.useState("painter");
  const [skillError, setSkillError] = reactExports.useState("");
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const mapRef = reactExports.useRef(null);
  const markerRef = reactExports.useRef(null);
  const LRef = reactExports.useRef(null);
  const [leafletLoaded, setLeafletLoaded] = reactExports.useState(false);
  const [lat, setLat] = reactExports.useState(28.5355);
  const [lng, setLng] = reactExports.useState(77.391);
  const [isDetectingGps, setIsDetectingGps] = reactExports.useState(false);
  const [showPayment, setShowPayment] = reactExports.useState(false);
  const [paymentAmount, setPaymentAmount] = reactExports.useState(0);
  const [pendingJobData, setPendingJobData] = reactExports.useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: {
      errors
    }
  } = useForm({
    resolver: a(postJobSchema),
    mode: "onBlur",
    defaultValues: {
      location: "Sector 22, Noida"
    }
  });
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
        console.error("Failed to load Leaflet dynamically:", err);
      }
    }
    loadLeaflet();
  }, []);
  reactExports.useEffect(() => {
    if (!leafletLoaded || !LRef.current) return;
    if (mapRef.current) return;
    const L = LRef.current;
    const mapInstance = L.map("post-map", {
      center: [lat, lng],
      zoom: 13,
      zoomControl: false
    });
    L.control.zoom({
      position: "topright"
    }).addTo(mapInstance);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapInstance);
    const markerInstance = L.marker([lat, lng], {
      draggable: true
    }).addTo(mapInstance);
    mapRef.current = mapInstance;
    markerRef.current = markerInstance;
    markerInstance.on("dragend", () => {
      const pos = markerInstance.getLatLng();
      setLat(pos.lat);
      setLng(pos.lng);
      reverseGeocode(pos.lat, pos.lng);
    });
    mapInstance.on("click", (e) => {
      const pos = e.latlng;
      markerInstance.setLatLng(pos);
      setLat(pos.lat);
      setLng(pos.lng);
      reverseGeocode(pos.lat, pos.lng);
    });
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [leafletLoaded]);
  const reverseGeocode = async (latitude, longitude) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
      const data = await res.json();
      if (data && data.display_name) {
        const road = data.address.road || "";
        const suburb = data.address.suburb || data.address.neighbourhood || "";
        const city = data.address.city || data.address.town || "";
        const cleanName = [road, suburb, city].filter(Boolean).slice(0, 2).join(", ");
        setValue("location", cleanName || data.display_name.split(",").slice(0, 3).join(","));
      }
    } catch (err) {
      console.error("Reverse geocoding failed:", err);
    }
  };
  const detectGpsLocation = () => {
    setIsDetectingGps(true);
    navigator.geolocation.getCurrentPosition((pos) => {
      const latitude = pos.coords.latitude;
      const longitude = pos.coords.longitude;
      setLat(latitude);
      setLng(longitude);
      if (mapRef.current && markerRef.current) {
        mapRef.current.setView([latitude, longitude], 15);
        markerRef.current.setLatLng([latitude, longitude]);
      }
      reverseGeocode(latitude, longitude);
      toast.success("GPS Coordinates mapped!");
      setIsDetectingGps(false);
    }, (err) => {
      console.error(err);
      toast.error("Geolocation denied. Drag map pin manually.");
      setIsDetectingGps(false);
    });
  };
  const searchAddress = async (query) => {
    if (!query || !query.trim()) return;
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`);
      const data = await res.json();
      if (data && data.length > 0) {
        const item = data[0];
        const latitude = parseFloat(item.lat);
        const longitude = parseFloat(item.lon);
        setLat(latitude);
        setLng(longitude);
        if (mapRef.current && markerRef.current) {
          mapRef.current.setView([latitude, longitude], 15);
          markerRef.current.setLatLng([latitude, longitude]);
        }
        setValue("location", item.display_name.split(",").slice(0, 3).join(","));
        toast.success("Location found and marked on map!");
      } else {
        toast.error("Location not found. Try search or drag pin manually.");
      }
    } catch (err) {
      console.error("Geocoding failed:", err);
      toast.error("Failed to connect to search service.");
    }
  };
  async function onSubmit(data) {
    if (!user) {
      toast.error("You must be logged in to post a job.");
      return;
    }
    if (!skill) {
      setSkillError("Please select the required skill");
      return;
    }
    setSkillError("");
    const pay = Number(data.payPerDay);
    const workers = Number(data.workersNeeded);
    const days = Number(data.durationDays);
    const totalEscrow = pay * workers * days;
    setPaymentAmount(totalEscrow);
    setPendingJobData(data);
    setShowPayment(true);
  }
  const executeJobPost = async (txId) => {
    if (!pendingJobData || !user) return;
    setIsSubmitting(true);
    try {
      const {
        error
      } = await supabase.from("jobs").insert({
        contractor_id: user.id,
        title: pendingJobData.title,
        description: pendingJobData.description,
        skill,
        pay_per_day: Number(pendingJobData.payPerDay),
        workers_needed: Number(pendingJobData.workersNeeded),
        duration_days: Number(pendingJobData.durationDays),
        location: pendingJobData.location,
        latitude: lat,
        longitude: lng,
        status: "open",
        escrow_status: "locked",
        // Escrow locked by simulated Razorpay
        attendance_status: "pending_clockin"
      });
      if (error) throw error;
      toast.success(`Job posted successfully! Escrow locked via transaction ${txId.substring(0, 10)}.`);
      nav({
        to: "/contractor"
      });
    } catch (err) {
      console.error("Error posting job:", err);
      toast.error(err instanceof Error ? err.message : "Failed to post job.");
    } finally {
      setIsSubmitting(false);
      setPendingJobData(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-5 pt-7 pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: "Post a new job" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Reach nearby workers in seconds." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "mt-6 space-y-5", noValidate: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs", children: [
          "Job title ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "post-title", className: `mt-1.5 h-12 rounded-xl bg-card ${errors.title ? "border-destructive" : ""}`, placeholder: "e.g. Interior wall painting", ...register("title") }),
        errors.title && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive", children: errors.title.message })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs", children: [
          "Required skill ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5", children: SKILLS.map((s) => {
          const active = skill === s.id;
          const Icon = s.icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
            setSkill(s.id);
            setSkillError("");
          }, className: cn("shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium border transition-all", active ? "bg-gradient-primary text-primary-foreground border-transparent shadow-soft" : "bg-card border-border hover:border-primary/40"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" }),
            " ",
            s.name
          ] }, s.id);
        }) }),
        skillError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive", children: skillError })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs", children: [
          "Description ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "post-description", className: `mt-1.5 rounded-xl bg-card min-h-28 ${errors.description ? "border-destructive" : ""}`, placeholder: "Tell workers what to expect, tools required, lunch provided, etc.", ...register("description") }),
        errors.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive", children: errors.description.message })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs", children: [
            "Pay (₹/day) ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "post-pay", className: `mt-1.5 h-12 rounded-xl bg-card ${errors.payPerDay ? "border-destructive" : ""}`, type: "number", placeholder: "850", ...register("payPerDay") }),
          errors.payPerDay && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive", children: errors.payPerDay.message })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs", children: [
            "Workers needed ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "post-workers", className: `mt-1.5 h-12 rounded-xl bg-card ${errors.workersNeeded ? "border-destructive" : ""}`, type: "number", placeholder: "2", ...register("workersNeeded") }),
          errors.workersNeeded && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive", children: errors.workersNeeded.message })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs", children: [
            "Duration (days) ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "post-duration", className: `mt-1.5 h-12 rounded-xl bg-card ${errors.durationDays ? "border-destructive" : ""}`, type: "number", placeholder: "3", ...register("durationDays") }),
          errors.durationDays && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive", children: errors.durationDays.message })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs", children: [
            "Start date ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "post-start-date", className: `mt-1.5 h-12 rounded-xl bg-card ${errors.startDate ? "border-destructive" : ""}`, type: "date", ...register("startDate") }),
          errors.startDate && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive", children: errors.startDate.message })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs", children: [
          "Location & Coordinates ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "post-location", className: `h-12 rounded-xl bg-card flex-1 ${errors.location ? "border-destructive" : ""}`, placeholder: "Sector 22, Noida", ...register("location"), onKeyDown: (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              searchAddress(e.currentTarget.value);
            }
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => searchAddress(getValues("location")), className: "h-12 rounded-xl border border-input px-4 font-bold text-xs", children: "Search" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: detectGpsLocation, disabled: isDetectingGps, className: "h-12 rounded-xl border border-input px-3", children: isDetectingGps ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "h-4 w-4 text-primary" }) })
        ] }),
        errors.location && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive", children: errors.location.message }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "post-map", className: "h-60 rounded-2xl border border-border shadow-soft overflow-hidden" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground text-center", children: "Click the map or drag the pin to select the job site location." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { id: "post-job-submit", type: "submit", disabled: isSubmitting, className: "w-full h-12 rounded-full bg-gradient-primary text-primary-foreground font-semibold shadow-glow", children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
        " Publishing…"
      ] }) : "Publish & Fund Escrow" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RazorpayModal, { isOpen: showPayment, onClose: () => setShowPayment(false), onSuccess: executeJobPost, amount: paymentAmount, jobTitle: pendingJobData?.title || "Job Listing" })
  ] });
}
export {
  PostJob as component
};
