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
