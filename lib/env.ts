const DEFAULT_CTA_PATH = "/kontakt";

export function getPrimaryCtaUrl(override?: string): string {
  if (override) {
    return override;
  }

  const fromEnv = process.env.LOUPE_CTA_URL;
  if (fromEnv && fromEnv.trim().length > 0) {
    return fromEnv;
  }

  return DEFAULT_CTA_PATH;
}

export function getCaptureBaseUrl(): string {
  const value = process.env.LOUPE_CAPTURE_BASE_URL;
  if (!value) {
    throw new Error("LOUPE_CAPTURE_BASE_URL ist nicht gesetzt.");
  }

  return value;
}

export function getCaptureStorageStatePath(): string {
  const value = process.env.LOUPE_CAPTURE_STORAGE_STATE_PATH;
  if (!value) {
    throw new Error("LOUPE_CAPTURE_STORAGE_STATE_PATH ist nicht gesetzt.");
  }

  return value;
}
