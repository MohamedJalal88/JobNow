import { r as reactExports, W as jsxRuntimeExports } from "./server-tlzWzzxG.js";
import { u as useAuth, a as useNavigate, B as Briefcase, m as motion, s as supabase, b as Link, t as toast } from "./router-BN8-Jwly.js";
import { A as Avatar, a as AvatarFallback } from "./avatar-Dgy9dQAC.js";
import { B as Badge } from "./badge-D3FR1iZc.js";
import { B as Button } from "./button-Q5sIVU3I.js";
import { I as Input } from "./input-CI1R33Pa.js";
import { L as Label } from "./label-DSZXNWSM.js";
import { L as LoaderCircle } from "./loader-circle-D_0chp2s.js";
import { B as BadgeCheck } from "./badge-check-BMO5BCkV.js";
import { M as MapPin } from "./map-pin-CcWakKMb.js";
import { S as Settings, L as LogOut } from "./settings-CaiAV-s0.js";
import { A as AnimatePresence } from "./index-CeZv92Zb.js";
import { X } from "./x-DMzu2QdJ.js";
import { U as Upload } from "./upload-CP3jOrTm.js";
import { N as Navigation } from "./navigation-BytEqPnA.js";
import { C as CircleCheck } from "./circle-check-94W1TNTg.js";
import { C as ChevronRight } from "./chevron-right-TyHim60L.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-Cr_NVHaU.js";
import "./index-B7y4EU75.js";
import "./index-DGfzVTOR.js";
import "./index-7ypanOaY.js";
import "./index-BQm1n8Yx.js";
function ContractorProfile() {
  const {
    user,
    logout,
    updateUser
  } = useAuth();
  const nav = useNavigate();
  const [jobsPosted, setJobsPosted] = reactExports.useState(0);
  const [workersHired, setWorkersHired] = reactExports.useState(0);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [isEditing, setIsEditing] = reactExports.useState(false);
  const [name, setName] = reactExports.useState("");
  const [location, setLocation] = reactExports.useState("");
  const [lat, setLat] = reactExports.useState(null);
  const [lng, setLng] = reactExports.useState(null);
  const [avatarUrl, setAvatarUrl] = reactExports.useState("");
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const [isDetectingGps, setIsDetectingGps] = reactExports.useState(false);
  const [isUploadingPic, setIsUploadingPic] = reactExports.useState(false);
  const [avatarTab, setAvatarTab] = reactExports.useState("presets");
  function handleLogout() {
    logout();
    nav({
      to: "/welcome",
      replace: true
    });
  }
  reactExports.useEffect(() => {
    async function loadStats() {
      if (!user) return;
      try {
        const {
          count: jobsCount,
          error: jobsErr
        } = await supabase.from("jobs").select("id", {
          count: "exact",
          head: true
        }).eq("contractor_id", user.id);
        if (jobsErr) throw jobsErr;
        setJobsPosted(jobsCount || 0);
        const {
          data: dbJobs,
          error: dbJobsErr
        } = await supabase.from("jobs").select("id").eq("contractor_id", user.id);
        if (dbJobsErr) throw dbJobsErr;
        const jobIds = (dbJobs || []).map((j) => j.id);
        if (jobIds.length > 0) {
          const {
            count: hiredCount,
            error: hiredErr
          } = await supabase.from("applications").select("id", {
            count: "exact",
            head: true
          }).in("job_id", jobIds).eq("status", "hired");
          if (hiredErr) throw hiredErr;
          setWorkersHired(hiredCount || 0);
        }
      } catch (err) {
        console.error("Error loading contractor profile stats:", err);
      } finally {
        setIsLoading(false);
      }
    }
    if (user) {
      setName(user.name || "");
      setLocation(user.location || "");
      setLat(user.latitude || null);
      setLng(user.longitude || null);
      setAvatarUrl(user.avatar || "");
    }
    loadStats();
  }, [user]);
  const detectGpsLocation = () => {
    setIsDetectingGps(true);
    navigator.geolocation.getCurrentPosition((pos) => {
      const latitude = pos.coords.latitude;
      const longitude = pos.coords.longitude;
      setLat(latitude);
      setLng(longitude);
      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`).then((res) => res.json()).then((data) => {
        if (data && data.address) {
          const road = data.address.road || "";
          const suburb = data.address.suburb || data.address.neighbourhood || "";
          const city = data.address.city || data.address.town || data.address.county || "";
          const addressText = [road, suburb, city].filter(Boolean).slice(0, 2).join(", ");
          setLocation(addressText || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        } else {
          setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        }
        toast.success("GPS Location verified successfully!");
      }).catch(() => {
        setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        toast.success("GPS Location verified!");
      }).finally(() => {
        setIsDetectingGps(false);
      });
    }, (err) => {
      console.error("GPS error:", err);
      toast.error("Location permission denied. Please enter manually.");
      setIsDetectingGps(false);
    }, {
      enableHighAccuracy: true,
      timeout: 5e3
    });
  };
  const handleAvatarFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setIsUploadingPic(true);
    try {
      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}/${Date.now()}.${fileExt}`;
      const {
        error: uploadError
      } = await supabase.storage.from("avatars").upload(filePath, file, {
        cacheControl: "3600",
        upsert: true
      });
      if (uploadError) throw uploadError;
      const {
        data: {
          publicUrl
        }
      } = supabase.storage.from("avatars").getPublicUrl(filePath);
      setAvatarUrl(publicUrl);
      toast.success("Profile picture uploaded successfully!");
    } catch (err) {
      console.error("Avatar upload error:", err);
      toast.error(err instanceof Error ? err.message : "Failed to upload image.");
    } finally {
      setIsUploadingPic(false);
    }
  };
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }
    setIsSaving(true);
    try {
      await updateUser({
        name,
        location,
        avatar: avatarUrl,
        latitude: lat || void 0,
        longitude: lng || void 0
      });
      toast.success("Profile updated successfully! 🎉");
      setIsEditing(false);
    } catch (err) {
      console.error("Save profile error:", err);
      toast.error("Failed to update profile settings.");
    } finally {
      setIsSaving(false);
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center h-[50vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }) });
  }
  const displayName = user?.name || "शर्मा ठेकेदार (Contractor)";
  const displayAvatar = user?.avatar || "C";
  const displayLocation = user?.location || "Noida, UP";
  const displayRating = user?.rating ? parseFloat(user.rating.toString()).toFixed(1) : "5.0";
  const hasUploadedAvatar = displayAvatar.startsWith("http");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto pb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative px-5 pt-7 pb-16 bg-gradient-hero text-primary-foreground rounded-b-[2rem] overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-mesh opacity-40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-20 w-20 border-4 border-white/30 shadow-elegant overflow-hidden bg-white", children: hasUploadedAvatar ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: displayAvatar, alt: displayName, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-white text-primary font-bold text-xl", children: displayName.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase() }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold", children: displayName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "h-4 w-4" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm opacity-90 inline-flex items-center gap-1 mt-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
            " ",
            displayLocation
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mt-2 bg-white/15 border-white/20 rounded-full", children: "Construction & Interiors" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 -mt-10 grid grid-cols-3 gap-2.5 relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Jobs posted", value: String(jobsPosted) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Workers hired", value: String(workersHired) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Avg rating", value: displayRating })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-5 mt-7 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Item, { icon: Briefcase, label: "My job posts", to: "/contractor" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Item, { icon: Settings, label: "Settings", to: "/contractor/settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Item, { icon: LogOut, label: "Log out", onClick: handleLogout, tone: "text-destructive" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => setIsEditing(true), className: "w-full h-12 rounded-full bg-gradient-primary text-primary-foreground font-semibold shadow-glow", children: "Edit profile" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isEditing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-end justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0
      }, animate: {
        opacity: 1
      }, exit: {
        opacity: 0
      }, onClick: () => !isSaving && setIsEditing(false), className: "absolute inset-0 bg-background/80 backdrop-blur-sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        y: "100%"
      }, animate: {
        y: 0
      }, exit: {
        y: "100%"
      }, transition: {
        type: "spring",
        damping: 25,
        stiffness: 220
      }, className: "relative w-full max-w-lg bg-card border-t border-border rounded-t-[2.5rem] shadow-elegant overflow-y-auto max-h-[85vh] z-10 flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-5 border-b border-border flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-extrabold text-lg", children: "Edit Business Profile" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Keep your contractor business details verified and updated" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: isSaving, onClick: () => setIsEditing(false), className: "h-8 w-8 rounded-full hover:bg-muted grid place-items-center text-muted-foreground hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSaveProfile, className: "p-6 space-y-5 flex-1 overflow-y-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-4 shadow-soft space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative group", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-16 w-16 border border-border overflow-hidden bg-muted", children: avatarUrl && avatarUrl.startsWith("http") ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: avatarUrl, alt: name, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-primary text-primary-foreground font-bold text-lg", children: (name || "C").split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase() }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-extrabold text-sm", children: "Upload Profile Photo" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Upload only passport size photo (JPG/PNG)" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 px-4 py-3 rounded-xl border border-border border-dashed bg-card hover:bg-muted/40 cursor-pointer w-full justify-center transition-colors", children: [
              isUploadingPic ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Uploading photo…" })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground", children: "Choose passport size photo" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: handleAvatarFileChange, disabled: isUploadingPic || isSaving })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-name", className: "text-xs", children: "Full Name / Company Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "edit-name", value: name, onChange: (e) => setName(e.target.value), className: "h-11 rounded-xl bg-card", placeholder: "Enter business name", required: true, disabled: isSaving })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-location", className: "text-xs", children: "Business Location (City / Area)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "edit-location", value: location, onChange: (e) => setLocation(e.target.value), className: "h-11 rounded-xl bg-card flex-1", placeholder: "e.g. Sector 62, Noida", required: true, disabled: isSaving }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: detectGpsLocation, disabled: isDetectingGps || isSaving, className: "h-11 rounded-xl border border-input px-3", children: isDetectingGps ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "h-4 w-4 text-primary" }) })
            ] }),
            lat && lng && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-success font-semibold inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
              " GPS Registered (",
              lat.toFixed(4),
              ", ",
              lng.toFixed(4),
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => setIsEditing(false), disabled: isSaving, className: "flex-1 h-12 rounded-full font-bold", children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: isSaving, className: "flex-1 h-12 rounded-full bg-gradient-primary text-primary-foreground font-bold shadow-soft", children: isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
              "Saving…"
            ] }) : "Save Profile" })
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
function Stat({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card border border-border p-3.5 shadow-soft text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-extrabold", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: label })
  ] });
}
function Item({
  icon: Icon,
  label,
  to,
  tone,
  onClick
}) {
  const inner = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card border border-border p-3.5 flex items-center gap-3 shadow-soft hover:bg-muted/40 transition-colors", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-xl bg-muted grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-4.5 w-4.5 ${tone ?? ""}` }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `flex-1 font-medium text-sm ${tone ?? ""}`, children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })
  ] });
  if (to) return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to, className: "block", children: inner });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "w-full text-left", onClick, children: inner });
}
export {
  ContractorProfile as component
};
