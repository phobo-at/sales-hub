import Link from "next/link";
import type { ModuleContent } from "@/lib/types";

interface ModuleCardProps {
  module: ModuleContent;
}

export function ModuleCard({ module }: ModuleCardProps): JSX.Element {
  return (
    <article className="card module-card">
      <h3>{module.title}</h3>
      <p>{module.shortDescription}</p>
      <div className="tag-list" aria-label="Zielgruppen">
        {module.targetGroups.map((targetGroup) => (
          <span key={targetGroup} className="tag">
            {targetGroup}
          </span>
        ))}
      </div>
      <Link className="link-inline" href={`/module/${module.slug}`}>
        Zum Modul
      </Link>
    </article>
  );
}
