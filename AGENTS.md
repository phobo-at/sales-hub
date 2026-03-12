# AGENTS.md fuer den `.LOUPE` Demo- und Sales-Hub

## 1) Zweck & Scope

Diese Datei definiert verbindliche Arbeitsregeln fuer KI-Agenten in diesem Repository.

Ziele:
- Konsistente Umsetzung des v1-Zielbilds fuer den Demo- und Sales-Hub.
- Schutz der bestehenden Contract- und Validierungslogik.
- Reproduzierbare Uebergaben durch feste Pruef- und Abnahmeregeln.

Scope:
- Gilt fuer das gesamte Repository.
- Fokus liegt auf Web-App, Content-Modell, Screenshot-Contract, Print-Ausgaben und zugehoerigen Validierungen.

Nicht im Scope:
- Produktseitige Backend-Implementierungen ausserhalb dieses Repos.
- Einfuehrung neuer Plattformabhaengigkeiten ohne ausdrueckliche Architekturentscheidung.

## 2) Kanonische Quellen & Prioritaet

Bei Konflikten gilt diese Prioritaet (oben gewinnt):

1. Laufzeit- und Validator-Realitaet im Code:
   - `lib/content-loader.ts`
   - `lib/screenshot-validation.ts`
   - `content/screenshot-contract.ts`
2. Weitere technische Wahrheiten:
   - `lib/domain.ts`
   - `lib/types.ts`
   - `content/screenshot-capture-mapping.ts`
3. Projektdokumentation fuer Zielbild und Betrieb:
   - `README.md`
   - `docs/demo-sales-hub.md`
   - `docs/screenshots.md`

Regel:
- Wenn Doku und Code widerspruechlich sind, ist der Code massgeblich.
- In demselben Change entweder Doku nachziehen oder den Widerspruch explizit im Uebergabetext benennen.

## 3) Architektur-Snapshot

- Stack: Next.js (App Router), React, TypeScript (`strict`), statische Generierung via `generateStaticParams`.
- Content-Quelle: `content/**/*.md` mit YAML-Frontmatter, geladen und validiert ueber Zod in `lib/content-loader.ts`.
- Domänenfixpunkte:
  - Module: `whistleblowing`, `policy-navigator`, `risk`, `integrity-check`, `dawn-raids`, `business-partner`, `task-room`
  - Use Cases: `hinweise-sicher-erfassen-und-bearbeiten`, `richtlinien-verstehen-und-bestaetigen`
- Screenshot-System:
  - Contract-Quelle: `content/screenshot-contract.ts`
  - Capture-Mapping: `content/screenshot-capture-mapping.ts`
  - Validatoren: `lib/screenshot-validation.ts`, Script `npm run screenshots:validate`
  - Rendering: `components/SalesScreenshot.tsx` mit Placeholder statt defekter Bilder
- Print-Routen:
  - `/print/module/[slug]`
  - `/print/use-cases/[slug]`
- Laufzeitkonfiguration:
  - `LOUPE_CTA_URL` optional, Fallback auf `/kontakt`
  - `LOUPE_CAPTURE_BASE_URL` und `LOUPE_CAPTURE_STORAGE_STATE_PATH` nur fuer Capture erforderlich

## 4) Harte Invarianten (v1)

Diese Regeln sind nicht verhandelbar:

1. Exakt 7 Module und exakt 2 Use Cases gemaess `lib/domain.ts`.
2. Exakt 17 freigegebene Screenshot-Slots gemaess `SCREENSHOT_SLOT_IDS`.
3. Kein Screenshot-Slot fuer `task-room` (weder im Contract noch im Modul-Content).
4. Pro Modul mit Screenshots genau ein `hero`-Slot.
5. Keine Slot-Auto-Discovery aus Dateisystemordnern.
6. Kein stilles Hinzufuegen, Entfernen oder Umbenennen von Slot-IDs.
7. Capture-Mapping enthaelt pro freigegebenem Slot genau einen Eintrag; keine Fremd-Slots, keine Duplikate.
8. `assetPath` ist entweder `null` oder beginnt mit `/assets/screenshots/`.
9. Fehlende Assets duerfen die UI nicht brechen: Placeholder ist Pflichtverhalten.

## 5) Arbeitsregeln fuer Agenten

