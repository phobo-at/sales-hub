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
  const primary = process.env.SCREENSHOT_BASE_URL?.trim();
  if (primary) {
    return primary;
  }

  const fallback = process.env.LOUPE_CAPTURE_BASE_URL?.trim();
  if (fallback) {
    return fallback;
  }

  throw new Error("SCREENSHOT_BASE_URL ist nicht gesetzt (Fallback: LOUPE_CAPTURE_BASE_URL).");
}

export function getCaptureStorageStatePath(): string | null {
  const primary = process.env.SCREENSHOT_STORAGE_STATE_PATH?.trim();
  if (primary) {
    return primary;
  }

  const fallback = process.env.LOUPE_CAPTURE_STORAGE_STATE_PATH?.trim();
  if (fallback) {
    return fallback;
  }

  return null;
}

export interface ScreenshotAuthCredentials {
  username: string;
  password: string;
}

export function getScreenshotAuthCredentials(): ScreenshotAuthCredentials | null {
  const username = process.env.SCREENSHOT_AUTH_USER?.trim();
  const password = process.env.SCREENSHOT_AUTH_PASSWORD?.trim();

  if (!username && !password) {
    return null;
  }

  if (!username || !password) {
    throw new Error(
      "SCREENSHOT_AUTH_USER und SCREENSHOT_AUTH_PASSWORD müssen gemeinsam gesetzt werden."
    );
  }

  return { username, password };
}
