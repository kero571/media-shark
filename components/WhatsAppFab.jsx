"use client";

import { useEffect, useState } from "react";
import Icon from "./ui/Icon";

export default function WhatsAppFab({ c, lang }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");

    if (!hero) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  if (!isVisible) return null;

  return (
    <a
      href={`https://wa.me/${c.contact.whatsapp}?text=${encodeURIComponent(
        c.ui.whatsappMsg[lang]
      )}`}
      rel="noopener"
      aria-label={c.ui.whatsappAria[lang]}
      className="fab fixed bottom-10 end-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg"
    >
      <Icon n="whatsapp" className="h-7 w-7" />
    </a>
  );
}