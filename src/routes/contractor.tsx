import { createFileRoute, Outlet } from "@tanstack/react-router";
import {
  BarChart3, Briefcase, CreditCard, FileText, HelpCircle, Home, LayoutDashboard,
  LogOut, MessageSquare, PlusCircle, Settings, User, Users,
} from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";
import { SideNav } from "@/components/side-nav";
import { TopNav } from "@/components/top-nav";
import { useAuth, isProfileIncomplete } from "@/lib/auth";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

const sideItems = [
  { to: "/contractor", label: "Dashboard", icon: LayoutDashboard },
  { to: "/contractor/post", label: "Post Job", icon: PlusCircle },
  { to: "/contractor/active", label: "Active Jobs", icon: Briefcase },
  { to: "/contractor/applications", label: "Applications", icon: FileText },
  { to: "/contractor/workers", label: "Nearby Workers", icon: Users },
  { to: "/contractor/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/contractor/messages", label: "Messages", icon: MessageSquare },
  { to: "/contractor/payments", label: "Payments", icon: CreditCard },
  { to: "/contractor/settings", label: "Settings", icon: Settings },
  { to: "/contractor/help", label: "Help & Support", icon: HelpCircle },
];

const bottomItems = [
  { to: "/contractor", label: "Home", icon: Home },
  { to: "/contractor/post", label: "Post", icon: PlusCircle },
  { to: "/contractor/workers", label: "Workers", icon: Users },
  { to: "/contractor/messages", label: "Chat", icon: MessageSquare },
  { to: "/contractor/profile", label: "Profile", icon: User },
];

export const Route = createFileRoute("/contractor")({
  component: ContractorLayout,
});

function ContractorLayout() {
  const { user, isLoading, logout } = useAuth();
  const nav = useNavigate();

  // Redirect if not authenticated or wrong role
  useEffect(() => {
    if (!isLoading) {
      if (!user || user.role !== "contractor") {
        nav({ to: "/login", search: { role: "contractor" }, replace: true });
      } else if (isProfileIncomplete(user)) {
        nav({
          to: "/register",
          search: { role: "contractor", completeProfile: true },
          replace: true,
        });
      }
    }
  }, [user, isLoading, nav]);

  // Show nothing while checking auth state
  if (isLoading || !user || user.role !== "contractor") return null;

  const sideItemsWithLogout = [
    ...sideItems,
    {
      to: "/welcome" as const,
      label: "Logout",
      icon: LogOut,
      onClick: logout,
    },
  ];

  return (
    <div className="min-h-dvh flex w-full bg-muted/40">
      <SideNav items={sideItemsWithLogout} role="contractor" onLogout={logout} />
      <div className="flex-1 min-w-0 flex flex-col">
        <TopNav name={user.name} role="contractor" onLogout={logout} />
        <main className="flex-1 min-w-0 pb-28 md:pb-10">
          <Outlet />
        </main>
      </div>
      <BottomNav items={bottomItems} />
    </div>
  );
}
