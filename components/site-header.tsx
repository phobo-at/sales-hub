"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { OlexBadge } from "@/components/olex-badge";

const primaryLinks = [
  {
    href: "/",
    label: "Start",
    isActive: (pathname: string): boolean => pathname === "/"
  },
  {
    href: "/#use-cases",
    label: "Use Cases",
    isActive: (pathname: string): boolean => pathname.startsWith("/use-cases")
  },
  {
    href: "/kontakt",
    label: "Kontakt",
    isActive: (pathname: string): boolean => pathname === "/kontakt"
  }
] as const;

const moduleLinks = [
  { href: "/", label: "Start" },
  { href: "/module/whistleblowing", label: "Whistleblowing" },
  { href: "/module/policy-navigator", label: "Policy Navigator" },
  { href: "/module/risk", label: "Risk" },
  { href: "/module/integrity-check", label: "Integrity Check" },
  { href: "/module/dawn-raids", label: "Dawn Raids" },
  { href: "/module/business-partner", label: "Business Partner" },
  { href: "/module/task-room", label: "Task Room" }
];

interface SiteHeaderProps {
  ctaHref: string;
}

export function SiteHeader({ ctaHref }: SiteHeaderProps): JSX.Element {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = React.useState<string>("");
  const railRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const syncHash = (): void => {
      setActiveHash(window.location.hash);
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);

    return () => {
      window.removeEventListener("hashchange", syncHash);
    };
  }, [pathname]);

  React.useEffect(() => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    const activeLink = rail.querySelector<HTMLAnchorElement>('[aria-current="page"]');

    if (!activeLink) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    activeLink.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      inline: "center",
      block: "nearest"
    });
  }, [pathname]);

  return (
    <header className="site-header no-print">
      <div className="site-header__inner">
        <div className="site-header__masthead">
          <Link href="/" className="site-header__brand" aria-label=".LOUPE Demo & Sales Hub">
            <span className="site-header__brand-mark" aria-hidden="true">
              <Image
                src="/assets/brand/loupe-logo-wo-tagline.svg"
                alt=""
                width={142}
                height={54}
                className="site-header__brand-logo"
                priority
              />
            </span>
            <span className="site-header__brand-copy">
              <strong>Demo & Sales Hub</strong>
              <small>Enterprise-Compliance-Stories, demofähige Produktflächen.</small>
            </span>
          </Link>

          <div className="site-header__actions">
            <div className="site-header__signal" aria-label="KI-Signal">
              <OlexBadge tone="soft" />
              <span>KI-Ebene für geführte Demos</span>
            </div>
            <Link className="cta-button" href={ctaHref}>
              Demo anfragen
            </Link>
          </div>
        </div>

        <nav className="site-header__nav" aria-label="Primärnavigation">
          {primaryLinks.map((link) => {
            const isUseCasesAnchor = link.href === "/#use-cases";
            const isHome = link.href === "/";
            const isActive = isUseCasesAnchor
              ? pathname.startsWith("/use-cases") || (pathname === "/" && activeHash === "#use-cases")
              : isHome
                ? link.isActive(pathname) && activeHash !== "#use-cases"
                : link.isActive(pathname);

            return (
              <Link
                key={link.href}
                href={link.href}
                className="site-header__nav-link"
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="site-header__rail-row">
          <span className="site-header__rail-label">Module</span>
          <nav className="site-header__rail" aria-label="Modulnavigation" ref={railRef}>
            {moduleLinks.slice(1).map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="site-header__rail-link"
                  aria-current={isActive ? "page" : undefined}
                  data-active={isActive ? "true" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
