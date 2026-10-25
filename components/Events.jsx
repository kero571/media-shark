import Section from "./ui/Section";
import EventsClient from "./EventsClient";
export default function Events({ c, lang }) {
  const e = c.events;
  return (
    <Section id="events" tag={e.tag} title={e.title} lang={lang}>
      <EventsClient
        rtl={lang === "ar"}
        hint={lang === "ar" ? "عرض المعرض" : "Open gallery"}
        items={e.items.map((x) => ({
          title: x.title[lang],
          cover: x.cover,
          ratio: x.ratio,
          fit: x.fit,
          gallery: x.gallery,
        }))}
      />
    </Section>
  );
}
