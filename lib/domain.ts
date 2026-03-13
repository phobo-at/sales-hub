export const MODULE_IDS = [
  "whistleblowing",
  "policy-navigator",
  "risk",
  "integrity-check",
  "dawn-raids",
  "business-partner",
  "task-room"
] as const;

export type ModuleId = (typeof MODULE_IDS)[number];

export const USE_CASE_SLUGS = [
  "hinweise-sicher-erfassen-und-bearbeiten",
  "richtlinien-verstehen-und-bestaetigen"
] as const;

export type UseCaseSlug = (typeof USE_CASE_SLUGS)[number];

export function parseModuleId(slug: string): ModuleId | null {
  return (MODULE_IDS as readonly string[]).includes(slug) ? (slug as ModuleId) : null;
}

export function parseUseCaseSlug(slug: string): UseCaseSlug | null {
  return (USE_CASE_SLUGS as readonly string[]).includes(slug) ? (slug as UseCaseSlug) : null;
}
