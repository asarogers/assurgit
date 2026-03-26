"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Share2, BarChart2, BookOpen, LogOut } from "lucide-react";

const NAV_ITEMS = [
  { href: "/terminal",  label: "Projects",   icon: LayoutGrid },
  { href: "/social",    label: "Social",     icon: Share2 },
  { href: "/analytics", label: "Analytics",  icon: BarChart2 },
  { href: "/guide",     label: "Guide",      icon: BookOpen },
];

export function AdminNav() {
  const pathname = usePathname();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <div className="border-b bg-card sticky top-0 z-20">
      <div className="max-w-5xl mx-auto px-4 h-12 flex items-center justify-between">
        {/* Brand */}
        <span className="font-mono text-sm font-bold tracking-tight">Assurgit</span>

        {/* Nav links */}
        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link key={href} href={href}>
                <Button
                  size="sm"
                  variant={active ? "secondary" : "ghost"}
                  className="h-8 text-xs gap-1.5"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={logout}>
          <LogOut className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
