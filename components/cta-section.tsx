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
    <section className="section cta">
      <h2>{title}</h2>
      <p>{text}</p>
      <p>
        <Link className="cta-button" href={resolvedHref}>
          {label}
        </Link>
      </p>
    </section>
  );
}
