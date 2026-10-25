import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import { jsonLd } from "@/lib/seo";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Sectors from "@/components/Sectors";
import Services from "@/components/Services";
import Studio from "@/components/Studio";
import Events from "@/components/Events";
import Clients from "@/components/Clients";
import Workflow from "@/components/Workflow";
import Advantages from "@/components/Advantages";
import About from "@/components/About";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
export const dynamicParams = false;
export const revalidate = 3600;
export const generateStaticParams = () => [{ lang: "ar" }, { lang: "en" }];
export default async function Page({ params }) {
  const { lang } = await params;
  if (!["ar", "en"].includes(lang)) notFound();
  const c = await getContent();
  const p = { c, lang };
  return (
    <>
      <Header {...p} />
      <main id="top">
        <Hero {...p} />
        <Stats {...p} />
        <Sectors {...p} />
        <Services {...p} />
        <Studio {...p} />
        <Events {...p} />
        <Clients {...p} />
        <Workflow {...p} />
        <Advantages {...p} />
        <About {...p} />
        <Faq {...p} />
        <Contact {...p} />
      </main>
      <Footer {...p} />
      <WhatsAppFab {...p} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd(c, lang)).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
