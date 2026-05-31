import { r as reactExports, W as jsxRuntimeExports, a1 as Outlet } from "./server-asg8yyOI.js";
import { c as createLucideIcon, u as useAuth, a as useNavigate, i as isProfileIncomplete, B as Briefcase } from "./router-CJiiTd-g.js";
import { S as SideNav, L as LayoutDashboard, T as TopNav, B as BottomNav, H as House } from "./top-nav-BTOOXl4n.js";
import { C as ClipboardCheck } from "./clipboard-check-D_tmwWij.js";
import { W as Wallet } from "./wallet-Brc9gyYy.js";
import { M as MessageSquare } from "./message-square-CXc6FAzo.js";
import { S as Settings, L as LogOut } from "./settings-BHSbP544.js";
import { C as CircleQuestionMark } from "./moon-D5DG1YIR.js";
import { U as User } from "./user-Di35iH2J.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-DeS0QqHY.js";
import "./index-BWHTYThd.js";
import "./index-BDj9T5Ow.js";
import "./index-CwT--ASf.js";
import "./dropdown-menu-DdoakqtA.js";
import "./index-BCQuZvc9.js";
import "./index-B1Ksuubc.js";
import "./index-lw6_RpcP.js";
import "./chevron-right-Dda_06kg.js";
import "./check-BU0hd1v0.js";
import "./button-CYsrxhE6.js";
import "./index-xaKJNf22.js";
import "./index-MJfIt0uB.js";
import "./avatar-DVQQtQPm.js";
import "./input-B5XZA1L8.js";
import "./map-pin-Dp4q3uSx.js";
import "./search-BFassG2r.js";
import "./chevron-down-DHcy2P3T.js";
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M12 7v5l4 2", key: "1fdv2h" }]
];
const History = createLucideIcon("history", __iconNode);
const sideItems = [{
  to: "/worker",
  label: "Dashboard",
  icon: LayoutDashboard
}, {
  to: "/worker/jobs",
  label: "Nearby Jobs",
  icon: Briefcase
}, {
  to: "/worker/accepted",
  label: "Accepted Jobs",
  icon: ClipboardCheck
}, {
  to: "/worker/earnings",
  label: "Earnings",
  icon: Wallet
}, {
  to: "/worker/messages",
  label: "Messages",
  icon: MessageSquare
}, {
  to: "/worker/history",
  label: "Job History",
  icon: History
}, {
  to: "/worker/settings",
  label: "Settings",
  icon: Settings
}, {
  to: "/worker/help",
  label: "Help & Support",
  icon: CircleQuestionMark
}];
const bottomItems = [{
  to: "/worker",
  label: "Home",
  icon: House
}, {
  to: "/worker/jobs",
  label: "Jobs",
  icon: Briefcase
}, {
  to: "/worker/messages",
  label: "Chat",
  icon: MessageSquare
}, {
  to: "/worker/earnings",
  label: "Earnings",
  icon: Wallet
}, {
  to: "/worker/profile",
  label: "Profile",
  icon: User
}];
function WorkerLayout() {
  const {
    user,
    isLoading,
    logout
  } = useAuth();
  const nav = useNavigate();
  reactExports.useEffect(() => {
    if (!isLoading) {
      if (!user || user.role !== "worker") {
        nav({
          to: "/login",
          search: {
            role: "worker"
          },
          replace: true
        });
      } else if (isProfileIncomplete(user)) {
        nav({
          to: "/register",
          search: {
            role: "worker",
            completeProfile: true
          },
          replace: true
        });
      }
    }
  }, [user, isLoading, nav]);
  if (isLoading || !user || user.role !== "worker") return null;
  const sideItemsWithLogout = [...sideItems, {
    to: "/welcome",
    label: "Logout",
    icon: LogOut,
    onClick: logout
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-dvh flex w-full bg-muted/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SideNav, { items: sideItemsWithLogout, role: "worker", onLogout: logout }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TopNav, { name: user.name, role: "worker", onLogout: logout }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 min-w-0 pb-28 md:pb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BottomNav, { items: bottomItems })
  ] });
}
export {
  WorkerLayout as component
};
