import { validateScreenshotContractAndMapping } from "@/lib/screenshot-validation";

function main(): void {
  const report = validateScreenshotContractAndMapping();

  console.log("Screenshot-Contract validiert.");
  console.log(`Konfigurierte Capture-Slots: ${report.configuredCaptureSlots}`);
  console.log(`TODO-Capture-Slots: ${report.todoCaptureSlots}`);
}

try {
  main();
} catch (error: unknown) {
  console.error("Screenshot-Validierung fehlgeschlagen.");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
