import { r as reactExports, W as jsxRuntimeExports, a1 as Outlet } from "./server-Brds8CES.js";
import { c as createLucideIcon, u as useAuth, a as useNavigate, i as isProfileIncomplete, B as Briefcase } from "./router-fTGMDcAU.js";
import { S as SideNav, L as LayoutDashboard, T as TopNav, B as BottomNav, H as House } from "./top-nav-cNxXUUrY.js";
import { C as ClipboardCheck } from "./clipboard-check-CDlB7rZC.js";
import { W as Wallet } from "./wallet-CFiGIGDo.js";
import { M as MessageSquare } from "./message-square-D47VuXPd.js";
import { S as Settings, L as LogOut } from "./settings-1X0YL_Kb.js";
import { C as CircleQuestionMark } from "./moon-kncjKBNF.js";
import { U as User } from "./user-XhJpCU9s.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-CExUiu75.js";
import "./index-CyVeoe2Y.js";
import "./index-XFZqbW9A.js";
import "./index-B0U8T_SB.js";
import "./dropdown-menu-DKlGRZx7.js";
import "./index-DRyp94vH.js";
import "./index-CyXurNqT.js";
import "./index-Cun7OXHa.js";
import "./chevron-right-DnTgm7TW.js";
import "./check-C1wz3Nfh.js";
import "./button-Bk64I2uS.js";
import "./index-Buhi5q-1.js";
import "./index--uSmo9Br.js";
import "./avatar-BjfoNoSO.js";
import "./input-BTyUWXgW.js";
import "./map-pin-DXzkJzk2.js";
import "./search-Dcw4fBWn.js";
import "./chevron-down-DYFuxHs4.js";
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
