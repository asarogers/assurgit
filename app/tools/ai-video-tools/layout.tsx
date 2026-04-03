import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Video Tool Rankings 2026 — Best AI Video Services Compared | Assurgit",
  description:
    "The most comprehensive ranking of AI video tools for businesses. Compare avatar quality, voice cloning, script writing, publishing automation, and pricing across 13 tools.",
  openGraph: {
    title: "AI Video Tool Rankings 2026 — Best AI Video Services Compared",
    description: "Score and compare 13 AI video tools by avatar quality, ease of use, publishing automation, and value for money.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