- Nur zielgerichtete, kleine Aenderungen vornehmen und bestehende Invarianten aktiv schuetzen.
- Bei Content-Aenderungen ausschliesslich ueber die bestehenden Frontmatter-Modelle arbeiten.
- Bei Screenshot-Aenderungen Contract, Mapping, Validatoren und Tests konsistent halten.
- Keine harten externen Runtime-Abhaengigkeiten einfuehren (Hub muss stateless und lokal lauffaehig bleiben).
- CTA- und Capture-ENV-Verhalten respektieren:
  - CTA ohne ENV muss weiterhin auf `/kontakt` funktionieren.
  - Capture darf ENV voraussetzen, normale App-Pfade nicht.
- Keine Aenderungen an `node_modules/`, `.next/` oder anderen Build-Artefakten als Teil fachlicher Anpassungen.
- Bei Konflikten zwischen Zielbild und Implementierung zuerst Invariante/Validator lesen, erst dann Doku anpassen.

## 6) Aenderungs-Playbooks

### A) Content-only Aenderung

Wann:
- Texte, Story-Schritte, Benefits, Proof Points, CTA-Labels oder Use-Case-Beschreibungen werden angepasst.

Vorgehen:
1. Nur relevante Dateien unter `content/site/`, `content/modules/`, `content/use-cases/` aendern.
2. Slugs, Modulzuordnungen und Screenshot-Referenzen strikt gemaess erlaubten Enum-/Contract-Werten halten.
3. Bei `task-room` `screenshots: []` beibehalten.

Verpflichtende Pruefungen:
- `npm run content:validate`
- `npm run screenshots:validate`

Abbruchkriterien:
- Frontmatter verletzt Schema.
- Screenshot-Referenzen sind nicht contract-konform.
- `task-room` enthaelt Screenshots.

### B) Screenshot-Contract / Mapping Aenderung

Wann:
- Anpassung von Metadaten, Status, Captions, Asset-Pfaden oder Capture-Konfiguration bestehender v1-Slots.

Vorgehen:
1. Contract in `content/screenshot-contract.ts` bearbeiten, ohne Slot-Liste zu erweitern.
2. Mapping in `content/screenshot-capture-mapping.ts` synchron halten.
3. Bei geaendertem Verhalten zu Placeholder/Helpern passende Tests mitziehen.
4. Doku (`docs/screenshots.md`, ggf. `README.md`) nur nachziehen, wenn technische Wahrheit geaendert wurde.

Verpflichtende Pruefungen:
- `npm run screenshots:validate`
- `npm run test`

Abbruchkriterien:
- Bedarf fuer neue oder entfernte Slot-ID (v2-Entscheidung erforderlich).
- Mapping ist nicht 1:1 zum Slot-Katalog.
- Validatoren schlagen fehl.

### C) UI- / Routen-Aenderung

Wann:
- Aenderungen an Seiten, Komponenten, Styling oder Print-Darstellungen.

Vorgehen:
1. Routing-Konsistenz mit `lib/domain.ts` und `generateStaticParams` sicherstellen.
2. Placeholder-Verhalten in `SalesScreenshot` niemals regressiv machen (keine defekten Bildpfade).
3. Print-Ansichten unter `/print/...` weiterhin funktionsgleich und stabil halten.

Verpflichtende Pruefungen:
- `npm run lint`
- `npm run test`
- `npm run build`

Abbruchkriterien:
- Statische Param-Generierung deckt nicht mehr alle erlaubten Slugs ab.
- Fehlende Assets fuehren zu defekten UI-Ausgaben statt Placeholder.
- Build oder Tests schlagen fehl.

## 7) Pflicht-Validierung vor Uebergabe

Vor jeder Uebergabe in genau dieser Reihenfolge ausfuehren:

1. `npm run content:validate`
2. `npm run screenshots:validate`
3. `npm run lint`
4. `npm run test`
5. `npm run build`

Regel:
- Bei einem Fehler sofort stoppen, Ursache beheben, komplette Sequenz erneut starten.
- Keine Uebergabe mit roten Checks.

## 8) Definition of Done

Ein Change ist nur dann fertig, wenn:

1. Alle Pflichtchecks aus Abschnitt 7 sind gruen.
2. Keine harte v1-Invariante verletzt ist.
3. Aenderungen konsistent zu Zielbild und Ist-Architektur sind.
4. Technische Wahrheit und Dokumentation nicht im Widerspruch stehen (oder Widerspruch explizit dokumentiert ist).
5. Keine unbeabsichtigten Seiteneffekte ausserhalb des beabsichtigten Aenderungsscope enthalten sind.
