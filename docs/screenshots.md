# Screenshot-Contract v1

## Ziel

Der Screenshot-Contract ist redaktionell fixiert. Der Hub darf nur mit dem freigegebenen v1-Katalog arbeiten. Erweiterungen ausserhalb dieses Katalogs sind nicht erlaubt.

## Zentrale Quelle

- Runtime Source of Truth: `content/screenshot-contract.ts`
- Technische Capture-Konfiguration: `content/screenshot-manifest.ts`
- Ableitung fuer 1:1-Slot-Abdeckung: `content/screenshot-capture-mapping.ts`
- Der Katalog umfasst exakt 17 Slots.
- `task-room` hat in v1 bewusst keinen Screenshot-Slot.

## Slot-Katalog (v1)

### Whistleblowing
- `whistleblowing-inbox`
- `whistleblowing-case-detail-ai`
- `whistleblowing-summary-ai`

### Risk
- `risk-overview-visualization`
- `risk-register-measures`
- `risk-assessment-questionnaire`

### Integrity Check
- `integrity-check-home-categories`
- `integrity-check-request-form`
- `integrity-check-questionnaire`

### Policy Navigator
- `policy-navigator-overview`
- `policy-navigator-olex-qa`
- `policy-navigator-read-confirmation`

### Dawn Raids
- `dawn-raids-alert-portal`
- `dawn-raids-incident-documentation`

### Business Partner
- `business-partner-overview-risk`
- `business-partner-profile-detail`
- `business-partner-questionnaire`

## Typsicheres Modell

Jeder Slot ist als `ScreenshotContractItem` typisiert und enthaelt mindestens:

- `id`
- `module`
- `title`
- `purpose`
- `caption`
- `status`
- `assetPath` (`string | null`)
- `sourceNote`

Hinweis zu `assetPath`:
- `null` ist erlaubt und bedeutet: valider Contract-Eintrag ohne hinterlegtes Asset.
- Wenn `assetPath` gesetzt ist, muss er mit `/assets/screenshots/` beginnen.

## Contract <-> Manifest <-> Mapping

- Der Contract definiert die erlaubten Slot-IDs und finalen Asset-Pfade.
- Das Manifest definiert nur capture-faehige Slots mit technischen Angaben:
  - `id`, `module`, `route`, `viewport`, `waitFor`, `output`
  - optional `requiresAuth`, `tags`
- Das Mapping bleibt 1:1 ueber alle 17 Slots und wird aus Contract + Manifest abgeleitet:
  - Manifest-Slots sind konfiguriert (`path`, `readySelector`, `clipSelector`).
  - Nicht konfigurierte Slots bleiben explizit `todo`.

Pilot-Status:
- 3 konfigurierte Slots (Whistleblowing)
- 14 TODO-Slots

## Viewports

Zentrale Presets in `content/screenshot-manifest.ts`:

- `productStandard`: `1440x900`
- `heroWide`: `1600x900`
- `detail`: `1280x960`

Pilot-Zuordnung:

- `whistleblowing-inbox` -> `heroWide`
- `whistleblowing-case-detail-ai` -> `detail`
- `whistleblowing-summary-ai` -> `productStandard`

## Screenshot-Routen (Pilot)

- `/marketing/whistleblowing/inbox`
- `/marketing/whistleblowing/case-detail-ai`
- `/marketing/whistleblowing/summary-ai`

Alle Capture-Routen liefern:

- stabilen Ready Marker: `data-testid="screen-ready"`
- stabilen Canvas-Container: `data-testid="screen-canvas"`
- kuratierte Demo-Daten ohne Produktionsabhaengigkeit

## Helper-API

Die zentrale Helper-API liegt in `lib/screenshot-helpers.ts`:

- `getScreenshotsByModule(module)`
- `getHeroScreenshot(module)`
- `getProofScreenshots(module)`
- `getDifferentiatorScreenshot(module)`

Verhalten:
- Fuer `task-room` liefern die Helper immer `[]` bzw. `null`.
- `hasScreenshotAsset(assetPath)` ist null-/undefined-sicher und gibt bei ungueltigem oder fehlendem Asset `false` zurueck.

## Validierungsregeln

`lib/screenshot-validation.ts` erzwingt:

- keine duplicate Slot-ID
- kein unbekanntes Modul
- kein unbekannter Purpose
- kein Slot fuer `task-room`
- jedes Modul mit Screenshots hat genau einen `hero`
- keine zusaetzlichen Slots ausserhalb der Whitelist
- keine fehlenden Slots aus der Whitelist
- Manifest enthaelt keine unbekannten oder doppelten IDs
- Manifest-`module` muss zum Contract passen
- Manifest-`output` muss exakt dem Contract-`assetPath` entsprechen
- Capture-Mapping hat pro Slot genau einen Eintrag
- Capture-Mapping enthaelt keine Fremd-Slots
- konfigurierte Mapping-Eintraege muessen exakt Manifest-Werte nutzen

## Placeholder-Verhalten

`components/SalesScreenshot.tsx` rendert einen Placeholder statt eines defekten Bilds, wenn:

- `assetPath` `null` ist
- der Pfad ungueltig ist
- die Datei nicht existiert

Damit bleibt die UI stabil und crasht nicht bei fehlenden Assets.

## Lokaler Capture-Flow

ENV (bevorzugt):

- `SCREENSHOT_BASE_URL` (Pflicht fuer Capture)
- optional `SCREENSHOT_AUTH_USER` + `SCREENSHOT_AUTH_PASSWORD`
- optional `SCREENSHOT_STORAGE_STATE_PATH`

Legacy-Fallback:

- `LOUPE_CAPTURE_BASE_URL`
- `LOUPE_CAPTURE_STORAGE_STATE_PATH`

Kommandos:

```bash
npx playwright install chromium
npm run screenshots:validate
SCREENSHOT_BASE_URL=http://127.0.0.1:3000 npm run screenshots -- --module whistleblowing
SCREENSHOT_BASE_URL=http://127.0.0.1:3000 npm run screenshots -- --id whistleblowing-inbox
```

Output:

- Assets landen direkt unter `public/assets/screenshots/*.png`
- Die Hub-Ansicht nutzt vorhandene Assets automatisch statt Placeholdern

## Harte Verbote

- keine Erweiterung der Slot-Liste
- keine Auto-Discovery von Bildern aus Ordnern
- kein stilles Hinzufuegen weiterer Slots
- keine impliziten Defaults, die den Contract verwaessern
