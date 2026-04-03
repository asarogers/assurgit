import type { Metadata } from "next";
import { AdminNav } from "@/components/AdminNav";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      <main>{children}</main>
    </div>
  );
}
