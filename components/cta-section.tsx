import Link from "next/link";
import { getPrimaryCtaUrl } from "@/lib/env";

interface CtaSectionProps {
  title: string;
  text: string;
  label: string;
  href?: string;
}

export function CtaSection({ title, text, label, href }: CtaSectionProps): JSX.Element {
  const resolvedHref = getPrimaryCtaUrl(href);

  return (
    <section className="section section--accent cta">
      <div className="cta__content">
        <span className="eyebrow">Sales next step</span>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <div className="cta__actions">
        <Link className="cta-button" href={resolvedHref}>
          {label}
        </Link>
        <p className="cta__note">Optional mit individueller Agenda, Fokusmodulen und Live-Fragerunde.</p>
      </div>
    </section>
  );
}
