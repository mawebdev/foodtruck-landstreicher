# Der Landstreicher – Website-Relaunch

Relaunch von foodtruck-landstreicher.de als Next.js (App Router, TypeScript, Tailwind CSS v4).
Alle Inhalte stammen von der bisherigen Website – nichts wurde erfunden, Unbekanntes ist als
`TODO: Betreiber …` im Code markiert.

## Entwicklung

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Produktions-Build (alle Seiten statisch)
```

## Umgebungsvariablen

Für den Versand der Buchungsanfragen (Server Action in `app/foodtruck-buchen/actions.ts`,
Versand über die Resend-API ohne zusätzliche Dependency):

| Variable             | Bedeutung                                                        |
| -------------------- | ---------------------------------------------------------------- |
| `RESEND_API_KEY`     | API-Key von resend.com                                            |
| `BOOKING_TO_EMAIL`   | Empfänger der Anfragen (Standard: `info@foodtruck-landstreicher.de`) |
| `BOOKING_FROM_EMAIL` | verifizierter Absender, z. B. `Anfrage <anfrage@foodtruck-landstreicher.de>` |

Ohne `RESEND_API_KEY` und `BOOKING_FROM_EMAIL` wird in der Entwicklung nur per console.info geloggt;
in Produktion erhält der Nutzer dann eine Fehlermeldung mit Mail-Adresse als Ausweg.

Beispiel: `.env.local` im Projektverzeichnis anlegen (siehe `.env.example`).

## Seiten

| Route                   | Inhalt |
| ----------------------- | ------ |
| `/`                     | Startseite (Scroll-Storytelling, Design-Referenz) |
| `/speisekarte`          | Volle Speisekarte, keine Preise (Menüs werden pro Event zusammengestellt) |
| `/foodtruck-catering`   | Haupt-Catering-Seite, `#anlaesse`-Anker, Ablauf, FAQ |
| `/events`               | Events-Übersicht (Nav-Punkt „Events“, alle 7 Anlässe) |
| `/foodtruck-hochzeit`   | Hochzeitscatering, eigene FAQ |
| `/foodtruck-firmenfeier`| Firmencatering, eigene FAQ |
| `/einsatzgebiete`       | Karte + Regionen + Stadtliste |
| `/foodtruck-{bamberg,coburg,bayreuth,nuernberg}` | Standortseiten (nur diese 4 – keine Doorway-Pages) |
| `/ueber-uns`, `/galerie`, `/foodtruck-buchen` | … |
| `/impressum`, `/datenschutz` | Rechtliches (indexiert, in der Sitemap) |
| `sitemap.xml`, `robots.txt` | generiert (`app/sitemap.ts`, `app/robots.ts`) |

Alte URLs leiten um: `/unsere-speisekarte` → `/speisekarte`, `/den-landstreicher-buchen` →
`/foodtruck-buchen`, `/datenschutzerklaerung` → `/datenschutz` (in `next.config.ts`).

## Struktur

- `lib/site.ts` – Stammdaten (Name, Adresse, Telefon, Mindestumsatz …). Hier landen Änderungen.
- `content/*` – alle Inhalte als Daten (Speisekarte, Events, FAQ, Einsatzgebiete, Galerie …).
- `components/*` – UI-Bausteine; Animationen über Motion mit `prefers-reduced-motion`-Respekt.
- `public/images/` – Fotos von der alten Website (1920 px, optimiert). Keine Stockfotos.

## Vom Betreiber bestätigt (Sep. 2026)

- **Adresse:** Bamberger Straße 4, 96224 Burgkunstadt
- **Telefon:** 01573 3444016
- **Karibisches Eck:** eigener, eigenständiger Truck – auf der Website steht
  bewusst KEIN Karibik-Inhalt mehr (keine Fotos, keine Gerichte, keine Küche-Claims),
  nur noch der externen Link auf https://karibischeseck.de/foodtruck/ (Startseite)
- **Hosting:** Vercel (in der Datenschutzerklärung Abschnitt 1 berücksichtigt)
- **Gründungsjahr:** 2016 (heutiger Betrieb; der Truck selbst ist älter und wurde übernommen)
- **Kapazität:** bis zu 600 Portionen Burger & Pommes pro Stunde
- **Stellfläche:** 7,5 × 2,5 m, fester befahrbarer Platz; normale Steckdose optional für
  die Dunstabzugshaube, alles andere an Bord
- **Mindestumsatz:** pauschal nicht angebbar (Lage + Aufwand) – wird verbindlich im Angebot
  genannt; der alte „1.200 € netto"-Wert ist entfernt
- **Menüs & Preise:** individuell passend zum Event zusammengestellt; aus der Speisekarte
  kann frei kombiniert werden, was zu euch und euren Gästen passt (Sep. 2026)
- **Kurzfristige Anfragen:** ja, weil insgesamt drei Trucks im Einsatz sind
- **Slogan „aus Lichtenfels":** bleibt als Marken-/Herkunftsangabe, obwohl die
  Betriebsadresse in Burgkunstadt liegt (Betreiber, Sep. 2026 – „next to Burgkunstadt")

## Offene Punkte für den Betreiber

Im Code mit `TODO: Betreiber` markiert. Die wichtigsten:

1. **Fehlende Fotos nachliefern**: Teamfoto mit Namen,
   der dritte Truck (siehe `content/images.ts`) – Hochzeitsfoto, Firmenfeier-Party,
   Smoker, Brisket, Veggie-Burger und Dessert sind seit Sep. 2026 vom Betreiber
   nachgeliefert
2. **Fakten bestätigen**: Anfahrtspauschale, vegane Gerichte, Buffet-/Liefer-Service,
   wer der dritte Truck ist
3. **AVVs abschließen**: Auftragsverarbeitungsverträge mit Vercel und Resend
4. **Social-Media-Profile** eintragen (`lib/site.ts` → `social`)
5. **Zitate einordnen** (`content/testimonials.ts`): von welchen Events stammen sie?

## SEO

- Individuelle Titles/Descriptions pro Seite, Canonicals, Open Graph
- JSON-LD: `FoodEstablishment`, `Service` pro Catering-Seite, `FAQPage`, `BreadcrumbList` –
  **bewusst kein Review-/Rating-Markup**
- Standortseiten nur für Bamberg, Coburg, Bayreuth, Nürnberg (echter individueller Inhalt);
  alle anderen Städte bleiben Listen-Einträge auf `/einsatzgebiete`
- Frankfurt/München von der alten Seite bewusst entfernt (widersprach der Positionierung)