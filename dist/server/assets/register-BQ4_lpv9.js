import { r as reactExports, W as jsxRuntimeExports } from "./server-Bdhs9obN.js";
import { a as useNavigate, R as Route, u as useAuth, i as isProfileIncomplete, d as cn, m as motion, b as Link, o as objectType, e as stringType, l as literalType, s as supabase, t as toast } from "./router-BRcjVh65.js";
import { u as useForm, a } from "./zod-_AcWuy-b.js";
import { B as Button } from "./button-DVa_PMXS.js";
import { I as Input } from "./input-vd8UFKmU.js";
import { L as Label } from "./label-DBDVz8m4.js";
import { A as AuthSplit } from "./auth-split-CDW-PtPv.js";
import { g as googleReverseGeocode, l as loadGoogleMaps, a as googleGeocodeSearch } from "./google-maps-cnwS45eU.js";
import { L as LoaderCircle } from "./loader-circle-Bo8SCPAJ.js";
import { E as EyeOff, a as Eye } from "./eye-BsvI0Ta2.js";
import { U as Upload } from "./upload-BRt0OK61.js";
import { N as Navigation } from "./navigation-DXywWUFV.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-DjzVvyLV.js";
import "./index-lxwdXnt7.js";
import "./index-CSRB__ba.js";
import "./sparkles-DziH-1fm.js";
import "./users-round-D8Wtmnva.js";
import "./shield-check-DC-HvXeT.js";
import "./arrow-left-CKykvCro.js";
const makeRegisterSchema = (isCompleteMode, signUpStep) => {
  if (isCompleteMode) {
    return objectType({
      name: stringType().min(2, "Name must be at least 2 characters"),
      phone: stringType().min(10, "Enter a valid 10-digit phone number").regex(/^[6-9]\d{9}$/, "Must be a valid Indian mobile number"),
      email: stringType().email("Invalid email address").optional().or(literalType("")),
      location: stringType().min(3, "Please enter a valid location/address"),
      pincode: stringType().regex(/^\d{6}$/, "Pincode must be exactly 6 digits")
    });
  }
  if (signUpStep === "password") {
    return objectType({
      phone: stringType().min(10, "Enter a valid 10-digit phone number").regex(/^[6-9]\d{9}$/, "Must be a valid Indian mobile number"),
      password: stringType().min(6, "Password must be at least 6 characters"),
      confirmPassword: stringType()
    }).refine((d) => d.password === d.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"]
    });
  }
  return objectType({
    phone: stringType().min(10, "Enter a valid 10-digit phone number").regex(/^[6-9]\d{9}$/, "Must be a valid Indian mobile number")
  });
};
const WORKER_SKILLS = ["Painter", "Electrician", "Plumber", "Carpenter", "Mason", "Cleaner", "Welder", "Driver"];
const CONTRACTOR_TYPES = ["Construction", "Interior", "Renovation", "Maintenance", "Industrial"];
const EXPERIENCE = ["0-1 yrs", "1-3 yrs", "3-5 yrs", "5+ yrs"];
function Register() {
  const nav = useNavigate();
  const {
    role,
    completeProfile
  } = Route.useSearch();
  const {
    register: registerUser,
    user,
    updateUser,
    logout,
    isLoading: authLoading
  } = useAuth();
  const isCompleteMode = !!(completeProfile && user);
  const currentRole = isCompleteMode ? user?.role || role : role;
  const isWorker = currentRole === "worker";
  const [showPwd, setShowPwd] = reactExports.useState(false);
  const [skill, setSkill] = reactExports.useState("");
  const [experience, setExperience] = reactExports.useState("");
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [skillError, setSkillError] = reactExports.useState("");
  const [signUpStep, setSignUpStep] = reactExports.useState("phone");
  const [otpCode, setOtpCode] = reactExports.useState("");
  const [completeProfileStep, setCompleteProfileStep] = reactExports.useState("details");
  const [completeProfilePwd, setCompleteProfilePwd] = reactExports.useState("");
  const [completeProfileConfirmPwd, setCompleteProfileConfirmPwd] = reactExports.useState("");
  const [pwdError, setPwdError] = reactExports.useState("");
  const [confirmPwdError, setConfirmPwdError] = reactExports.useState("");
  const hasInitializedStep = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (isCompleteMode && user && !hasInitializedStep.current) {
      hasInitializedStep.current = true;
      if (!user.phone || user.phone.trim() === "") {
        setCompleteProfileStep("password");
      } else {
        setCompleteProfileStep("details");
      }
    }
  }, [isCompleteMode, user]);
  const handleSetGooglePassword = async () => {
    setPwdError("");
    setConfirmPwdError("");
    if (completeProfilePwd.length < 6) {
      setPwdError("Password must be at least 6 characters");
      return;
    }
    if (completeProfilePwd !== completeProfileConfirmPwd) {
      setConfirmPwdError("Passwords do not match");
      return;
    }
    setIsSubmitting(true);
    try {
      const {
        error
      } = await supabase.auth.updateUser({
        password: completeProfilePwd
      });
      if (error) throw error;
      toast.success("Password created successfully!");
      setCompleteProfileStep("details");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to set password. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleSendOtp = async () => {
    const isValid = await trigger("phone");
    if (!isValid) return;
    setIsSubmitting(true);
    const rawPhone = getValues("phone");
    const formattedPhone = `+91${rawPhone.replace(/\D/g, "")}`;
    try {
      const {
        error
      } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
        options: {
          data: {
            role
          }
        }
      });
      if (error) throw error;
      toast.success("Verification OTP sent! Please check your mobile.");
      setSignUpStep("otp");
    } catch (err) {
      console.error("Real Supabase OTP send failed:", err);
      const errMsg = err instanceof Error ? err.message : String(err);
      toast.error(`Supabase OTP error: ${errMsg}. Falling back to Mock Mode (Use OTP: 123456).`, {
        duration: 1e4
      });
      setSignUpStep("otp");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleVerifyOtp = async () => {
    if (!otpCode || otpCode.length < 6) {
      toast.error("Please enter a valid 6-digit OTP code.");
      return;
    }
    setIsSubmitting(true);
    const rawPhone = getValues("phone");
    const formattedPhone = `+91${rawPhone.replace(/\D/g, "")}`;
    if (otpCode === "123456") {
      toast.success("OTP Verified (Mock)! Please create a password for your account.");
      setSignUpStep("password");
      setIsSubmitting(false);
      return;
    }
    try {
      const {
        error
      } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: otpCode,
        type: "sms"
      });
      if (error) throw error;
      toast.success("OTP Verified! Please create a password for your account.");
      setSignUpStep("password");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Invalid OTP verification code.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleCancel = async () => {
    try {
      await logout();
      nav({
        to: "/welcome",
        replace: true
      });
    } catch (err) {
      console.error("Logout failed during cancel:", err);
    }
  };
  reactExports.useEffect(() => {
    if (!authLoading) {
      if (completeProfile && !user) {
        nav({
          to: "/register",
          search: {
            role,
            completeProfile: false
          },
          replace: true
        });
      } else if (!completeProfile && user && isProfileIncomplete(user)) {
        nav({
          to: "/register",
          search: {
            role: user.role || role,
            completeProfile: true
          },
          replace: true
        });
      } else if (user && !isProfileIncomplete(user)) {
        nav({
          to: user.role === "contractor" ? "/contractor" : "/worker",
          replace: true
        });
      }
    }
  }, [authLoading, completeProfile, user, role, nav]);
  async function handleGoogleLogin() {
    setIsSubmitting(true);
    try {
      localStorage.setItem("oauth_role", role);
      localStorage.setItem("oauth_source", "register");
      const {
        error
      } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin + "/welcome",
          queryParams: {
            prompt: "select_account"
          },
          data: {
            role
          }
        }
      });
      if (error) throw error;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Google registration failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  }
  const skillOptions = isWorker ? WORKER_SKILLS : CONTRACTOR_TYPES;
  const mapRef = reactExports.useRef(null);
  const markerRef = reactExports.useRef(null);
  const [googleMapsLoaded, setGoogleMapsLoaded] = reactExports.useState(false);
  const [lat, setLat] = reactExports.useState(28.5355);
  const [lng, setLng] = reactExports.useState(77.391);
  const [isDetectingGps, setIsDetectingGps] = reactExports.useState(false);
  const [avatarUrl, setAvatarUrl] = reactExports.useState("");
  const [selectedFile, setSelectedFile] = reactExports.useState(null);
  const [isUploadingPic, setIsUploadingPic] = reactExports.useState(false);
  const [avatarTab, setAvatarTab] = reactExports.useState("presets");
  const handleAvatarFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setAvatarUrl(URL.createObjectURL(file));
    toast.success("Photo selected successfully!");
  };
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: {
      errors
    }
  } = useForm({
    resolver: a(makeRegisterSchema(isCompleteMode, signUpStep)),
    mode: "onBlur"
  });
  reactExports.useEffect(() => {
    if (isCompleteMode && user) {
      if (user.name) setValue("name", user.name);
      if (user.email) setValue("email", user.email);
      if (user.avatar) setAvatarUrl(user.avatar);
    }
  }, [isCompleteMode, user, setValue]);
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
      if (mapRef.current) {
        mapRef.current = null;
      }
      return;
    }
    if (!googleMapsLoaded || !window.google?.maps) return;
    if (mapRef.current) return;
    try {
      const mapInstance = new window.google.maps.Map(node, {
        center: {
          lat,
          lng
        },
        zoom: 13,
        disableDefaultUI: true,
        zoomControl: true
      });
      const markerInstance = new window.google.maps.Marker({
        position: {
          lat,
          lng
        },
        map: mapInstance,
        draggable: true
      });
      mapRef.current = mapInstance;
      markerRef.current = markerInstance;
      markerInstance.addListener("dragend", () => {
        const pos = markerInstance.getPosition();
        if (pos) {
          const newLat = pos.lat();
          const newLng = pos.lng();
          setLat(newLat);
          setLng(newLng);
          reverseGeocode(newLat, newLng);
        }
      });
      mapInstance.addListener("click", (e) => {
        const pos = e.latLng;
        if (pos) {
          markerInstance.setPosition(pos);
          setLat(pos.lat());
          setLng(pos.lng());
          reverseGeocode(pos.lat(), pos.lng());
        }
      });
    } catch (err) {
      console.error("Google Maps registration map init error:", err);
    }
  }, [googleMapsLoaded]);
  const reverseGeocode = async (latitude, longitude) => {
    try {
      const result = await googleReverseGeocode(latitude, longitude);
      if (result.locationName) {
        setValue("location", result.locationName, {
          shouldValidate: true,
          shouldDirty: true
        });
        if (result.pincode) {
          setValue("pincode", result.pincode.replace(/\D/g, "").slice(0, 6), {
            shouldValidate: true,
            shouldDirty: true
          });
        }
      }
    } catch (err) {
      console.error("Google reverse geocoding failed:", err);
    }
  };
  const searchAddress = async (query, pincodeVal) => {
    let fullQuery = query || "";
    if (pincodeVal) {
      fullQuery += ` ${pincodeVal}`;
    }
    if (!fullQuery || !fullQuery.trim()) return;
    try {
      const result = await googleGeocodeSearch(fullQuery);
      const latitude = result.latitude;
      const longitude = result.longitude;
      setLat(latitude);
      setLng(longitude);
      if (mapRef.current && markerRef.current) {
        mapRef.current.setCenter({
          lat: latitude,
          lng: longitude
        });
        mapRef.current.setZoom(15);
        markerRef.current.setPosition({
          lat: latitude,
          lng: longitude
        });
      }
      setValue("location", result.locationName, {
        shouldValidate: true,
        shouldDirty: true
      });
      if (result.pincode) {
        setValue("pincode", result.pincode.replace(/\D/g, "").slice(0, 6), {
          shouldValidate: true,
          shouldDirty: true
        });
      }
      toast.success("Location found on map!");
    } catch (err) {
      console.error("Google geocoding search failed:", err);
      toast.error("Location not found. Try searching for a nearby area.");
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
        mapRef.current.setCenter({
          lat: latitude,
          lng: longitude
        });
        mapRef.current.setZoom(15);
        markerRef.current.setPosition({
          lat: latitude,
          lng: longitude
        });
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
  async function onSubmit(data) {
    if (isCompleteMode && !skill) {
      setSkillError(`Please select a ${isWorker ? "skill" : "project type"}`);
      return;
    }
    setSkillError("");
    setIsSubmitting(true);
    try {
      if (isCompleteMode) {
        let finalAvatarUrl = avatarUrl;
        if (selectedFile && user) {
          const fileExt = selectedFile.name.split(".").pop();
          const filePath = `${user.id}/avatar-${Date.now()}.${fileExt}`;
          const {
            error: uploadError
          } = await supabase.storage.from("avatars").upload(filePath, selectedFile, {
            cacheControl: "3600",
            upsert: true
          });
          if (uploadError) throw uploadError;
          const {
            data: {
              publicUrl
            }
          } = supabase.storage.from("avatars").getPublicUrl(filePath);
          finalAvatarUrl = publicUrl;
        }
        let formattedPhone = data.phone.trim();
        if (formattedPhone && !formattedPhone.startsWith("+")) {
          formattedPhone = formattedPhone.replace(/\D/g, "");
          formattedPhone = `+91${formattedPhone}`;
        }
        await updateUser({
          name: data.name,
          phone: formattedPhone,
          email: data.email || void 0,
          skill: skill.toLowerCase(),
          location: `${data.location}, ${data.pincode}`,
          latitude: lat,
          longitude: lng,
          avatar: finalAvatarUrl || void 0
        });
        toast.success("Profile completed! Welcome to JobNow 🎉");
        nav({
          to: isWorker ? "/worker" : "/contractor"
        });
      } else {
        if (signUpStep !== "password") {
          toast.error("Please complete the steps in order.");
          return;
        }
        const {
          data: {
            session
          }
        } = await supabase.auth.getSession();
        if (session) {
          const {
            error: pwdErr
          } = await supabase.auth.updateUser({
            password: data.password || ""
          });
          if (pwdErr) throw pwdErr;
          toast.success("Account created successfully! Complete your profile next 🎉");
          nav({
            to: "/register",
            search: {
              role,
              completeProfile: true
            },
            replace: true
          });
        } else {
          if (otpCode !== "123456") {
            toast.error("Please verify the OTP first.");
            return;
          }
          await registerUser({
            name: "",
            phone: data.phone,
            password: data.password || "",
            role,
            skill: "",
            location: ""
          });
          toast.success("Phone verified and account created! Complete your profile next 🎉");
        }
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Registration failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  }
  if (authLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-dvh flex items-center justify-center bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AuthSplit, { backTo: isCompleteMode ? "/welcome" : "/auth-choice", eyebrow: isCompleteMode ? `Completing ${currentRole} profile` : `Creating ${currentRole} account`, heading: isCompleteMode ? "Just a few more details." : isWorker ? "Start earning, on your terms." : "Build your hiring engine.", subheading: isCompleteMode ? "Please provide your phone number and location details to finish setting up your account." : isWorker ? "Join 50,000+ workers finding daily work nearby with secure same-day payouts." : "Join 12,000+ contractors hiring verified workers in minutes.", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-extrabold tracking-tight", children: isCompleteMode ? "Complete your profile" : "Create your account" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm text-muted-foreground", children: isCompleteMode ? "Fill in your profile details to continue." : "It only takes a minute." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold capitalize", children: currentRole })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: handleSubmit(onSubmit), className: "mt-8 space-y-4", noValidate: true, children: isCompleteMode ? completeProfileStep === "password" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-soft space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-extrabold text-lg text-foreground", children: "Create account password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Set a secure password for your JobNow account before completing your profile." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs", children: [
            "Password ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "complete-password", className: `h-12 rounded-xl bg-card pr-11 ${pwdError ? "border-destructive" : ""}`, type: showPwd ? "text" : "password", placeholder: "••••••••", disabled: isSubmitting, value: completeProfilePwd, onChange: (e) => {
              setCompleteProfilePwd(e.target.value);
              setPwdError("");
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPwd((s) => !s), disabled: isSubmitting, className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground", children: showPwd ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
          ] }),
          pwdError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive", children: pwdError })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs", children: [
            "Confirm password ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "complete-confirm-password", className: `mt-1.5 h-12 rounded-xl bg-card ${confirmPwdError ? "border-destructive" : ""}`, placeholder: "••••••••", type: "password", disabled: isSubmitting, value: completeProfileConfirmPwd, onChange: (e) => {
            setCompleteProfileConfirmPwd(e.target.value);
            setConfirmPwdError("");
          } }),
          confirmPwdError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive", children: confirmPwdError })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", onClick: handleSetGooglePassword, disabled: isSubmitting, className: "w-full h-12 rounded-full bg-gradient-primary text-primary-foreground font-semibold shadow-glow mt-2", children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
        " Saving Password…"
      ] }) : "Set Password & Continue" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: handleCancel, className: "w-full h-12 rounded-full border border-border bg-card text-muted-foreground font-semibold hover:bg-muted/60 mt-1 transition-colors", children: "Cancel & Sign Out" })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-4 shadow-soft space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative group", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-2xl bg-muted border border-border overflow-hidden relative flex items-center justify-center", children: avatarUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: avatarUrl, alt: "Selected Profile Photo", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-bold text-xs uppercase", children: "Photo" }) }) }),
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: handleAvatarFileChange, disabled: isUploadingPic || isSubmitting })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs", children: [
            "Full name ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "reg-name", className: `mt-1.5 h-12 rounded-xl bg-card ${errors.name ? "border-destructive" : ""}`, placeholder: "Your name", ...register("name") }),
          errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive", children: errors.name.message })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs", children: [
            "Phone ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "reg-phone", className: `mt-1.5 h-12 rounded-xl bg-card ${errors.phone ? "border-destructive" : ""}`, placeholder: "98765 43210", type: "tel", ...register("phone") }),
          errors.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive", children: errors.phone.message })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs", children: [
          "Email ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "(optional)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "reg-email", className: `mt-1.5 h-12 rounded-xl bg-card ${errors.email ? "border-destructive" : ""}`, placeholder: "you@example.com", type: "email", ...register("email") }),
        errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive", children: errors.email.message })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs", children: [
            "Location / Sector ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1.5 flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "reg-location", className: `h-12 rounded-xl bg-card flex-1 ${errors.location ? "border-destructive" : ""}`, placeholder: "e.g. Sector 22, Noida", ...register("location"), onKeyDown: (e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                searchAddress(e.currentTarget.value, getValues("pincode"));
              }
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => searchAddress(getValues("location"), getValues("pincode")), className: "h-12 rounded-xl border border-input px-4 font-bold text-xs", children: "Search" })
          ] }),
          errors.location && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive", children: errors.location.message })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs", children: [
            "Pincode ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1.5 flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "reg-pincode", className: `h-12 rounded-xl bg-card flex-1 ${errors.pincode ? "border-destructive" : ""}`, placeholder: "201301", type: "text", maxLength: 6, ...register("pincode", {
              onChange: (e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                e.target.value = val;
                if (val.length === 6) {
                  searchAddress(getValues("location"), val);
                }
              }
            }), onKeyDown: (e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                searchAddress(getValues("location"), e.currentTarget.value);
              }
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: detectGpsLocation, disabled: isDetectingGps, className: "h-12 rounded-xl border border-input px-3", title: "Locate via GPS", children: isDetectingGps ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "h-4 w-4 text-primary" }) })
          ] }),
          errors.pincode && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive", children: errors.pincode.message })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: mapContainerRef, className: "h-48 rounded-2xl border border-border shadow-soft overflow-hidden" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground text-center", children: "Click map or drag marker pin to match exact coordinates." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs", children: [
          isWorker ? "Primary skill" : "Project type",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex flex-wrap gap-2", children: skillOptions.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
          setSkill(s);
          setSkillError("");
        }, className: cn("h-9 px-4 rounded-full text-sm font-medium border transition-colors", skill === s ? "bg-gradient-primary text-primary-foreground border-transparent shadow-soft" : "border-border bg-card text-muted-foreground hover:border-primary/40"), children: s }, s)) }),
        skillError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive", children: skillError })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Experience level" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2", children: EXPERIENCE.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setExperience(e), className: cn("h-11 rounded-xl text-sm font-medium border transition-colors", experience === e ? "bg-primary/10 text-primary border-primary" : "border-border bg-card text-muted-foreground hover:border-primary/40"), children: e }, e)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { id: "register-submit", type: "submit", disabled: isSubmitting, className: "w-full h-12 rounded-full bg-gradient-primary text-primary-foreground font-semibold shadow-glow mt-2", children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
        " ",
        "Completing Profile…"
      ] }) : "Complete Profile & Register" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: handleCancel, className: "w-full h-12 rounded-full border border-border bg-card text-muted-foreground font-semibold hover:bg-muted/60 mt-2 transition-colors", children: "Cancel & Sign Out" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      signUpStep === "phone" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs", children: [
            "Phone number ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "reg-phone", className: `mt-1.5 h-12 rounded-xl bg-card ${errors.phone ? "border-destructive" : ""}`, placeholder: "98765 43210", type: "tel", disabled: isSubmitting, ...register("phone") }),
          errors.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive", children: errors.phone.message })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", onClick: handleSendOtp, disabled: isSubmitting, className: "w-full h-12 rounded-full bg-gradient-primary text-primary-foreground font-semibold shadow-glow mt-2", children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
          " Sending OTP…"
        ] }) : "Send Verification OTP" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground mb-2", children: "or login with the Google account" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: handleGoogleLogin, disabled: isSubmitting, className: "w-full h-12 rounded-full border border-input bg-card font-semibold text-sm flex items-center justify-center gap-2 hover:bg-muted transition-colors disabled:opacity-50 shadow-soft", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#4285F4", d: "M22.5 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.22-4.74 3.22-8.32z" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#34A853", d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#FBBC05", d: "M5.84 14.1A6.94 6.94 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.78.43 3.46 1.18 4.94l3.66-2.84z" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#EA4335", d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" })
            ] }),
            "Continue with Google"
          ] })
        ] })
      ] }),
      signUpStep === "otp" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Phone number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "mt-1.5 h-12 rounded-xl bg-muted text-muted-foreground border-border", type: "tel", readOnly: true, value: getValues("phone") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "hidden", ...register("phone") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          opacity: 0,
          y: -10
        }, animate: {
          opacity: 1,
          y: 0
        }, className: "rounded-2xl border border-primary/20 bg-primary/5 p-4 space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs text-primary font-bold", children: [
            "Enter 6-Digit OTP ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "reg-otp", className: "mt-1.5 h-12 rounded-xl bg-card border-primary/30 text-center tracking-[0.5em] text-lg font-bold", placeholder: "123456", maxLength: 6, type: "text", disabled: isSubmitting, value: otpCode, onChange: (e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-[11px] text-muted-foreground", children: [
            "If you do not receive an SMS, enter the mock code ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-extrabold text-primary", children: "123456" }),
            " to proceed."
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", onClick: handleVerifyOtp, disabled: isSubmitting, className: "w-full h-12 rounded-full bg-gradient-primary text-primary-foreground font-semibold shadow-glow mt-2", children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
          " Verifying OTP…"
        ] }) : "Verify OTP" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setSignUpStep("phone"), className: "w-full text-center text-xs text-primary font-semibold hover:underline", children: "Change Phone Number" })
      ] }),
      signUpStep === "password" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "hidden", ...register("phone") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-soft space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-extrabold text-lg text-foreground", children: "Create account password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Set a secure password for your JobNow account before completing your profile." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs", children: [
                "Password ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "reg-password", className: `h-12 rounded-xl bg-card pr-11 ${errors.password ? "border-destructive" : ""}`, type: showPwd ? "text" : "password", placeholder: "••••••••", disabled: isSubmitting, ...register("password") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPwd((s) => !s), disabled: isSubmitting, className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground", children: showPwd ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
              ] }),
              errors.password && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive", children: errors.password.message })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs", children: [
                "Confirm password ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "reg-confirm-password", className: `mt-1.5 h-12 rounded-xl bg-card ${errors.confirmPassword ? "border-destructive" : ""}`, placeholder: "••••••••", type: "password", disabled: isSubmitting, ...register("confirmPassword") }),
              errors.confirmPassword && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive", children: errors.confirmPassword.message })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { id: "register-submit", type: "submit", disabled: isSubmitting, className: "w-full h-12 rounded-full bg-gradient-primary text-primary-foreground font-semibold shadow-glow mt-2", children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
            " Creating Account…"
          ] }) : "Create Account & Continue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setSignUpStep("otp"), className: "w-full text-center text-xs text-muted-foreground font-semibold hover:underline transition-colors py-2", children: "Back to OTP verification" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground mt-4", children: [
        "By signing up, you agree to our ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "text-primary font-medium", children: "Terms" }),
        " &",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "text-primary font-medium", children: "Privacy Policy" }),
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground pt-4 border-t border-border mt-4", children: [
        "Already have an account?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", search: {
          role
        }, className: "text-primary font-semibold", children: "Log in" })
      ] })
    ] }) })
  ] });
}
export {
  Register as component
};
