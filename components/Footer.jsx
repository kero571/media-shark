import Brand from "./ui/Brand";
export default function Footer({ c, lang }) {
  const soc = c.contact.social.filter((s) => s.url);
  return (
    <footer className="border-t border-gold/20 px-5 pb-10 pt-10 text-center">
      <div className="flex justify-center">
        <Brand c={c} />
      </div>
      <p
        className="mt-2 text-xs font-bold tracking-[.25em] text-gold"
        dir="ltr"
      >
        {c.brand.tagline.en}
      </p>
      <nav
        aria-label="Footer"
        className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-mute"
      >
        {c.nav.map((n) => (
          <a key={n.href} href={n.href} className="hover:text-gold2">
            {n.label[lang]}
          </a>
        ))}
      </nav>
      {soc.length > 0 && (
        <ul className="mt-4 flex justify-center gap-3">
          {soc.map((s, i) => (
            <li key={i}>
              <a
                href={s.url}
                rel="noopener noreferrer me"
                target="_blank"
                className="chip"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-6 text-xs text-mute">
        © {new Date().getFullYear()} Media Sharks. {c.footer.rights[lang]}
      </p>
    </footer>
  );
}
