import Section from "./ui/Section";
import Icon from "./ui/Icon";
import ContactForm from "./ContactForm";
export default function Contact({ c, lang }) {
  const s = c.contactSection,
    t = (v) => v[lang],
    k = c.contact;
  const L = Object.fromEntries(
    Object.entries(s.labels).map(([a, b]) => [a, t(b)]),
  );
  const rows = [
    ["phone", k.phone, "tel:+" + k.whatsapp, true],
    ["mail", k.email, "mailto:" + k.email, true],
    ["pin", t(k.address) + "، " + t(k.city), null],
  ];
  return (
    <Section id="contact" tag={s.tag} title={s.title} lang={lang}>
      <p className="-mt-5 mb-6 text-center text-sm text-mute">{t(s.desc)}</p>
      <div className="grid gap-4 md:grid-cols-2">
        <ContactForm L={L} sectors={s.sectors.map(t)} lang={lang} />
        <ul className="grid content-start gap-3">
          {rows.map(([i, v, h, ltr], n) => (
            <li key={n} className="panel p-4">
              <a
                {...(h ? { href: h } : {})}
                className="flex items-center gap-3 text-sm font-bold"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gold/40 text-gold">
                  <Icon n={i} />
                </span>
                <span dir={ltr ? "ltr" : undefined}>{v}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
