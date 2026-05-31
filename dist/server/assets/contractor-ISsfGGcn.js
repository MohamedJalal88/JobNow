import { r as reactExports, W as jsxRuntimeExports, a1 as Outlet } from "./server-Brds8CES.js";
import { c as createLucideIcon, u as useAuth, a as useNavigate, i as isProfileIncomplete, B as Briefcase } from "./router-fTGMDcAU.js";
import { S as SideNav, L as LayoutDashboard, T as TopNav, B as BottomNav, H as House } from "./top-nav-cNxXUUrY.js";
import { F as FileText } from "./file-text-PvQnFC29.js";
import { U as Users } from "./users-BTGqadLE.js";
import { C as ChartColumn } from "./chart-column-CnRfnMM7.js";
import { M as MessageSquare } from "./message-square-D47VuXPd.js";
import { C as CreditCard } from "./credit-card-HtyqtsGn.js";
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
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "M12 8v8", key: "napkw2" }]
];
const CirclePlus = createLucideIcon("circle-plus", __iconNode);
const sideItems = [{
  to: "/contractor",
  label: "Dashboard",
  icon: LayoutDashboard
}, {
  to: "/contractor/post",
  label: "Post Job",
  icon: CirclePlus
}, {
  to: "/contractor/active",
  label: "Active Jobs",
  icon: Briefcase
}, {
  to: "/contractor/applications",
  label: "Applications",
  icon: FileText
}, {
  to: "/contractor/workers",
  label: "Nearby Workers",
  icon: Users
}, {
  to: "/contractor/analytics",
  label: "Analytics",
  icon: ChartColumn
}, {
  to: "/contractor/messages",
  label: "Messages",
  icon: MessageSquare
}, {
  to: "/contractor/payments",
  label: "Payments",
  icon: CreditCard
}, {
  to: "/contractor/settings",
  label: "Settings",
  icon: Settings
}, {
  to: "/contractor/help",
  label: "Help & Support",
  icon: CircleQuestionMark
}];
const bottomItems = [{
  to: "/contractor",
  label: "Home",
  icon: House
}, {
  to: "/contractor/post",
  label: "Post",
  icon: CirclePlus
}, {
  to: "/contractor/workers",
  label: "Workers",
  icon: Users
}, {
  to: "/contractor/messages",
  label: "Chat",
  icon: MessageSquare
}, {
  to: "/contractor/profile",
  label: "Profile",
  icon: User
}];
function ContractorLayout() {
  const {
    user,
    isLoading,
    logout
  } = useAuth();
  const nav = useNavigate();
  reactExports.useEffect(() => {
    if (!isLoading) {
      if (!user || user.role !== "contractor") {
        nav({
          to: "/login",
          search: {
            role: "contractor"
          },
          replace: true
        });
      } else if (isProfileIncomplete(user)) {
        nav({
          to: "/register",
          search: {
            role: "contractor",
            completeProfile: true
          },
          replace: true
        });
      }
    }
  }, [user, isLoading, nav]);
  if (isLoading || !user || user.role !== "contractor") return null;
  const sideItemsWithLogout = [...sideItems, {
    to: "/welcome",
    label: "Logout",
    icon: LogOut,
    onClick: logout
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-dvh flex w-full bg-muted/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SideNav, { items: sideItemsWithLogout, role: "contractor", onLogout: logout }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TopNav, { name: user.name, role: "contractor", onLogout: logout }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 min-w-0 pb-28 md:pb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BottomNav, { items: bottomItems })
  ] });
}
export {
  ContractorLayout as component
};
