# .LOUPE Demo- und Sales-Hub

Web-first Demo- und Sales-Hub fuer `.LOUPE`, gebaut fuer wartungsarmen Betrieb mit robustem Screenshot-Contract, stabilen Placeholdern und Print-/PDF-faehigen Ansichten.

## Architektur

- Next.js (App Router) + TypeScript (strict)
- Content im Repo (`content/**/*.md` mit YAML-Frontmatter)
- Zentrale Screenshot-Quelle: `content/screenshot-contract.ts`
- Robuste Screenshot-Komponente mit Dateiexistenz-Pruefung
- Playwright-Capture-Pipeline mit Mapping und TODO-Reporting

## Voraussetzungen

- Node.js 20+
- npm 9+

## Setup

```bash
npm install
npm run content:validate
npm run screenshots:validate
npm run dev
```

App lokal: `http://localhost:3000`

## ENV

| Variable | Zweck | Pflicht |
|---|---|---|
| `LOUPE_CTA_URL` | Primaerer CTA-Link (Fallback: `/kontakt`) | Nein |
| `LOUPE_CAPTURE_BASE_URL` | Basis-URL fuer Playwright-Capture | Nur fuer Capture mit konfigurierten Slots |
| `LOUPE_CAPTURE_STORAGE_STATE_PATH` | Pfad zur Playwright-`storageState`-Datei | Nur fuer Capture mit konfigurierten Slots |

Beispiel `.env.local`:

```bash
LOUPE_CTA_URL=https://example.com/demo
LOUPE_CAPTURE_BASE_URL=http://127.0.0.1:3000
LOUPE_CAPTURE_STORAGE_STATE_PATH=/absolute/path/to/storage-state.json
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run test
npm run content:validate
npm run screenshots:validate
npm run screenshots:capture
```

## Screenshot-Contract und Placeholder-Logik

- Der Contract enthaelt **exakt 17 freigegebene Slots** (keine Erweiterungen).
- `Task Room` hat in v1 bewusst **keinen** Screenshot-Slot.
- `SalesScreenshot` rendert nur reale Assets; sonst neutralen Placeholder mit Slot-ID, Titel und Status.
- Fehlende Assets fuehren nicht zu gebrochenen Bildpfaden und nicht zu Build-Fehlern.
- Verbindliche Regeln und Guardrails: `docs/screenshots.md`.

## Print-/PDF-Ansichten

- Module: `/print/module/[slug]`
- Use Cases: `/print/use-cases/[slug]`
- Print-CSS sorgt fuer stabile Karten, Placeholder und Layout bei Browser-Export nach PDF.

## Railway Deployment

Empfohlene Railway-Konfiguration:

- Build Command: `npm run build`
- Start Command: `npm run start`
- Node Version: `20.x`
- Optional ENV setzen (`LOUPE_CTA_URL`)

Die App bleibt stateless und nutzt keine Railway-spezifische Runtime-Logik.

## AWS-Faehigkeit

- Keine tief eingebetteten Railway-Abhaengigkeiten
- Konfiguration rein ueber ENV
- Build/Start kompatibel mit containerisiertem oder managed Node-Deployment

## Repo-Struktur

```text
app/
components/
content/
docs/
lib/
public/assets/screenshots/
scripts/
tests/
```
