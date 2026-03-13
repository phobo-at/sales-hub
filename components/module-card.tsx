import Link from "next/link";
import type { ModuleContent } from "@/lib/types";
import { OlexBadge } from "@/components/olex-badge";
import { getOlexSignal } from "@/lib/olex";

interface ModuleCardProps {
  module: ModuleContent;
}

export function ModuleCard({ module }: ModuleCardProps): JSX.Element {
  const olexSignal = getOlexSignal(module.slug);

  return (
    <article className="card module-card">
      <div className="module-card__header">
        <div className="module-card__eyebrow-row">
          <span className="eyebrow">Modul</span>
          {olexSignal ? <OlexBadge tone="soft" /> : null}
        </div>
        <h3>{module.title}</h3>
        <p className="module-card__summary">{module.shortDescription}</p>
      </div>

      <div className="module-card__highlight surface-card surface-card--soft">
        <span>Kernnutzen</span>
        <strong>{module.benefits[0]}</strong>
      </div>

      <div className="tag-list" aria-label="Zielgruppen">
        {module.targetGroups.map((targetGroup) => (
          <span key={targetGroup} className="tag">
            {targetGroup}
          </span>
        ))}
      </div>

      <div className="module-card__footer">
        <p>{olexSignal ? olexSignal.highlightTitle : module.features[0]}</p>
        <Link className="link-inline" href={`/module/${module.slug}`}>
          Zum Modul
        </Link>
      </div>
    </article>
  );
}
