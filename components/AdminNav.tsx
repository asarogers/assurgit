"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Share2, BarChart2, BookOpen, Database, CreditCard, Mail, LogOut } from "lucide-react";

const NAV_ITEMS = [
  { href: "/terminal",                 label: "Projects",  icon: LayoutGrid },
  { href: "/social",                   label: "Social",    icon: Share2 },
  { href: "/analytics",                label: "Analytics", icon: BarChart2 },
  { href: "/database",                 label: "Database",  icon: Database },
  { href: "/billing",                  label: "Billing",   icon: CreditCard },
  { href: "/billing/email-template",   label: "Email",     icon: Mail },
  { href: "/guide",                    label: "Guide",     icon: BookOpen },
];

export function AdminNav() {
  const pathname = usePathname();

  // Pick the most-specific matching tab so that nested routes (e.g.
  // /billing/email-template) don't also light up their parent (/billing).
  const activeHref =
    [...NAV_ITEMS]
      .map((it) => it.href)
      .filter((href) => pathname === href || pathname.startsWith(href + "/"))
      .sort((a, b) => b.length - a.length)[0] ?? "";

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
            const active = href === activeHref;
            return (
              <Link key={href} href={href}>
                <Button
                  size="sm"
                  variant={active ? "secondary" : "ghost"}
                  className="h-8 text-xs gap-1.5 px-2 md:px-3"
                  aria-label={label}
                  title={label}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span className="hidden md:inline">{label}</span>
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
