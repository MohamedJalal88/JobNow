import { r as reactExports, W as jsxRuntimeExports } from "./server-D9f26qs9.js";
import { b as Link, o as objectType, e as stringType, s as supabase, t as toast } from "./router-D271R6tG.js";
import { u as useForm, a } from "./zod-Dj5sNaAI.js";
import { B as Button } from "./button-DuUw4OSY.js";
import { I as Input } from "./input-Cee1AOJP.js";
import { L as Label } from "./label-CN7c6HUE.js";
import { A as ArrowLeft } from "./arrow-left-BcxA52cs.js";
import { K as KeyRound } from "./key-round-f1c_iUlC.js";
import { E as EyeOff, a as Eye } from "./eye-BNjDS5S_.js";
import { S as ShieldCheck } from "./shield-check-BDzzQ_gh.js";
import { L as LoaderCircle } from "./loader-circle-HNuWALzZ.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-C5Fgo2z4.js";
import "./index-t_H3gLFJ.js";
import "./index-B2wzRjJC.js";
const schema = objectType({
  currentPassword: stringType().min(1, "Current password is required"),
  newPassword: stringType().min(8, "Password must be at least 8 characters").regex(/[0-9]/, "Must contain at least one number").regex(/[^a-zA-Z0-9]/, "Must contain at least one special character"),
  confirmPassword: stringType().min(1, "Please confirm your new password")
}).refine((d) => d.newPassword === d.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});
function ChangePassword() {
  const [show, setShow] = reactExports.useState({
    a: false,
    b: false,
    c: false
  });
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors
    }
  } = useForm({
    resolver: a(schema),
    mode: "onBlur"
  });
  async function onSubmit(data) {
    setIsSubmitting(true);
    try {
      const {
        error
      } = await supabase.auth.updateUser({
        password: data.newPassword
      });
      if (error) throw error;
      toast.success("Password updated successfully");
      reset();
    } catch (err) {
      console.error("Error updating password:", err);
      toast.error(err instanceof Error ? err.message : "Failed to update password");
    } finally {
      setIsSubmitting(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 md:px-6 lg:px-8 pt-6 md:pt-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contractor/settings", className: "inline-flex items-center gap-1 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      " Back to settings"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-3xl bg-card border border-border shadow-soft overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-8 bg-gradient-to-br from-blue-50 to-slate-50 dark:from-blue-950/30 dark:to-slate-950/30 border-b border-border flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-2xl bg-gradient-primary text-primary-foreground grid place-items-center shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl md:text-2xl font-extrabold", children: "Change password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Use a strong password you don't reuse anywhere else." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "p-6 md:p-8 space-y-5", noValidate: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Current password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "cp-current", type: show.a ? "text" : "password", className: `h-12 rounded-xl bg-muted/40 border-transparent pr-12 ${errors.currentPassword ? "border-destructive" : ""}`, ...register("currentPassword") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShow((s) => ({
              ...s,
              a: !s.a
            })), className: "absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 grid place-items-center text-muted-foreground hover:text-foreground", children: show.a ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
          ] }),
          errors.currentPassword && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive", children: errors.currentPassword.message })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "New password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "cp-new", type: show.b ? "text" : "password", className: `h-12 rounded-xl bg-muted/40 border-transparent pr-12 ${errors.newPassword ? "border-destructive" : ""}`, ...register("newPassword") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShow((s) => ({
              ...s,
              b: !s.b
            })), className: "absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 grid place-items-center text-muted-foreground hover:text-foreground", children: show.b ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
          ] }),
          errors.newPassword && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive", children: errors.newPassword.message })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Confirm new password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "cp-confirm", type: show.c ? "text" : "password", className: `h-12 rounded-xl bg-muted/40 border-transparent pr-12 ${errors.confirmPassword ? "border-destructive" : ""}`, ...register("confirmPassword") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShow((s) => ({
              ...s,
              c: !s.c
            })), className: "absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 grid place-items-center text-muted-foreground hover:text-foreground", children: show.c ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
          ] }),
          errors.confirmPassword && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive", children: errors.confirmPassword.message })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-muted/50 p-4 text-xs text-muted-foreground inline-flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-success mt-0.5 shrink-0" }),
          "Use at least 8 characters with one number and one symbol for best security."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { id: "contractor-change-password-submit", type: "submit", disabled: isSubmitting, className: "w-full h-12 rounded-full bg-gradient-primary text-primary-foreground font-semibold shadow-glow", children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
          " Updating…"
        ] }) : "Update password" })
      ] })
    ] })
  ] });
}
export {
  ChangePassword as component
};
