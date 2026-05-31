import { r as reactExports, W as jsxRuntimeExports } from "./server-DoqeQAMK.js";
import { a as useNavigate, f as Route, u as useAuth, m as motion, b as Link, o as objectType, e as stringType, t as toast, s as supabase } from "./router-DH6bADvP.js";
import { u as useForm, a } from "./zod-BoSY8Je8.js";
import { B as Button } from "./button-BqkRPwal.js";
import { I as Input } from "./input-bpKYGI82.js";
import { L as Label } from "./label-CAwEZolP.js";
import { A as AuthSplit } from "./auth-split-BAlvPRMN.js";
import { P as Phone } from "./phone-4zP-C5De.js";
import { M as Mail } from "./mail-BFDKnCBy.js";
import { E as EyeOff, a as Eye } from "./eye-Bg7TAOhA.js";
import { L as LoaderCircle } from "./loader-circle-CMQFy84J.js";
import { S as ShieldCheck } from "./shield-check-CbLGXEOC.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-Bc9SJP-z.js";
import "./index-DRWbC4_q.js";
import "./index-BDtDEmOi.js";
import "./sparkles-DzN7_SOO.js";
import "./users-round-XDrV-CKL.js";
import "./arrow-left-DBlBVBDe.js";
const phoneSchema = objectType({
  phone: stringType().min(10, "Enter a valid 10-digit phone number").max(13, "Phone number too long").regex(/^[6-9]\d{9}$/, "Must be a valid Indian mobile number"),
  password: stringType().min(6, "Password must be at least 6 characters")
});
const emailSchema = objectType({
  email: stringType().email("Enter a valid email address"),
  password: stringType().min(6, "Password must be at least 6 characters")
});
function Login() {
  const nav = useNavigate();
  const {
    role
  } = Route.useSearch();
  const {
    login,
    user,
    isLoading
  } = useAuth();
  const [tab, setTab] = reactExports.useState("phone");
  const [showPwd, setShowPwd] = reactExports.useState(false);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (role) {
      localStorage.setItem("signup_role", role);
    }
  }, [role]);
  reactExports.useEffect(() => {
    if (!isLoading && user) {
      nav({
        to: "/welcome",
        replace: true
      });
    }
  }, [user, isLoading, nav]);
  async function handleGoogleLogin() {
    setIsSubmitting(true);
    try {
      localStorage.setItem("oauth_role", role);
      localStorage.setItem("oauth_source", "login");
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
      toast.error(err instanceof Error ? err.message : "Google login failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  }
  const phoneForm = useForm({
    resolver: a(phoneSchema),
    mode: "onBlur"
  });
  const emailForm = useForm({
    resolver: a(emailSchema),
    mode: "onBlur"
  });
  async function handlePhoneSubmit(data) {
    setIsSubmitting(true);
    try {
      await login({
        identifier: data.phone,
        password: data.password,
        role
      });
      toast.success("Welcome back! 👋");
      nav({
        to: "/welcome"
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  }
  async function handleEmailSubmit(data) {
    setIsSubmitting(true);
    try {
      await login({
        identifier: data.email,
        password: data.password,
        role
      });
      toast.success("Welcome back! 👋");
      nav({
        to: "/welcome"
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  }
  const phoneErrors = phoneForm.formState.errors;
  const emailErrors = emailForm.formState.errors;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AuthSplit, { eyebrow: `Logging in as ${role}`, heading: "Welcome back to JobNow.", subheading: "Pick up right where you left off — your jobs, your earnings, your network.", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-extrabold tracking-tight", children: "Log in" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm text-muted-foreground", children: "Welcome back. Let's get you working." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold capitalize", children: role })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid grid-cols-2 p-1 bg-muted rounded-full", children: ["phone", "email"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
      setTab(t);
    }, className: `relative h-10 rounded-full text-xs md:text-sm font-medium capitalize transition-colors ${tab === t ? "text-primary-foreground" : "text-muted-foreground"}`, children: [
      tab === t && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { layoutId: "login-tab", className: "absolute inset-0 rounded-full bg-gradient-primary", transition: {
        type: "spring",
        stiffness: 400,
        damping: 30
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative inline-flex items-center gap-1.5", children: [
        t === "phone" && /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3.5 w-3.5" }),
        t === "email" && /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-3.5 w-3.5" }),
        t
      ] })
    ] }, t)) }),
    tab === "phone" && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: phoneForm.handleSubmit(handlePhoneSubmit), className: "mt-6 space-y-4", noValidate: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Phone number" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 px-3 rounded-xl border border-input bg-card grid place-items-center text-sm font-medium", children: "+91" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "login-phone", className: `h-12 rounded-xl bg-card ${phoneErrors.phone ? "border-destructive" : ""}`, placeholder: "98765 43210", type: "tel", ...phoneForm.register("phone") }),
            phoneErrors.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive", children: phoneErrors.phone.message })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "login-phone-password", className: `h-12 rounded-xl bg-card pr-11 ${phoneErrors.password ? "border-destructive" : ""}`, type: showPwd ? "text" : "password", placeholder: "••••••••", ...phoneForm.register("password") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPwd((s) => !s), className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground", children: showPwd ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
        ] }),
        phoneErrors.password && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive", children: phoneErrors.password.message })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "inline-flex items-center gap-2 cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", className: "h-4 w-4 rounded border-input accent-primary", defaultChecked: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Remember me" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/forgot-password", className: "font-medium text-primary", children: "Forgot password?" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { id: "login-phone-submit", type: "submit", disabled: isSubmitting, className: "w-full h-12 rounded-full bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:opacity-95", children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
        " Logging in…"
      ] }) : "Log in" })
    ] }),
    tab === "email" && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: emailForm.handleSubmit(handleEmailSubmit), className: "mt-6 space-y-4", noValidate: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "login-email", className: `mt-1.5 h-12 rounded-xl bg-card ${emailErrors.email ? "border-destructive" : ""}`, type: "email", placeholder: "you@example.com", ...emailForm.register("email") }),
        emailErrors.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive", children: emailErrors.email.message })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "login-email-password", className: `h-12 rounded-xl bg-card pr-11 ${emailErrors.password ? "border-destructive" : ""}`, type: showPwd ? "text" : "password", placeholder: "••••••••", ...emailForm.register("password") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPwd((s) => !s), className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground", children: showPwd ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
        ] }),
        emailErrors.password && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive", children: emailErrors.password.message })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "inline-flex items-center gap-2 cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", className: "h-4 w-4 rounded border-input accent-primary", defaultChecked: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Remember me" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/forgot-password", className: "font-medium text-primary", children: "Forgot password?" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { id: "login-email-submit", type: "submit", disabled: isSubmitting, className: "w-full h-12 rounded-full bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:opacity-95", children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
        " Logging in…"
      ] }) : "Log in" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-6 flex items-center gap-3 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" }),
      " or continue with ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleGoogleLogin, disabled: isSubmitting, className: "w-full h-12 rounded-full border border-input bg-card font-medium text-sm flex items-center justify-center gap-2 hover:bg-muted transition-colors disabled:opacity-50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(GoogleIcon, {}),
      " Continue with Google"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-xl p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-success shrink-0" }),
      "Your data is encrypted end-to-end. We never share your info."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-center text-sm text-muted-foreground", children: [
      "Don't have an account?",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", search: {
        role
      }, className: "text-primary font-semibold", children: "Create account" })
    ] })
  ] });
}
function GoogleIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#4285F4", d: "M22.5 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.22-4.74 3.22-8.32z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#34A853", d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#FBBC05", d: "M5.84 14.1A6.94 6.94 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.78.43 3.46 1.18 4.94l3.66-2.84z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#EA4335", d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" })
  ] });
}
export {
  Login as component
};
