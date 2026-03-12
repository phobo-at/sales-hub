import Link from "next/link";

const links = [
  { href: "/", label: "Start" },
  { href: "/module/whistleblowing", label: "Whistleblowing" },
  { href: "/module/policy-navigator", label: "Policy Navigator" },
  { href: "/module/risk", label: "Risk" },
  { href: "/module/integrity-check", label: "Integrity Check" },
  { href: "/module/dawn-raids", label: "Dawn Raids" },
  { href: "/module/business-partner", label: "Business Partner" },
  { href: "/module/task-room", label: "Task Room" }
];

export function SiteHeader(): JSX.Element {
  return (
    <header className="site-header no-print">
      <div className="site-header__inner">
        <Link href="/" className="site-header__brand">
          .LOUPE Demo & Sales Hub
        </Link>
        <nav className="site-header__nav" aria-label="Hauptnavigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
