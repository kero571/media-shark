import { getContent, SITE_URL as u } from "@/lib/content";

export async function GET() {
  const c = await getContent();
  const base = u.replace(/\/$/, ""); // نتأكد مفيش slash زيادة
  const wa = `https://wa.me/${c.contact.whatsapp}`;

  const head =
    `# Media Sharks\n\n` +
    `> Egyptian content, digital marketing & media production company. ` +
    `Founder: ${c.about.founderName.en}. Studio: SHARKS STUDIOS (since 2024).\n\n`;

  const sections = ["ar", "en"]
    .map((l) => {
      const t = (v) => v[l];
      const isAr = l === "ar";

      // لينكات الصفحات (من الـ nav)
      const pages = c.nav
        .map((n) => `- [${t(n.label)}](${base}/${l}${n.href})`)
        .join("\n");

      const services = c.services.groups
        .map(
          (g) =>
            `### ${t(g.title)}\n` +
            g.items.map((i) => `- ${t(i)}`).join("\n"),
        )
        .join("\n\n");

      const sectors = c.sectors.items
        .map((i) => `- ${t(i.label)}`)
        .join("\n");

      const faq = c.faq.items
        .map((f) => `- **${t(f.q)}**: ${t(f.a)}`)
        .join("\n");

      return (
        `## ${isAr ? "العربية" : "English"}\n\n` +
        `${t(c.seo.description)}\n\n` +
        `[${t(c.brand.tagline)}](${base}/${l})\n\n` +
        `### ${isAr ? "الصفحات" : "Pages"}\n${pages}\n\n` +
        `## ${t(c.services.title)}\n\n${services}\n\n` +
        `## ${t(c.sectors.title)}\n\n${sectors}\n\n` +
        `## ${isAr ? "أسئلة شائعة" : "FAQ"}\n\n${faq}`
      );
    })
    .join("\n\n");

  const contact =
    `\n\n## Contact\n\n` +
    `- [WhatsApp](${wa}): +${c.contact.whatsapp}\n` +
    `- [Email](mailto:${c.contact.email}): ${c.contact.email}\n` +
    `- Address: ${c.contact.address.en}, ${c.contact.city.en}, Egypt\n`;

  return new Response(head + sections + contact, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}