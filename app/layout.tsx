import type { Metadata } from "next";
import "@/app/globals.css";
import { SiteHeader } from "@/components/site-header";
import { getPrimaryCtaUrl } from "@/lib/env";

export const metadata: Metadata = {
  title: ".LOUPE Demo- und Sales-Hub",
  description:
    "Sales-fokussierter, wartungsarmer Hub fuer .LOUPE mit robustem Screenshot-Contract und Print-Ansichten."
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  const ctaHref = getPrimaryCtaUrl();

  return (
    <html lang="de">
      <body>
        <SiteHeader ctaHref={ctaHref} />
        <main className="page-shell">{children}</main>
      </body>
    </html>
  );
}
