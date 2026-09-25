/**
 * Speisekarte – übernommen von foodtruck-landstreicher.de/unsere-speisekarte
 * (Stand Sep. 2026). Texte sprachlich überarbeitet, Inhalte nicht erweitert.
 *
 * Preise: Auf der alten Seite gibt es keine. Deshalb hier auch keine.
 * Menüs und Preise werden individuell pro Event zusammengestellt; aus der
 * Speisekarte kann frei kombiniert werden (Info vom Betreiber, Sep. 2026).
 *
 * TODO: Betreiber bestätigen, ob alle Gerichte aktuell angeboten werden.
 * TODO: Die alte Seite spricht von „veganen Spezialitäten“, listet aber kein
 *       veganes Gericht. Betreiber fragen, welche Gerichte vegan möglich sind
 *       (z. B. Veggie-Patty ohne Käse?) und dann `vegan: true` setzen.
 * TODO: Vegetarisch-Kennzeichnung der Beilagen/Desserts bestätigen
 *       (z. B. Frittierfett der Pommes).
 * TODO: Allergene/Zusatzstoffe ergänzen, falls für Events gewünscht.
 */

export type MenuItem = {
  name: string;
  description: string;
  vegetarian?: boolean;
  /** vegetarisch auf Wunsch (z. B. Bowl mit Schafskäse statt Fleisch) */
  vegetarianOption?: boolean;
  vegan?: boolean;
  note?: string;
};

export type MenuCategory = {
  id: string;
  title: string;
  kicker: string;
  intro?: string;
  items: MenuItem[];
};

export const burgerBase =
  "Jeder Burger startet mit 180 g Rindfleisch, sonnengereiften Tomaten, roten Zwiebeln und frischem Pflücksalat.";

