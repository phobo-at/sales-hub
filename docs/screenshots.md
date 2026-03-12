# Screenshot-Contract v1

## Ziel

Der Screenshot-Contract ist redaktionell fixiert. Der Hub darf nur mit dem freigegebenen v1-Katalog arbeiten. Erweiterungen ausserhalb dieses Katalogs sind nicht erlaubt.

## Zentrale Quelle

- Runtime Source of Truth: `content/screenshot-contract.ts`
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
- Capture-Mapping hat pro Slot genau einen Eintrag
- Capture-Mapping enthaelt keine Fremd-Slots

## Placeholder-Verhalten

`components/SalesScreenshot.tsx` rendert einen Placeholder statt eines defekten Bilds, wenn:

- `assetPath` `null` ist
- der Pfad ungueltig ist
- die Datei nicht existiert

Damit bleibt die UI stabil und crasht nicht bei fehlenden Assets.

## Harte Verbote

- keine Erweiterung der Slot-Liste
- keine Auto-Discovery von Bildern aus Ordnern
- kein stilles Hinzufuegen weiterer Slots
- keine impliziten Defaults, die den Contract verwaessern
