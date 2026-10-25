import Img from "./ui/Img";
import Icon from "./ui/Icon";
export default function Hero({ c, lang }) {
  const h = c.hero,
    t = (v) => v[lang];
  const wa = `https://wa.me/${c.contact.whatsapp}?text=${encodeURIComponent(t(c.ui.whatsappMsg))}`;
  return (
    <header id="hero" className="relative mx-auto grid h-[calc(100svh-var(--nav))] min-h-[460px] max-w-6xl overflow-hidden lg:grid-cols-2">
      <div className="absolute inset-0 lg:relative lg:order-2">
        <Img
          src={h.photo}
          alt={t(h.photoAlt)}
          fill
          priority
          fetchPriority="high"
          quality={72}
          sizes="(min-width:1024px) 50vw,100vw"
          className="object-cover object-[50%_10%]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent"
        />
      </div>
      <span
        className="chip absolute start-4 top-3 z-10 bg-bg/70 backdrop-blur"
        dir="ltr"
      >
        {t(h.badge)}
      </span>
      <div className="hero-in relative z-10 flex flex-col items-center justify-end gap-[1.5svh] px-4 pb-5 text-center lg:items-start lg:justify-center lg:px-10 lg:pb-0 lg:text-start">
        <span className="panel px-3 py-1 text-xs font-bold text-gold2">
          {t(h.chip)}
        </span>
        <h1
          className="
    flex flex-col gap-2
    text-[clamp(1.9rem,5.4svh,3.1rem)]
    font-extrabold
    leading-[1.5]
    lg:text-[clamp(2.4rem,7.5svh,4.4rem)]
    lg:leading-[1.4]
  "
        >
          <span>{t(h.title1)}</span>

          <span className="gold-text block">{t(h.title2)}</span>
        </h1>
        <p className="max-w-md text-[clamp(.8rem,1.9svh,1rem)] text-white/80 lg:text-mute">
          {t(h.desc)}
        </p>
        <div className="mt-1 flex w-full max-w-md gap-2">
          <a
            href="#contact"
            rel="noopener"
            className="btn gold-btn flex-1 !px-2 text-[13px] leading-tight sm:text-sm"
          >
            <Icon n="whatsapp" className="h-4 w-4 shrink-0" />
            {t(h.ctaWa)}
          </a>
          <a
            href="#events"
            className="btn flex-1 border border-gold/50 !px-2 text-[13px] leading-tight text-gold2 sm:text-sm"
          >
            {t(h.ctaWork)}
          </a>
        </div>
      </div>
    </header>
  );
}
