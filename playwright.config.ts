import { defineConfig } from "playwright/test";

const baseURL = process.env.SCREENSHOT_BASE_URL ?? process.env.LOUPE_CAPTURE_BASE_URL;

export default defineConfig({
  use: {
    baseURL: baseURL && baseURL.trim().length > 0 ? baseURL : undefined,
    browserName: "chromium",
    headless: true
  }
});
