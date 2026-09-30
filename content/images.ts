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
    src: "/images/burger-heumilchkaese-rauke-v2.jpg",
    alt: "Burger mit geschmolzenem Heumilchkäse, Rauke und Grillsauce im Papier",
    width: 1448,
    height: 1086,
    tag: "Food",
  },
  kochDreiBurger: {
    src: "/images/drei-burger-theke.jpg",
    alt: "Drei frisch belegte Burger im Zeitungspapier auf der Theke im Foodtruck",
    width: 1448,
    height: 1086,
    tag: "Team",
  },
  teamImTruck: {
    src: "/images/team-im-truck.jpg",
    alt: "Das Landstreicher-Team: zwei Menschen in schwarzen Landstreicher-Schürzen lächeln gemeinsam in der Truck-Küche",
    width: 1445,
    height: 1089,
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
    src: "/images/bowl-mit-garnelen-v2.jpg",
    alt: "Große Bowl mit Garnelen, Schinken, Parmesan und Gemüse",
    width: 1312,
    height: 1199,
    tag: "Food",
  },
  truckSeite: {
    src: "/images/truck-landstreicher-seite.jpg",
    alt: "Schwarzer Landstreicher-Foodtruck mit großem Burger-Graffiti von der Seite",
    width: 1920,
    height: 1440,
    tag: "Truck",
  },
  truckKies: {
    src: "/images/truck-landstreicher-kies.jpg",
    alt: "Der schwarze Landstreicher-Foodtruck mit Burger-Graffiti auf einem Kiesplatz bei blauem Himmel",
    width: 1448,
    height: 1086,
    tag: "Truck",
  },
  truckSeiteV2: {
    src: "/images/truck-landstreicher-seite-v2.jpg",
    alt: "Der schwarze Landstreicher-Foodtruck mit Burger-Graffiti von der Seite, davor rotes Fass und Paletten auf Kies",
    width: 1448,
    height: 1086,
    tag: "Truck",
  },
  karibischesEck: {
    src: "/images/karibisches-eck-truck.jpg",
    alt: "Der bunt bemalte Truck des Karibischen Ecks mit Palmenmotiven am Abend, davor Pflanzen und Paletten",
    width: 2048,
    height: 1536,
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
  festivalStand: {
    src: "/images/festival-stand-v2.jpg",
    alt: "Mitarbeiterin am Festivalstand richtet Nudeln aus einer großen Pfanne an",
    width: 1448,
    height: 1086,
    tag: "Event",
  },
  teamPommes: {
    src: "/images/team-mit-pommes-v2.jpg",
    alt: "Zwei Mitarbeiterinnen im Truck reichen frische Pommes durch die Durchreiche",
    width: 1448,
    height: 1086,
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
  offsetSmoker: {
    src: "/images/offset-smoker.jpg",
    alt: "Großer schwarzer Offset-Smoker auf Anhänger mit gestapeltem Feuerholz auf einer Wiese",
    width: 1600,
    height: 1066,
    tag: "Truck",
  },
  smoker: {
    src: "/images/smoker.jpg",
    alt: "Fleisch im offenen Offset-Smoker beim langsamen Räuchern",
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
  firmenevent: {
    src: "/images/firmenevent-sternzelte.jpg",
    alt: "Firmenevent im Hof mit weißen Sternzelten, roten Stehtischen und kleinen Tannenbäumen bei Abendsonne",
    width: 1448,
    height: 1086,
    tag: "Event",
  },
  dessertGlaeser: {
    src: "/images/dessert-glaeser.jpg",
    alt: "Viele Dessertgläser mit Panna cotta, Fruchtspiegel und getrockneter Orangenscheibe",
    width: 1200,
    height: 1600,
    tag: "Food",
  },
  ribsSmokerSeite: {
    src: "/images/ribs-im-smoker-seite.jpg",
    alt: "Glasierte Spareribs auf mehreren Rosten im geöffneten Smoker",
    width: 1225,
    height: 815,
    tag: "Food",
  },
  ribsSmokerFront: {
    src: "/images/ribs-im-smoker-front.jpg",
    alt: "Blick frontal in den offenen Smoker mit vier Etagen voller Ribs",
    width: 1272,
    height: 785,
    tag: "Food",
  },
  smokerGewuerzt: {
    src: "/images/smoker-gewuerzt.jpg",
    alt: "Frisch gewürztes Fleisch mit Rub auf den Rosten des Smokers vor dem Räuchern",
    width: 1600,
    height: 1064,
    tag: "Food",
  },
  beefRibsSmoker: {
    src: "/images/beef-ribs-smoker.jpg",
    alt: "Glasierte Beef Short Ribs auf den Rosten im Smoker",
    width: 1064,
    height: 1600,
    tag: "Food",
  },
  beefRibNah: {
    src: "/images/beef-rib-nah.jpg",
    alt: "Nahaufnahme einer glasierten Beef Short Rib mit Pfefferkruste auf dem Rost",
    width: 1600,
    height: 989,
    tag: "Food",
  },
  truckBiergarten: {
    src: "/images/truck-biergarten.jpg",
    alt: "Der Landstreicher-Truck im Biergarten mit Sonnenschirmen und Holzstühlen",
    width: 1600,
    height: 1200,
    tag: "Truck",
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
  "offsetSmoker",
  "teamPommes",
  "feierAnstossen",
  "apfelkuechle",
  "burgerDurchreiche",
  "truckFront",
  "kochZweiBurger",
  "beefRibNah",
  "firmenevent",
  "ribsSmokerSeite",
  "truckBiergarten",
  "dessertGlaeser",
  "smokerGewuerzt",
  "beefRibsSmoker",
  "ribsSmokerFront",
];
