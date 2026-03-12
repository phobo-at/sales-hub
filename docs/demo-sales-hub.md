# Demo- und Sales-Hub: Architektur und Betrieb

## Zielbild

Der Hub ersetzt statische, screenshot-lastige Praesentationen durch eine strukturierte, wartungsarme Web-Anwendung mit klarer Sales-/Outcome-Kommunikation.

## Architekturentscheidungen

1. Next.js + TypeScript
- App Router liefert klare Seitentrennung fuer Start, Module, Use Cases und Print.
- Strict TypeScript erzwingt konsistente Content- und Contract-Strukturen.

2. Content als Markdown + YAML-Frontmatter
- Einfache Pflege im Repository ohne CMS.
- Typsichere Loader/Validatoren verhindern inkonsistente Inhalte.

3. Harter Screenshot-Contract
- `content/screenshot-contract.ts` ist die einzige Quelle fuer v1-Slots.
- Es existieren exakt die freigegebenen 17 Slot-IDs.
- Pflichtfelder je Slot: `id`, `module`, `title`, `purpose`, `caption`, `status`, `assetPath`, `sourceNote`.

4. Robuste Screenshot-Darstellung
- Komponente `components/SalesScreenshot.tsx` prueft Asset-Existenz serverseitig.
- Bei fehlendem Asset wird ein neutraler Placeholder statt eines defekten Bildpfads angezeigt.
- Placeholder zeigt Slot-ID, Status und Metadaten.

5. Capture-Pipeline
- `scripts/capture-screenshots.ts` liest Contract + Mapping.
- Mapping liegt in `content/screenshot-capture-mapping.ts`.
- TODO-Eintraege sind erlaubt und werden explizit reportet.
- Doppelte oder fehlende Slot-Mappings sind harte Fehler.

## Content Governance

- Module und Use Cases werden nur ueber `content/**/*.md` gepflegt.
- Validierung (`npm run content:validate`) prueft:
  - alle Pflichtfelder,
  - exakte Modul-/Use-Case-Abdeckung,
  - Screenshot-Referenzen nur aus freigegebenem Katalog,
  - harte No-Screenshot-Regel fuer `task-room`.

## Print- und Export-Verhalten

- Dedizierte Print-Routen unter `/print/...`.
- Print-CSS reduziert visuelle Stoerfaktoren und stabilisiert Umbrueche.
- Screenshot-Placeholder bleiben auch im PDF-/Print-Export konsistent lesbar.

## Betriebsmodus

1. Content anpassen (Markdown)
2. Validieren (`content:validate`, `screenshots:validate`)
3. Lokal pruefen (`dev`)
4. Build (`build`) und Deploy

## Noch offene Asset-Arbeit

Die realen Produkt-Screens muessen fuer die 17 freigegebenen Slots erzeugt und in `public/assets/screenshots/` abgelegt werden. Bis dahin bleibt der Hub voll nutzbar durch Placeholder.