export const menuCategories: MenuCategory[] = [
  {
    id: "vorspeisen",
    title: "Vorspeisen",
    kicker: "Zum Anfangen",
    items: [
      {
        name: "Antipastiplatte",
        description:
          "Gemüse vom Grill, mariniert in Kräutern und Olivenöl, dazu verschiedene Wurst- und Käsespezialitäten.",
      },
      {
        name: "Bowls",
        description:
          "Eine große, bunte Bowl – wahlweise mit Schafskäse, Thunfisch, Garnelen, gebratener Putenbrust, Seelachs oder Steakstreifen.",
        vegetarianOption: true,
      },
    ],
  },
  {
    id: "burger",
    title: "Burger",
    kicker: "Das Herzstück",
    intro: burgerBase,
    items: [
      { name: "Klassik", description: "Die Mutter aller Burger. Mehr braucht es manchmal nicht." },
      { name: "Heumilchkäse", description: "Der Klassiker mit geschmolzenem Heumilchkäse." },
      { name: "Der Landstreicher", description: "Mit Heumilchkäse und Bacon. Unser Namensgeber." },
      { name: "Der Rauchige", description: "Heumilchkäse, rauchige Grillsauce, Bacon und Röstzwiebeln." },
      { name: "Cesar", description: "Parmesan, Bacon und Rauke." },
      { name: "Peter", description: "Champignons, Bacon und Heumilchkäse." },
      { name: "Karameli", description: "Karamellisierte Zwiebeln, Champignons und Heumilchkäse." },
      {
        name: "Scharfer Hubert",
        description: "Scharfe Chilisauce, Heumilchkäse, Bacon, Jalapeños und Rauke.",
      },
      { name: "Gorgonzola", description: "Gorgonzola und Rauke." },
      { name: "Tomate", description: "Getrocknete Tomaten, Gorgonzola und Rauke." },
      { name: "Williamsbirne", description: "Birne, Gorgonzola und Rauke." },
      { name: "Franzose", description: "Französischer Ziegenkäse, Feigenmarmelade und Bacon." },
      { name: "Geißbock", description: "Ziegenkäse, Preiselbeermarmelade und Rauke." },
      { name: "Trüffelschwein", description: "Parmaschinken, Parmesan, Rauke und Trüffelsauce." },
    ],
  },
  {
    id: "vegetarisch",
    title: "Vegetarisch",
    kicker: "Ohne Fleisch",
    items: [
      {
        name: "Veggie-Burger",
        description:
          "150 g Patty auf Weizenprotein-Basis mit getrockneten Tomaten, Heumilchkäse und Rauke. Dazu hausgemachte, handgeschnittene Pommes.",
        vegetarian: true,
      },
    ],
  },
  {
    id: "chicken",
    title: "Chicken",
    kicker: "Knusprig",
    items: [
      {
        name: "Chickenburger",
        description:
          "Marinierte, knusprig panierte Hähnchenoberkeule mit Essiggurken, Zwiebeln und hausgemachter BBQ-Sauce im Brioche-Bun.",
      },
    ],
  },
  {
    id: "smoker",
    title: "Smoker American BBQ",
    kicker: "Low & Slow",
    intro: "Aus dem US-Smoker. Das braucht Zeit – deshalb planen wir BBQ immer mit etwas Vorlauf.",
    items: [
      {
        name: "Texas Brisket",
        description:
          "Rinderbrust, bis zu 14 Stunden bei niedriger Temperatur gesmokt. Außen eine kräftige Kruste mit Röstaromen, innen zart und saftig.",
      },
      {
        name: "Pulled Pork",
        description:
          "Schweineschulter, 12 Stunden low & slow gesmokt, dann gezupft und im eigenen Saft fertig gezogen. Rauchig und weich.",
      },
      {
        name: "Pulled Beef",
        description:
          "Rindfleisch, viele Stunden im Smoker, danach gezupft. Kräftig im Geschmack, mit intensiven Röstaromen.",
      },
      {
        name: "Turkey BBQ",
        description:
          "Putenbrust aus dem Smoker, mild gewürzt und langsam gegart – für alle, die Rauch mögen, aber es leichter wollen.",
      },
      {
        name: "Dinosaur Ribs",
        description:
          "Rinderrippen im XXL-Format, stundenlang gesmokt. Außen dunkle Kruste, innen sehr zart. Macht auf jedem Tisch Eindruck.",
      },
      {
        name: "Spareribs",
        description:
          "Schweinerippchen, langsam im Smoker gegart, bis sich das Fleisch leicht vom Knochen löst.",
      },
      {
        name: "Beef Cheeks",
        description: "Rinderbäckchen aus dem Smoker, butterweich, mit feiner Rauchnote.",
      },
      {
        name: "Wurst aus dem Smoker",
        description: "Würstchen, schonend gesmokt. Außen knackig, innen saftig, leicht rauchig.",
      },
      {
        name: "Ribs sous-vide",
        description:
          "Dinosaur Ribs oder Spareribs, vakuumiert und viele Stunden bei exakt kontrollierter Temperatur gegart, dann kurz angegrillt.",
      },
    ],
  },
  {
    id: "beilagen",
    title: "Beilagen",
    kicker: "Dazu",
    items: [
      {
        name: "Pommes",
        description: "Hausgemacht und von Hand geschnitten.",
        vegetarian: true,
      },
      {
        name: "Süßkartoffel-Pommes",
        description: "Ebenfalls hausgemacht und handgeschnitten.",
        vegetarian: true,
      },
      { name: "Coleslaw", description: "Der Krautsalat, der zu BBQ einfach dazugehört.", vegetarian: true },
      { name: "Beilagensalat", description: "Frisch und leicht, als Ausgleich zum Smoker.", vegetarian: true },
    ],
  },
  {
    id: "dessert",
    title: "Dessert",
    kicker: "Zum Schluss",
    items: [
      {
        name: "Apfelküchle",
        description: "Mit Vanilleeis, Sahne und Erdbeerspiegel.",
        vegetarian: true,
      },
      {
        name: "Kaiserschmarrn",
        description: "Mit Apfelmus, Zimt und Zucker.",
        vegetarian: true,
      },
    ],
  },
];

/** Kurzliste für Marquee & Teaser */
export const signatureDishes = [
  "Der Landstreicher",
  "Texas Brisket",
  "Scharfer Hubert",
  "Pulled Pork",
  "Trüffelschwein",
  "Dinosaur Ribs",
  "Geißbock",
  "Süßkartoffel-Pommes",
  "Der Rauchige",
  "Kaiserschmarrn",
];
