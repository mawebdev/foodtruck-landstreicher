/**
 * Zentrale Stammdaten. Alles, was hier steht, landet auch in Metadaten
 * und strukturierten Daten – deshalb nur bestätigte Angaben eintragen.
 *
 * Quellen: bestehende Website foodtruck-landstreicher.de (Stand Sep. 2026),
 * v. a. Impressum und Buchungsseite.
 */

export const site = {
  name: "Der Landstreicher",
  legalName: "Valimero – Der Landstreicher / Karibisches Eck",
  // Slogan „aus Lichtenfels": bleibt bewusst als Marken-/Herkunftsangabe, obwohl die
  // Betriebsadresse in Burgkunstadt liegt – vom Betreiber so bestätigt (Sep. 2026).
  tagline: "Foodtruck & Streetfood Catering aus Lichtenfels",
  url: "https://foodtruck-landstreicher.de",
  locale: "de_DE",

  // Adresse und Telefon: vom Betreiber bestätigt (Sep. 2026, WhatsApp).
  address: {
    street: "Bamberger Straße 4",
    postalCode: "96224",
    city: "Burgkunstadt",
    region: "Bayern",
    country: "DE",
  },
  // Näherungskoordinaten für Burgkunstadt (Zentrum).
  geo: { lat: 50.1219, lon: 11.2417 },

  email: "info@foodtruck-landstreicher.de",

  // Vom Betreiber bestätigt (Sep. 2026, WhatsApp).
  phone: "+49 1573 3444016",
  phoneDisplay: "01573 3444016",

  responsiblePerson: "Valmir Ferizaj",

  // Das Karibische Eck ist ein eigenständiger Truck (nicht Teil des
  // Landstreicher-Angebots) und wird NUR extern verlinkt – keine Inhalte,
  // keine Fotos, keine Küche-Claims auf dieser Website.
  karibischesEck: {
    name: "Das Karibische Eck",
    href: "https://karibischeseck.de/foodtruck/",
  },

  // Der Truck wurde übernommen – wie alt er genau ist bzw. seit wann er unterwegs
  // ist, ist nicht bestätigt. Bewusst ohne Zeitangabe.
  // TODO: Betreiber – seit wann ist der Truck wirklich unterwegs / wann übernommen?
  yearsTagline: "Streetfood mit Geschichte",

  regions: ["Franken", "Oberpfalz", "Thüringen"],

  // Laut Betreiber (Sep. 2026): Gründungsjahr des heutigen Betriebs. Der Truck
  // selbst ist älter und wurde übernommen.
  foundedYear: 2016,

  // Laut Betreiber (Sep. 2026).
  capacityPerHour: "bis zu 600 Portionen Burger & Pommes pro Stunde",
  footprint: "7,5 × 2,5 m",

  // „Da wir 3 Trucks haben, sind wir flexibel“ (Betreiber, Sep. 2026).
  fleetSize: 3,

  // Mindestumsatz: laut Betreiber pauschal nicht angebbar – abhängig von
  // Einsatzort und Aufwand. Wird immer verbindlich im Angebot genannt.
  minimumOrder:
    "Der Mindestumsatz richtet sich nach Einsatzort und Aufwand – im Angebot steht er verbindlich.",

  // TODO: Social-Profile eintragen, sobald bestätigt (auf dem Truck klebt
  // ein Facebook-Logo, eine URL ist aber nirgends verlinkt).
  social: [] as { label: string; href: string }[],
} as const;

// Mit Anker direkt zum Formular (id="anfrage" auf der Buchungsseite).
export const bookingHref = "/foodtruck-buchen#anfrage";

// Nackter Pfad – für pathname-Vergleiche (pathname enthält nie den Hash).
export const bookingPath = "/foodtruck-buchen";

// Wie bookingHref, aber mit vorab ausgewählter Eventart (?anlass=Hochzeit …).
// Die Buchungsseite liest den Parameter und setzt Schritt 1 vor.
export const bookingHrefAnlass = (anlass: string) =>
  `/foodtruck-buchen?anlass=${encodeURIComponent(anlass)}#anfrage`;

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}
