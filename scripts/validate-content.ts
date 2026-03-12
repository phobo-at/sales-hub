import { validateContent } from "@/lib/content-loader";

async function main(): Promise<void> {
  await validateContent();
  console.log("Content-Validierung erfolgreich.");
}

main().catch((error: unknown) => {
  console.error("Content-Validierung fehlgeschlagen.");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
