import { r as reactExports, W as jsxRuntimeExports } from "./server-asg8yyOI.js";
import { B as Badge } from "./badge-K2Rxl4bs.js";
import { B as Button } from "./button-CYsrxhE6.js";
import { u as useAuth, m as motion, s as supabase, t as toast } from "./router-CJiiTd-g.js";
import { R as RazorpayModal } from "./razorpay-modal-FUyot8fH.js";
import { L as LoaderCircle } from "./loader-circle-BApE_kuV.js";
import { W as Wallet } from "./wallet-Brc9gyYy.js";
import { C as CreditCard } from "./credit-card-CiOxdD7Z.js";
import { I as IndianRupee } from "./indian-rupee-1j-wPeZt.js";
import { D as Download } from "./download-DIhz6Tru.js";
import { L as Lock } from "./lock-2YKs-tbz.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-MJfIt0uB.js";
import "./index-xaKJNf22.js";
import "./index-BDj9T5Ow.js";
import "./input-B5XZA1L8.js";
import "./label-B_he1wCA.js";
import "./index-DNtXgkDV.js";
import "./x-DtpTs-RX.js";
import "./arrow-right-BMJQd40u.js";
import "./circle-check-DJSsfJ_8.js";
import "./shield-check-BKlsm_hB.js";
function Payments() {
  const {
    user
  } = useAuth();
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [stats, setStats] = reactExports.useState({
    totalSpent: 0,
    pending: 0,
    thisMonth: 0
  });
  const [payouts, setPayouts] = reactExports.useState([]);
  const [showPayment, setShowPayment] = reactExports.useState(false);
  const [selectedJob, setSelectedJob] = reactExports.useState(null);
  const loadPayments = async () => {
    if (!user) return;
    try {
      const {
        data: apps,
        error
      } = await supabase.from("applications").select("*, worker:profiles(name), job:jobs(*)").eq("status", "hired");
      if (error) throw error;
      const contractorApps = (apps || []).filter((app) => app.job && app.job.contractor_id === user.id);
      let total = 0;
      let pend = 0;
      let monthSum = 0;
      const currentMonth = (/* @__PURE__ */ new Date()).getMonth();
      const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
      const formattedPayouts = contractorApps.map((app) => {
        const payPerDay = Number(app.job.pay_per_day) || 0;
        const duration = Number(app.job.duration_days) || 1;
        const amt = payPerDay * duration;
        const isPaid = app.job.status === "completed" || app.job.escrow_status === "released";
        if (isPaid) {
          total += amt;
          const completedDate = new Date(app.job.created_at);
          if (completedDate.getMonth() === currentMonth && completedDate.getFullYear() === currentYear) {
            monthSum += amt;
          }
        } else {
          pend += amt;
        }
        return {
          id: app.id,
          title: app.job.title,
          workers: app.worker?.name || "Worker",
          date: new Date(app.created_at).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
          }),
          amount: amt,
          status: isPaid ? "Paid" : "Pending",
          escrowStatus: app.job.escrow_status || "pending",
          jobId: app.job.id
        };
      });
      setStats({
        totalSpent: total,
        pending: pend,
        thisMonth: monthSum || total * 0.4
      });
      setPayouts(formattedPayouts);
    } catch (err) {
      console.error("Error loading payments:", err);
    } finally {
      setIsLoading(false);
    }
  };
  reactExports.useEffect(() => {
    loadPayments();
  }, [user]);
  const handleInitiateFund = (jobId, title, amount) => {
    setSelectedJob({
      id: jobId,
      title,
      amount
    });
    setShowPayment(true);
  };
  const handlePaymentSuccess = async (txId) => {
    if (!selectedJob) return;
    try {
      const {
        error
      } = await supabase.from("jobs").update({
        escrow_status: "locked"
      }).eq("id", selectedJob.id);
      if (error) throw error;
      toast.success(`Escrow funded successfully! UPI lock reference: ${txId.substring(0, 10)}`);
      loadPayments();
    } catch (err) {
      console.error("Error funding escrow:", err);
      toast.error("Failed to update escrow state in database.");
    } finally {
      setSelectedJob(null);
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center h-[50vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-6 md:pt-8 pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-extrabold tracking-tight", children: "Payments" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "All payouts to your hired workers." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Big, { tone: "from-blue-800 to-slate-900", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-5 w-5" }), label: "Total spent", value: `₹${stats.totalSpent.toLocaleString()}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Big, { tone: "from-blue-600 to-sky-700", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-5 w-5" }), label: "Pending Escrow", value: `₹${stats.pending.toLocaleString()}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Big, { tone: "from-emerald-500 to-teal-600", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "h-5 w-5" }), label: "This month", value: `₹${stats.thisMonth.toLocaleString()}` })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-3xl bg-card border border-border shadow-soft overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold", children: "Recent payouts" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "rounded-full gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
          " Statement"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: payouts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-10 text-center text-muted-foreground", children: "No recent payouts. Once workers are hired and jobs completed, their transactions will appear here." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40 text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left font-medium px-5 py-3", children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left font-medium px-5 py-3 hidden sm:table-cell", children: "Workers" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left font-medium px-5 py-3 hidden md:table-cell", children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left font-medium px-5 py-3", children: "Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left font-medium px-5 py-3", children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: payouts.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.tr, { initial: {
          opacity: 0,
          y: 6
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: i * 0.04
        }, className: "border-t border-border hover:bg-muted/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 font-medium", children: p.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-muted-foreground hidden sm:table-cell", children: p.workers }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-muted-foreground hidden md:table-cell", children: p.date }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3 font-semibold inline-flex items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "h-3.5 w-3.5" }),
            p.amount.toLocaleString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: p.status === "Paid" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "rounded-full border-0 bg-success/15 text-success", children: "Released" }) : p.escrowStatus === "locked" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "rounded-full border-0 bg-amber-500/15 text-amber-600 inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3 w-3" }),
            " Escrow Locked"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "rounded-full border-0 bg-warning/15 text-warning", children: "Unfunded" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "rounded-full text-[10px] h-6 px-2.5 font-bold border-primary text-primary hover:bg-primary hover:text-white", onClick: () => handleInitiateFund(p.jobId, p.title, p.amount), children: "Fund Escrow" })
          ] }) })
        ] }, p.id)) })
      ] }) })
    ] }),
    selectedJob && /* @__PURE__ */ jsxRuntimeExports.jsx(RazorpayModal, { isOpen: showPayment, onClose: () => {
      setShowPayment(false);
      setSelectedJob(null);
    }, onSuccess: handlePaymentSuccess, amount: selectedJob.amount, jobTitle: selectedJob.title })
  ] });
}
function Big({
  tone,
  icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-3xl p-6 text-white bg-gradient-to-br ${tone} shadow-soft relative overflow-hidden`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-6 -right-6 h-28 w-28 rounded-full bg-white/15 blur-xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm opacity-90", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-xl bg-white/20 grid place-items-center", children: icon })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "relative mt-3 text-3xl font-extrabold", children: value })
  ] });
}
export {
  Payments as component
};
