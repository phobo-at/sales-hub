# Demo- und Sales-Hub: Architektur und Betrieb

## Zielbild

Der Hub ersetzt statische, screenshot-lastige Präsentationen durch eine strukturierte, wartungsarme Web-Anwendung mit klarer Sales-/Outcome-Kommunikation.

## Architekturentscheidungen

1. Next.js + TypeScript
- App Router liefert klare Seitentrennung für Start, Module, Use Cases und Print.
- Strict TypeScript erzwingt konsistente Content- und Contract-Strukturen.

2. Content als Markdown + YAML-Frontmatter
- Einfache Pflege im Repository ohne CMS.
- Typsichere Loader/Validatoren verhindern inkonsistente Inhalte.

3. Harter Screenshot-Contract
- `content/screenshot-contract.ts` ist die einzige Quelle für v1-Slots.
- Es existieren exakt die freigegebenen 17 Slot-IDs.
- Pflichtfelder je Slot: `id`, `module`, `title`, `purpose`, `caption`, `status`, `assetPath`, `sourceNote`.

4. Robuste Screenshot-Darstellung
- Komponente `components/SalesScreenshot.tsx` prüft Asset-Existenz serverseitig.
- Bei fehlendem Asset wird ein neutraler Placeholder statt eines defekten Bildpfads angezeigt.
- Placeholder zeigt Slot-ID, Status und Metadaten.

5. Capture-Pipeline
- `scripts/capture-screenshots.ts` liest Contract + Manifest.
- Manifest liegt in `content/screenshot-manifest.ts`.
- Mapping liegt in `content/screenshot-capture-mapping.ts`.
- TODO-Einträge sind erlaubt und werden explizit reportet.
- Doppelte oder fehlende Slot-Mappings sind harte Fehler.

## Content Governance

- Module und Use Cases werden nur über `content/**/*.md` gepflegt.
- Validierung (`npm run content:validate`) prüft:
  - alle Pflichtfelder,
  - exakte Modul-/Use-Case-Abdeckung,
  - Screenshot-Referenzen nur aus freigegebenem Katalog,
  - harte No-Screenshot-Regel für `task-room`.

## Print- und Export-Verhalten

- Dedizierte Print-Routen unter `/print/...`.
- Print-CSS reduziert visuelle Störfaktoren und stabilisiert Umbrüche.
- Screenshot-Placeholder bleiben auch im PDF-/Print-Export konsistent lesbar.

## Betriebsmodus

1. Content anpassen (Markdown)
2. Validieren (`content:validate`, `screenshots:validate`)
3. Lokal prüfen (`dev`)
4. Build (`build`) und Deploy

## Noch offene Asset-Arbeit

Der Pilot für Whistleblowing (3 Slots) ist auf echte, automatisierbare Capture-Routen verdrahtet. Die restlichen freigegebenen Slots müssen schrittweise in das Manifest übernommen und dann über die gleiche Pipeline erzeugt werden.

## UI-Refresh März 2026

- Das visuelle System nutzt jetzt klarer gestaffelte Surfaces, weiße Default-Cards, stärkere Typografie und eine route-aware Navigation mit separater Modul-Rail.
- `.LOUPE Olex` ist als ruhige KI-Ebene in Header, Startseite, Whistleblowing und Policy Navigator sichtbar integriert.
- Neue wiederverwendbare UI-Bausteine:
  - `OlexBadge`
  - `OlexCallout`
  - `AiAssistHighlight`
- Olex-Badges in Screenshot-Karten werden explizit über Slot-IDs gesteuert, nicht über heuristische Textsuche.
- Sichtbare Olex-Copy wurde auf `.LOUPE Olex` vereinheitlicht; technische Slot-IDs und Contract-Grenzen bleiben unverändert.
