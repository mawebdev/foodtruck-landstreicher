"use server";

import nodemailer from "nodemailer";
import { eventOptions } from "@/content/events";
import { site } from "@/lib/site";

export type InquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<InquiryField, string>>;
  /** eingegebene Werte, damit bei Fehlern nichts verloren geht */
  values?: Partial<Record<InquiryField, string>>;
};

export type InquiryField = "date" | "location" | "guests" | "eventType" | "message" | "name" | "email" | "phone";

const fields: InquiryField[] = ["date", "location", "guests", "eventType", "message", "name", "email", "phone"];

function validate(values: Record<InquiryField, string>) {
  const errors: InquiryState["fieldErrors"] = {};
  if (!values.date) errors.date = "Bitte gebt ein Datum an.";
  else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(values.date) < today) errors.date = "Das Datum liegt in der Vergangenheit.";
  }
  if (values.location.length < 2) errors.location = "Wo findet euer Event statt?";
  const guests = Number(values.guests);
  if (!values.guests || !Number.isFinite(guests) || guests < 1) errors.guests = "Bitte gebt eine ungefähre Gästezahl an.";
  if (values.eventType && !(eventOptions as readonly string[]).includes(values.eventType)) errors.eventType = "Bitte wählt eine Eventart.";
  if (values.name.length < 2) errors.name = "Wie heißt du?";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Bitte prüft die E-Mail-Adresse.";
  if (values.message.length > 3000) errors.message = "Bitte kürzer als 3000 Zeichen.";
  return errors;
}

export async function submitInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  // Honeypot – echte Menschen sehen dieses Feld nicht.
  if (String(formData.get("website") ?? "").length > 0) {
    return { status: "success" };
  }

  const values = Object.fromEntries(fields.map((f) => [f, String(formData.get(f) ?? "").trim()])) as Record<InquiryField, string>;
  const fieldErrors = validate(values);
  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Da fehlt noch etwas.", fieldErrors, values };
  }

  const dateText = new Date(values.date).toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const text = [
    `Neue Buchungsanfrage über foodtruck-landstreicher.de`,
    ``,
    `Datum:        ${dateText}`,
    `Ort:          ${values.location}`,
    `Gäste:        ${values.guests}`,
    `Anlass:       ${values.eventType || "–"}`,
    ``,
    `Name:         ${values.name}`,
    `E-Mail:       ${values.email}`,
    `Telefon:      ${values.phone || "–"}`,
    ``,
    `Nachricht:`,
    values.message || "–",
  ].join("\n");

  /*
   * Versand per SMTP (Zugangsdaten vom Betreiber).
   * Benötigte Umgebungsvariablen (in .env.local, siehe .env.example):
   *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD,
   *   BOOKING_TO_EMAIL, BOOKING_FROM_EMAIL (Absenderadresse)
   */
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  const from = process.env.BOOKING_FROM_EMAIL ?? user;
  const to = process.env.BOOKING_TO_EMAIL ?? site.email;

  const sendError: InquiryState = {
    status: "error",
    message: `Die Anfrage konnte gerade nicht verschickt werden. Schreibt uns bitte direkt an ${site.email}.`,
    values,
  };

  if (!host || !user || !password || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[Buchungsanfrage – Dev, kein SMTP konfiguriert]\n" + text);
      return { status: "success" };
    }
    console.error("Buchungsanfrage: SMTP-Zugangsdaten fehlen (SMTP_HOST/SMTP_USER/SMTP_PASSWORD)");
    return sendError;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      // 465 = SMTPS (implizites TLS), alle anderen Ports starten im Klartext und
      // upgraden per STARTTLS – so verhält es sich nodemailer entsprechend.
      secure: port === 465,
      auth: { user, pass: password },
    });
    await transporter.sendMail({
      from,
      to,
      replyTo: values.email,
      subject: `Anfrage: ${values.eventType || "Event"} am ${dateText} – ${values.guests} Gäste`,
      text,
    });
  } catch (err) {
    console.error("Buchungsanfrage fehlgeschlagen", err);
    return sendError;
  }

  return { status: "success" };
}
