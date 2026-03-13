import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "@/app/globals.css";
import { SiteHeader } from "@/components/site-header";
import { getPrimaryCtaUrl } from "@/lib/env";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap"
});

export const metadata: Metadata = {
  title: ".LOUPE Demo- und Sales-Hub",
  description:
    "Sales-fokussierter, wartungsarmer Hub für .LOUPE mit robustem Screenshot-Contract und Print-Ansichten."
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  const ctaHref = getPrimaryCtaUrl();

  return (
    <html lang="de" className={ibmPlexSans.variable}>
      <body>
        <SiteHeader ctaHref={ctaHref} />
        <main className="page-shell">{children}</main>
      </body>
    </html>
  );
}
