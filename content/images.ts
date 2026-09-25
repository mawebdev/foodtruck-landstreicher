/**
 * Alle Fotos stammen von der bisherigen Website (wp-content/uploads).
 * Es gibt bewusst keine Stockfotos.
 *
 * Fehlende Motive (für die finale Version dringend nachliefern):
 * TODO: echtes Teamfoto mit Namen (für /ueber-uns)
 */

export type SiteImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** grobe Kategorie für die Galerie */
  tag: "Food" | "Truck" | "Team" | "Event";
};

export const images = {
  burgerHero: {
    src: "/images/burger-heumilchkaese-rauke.jpg",
    alt: "Burger mit geschmolzenem Heumilchkäse, Rauke und Grillsauce im Papier",
    width: 1920,
    height: 1440,
    tag: "Food",
  },
  kochDreiBurger: {
    src: "/images/koch-mit-drei-burgern.jpg",
    alt: "Koch vom Landstreicher hält drei frisch belegte Burger in die Kamera",
    width: 1920,
    height: 1440,
    tag: "Team",
  },
  kochZweiBurger: {
    src: "/images/koch-mit-zwei-burgern.jpg",
    alt: "Koch im Foodtruck mit zwei großen Burgern im Papier",
    width: 1179,
    height: 968,
    tag: "Team",
  },
  bowl: {
    src: "/images/bowl-mit-garnelen.jpg",
    alt: "Große Bowl mit Garnelen, Schinken, Parmesan und Gemüse",
    width: 1440,
    height: 1920,
    tag: "Food",
  },
  truckSeite: {
    src: "/images/truck-landstreicher-seite.jpg",
    alt: "Schwarzer Landstreicher-Foodtruck mit großem Burger-Graffiti von der Seite",
    width: 1920,
    height: 1440,
    tag: "Truck",
  },
  truckFront: {
    src: "/images/truck-landstreicher-front.jpg",
    alt: "Der schwarze Landstreicher-Foodtruck auf einem Kiesplatz im Sommer",
    width: 1920,
    height: 1440,
    tag: "Truck",
  },
  eventTafel: {
    src: "/images/event-lange-tafel-abend.jpg",
    alt: "Lange gedeckte Tafel im Hof am Abend, daneben der beleuchtete Landstreicher-Truck",
    width: 1920,
    height: 1440,
    tag: "Event",
  },
  teamPommes: {
    src: "/images/team-mit-pommes.jpg",
    alt: "Zwei Mitarbeiterinnen im Truck reichen frische Pommes durch die Durchreiche",
    width: 1920,
    height: 1440,
    tag: "Team",
  },
  burgerDurchreiche: {
    src: "/images/burger-in-der-durchreiche.jpg",
    alt: "Zwei Burger mit Pommes stehen auf der Durchreiche des Foodtrucks",
    width: 1920,
    height: 1440,
    tag: "Food",
  },
  patties: {
    src: "/images/patties-auf-der-grillplatte.jpg",
    alt: "Frisch geformte Rindfleisch-Patties auf der Grillplatte",
    width: 1920,
    height: 1440,
    tag: "Food",
  },
  smokerBrisket: {
    src: "/images/smoker-brisket.jpg",
    alt: "Frisch aufgeschnittenes Texas-Brisket vom Smoker, angerichtet auf dem Schneidebrett",
    width: 1600,
    height: 1066,
    tag: "Food",
  },
  smoker: {
    src: "/images/smoker.jpg",
    alt: "Fleisch im offenen US-Smoker beim langsamen Räuchern",
    width: 1600,
    height: 1104,
    tag: "Food",
  },
  platteAction: {
    src: "/images/platte-action.jpg",
    alt: "Koch drückt Rindfleisch-Patties auf der rauchenden Grillplatte, daneben Buns und Zutaten",
    width: 1600,
    height: 1066,
    tag: "Food",
  },
  veggieBurger: {
    src: "/images/veggie-burger.jpg",
    alt: "Veggie-Burger mit Weizenprotein-Patty, geschmolzenem Käse und Gemüse in der Hand",
    width: 1600,
    height: 1066,
    tag: "Food",
  },
  hochzeitspaar: {
    src: "/images/hochzeitspaar-burger.jpg",
    alt: "Brautpaar in Hochzeitsoutfit sitzt im Freien und isst Burger",
    width: 1600,
    height: 1066,
    tag: "Event",
  },
  partyWunderkerzen: {
    src: "/images/party-wunderkerzen.jpg",
    alt: "Feiernde Gäste stoßen am Abend mit Sektgläsern an und halten Wunderkerzen",
    width: 1600,
    height: 860,
    tag: "Event",
  },
  apfelkuechle: {
    src: "/images/apfelkuechle.jpg",
    alt: "Apfelküchle in Zimtzucker mit Puderzucker, Birne und frischen Beeren auf schwarzem Teller",
    width: 1600,
    height: 1200,
    tag: "Food",
  },
  feierAnstossen: {
    src: "/images/feier-anstossen.jpg",
    alt: "Feiernde stoßen bei einer Firmenfeier mit Gläsern an",
    width: 1600,
    height: 1068,
    tag: "Event",
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;

/** Reihenfolge für die Galerie – bewusst gemischt: Food, Truck, Menschen. */
export const galleryOrder: ImageKey[] = [
  "burgerHero",
  "truckSeite",
  "kochDreiBurger",
  "eventTafel",
  "smokerBrisket",
  "bowl",
  "patties",
  "platteAction",
  "smoker",
  "teamPommes",
  "feierAnstossen",
  "apfelkuechle",
  "burgerDurchreiche",
  "truckFront",
  "kochZweiBurger",
];
