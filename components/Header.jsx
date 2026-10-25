import Brand from "./ui/Brand";
import MobileMenu from "./MobileMenu";
export default function Header({ c, lang }) {
  const o = lang === "ar" ? "en" : "ar";
  const links = c.nav.map((n) => ({ href: n.href, label: n.label[lang] }));
  return (
    <div className="sticky top-0 z-40 border-b border-gold/20 bg-bg/90 backdrop-blur">
      <div className="mx-auto flex h-[var(--nav)] max-w-6xl items-center justify-between gap-3 px-4">
        <a href="#top" aria-label="Media Sharks">
          <Brand c={c} size={26} compact priority />
        </a>
        <nav
          aria-label="Main"
          className="hidden items-center gap-6 text-sm font-semibold text-mute lg:flex"
        >
          {links.map((n) => (
            <a key={n.href} href={n.href} className="hover:text-gold2">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={"/" + o} hrefLang={o} lang={o} className="chip !py-1.5">
            {c.ui.langSwitch[lang]}
          </a>
          <MobileMenu links={links} label={c.ui.menu[lang]} />
        </div>
      </div>
    </div>
  );
}
