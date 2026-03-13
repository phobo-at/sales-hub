import Link from "next/link";
import { OlexBadge } from "@/components/olex-badge";
import { getOlexSignal } from "@/lib/olex";
import type { ModuleContent } from "@/lib/types";

interface ModuleCardProps {
  module: ModuleContent;
  index?: number;
}

export function ModuleCard({ module, index }: ModuleCardProps): JSX.Element {
  const olexSignal = getOlexSignal(module.slug);
  const moduleNumber = index !== undefined ? String(index + 1).padStart(2, "0") : null;

  return (
    <Link href={`/module/${module.slug}`} className="card module-card">
      <div className="module-card__top-row">
        {moduleNumber !== null ? (
          <span className="module-card__index" aria-hidden="true">
            {moduleNumber}
          </span>
        ) : null}
        {olexSignal ? <OlexBadge tone="soft" /> : null}
      </div>

      <div className="module-card__header">
        <h3>{module.title}</h3>
        <p className="module-card__summary">{module.shortDescription}</p>
      </div>

      <div className="module-card__benefit">
        <span className="module-card__benefit-label">Kernnutzen</span>
        <strong>{module.benefits[0]}</strong>
      </div>

      <div className="module-card__footer">
        <div className="tag-list">
          {module.targetGroups.map((targetGroup) => (
            <span key={targetGroup} className="tag">
              {targetGroup}
            </span>
          ))}
        </div>
        <span className="module-card__cta" aria-hidden="true">
          Modul ansehen →
        </span>
      </div>
    </Link>
  );
}
