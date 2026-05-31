import { r as reactExports, W as jsxRuntimeExports } from "./server-tlzWzzxG.js";
import { u as useAuth, a as useNavigate, i as isProfileIncomplete, s as supabase, t as toast, L as Logo, b as Link, m as motion, B as Briefcase } from "./router-BN8-Jwly.js";
import { S as Sparkles } from "./sparkles-DO91-M2b.js";
import { A as ArrowRight } from "./arrow-right-C_wCt8AG.js";
import { C as CircleCheck } from "./circle-check-94W1TNTg.js";
import { S as Star } from "./star-oSVIDXat.js";
import { M as MapPin } from "./map-pin-CcWakKMb.js";
import { Z as Zap } from "./zap-Bz0W7g9c.js";
import { S as ShieldCheck } from "./shield-check-Clw1wsff.js";
import { W as Wallet } from "./wallet-DYvILPMu.js";
import { U as UsersRound } from "./users-round-B6ihTVef.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const stats = [{
  k: "50k+",
  v: "Verified workers"
}, {
  k: "12k+",
  v: "Active contractors"
}, {
  k: "1.2M",
  v: "Jobs completed"
}, {
  k: "4.8★",
  v: "Avg. rating"
}];
const features = [{
  icon: MapPin,
  title: "Hyperlocal matching",
  body: "Find or hire within a 10km radius — instantly."
}, {
  icon: Zap,
  title: "Real-time hiring",
  body: "Apply or hire in seconds, not days."
}, {
  icon: ShieldCheck,
  title: "Verified profiles",
  body: "Skills, ratings, ID checks & full job history."
}, {
  icon: Wallet,
  title: "Secure daily payouts",
  body: "Get paid the same day you finish the job."
}, {
  icon: UsersRound,
  title: "Trusted community",
  body: "Built for India's skilled workforce."
}, {
  icon: Sparkles,
  title: "Premium experience",
  body: "A modern app that actually feels good to use."
}];
const steps = [{
  n: "01",
  t: "Create your profile",
  b: "Sign up as a worker or contractor in under a minute."
}, {
  n: "02",
  t: "Match instantly",
  b: "We connect you with the closest, best-fit match in real time."
}, {
  n: "03",
  t: "Work & get paid",
  b: "Complete the job and receive secure same-day payment."
}];
const testimonials = [{
  name: "Ramesh K.",
  role: "Electrician, Pune",
  quote: "I used to wait days for work. Now I get 3-4 jobs a week from contractors nearby."
}, {
  name: "Sharma Constructions",
  role: "Contractor, Mumbai",
  quote: "Hiring 5 painters used to take a week. With JobNow, I had my crew in 30 minutes."
}, {
  name: "Anita P.",
  role: "Cleaner, Bengaluru",
  quote: "The daily payouts changed everything for my family."
}];
function Landing() {
  const {
    user,
    isLoading,
    updateUser,
    logout
  } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (!isLoading && user) {
      const savedRole = localStorage.getItem("oauth_role") || localStorage.getItem("signup_role");
      if (savedRole && (savedRole === "worker" || savedRole === "contractor")) {
        localStorage.removeItem("oauth_role");
        if (user.role !== savedRole) {
          updateUser({
            role: savedRole
          }).catch((err) => {
            console.error("Failed to update role:", err);
          });
          return;
        }
      }
      const activeRole = localStorage.getItem("signup_role") || user.role;
      if (isProfileIncomplete(user)) {
        const oauthSource = localStorage.getItem("oauth_source");
        if (user.email && user.email.trim() !== "") {
          supabase.from("profiles").select("id, phone").eq("email", user.email).neq("id", user.id).maybeSingle().then(async ({
            data: existingProfile,
            error: profileErr
          }) => {
            if (!profileErr && existingProfile && existingProfile.phone && existingProfile.phone.trim() !== "") {
              console.log("Found existing phone profile with same email. Merging...", existingProfile.id);
              try {
                const {
                  error: mergeErr
                } = await supabase.rpc("merge_user_accounts", {
                  old_id: existingProfile.id,
                  new_id: user.id
                });
                if (mergeErr) throw mergeErr;
                localStorage.removeItem("oauth_source");
                window.location.reload();
              } catch (mergeErr) {
                console.error("Account merge failed:", mergeErr);
                localStorage.removeItem("oauth_source");
                navigate({
                  to: "/register",
                  search: {
                    role: activeRole,
                    completeProfile: true
                  },
                  replace: true
                });
              }
            } else {
              if (oauthSource === "login") {
                console.log("No account found for Google user during login attempt. Logging out.");
                localStorage.removeItem("oauth_source");
                logout().then(() => {
                  toast.error("No account found with this Google account. Please sign up first.");
                  navigate({
                    to: "/login",
                    search: {
                      role: activeRole
                    },
                    replace: true
                  });
                });
              } else {
                localStorage.removeItem("oauth_source");
                navigate({
                  to: "/register",
                  search: {
                    role: activeRole,
                    completeProfile: true
                  },
                  replace: true
                });
              }
            }
          });
        } else {
          if (oauthSource === "login") {
            localStorage.removeItem("oauth_source");
            logout().then(() => {
              toast.error("No account found with this Google account. Please sign up first.");
              navigate({
                to: "/login",
                search: {
                  role: activeRole
                },
                replace: true
              });
            });
          } else {
            localStorage.removeItem("oauth_source");
            navigate({
              to: "/register",
              search: {
                role: activeRole,
                completeProfile: true
              },
              replace: true
            });
          }
        }
      } else {
        localStorage.removeItem("oauth_source");
        navigate({
          to: user.role === "contractor" ? "/contractor" : "/worker",
          replace: true
        });
      }
    }
  }, [user, isLoading, navigate, updateUser, logout]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-dvh flex items-center justify-center bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-dvh w-full bg-background overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-40 backdrop-blur bg-background/70 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#features", className: "hover:text-foreground transition-colors", children: "Features" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#how", className: "hover:text-foreground transition-colors", children: "How it works" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#workers", className: "hover:text-foreground transition-colors", children: "For workers" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#contractors", className: "hover:text-foreground transition-colors", children: "For contractors" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login-choice", className: "hidden sm:inline-flex h-10 items-center px-4 rounded-full text-sm font-medium hover:bg-muted transition-colors", children: "Log in" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", className: "inline-flex h-10 items-center px-5 rounded-full bg-gradient-primary text-primary-foreground text-sm font-semibold shadow-glow hover:opacity-95 transition-opacity", children: "Get started" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-mesh opacity-60 pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-20 md:pt-24 md:pb-28 grid lg:grid-cols-2 gap-12 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 16
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.6
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
            " India's #1 daily wage marketplace"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-5 text-5xl md:text-6xl xl:text-7xl font-extrabold leading-[1.02] tracking-tight", children: [
            "Work near you.",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Pay by the day." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-lg text-muted-foreground max-w-xl", children: "JobNow connects skilled workers with contractors in their neighborhood — in real time, with secure same-day payouts." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/signup", className: "inline-flex items-center gap-2 h-12 px-6 rounded-full bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:opacity-95", children: [
              "Get started ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login-choice", className: "inline-flex items-center gap-2 h-12 px-6 rounded-full border border-border bg-card font-semibold hover:bg-muted", children: "Log in" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-xl", children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl md:text-3xl font-extrabold text-gradient", children: s.k }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: s.v })
          ] }, s.v)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          opacity: 0,
          scale: 0.96
        }, animate: {
          opacity: 1,
          scale: 1
        }, transition: {
          duration: 0.7,
          delay: 0.1
        }, className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative rounded-3xl bg-gradient-hero p-1 shadow-elegant", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[22px] bg-card p-6 md:p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground font-semibold", children: "Live near you" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-xs font-medium text-success", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-success animate-pulse" }),
              " 24 jobs open now"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-3", children: [{
            t: "Painter — 2BHK interior",
            c: "Sharma Contractors",
            d: "1.2 km · ₹1,200/day",
            g: "from-blue-600 to-sky-700"
          }, {
            t: "Electrician — Wiring",
            c: "Bright Builders",
            d: "0.8 km · ₹1,500/day",
            g: "from-slate-600 to-slate-800"
          }, {
            t: "Plumber — Bathroom",
            c: "Reddy Estate",
            d: "2.1 km · ₹1,300/day",
            g: "from-cyan-600 to-blue-700"
          }].map((j) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-2xl border border-border hover:shadow-soft transition-shadow", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-11 w-11 rounded-xl bg-gradient-to-br ${j.g} grid place-items-center text-white shadow-soft`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm truncate", children: j.t }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
                j.c,
                " · ",
                j.d
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-success" })
          ] }, j.t)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3.5 w-3.5 text-amber-500 fill-amber-500" }),
            "4.8 average rating · 12,400+ reviews"
          ] })
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "features", className: "py-20 md:py-28 bg-muted/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: "Why JobNow" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 text-3xl md:text-5xl font-extrabold tracking-tight", children: "Everything you need to work or hire." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "Built from the ground up for India's daily-wage workforce and the contractors who depend on them." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: features.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 12
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        delay: i * 0.05
      }, className: "rounded-3xl bg-card border border-border p-6 hover:shadow-elegant transition-shadow", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-2xl bg-gradient-primary text-primary-foreground grid place-items-center shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 font-bold text-lg", children: f.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm text-muted-foreground", children: f.body })
      ] }, f.title)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "how", className: "py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: "How it works" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 text-3xl md:text-5xl font-extrabold tracking-tight", children: "Three steps to your next job." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid md:grid-cols-3 gap-4", children: steps.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border p-8 bg-gradient-to-br from-card to-muted/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-5xl font-extrabold text-gradient", children: s.n }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 font-bold text-xl", children: s.t }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: s.b })
      ] }, s.n)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 md:py-28 bg-muted/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { id: "workers", className: "rounded-3xl p-8 md:p-12 bg-gradient-to-br from-blue-600 to-sky-700 text-white shadow-elegant", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 rounded-2xl bg-white/20 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-7 w-7" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-6 text-3xl md:text-4xl font-extrabold", children: "For workers" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 opacity-90 max-w-md", children: "Find verified daily wage jobs near you. Paint, wire, plumb, build — and get paid the same day." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-6 space-y-2.5 text-sm", children: ["Daily payouts", "Jobs within 10km", "Build your reputation", "Free to join"].map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
          " ",
          b
        ] }, b)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/signup", className: "mt-8 inline-flex items-center gap-2 h-12 px-6 rounded-full bg-white text-blue-700 font-semibold hover:scale-[1.02] transition-transform", children: [
          "Find jobs ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { id: "contractors", className: "rounded-3xl p-8 md:p-12 bg-gradient-to-br from-blue-800 to-slate-900 text-white shadow-elegant", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 rounded-2xl bg-white/20 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UsersRound, { className: "h-7 w-7" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-6 text-3xl md:text-4xl font-extrabold", children: "For contractors" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 opacity-90 max-w-md", children: "Hire skilled, verified workers in minutes. Post a job, review applicants, and get the work done — fast." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-6 space-y-2.5 text-sm", children: ["Hire in 30 minutes", "Verified profiles & ratings", "Bulk hiring tools", "Manage payments easily"].map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
          " ",
          b
        ] }, b)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/signup", className: "mt-8 inline-flex items-center gap-2 h-12 px-6 rounded-full bg-white text-blue-900 font-semibold hover:scale-[1.02] transition-transform", children: [
          "Hire workers ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: "Loved by thousands" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 text-3xl md:text-5xl font-extrabold tracking-tight", children: "A platform built on trust." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid md:grid-cols-3 gap-4", children: testimonials.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border bg-card p-6 hover:shadow-elegant transition-shadow", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5 text-amber-500", children: Array.from({
          length: 5
        }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 fill-current" }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-sm leading-relaxed", children: [
          '"',
          t.quote,
          '"'
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 pt-5 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: t.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t.role })
        ] })
      ] }, t.name)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pb-20 md:pb-28", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-[32px] bg-gradient-hero p-10 md:p-16 text-primary-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-mesh opacity-60" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-3xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl md:text-6xl font-extrabold tracking-tight", children: "Ready to get to work?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-lg opacity-90", children: "Join 60,000+ workers and contractors building India's most trusted daily wage marketplace." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/signup", className: "inline-flex items-center gap-2 h-12 px-6 rounded-full bg-white text-primary font-semibold shadow-elegant hover:scale-[1.02] transition-transform", children: [
            "Get started ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login-choice", className: "inline-flex items-center gap-2 h-12 px-6 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10", children: "Log in" })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " JobNow. Built for India."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-foreground", children: "Privacy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-foreground", children: "Terms" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-foreground", children: "Contact" })
      ] })
    ] }) })
  ] });
}
export {
  Landing as component
};
