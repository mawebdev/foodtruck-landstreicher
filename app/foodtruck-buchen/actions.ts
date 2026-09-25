"use server";

import path from "node:path";
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

  const rows: [string, string][] = [
    ["Datum", dateText],
    ["Ort", values.location],
    ["Gäste", values.guests],
    ["Anlass", values.eventType || "–"],
  ];
  const contact: [string, string][] = [
    ["Name", values.name],
    ["E-Mail", values.email],
    ["Telefon", values.phone || "–"],
  ];

  const text = [
    `Neue Buchungsanfrage über foodtruck-landstreicher.de`,
    ``,
    ...rows.map(([k, v]) => `${k.padEnd(14)}${v}`),
    ``,
    ...contact.map(([k, v]) => `${k.padEnd(14)}${v}`),
    ``,
    `Nachricht:`,
    values.message || "–",
  ].join("\n");

  // Nutzereingaben sind HTML – alles escapen, bevor es in die Mail geht.
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const escnl = (s: string) => esc(s).replace(/\n/g, "<br />");

  /*
   * HTML-Mail im Look der Website (Cream #F4F0E8, Ink #111111, Rot #A71919).
   * Das Logo hängt als CID-Anhang bei, damit es in gängigen Mail-Clients
   * ohne externes Nachladen angezeigt wird. Tabellen-Layout + Inline-Styles,
   * weil die meisten Clients kein <style> aus dem Head übernehmen.
   */
  const rowHtml = (pair: [string, string]) =>
    `<tr><td style="padding:10px 0;color:#6F6A61;font-size:13px;text-transform:uppercase;letter-spacing:.08em;width:120px;">${esc(pair[0])}</td><td style="padding:10px 0;color:#111111;font-size:16px;font-weight:600;">${escnl(pair[1])}</td></tr>`;

  const html = `<!doctype html>
<html lang="de"><body style="margin:0;padding:0;background:#E8E1D5;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#E8E1D5;padding:32px 12px;"><tr><td align="center">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#F4F0E8;border:2px solid #111111;">
    <!-- Logo-Kopf auf dunklem Grund: das Logo ist weiße Grafik und braucht einen
         dunklen Hintergrund, um sichtbar zu sein (wie auf dem Truck). -->
    <tr><td style="padding:36px 40px 28px;background:#111111;" align="center">
      <img src="cid:logo" alt="Der Landstreicher – Foodtruck &amp; Catering" width="110" height="111" style="display:block;border:0;" />
      <div style="margin-top:14px;font-family:Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:#F4F0E8;">Foodtruck &middot; Catering</div>
    </td></tr>
    <tr><td style="padding:28px 40px 8px;font-family:Arial,Helvetica,sans-serif;">
      <div style="font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:#A71919;font-weight:bold;">Buchungsanfrage</div>
      <div style="margin-top:8px;font-size:26px;font-weight:700;color:#111111;">Neue Anfrage über die Website</div>
    </td></tr>
    <tr><td style="padding:8px 40px 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;">
      ${rows.map(rowHtml).join("")}
      <tr><td colspan="2" style="padding:14px 0;"><div style="border-top:1px solid #11111126;"></div></td></tr>
      ${contact.map(rowHtml).join("")}
      <tr><td colspan="2" style="padding:14px 0;"><div style="border-top:1px solid #11111126;"></div></td></tr>
      <tr><td colspan="2" style="padding:10px 0;color:#6F6A61;font-size:13px;text-transform:uppercase;letter-spacing:.08em;">Nachricht</td></tr>
      <tr><td colspan="2" style="padding:0 0 12px;color:#111111;font-size:16px;line-height:1.6;">${values.message ? escnl(values.message) : "–"}</td></tr>
    </table></td></tr>
    <tr><td style="padding:0 40px;"><div style="border-top:2px solid #11111126;"></div></td></tr>
    <tr><td style="padding:20px 40px 32px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;color:#6F6A61;">
      Eingegangen über <strong style="color:#111111;">foodtruck-landstreicher.de</strong> &middot;
      Antwort direkt an den Absender: einfach auf diese E-Mail antworten.
    </td></tr>
  </table>
</td></tr></table>
</body></html>`;

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
  // Absender immer mit Anzeigename, z. B. „Foodtruck Landstreicher <anfrage@…>“.
  const fromAddress = (process.env.BOOKING_FROM_EMAIL ?? user ?? "").replace(/^.*<(.+)>.*/, "$1");
  const from = `Foodtruck Landstreicher <${fromAddress}>`;
  const to = (process.env.BOOKING_TO_EMAIL ?? site.email)
    // Mehrere Empfänger erlaubt – kommagetrennt, z. B.
    // BOOKING_TO_EMAIL=info@foodtruck-landstreicher.de,valimir@…
    .split(",")
    .map((addr) => addr.trim())
    .filter(Boolean)
    .join(",");

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
      html,
      attachments: [
        {
          filename: "logo-landstreicher.png",
          path: path.join(process.cwd(), "public", "brand", "logo-landstreicher.png"),
          cid: "logo",
        },
      ],
    });
  } catch (err) {
    console.error("Buchungsanfrage fehlgeschlagen", err);
    return sendError;
  }

  return { status: "success" };
}
