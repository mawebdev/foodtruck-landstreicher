"use client";

import { useActionState, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { submitInquiry, type InquiryField, type InquiryState } from "@/app/foodtruck-buchen/actions";
import { eventOptions } from "@/content/events";
import { site } from "@/lib/site";
import { Arrow } from "./Button";

const steps: { no: string; title: string; hint: string; fields: InquiryField[] }[] = [
  { no: "01", title: "Wann findet euer Event statt?", hint: "Ein ungefähres Datum reicht erst mal.", fields: ["date"] },
  { no: "02", title: "Wo?", hint: "Ort oder Location – gern mit Postleitzahl.", fields: ["location"] },
  { no: "03", title: "Wie viele Gäste?", hint: "Eine grobe Schätzung ist völlig in Ordnung.", fields: ["guests"] },
  { no: "04", title: "Was plant ihr?", hint: "Anlass und alles, was wir wissen sollten.", fields: ["eventType", "message"] },
  { no: "05", title: "Wie erreichen wir euch?", hint: "Wir melden uns mit Verfügbarkeit und einem Angebot.", fields: ["name", "email", "phone"] },
];

const initial: InquiryState = { status: "idle" };

/** noop-Subscribe für useSyncExternalStore – nur um „auf dem Client?“ abzuleiten */
const emptySubscribe = () => () => {};

const inputBase =
  "mt-2 block w-full rounded-xs border border-ink/25 bg-cream px-4 py-3.5 text-lg text-ink placeholder:text-muted/70 transition-colors focus:border-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-red aria-[invalid=true]:border-red";

function Field({ id, label, error, children, optional }: { id: string; label: string; error?: string; children: ReactNode; optional?: boolean }) {
  return (
    <div>
      <label htmlFor={id} className="font-semibold">
        {label}
        {optional ? <span className="ml-2 text-sm font-normal text-muted">optional</span> : <span className="text-red"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm font-semibold text-red">
          {error}
        </p>
      )}
    </div>
  );
}

