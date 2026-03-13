/**
 * Prüft alle Screenshot-Slots im Contract gegen das public/-Verzeichnis
 * und meldet Diskrepanzen zwischen status-Feld und tatsächlicher Dateipräsenz.
 *
 * Ausführen: npx tsx scripts/sync-screenshot-status.ts
 */
import fs from "node:fs/promises";
import path from "node:path";
import { SCREENSHOT_CONTRACT } from "@/content/screenshot-contract";

const PUBLIC_DIR = path.join(process.cwd(), "public");

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function main(): Promise<void> {
  let hasDiscrepancy = false;

  console.log("Screenshot-Status-Abgleich\n");

  for (const slot of SCREENSHOT_CONTRACT) {
    if (!slot.assetPath) {
      if (slot.status === "available") {
        console.warn(`⚠  ${slot.id}: status=available aber kein assetPath gesetzt`);
        hasDiscrepancy = true;
      }
      continue;
    }

    const absolutePath = path.join(PUBLIC_DIR, slot.assetPath.replace(/^\//, ""));
    const exists = await fileExists(absolutePath);

    if (exists && slot.status !== "available") {
      console.warn(
        `⚠  ${slot.id}: Datei vorhanden, aber status="${slot.status}" — bitte auf "available" setzen`
      );
      hasDiscrepancy = true;
    } else if (!exists && slot.status === "available") {
      console.error(
        `✗  ${slot.id}: status="available" aber Datei fehlt: ${slot.assetPath}`
      );
      hasDiscrepancy = true;
    } else {
      const icon = exists ? "✓" : "·";
      console.log(`${icon}  ${slot.id} (${slot.status})`);
    }
  }

  console.log("\n" + (hasDiscrepancy ? "Diskrepanzen gefunden — Contract anpassen." : "Alles konsistent."));

  if (hasDiscrepancy) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
