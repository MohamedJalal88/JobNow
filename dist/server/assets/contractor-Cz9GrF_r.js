import { r as reactExports, W as jsxRuntimeExports, a1 as Outlet } from "./server-Bdhs9obN.js";
import { c as createLucideIcon, u as useAuth, a as useNavigate, i as isProfileIncomplete, B as Briefcase } from "./router-BRcjVh65.js";
import { S as SideNav, L as LayoutDashboard, T as TopNav, B as BottomNav, H as House } from "./top-nav-BsPkFC9E.js";
import { F as FileText } from "./file-text-Be26ydPa.js";
import { U as Users } from "./users-CiECk4c5.js";
import { C as ChartColumn } from "./chart-column-BOkD9N_8.js";
import { M as MessageSquare } from "./message-square-qVSqzkS5.js";
import { C as CreditCard } from "./credit-card-DpdMDO1N.js";
import { S as Settings, L as LogOut } from "./settings-ByEaDQYx.js";
import { C as CircleQuestionMark } from "./moon-DRUWTPsi.js";
import { U as User } from "./user-BrYCGFt3.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-CpkdkAgQ.js";
import "./index-JJn3Sn7e.js";
import "./index-lxwdXnt7.js";
import "./index-CMR4h7m-.js";
import "./dropdown-menu-CixRawdH.js";
import "./index-CT7-nG3N.js";
import "./index-BohYWDhN.js";
import "./index-Dvfsh3dX.js";
import "./chevron-right-CjNIn6MF.js";
import "./check-BoqB4zS9.js";
import "./button-DVa_PMXS.js";
import "./index-DjzVvyLV.js";
import "./index-CSRB__ba.js";
import "./avatar-pIIcMAyb.js";
import "./input-vd8UFKmU.js";
import "./map-pin-Dzjs76hk.js";
import "./search-C44Gwgth.js";
import "./chevron-down-BvbUKnP8.js";
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
