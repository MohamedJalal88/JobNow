import { r as reactExports, W as jsxRuntimeExports, a1 as Outlet } from "./server-x9CHfBKQ.js";
import { c as createLucideIcon, u as useAuth, a as useNavigate, i as isProfileIncomplete, B as Briefcase } from "./router-D7lfUnXG.js";
import { S as SideNav, L as LayoutDashboard, T as TopNav, B as BottomNav, H as House } from "./top-nav-D_r__IiU.js";
import { F as FileText } from "./file-text-XPX0l2iP.js";
import { U as Users } from "./users-S7ueD2l_.js";
import { C as ChartColumn } from "./chart-column-CQ4MrYV9.js";
import { M as MessageSquare } from "./message-square-BAO7BWza.js";
import { C as CreditCard } from "./credit-card-WvAysMKx.js";
import { S as Settings, L as LogOut } from "./settings-BpqivmR6.js";
import { C as CircleQuestionMark } from "./moon-CS0h41Qt.js";
import { U as User } from "./user-BKJPsJSY.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-BWTXJzPM.js";
import "./index-DN5R_CKq.js";
import "./index-Blqeljoh.js";
import "./index-Bkc3wuA7.js";
import "./dropdown-menu-BrU2Z_s3.js";
import "./index-Dligbou9.js";
import "./index-DqFviqIj.js";
import "./index-CWwUtw2H.js";
import "./chevron-right-Dtba_PsB.js";
import "./check-B9URDME_.js";
import "./button-jV6UgcJo.js";
import "./index-C1IWq_ZA.js";
import "./index-2eWgaTdc.js";
import "./avatar-DQWtpViF.js";
import "./input-HFzfzB6_.js";
import "./map-pin-Dqz-uMHX.js";
import "./search-BQFunEJp.js";
import "./chevron-down-DPDpzTZC.js";
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