export function BookingForm() {
  const [state, formAction, pending] = useActionState(submitInquiry, initial);
  // „bin ich auf dem Client?“ – ohne setState im Effect (Min-Datum, Fortschritt, fieldsets)
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const minDate = mounted
    ? (() => {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      })()
    : undefined;
  const [current, setCurrent] = useState(0);
  /** letzter vom Server gemeldeter Fehlerstand – um Sprünge während des Renderns zu deduplizieren */
  const [lastErrorState, setLastErrorState] = useState<InquiryState | null>(null);
  const [clientErrors, setClientErrors] = useState<InquiryState["fieldErrors"]>({});
  const formRef = useRef<HTMLFormElement>(null);
  const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const successRef = useRef<HTMLDivElement>(null);
  const didNavigate = useRef(false);

  // Serverfehler: zum ersten Schritt mit Fehler springen – als Anpassung während
  // des Renderns (guard über lastErrorState) statt setState im Effect.
  if (state.status === "error" && state.fieldErrors && state !== lastErrorState) {
    setLastErrorState(state);
    const idx = steps.findIndex((s) => s.fields.some((f) => state.fieldErrors?.[f]));
    if (idx >= 0 && idx !== current) setCurrent(idx);
  }

  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
  }, [state]);

  useEffect(() => {
    if (!didNavigate.current) return;
    headingRefs.current[current]?.focus();
  }, [current]);

  const errors = { ...state.fieldErrors, ...clientErrors };
  const v = state.values ?? {};

  function validateStep(index: number) {
    const form = formRef.current;
    if (!form) return true;
    const data = new FormData(form);
    const next: InquiryState["fieldErrors"] = {};
    for (const f of steps[index].fields) {
      const value = String(data.get(f) ?? "").trim();
      if (f === "date" && !value) next.date = "Bitte gebt ein Datum an.";
      if (f === "location" && value.length < 2) next.location = "Wo findet euer Event statt?";
      if (f === "guests" && (!value || Number(value) < 1)) next.guests = "Bitte gebt eine ungefähre Gästezahl an.";
      if (f === "name" && value.length < 2) next.name = "Wie heißt ihr?";
      if (f === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) next.email = "Bitte prüft die E-Mail-Adresse.";
    }
    setClientErrors(next);
    return Object.keys(next).length === 0;
  }

  function go(to: number) {
    if (to > current && !validateStep(current)) return;
    didNavigate.current = true;
    setClientErrors({});
    setCurrent(to);
  }

  if (state.status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} className="rounded-xs border border-ink/15 bg-cream p-8 outline-none md:p-12" role="status">
        <p className="label text-red">Anfrage ist raus</p>
        <p className="font-display mt-4 text-[clamp(2.6rem,7vw,4.5rem)] uppercase">Danke! Wir melden uns.</p>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink/80">
          Eure Anfrage ist bei uns angekommen. Wir schauen, ob der Termin frei ist, und melden uns mit einer Rückmeldung zu Verfügbarkeit und Kosten.
        </p>
        {/* TODO: Betreiber nach typischer Antwortzeit fragen und hier nennen. */}
        <p className="mt-4 text-ink/70">
          Falls noch etwas einfällt: <a className="prose-link" href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </div>
    );
  }

  const isLast = current === steps.length - 1;

  return (
    <form ref={formRef} action={formAction} noValidate={mounted} className="relative" aria-describedby="form-note">
      {/* Fortschritt */}
      {mounted && (
        <div className="mb-10">
          <ol className="flex items-center gap-2 text-sm font-bold" aria-label="Fortschritt">
            {steps.map((s, i) => (
              <li key={s.no} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => i < current && go(i)}
                  disabled={i > current}
                  aria-current={i === current ? "step" : undefined}
                  className={`min-h-11 min-w-11 rounded-xs px-1 transition-colors ${
                    i === current ? "text-red" : i < current ? "text-ink hover:text-red" : "text-ink/35"
                  }`}
                >
                  <span className="sr-only">Schritt </span>
                  {s.no}
                </button>
                {i < steps.length - 1 && <span aria-hidden className={`h-px w-4 sm:w-8 ${i < current ? "bg-ink" : "bg-ink/20"}`} />}
              </li>
            ))}
          </ol>
          <p className="sr-only" aria-live="polite">
            Schritt {current + 1} von {steps.length}: {steps[current].title}
          </p>
        </div>
      )}

      <div className="hidden" aria-hidden>
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {steps.map((step, i) => (
        <fieldset key={step.no} hidden={mounted && i !== current} className="mb-12 last-of-type:mb-0">
          <legend className="contents">
            <span className="label text-muted">{step.no} / 05</span>
            <h2
              ref={(el) => {
                headingRefs.current[i] = el;
              }}
              tabIndex={-1}
              className="font-display mt-3 text-[clamp(2.4rem,6vw,4rem)] uppercase outline-none"
            >
              {step.title}
            </h2>
            <span className="mt-2 block text-ink/70">{step.hint}</span>
          </legend>

          <div className="mt-8 grid gap-6">
            {step.fields.includes("date") && (
              <Field id="date" label="Datum" error={errors.date}>
                <input
                  id="date"
                  name="date"
                  type="date"
                  required
                  min={minDate}
                  defaultValue={v.date}
                  aria-invalid={!!errors.date}
                  aria-describedby={errors.date ? "date-error" : undefined}
                  className={inputBase}
                />
              </Field>
            )}
            {step.fields.includes("location") && (
              <Field id="location" label="Veranstaltungsort" error={errors.location}>
                <input
                  id="location"
                  name="location"
                  type="text"
                  required
                  autoComplete="address-level2"
                  placeholder="z. B. Hof Müller, 96215 Lichtenfels"
                  defaultValue={v.location}
                  aria-invalid={!!errors.location}
                  aria-describedby={errors.location ? "location-error" : undefined}
                  className={inputBase}
                />
              </Field>
            )}
            {step.fields.includes("guests") && (
              <Field id="guests" label="Personenzahl" error={errors.guests}>
                <input
                  id="guests"
                  name="guests"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  required
                  placeholder="z. B. 80"
                  defaultValue={v.guests}
                  aria-invalid={!!errors.guests}
                  aria-describedby={errors.guests ? "guests-error" : undefined}
                  className={`${inputBase} max-w-xs`}
                />
              </Field>
            )}
            {step.fields.includes("eventType") && (
              <div role="radiogroup" aria-labelledby="eventType-label">
                <p id="eventType-label" className="font-semibold">
                  Art der Veranstaltung <span className="ml-2 text-sm font-normal text-muted">optional</span>
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {eventOptions.map((opt) => (
                    <label key={opt} className="cursor-pointer">
                      <input type="radio" name="eventType" value={opt} defaultChecked={v.eventType === opt} className="peer sr-only" />
                      <span className="inline-flex min-h-11 items-center rounded-xs border border-ink/25 px-4 font-semibold transition-colors hover:border-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-cream peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-red">
                        {opt}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.eventType && <p className="mt-2 text-sm font-semibold text-red">{errors.eventType}</p>}
              </div>
            )}
            {step.fields.includes("message") && (
              <Field id="message" label="Weitere Informationen" optional error={errors.message}>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  maxLength={3000}
                  placeholder="Zeitrahmen, Wünsche fürs Menü, vegetarische Gäste, Besonderheiten der Location …"
                  defaultValue={v.message}
                  className={inputBase}
                />
              </Field>
            )}
            {step.fields.includes("name") && (
              <Field id="name" label="Name" error={errors.name}>
                <input id="name" name="name" type="text" required autoComplete="name" defaultValue={v.name} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} className={inputBase} />
              </Field>
            )}
            {step.fields.includes("email") && (
              <Field id="email" label="E-Mail" error={errors.email}>
                <input id="email" name="email" type="email" required autoComplete="email" inputMode="email" defaultValue={v.email} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} className={inputBase} />
              </Field>
            )}
            {step.fields.includes("phone") && (
              <Field id="phone" label="Telefon" optional>
                <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" defaultValue={v.phone} className={inputBase} />
              </Field>
            )}
          </div>
        </fieldset>
      ))}

      {state.status === "error" && state.message && (
        <p role="alert" className="mt-8 rounded-xs border-l-4 border-red bg-paper px-4 py-3 font-semibold">
          {state.message}
        </p>
      )}

      <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        {mounted && current > 0 ? (
          <button type="button" onClick={() => go(current - 1)} className="min-h-12 px-2 text-left font-semibold text-ink/70 hover:text-ink">
            <span aria-hidden>←</span> Zurück
          </button>
        ) : (
          <span />
        )}
        {mounted && !isLast ? (
          <button type="button" onClick={() => go(current + 1)} className="group/btn inline-flex min-h-12 items-center justify-center gap-3 rounded-xs bg-ink px-7 font-bold text-cream transition-colors hover:bg-red">
            Weiter <Arrow />
          </button>
        ) : (
          <button
            type="submit"
            disabled={pending}
            onClick={(e) => {
              if (mounted && !validateStep(current)) e.preventDefault();
            }}
            className="group/btn inline-flex min-h-12 items-center justify-center gap-3 rounded-xs bg-red px-7 font-bold text-cream transition-colors hover:bg-red-dark disabled:opacity-60"
          >
            {pending ? "Wird gesendet …" : "Anfrage senden"} <Arrow />
          </button>
        )}
      </div>

      <p id="form-note" className="mt-8 text-sm leading-relaxed text-ink/60">
        Mit * markierte Felder brauchen wir für ein Angebot. Eure Angaben nutzen wir nur, um eure Anfrage zu beantworten – mehr dazu in der{" "}
        <a href="/datenschutz" className="prose-link">Datenschutzerklärung</a>.
      </p>
    </form>
  );
}
