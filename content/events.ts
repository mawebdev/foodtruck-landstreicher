import type { ImageKey } from "./images";
import { bookingHrefAnlass } from "@/lib/site";

/**
 * Eventarten. Die alte Website nennt: Hochzeiten & Polterabende, Geburtstage,
 * Gartenpartys, Jubiläen, Sommerfeste, Teamevents, Mitarbeiterfeiern,
 * Produktpräsentationen, Eröffnungen, Stadt- & Straßenfeste, Vereinsfeiern,
 * Kinder- & Familienfeste, Märkte & Festivals.
 */

export type EventType = {
  id: string;
  title: string;
  short: string;
  text: string;
  image: ImageKey;
  href: string;
  cta: string;
};

export const eventTypes: EventType[] = [
  {
    id: "hochzeit",
    title: "Hochzeit",
    short: "Essen dort, wo gefeiert wird.",
    text: "Bei einer Hochzeit soll niemand zwischen Buffet und Küche verschwinden. Der Truck steht dort, wo gefeiert wird, und das Essen kommt frisch vom Grill – auch wenn die Gäste lieber stehen als sitzen.",
    image: "hochzeitspaar",
    href: "/foodtruck-hochzeit",
    cta: "Hochzeitscatering ansehen",
  },
  {
    id: "firmenfeier",
    title: "Firmenfeier",
    short: "Sommerfest, Teamevent, Jubiläum.",
    text: "Ob Sommerfest auf dem Firmenparkplatz oder Jubiläum in der Halle: Wir stellen den Truck hin, kochen vor Ort, und eure Leute stehen zusammen, statt am Büfett Schlange zu stehen.",
    image: "partyWunderkerzen",
    href: "/foodtruck-firmenfeier",
    cta: "Firmencatering planen",
  },
  {
    id: "geburtstag",
    title: "Geburtstag",
    short: "Im Garten, im Hof, in der Scheune.",
    text: "Der runde Geburtstag im Garten, die Party in der Scheune. Ihr kümmert euch um die Gäste, wir um die Burger.",
    image: "kochDreiBurger",
    href: bookingHrefAnlass("Geburtstag"),
    cta: "Geburtstag anfragen",
  },
  {
    id: "sommerfest",
    title: "Sommerfest",
    short: "Draußen, lange hell, viele Leute.",
    text: "Sommerfeste leben davon, dass sich alles draußen abspielt. Ein Foodtruck passt da einfach rein – und muss nicht erst ans Stromnetz.",
    image: "truckSeite",
    href: bookingHrefAnlass("Sommerfest"),
    cta: "Sommerfest planen",
  },
  {
    id: "vereinsfest",
    title: "Vereinsfest",
    short: "Jubiläum, Saisonabschluss, Feier.",
    text: "Vereinsjubiläum, Saisonabschluss, Sportfest: Wir übernehmen die Küche, damit die Vereinsmitglieder auch mal selbst feiern können.",
    image: "teamPommes",
    href: bookingHrefAnlass("Vereinsfest"),
    cta: "Vereinsfest anfragen",
  },
  {
    id: "stadtfest",
    title: "Stadtfest",
    short: "Straßenfest, Markt, Kerwa.",
    text: "Auf Stadt- und Straßenfesten stehen wir als Streetfood-Stand mitten im Geschehen – Burger auf die Hand, Pommes daneben.",
    image: "burgerHero",
    href: bookingHrefAnlass("Stadtfest"),
    cta: "Stadtfest anfragen",
  },
  {
    id: "festival",
    title: "Festival",
    short: "Lange Tage, hungrige Leute.",
    text: "Festivals und Märkte sind lange Tage mit vielen hungrigen Leuten. Genau dafür ist ein Truck gebaut, der mit einer normalen Steckdose auskommt – alles andere ist an Bord.",
    image: "burgerDurchreiche",
    href: bookingHrefAnlass("Festival"),
    cta: "Festival anfragen",
  },
];

/** Auswahl für das Buchungsformular */
export const eventOptions = [
  "Hochzeit",
  "Firmenfeier",
  "Geburtstag",
  "Sommerfest",
  "Vereinsfest",
  "Stadtfest",
  "Festival",
  "Sonstiges",
] as const;
