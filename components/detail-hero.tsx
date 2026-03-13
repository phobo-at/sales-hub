import React from "react";
import Link from "next/link";

interface DetailHeroMetaItem {
  label: string;
  value: string;
}

interface DetailHeroCrumb {
  label: string;
  href?: string;
}

interface DetailHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  breadcrumbs: DetailHeroCrumb[];
  meta: DetailHeroMetaItem[];
  badges?: React.ReactNode;
  actions?: React.ReactNode;
  aside?: React.ReactNode;
}

export function DetailHero({
  eyebrow,
  title,
  subtitle,
  description,
  problem,
  breadcrumbs,
  meta,
  badges,
  actions,
  aside
}: DetailHeroProps): JSX.Element {
  return (
    <section className="hero detail-hero">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <ol>
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <li key={`${crumb.label}-${index}`} className="breadcrumb__item">
                {crumb.href && !isLast ? (
                  <Link href={crumb.href} className="breadcrumb__link">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current={isLast ? "page" : undefined}>{crumb.label}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="detail-hero__grid">
        <div className="detail-hero__content">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p className="hero__subtitle">{subtitle}</p>
          <p className="hero__lead">{description}</p>
          {actions ? <div className="hero__actions">{actions}</div> : null}
          {badges ? <div className="hero__badges">{badges}</div> : null}
          <div className="hero__problem surface-card surface-card--soft">
            <span className="hero__problem-label">Ausgangslage</span>
            <p>{problem}</p>
          </div>
        </div>

        <aside className="detail-hero__aside surface-card surface-card--floating">
          <div className="detail-hero__meta-grid">
            {meta.map((item) => (
              <div key={item.label} className="detail-hero__meta-item">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
          {aside}
        </aside>
      </div>
    </section>
  );
}
