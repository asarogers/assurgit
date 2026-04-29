import { LogoPreviewGrid } from "@/components/LogoConcepts";

export const dynamic = 'force-static'

export const metadata = { title: "Logo Preview", alternates: {
    canonical: 'https://wellpreppedlife.com/logo-preview',
  },
};

export default function LogoPreviewPage() {
  return <LogoPreviewGrid />;
}
