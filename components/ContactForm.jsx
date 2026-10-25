"use client";
import { useState, useEffect, useRef } from "react";
const f =
  "w-full rounded-xl border border-gold/30 bg-bg px-4 py-3 text-sm outline-none focus:border-gold";
const T = {
  ar: {
    ok: "تم إرسال طلبك بنجاح، سنتواصل معك قريبًا.",
    err: "تعذّر الإرسال، حاول مرة أخرى أو تواصل عبر واتساب.",
    rate: "محاولات كثيرة، حاول لاحقًا.",
    wait: "جاري الإرسال...",
  },
  en: {
    ok: "Your request was sent. We will contact you soon.",
    err: "Could not send. Please try again or contact us on WhatsApp.",
    rate: "Too many attempts, please try later.",
    wait: "Sending...",
  },
};
export default function ContactForm({ L, sectors, lang }) {
  const [st, setSt] = useState("idle"),
    t0 = useRef(0);
  useEffect(() => {
    t0.current = performance.now();
  }, []);
  async function go(e) {
    e.preventDefault();
    if (st === "busy") return;
    const form = e.currentTarget,
      d = new FormData(form);
    setSt("busy");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: d.get("name"),
          phone: d.get("phone"),
          sector: d.get("sector"),
          message: d.get("message"),
          website: d.get("company_site"),
          lang,
          ms: Math.round(performance.now() - t0.current),
        }),
      });
      if (r.ok) {
        form.reset();
        setSt("ok");
      } else setSt(r.status === 429 ? "rate" : "err");
    } catch {
      setSt("err");
    }
  }
  const t = T[lang];
  return (
    <form onSubmit={go} className="panel grid gap-3 p-5">
      <label className="grid gap-1 text-sm font-bold">
        {L.name}
        <input
          name="name"
          required
          minLength={2}
          maxLength={100}
          autoComplete="name"
          className={f}
        />
      </label>
      <label className="grid gap-1 text-sm font-bold">
        {L.phone}
        <input
          name="phone"
          required
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          maxLength={25}
          dir="ltr"
          placeholder="01XXXXXXXXX"
          className={f}
        />
      </label>
      <label className="grid gap-1 text-sm font-bold">
        {L.sector}
        <select name="sector" className={f}>
          {sectors.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 text-sm font-bold">
        {L.message}
        <textarea name="message" rows={4} maxLength={2000} className={f} />
      </label>
      <input
        name="company_site"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="sr-only"
      />
      <button
        disabled={st === "busy"}
        className="btn gold-btn disabled:opacity-60"
      >
        {st === "busy" ? t.wait : L.submit}
      </button>
      <p
        role="status"
        aria-live="polite"
        className={`text-sm ${st === "ok" ? "text-green-400" : "text-red-400"}`}
      >
        {st === "ok"
          ? t.ok
          : st === "err"
            ? t.err
            : st === "rate"
              ? t.rate
              : ""}
      </p>
    </form>
  );
}
