"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Activity,
  Bell,
  FileText,
  GitBranch,
  LayoutDashboard,
  Link2,
  LogOut,
  Settings,
  Shield,
  SlidersHorizontal,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { demoUser } from "@/lib/data/demo";

const items = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/alerts", label: "Alerts", icon: Bell },
  { href: "/dashboard/transactions", label: "Transactions", icon: Activity },
  { href: "/dashboard/contracts", label: "Contracts", icon: FileText },
  { href: "/dashboard/rules", label: "Rules", icon: SlidersHorizontal },
  { href: "/dashboard/integrations", label: "Integrations", icon: Link2 },
  { href: "/dashboard/analytics", label: "Analytics", icon: GitBranch },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/session", { method: "DELETE" });
    router.push("/");
    router.refresh();
  }

  return (
    <aside className="flex h-full flex-col bg-sidebar/80">
      <div className="flex h-16 items-center px-5">
        <Link href="/dashboard" onClick={onNavigate}>
          <Logo />
        </Link>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-2">
        {items.map((item) => {
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                active
                  ? "bg-gold/12 text-foreground ring-1 ring-gold/25"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/8 p-4">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-full bg-gold/15 text-xs font-semibold text-gold">
            JH
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm">{demoUser.name}</p>
            <p className="truncate text-xs text-muted-foreground">{demoUser.company}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-protect">
          <Shield className="size-3.5" />
          Demo mode
        </div>
        <Button variant="ghost" className="mt-2 w-full justify-start" onClick={() => void logout()}>
          <LogOut />
          Sign out
        </Button>
      </div>
    </aside>
  );
}
