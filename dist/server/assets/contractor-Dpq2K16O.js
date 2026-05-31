import { r as reactExports, W as jsxRuntimeExports, a1 as Outlet } from "./server-asg8yyOI.js";
import { c as createLucideIcon, u as useAuth, a as useNavigate, i as isProfileIncomplete, B as Briefcase } from "./router-CJiiTd-g.js";
import { S as SideNav, L as LayoutDashboard, T as TopNav, B as BottomNav, H as House } from "./top-nav-BTOOXl4n.js";
import { F as FileText } from "./file-text-KOvPh7P2.js";
import { U as Users } from "./users-ByybLJud.js";
import { C as ChartColumn } from "./chart-column-BaiLwnZ8.js";
import { M as MessageSquare } from "./message-square-CXc6FAzo.js";
import { C as CreditCard } from "./credit-card-CiOxdD7Z.js";
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
