"use client";

import { useEffect, useState } from "react";

export default function ViewportDebug() {
  const [info, setInfo] = useState("Checking...");

  useEffect(() => {
    const update = () => {
      const hero = document.querySelector("#hero");
      const h1 = hero?.querySelector("h1");
      const vv = window.visualViewport;

      setInfo([
        `Viewport Meta: ${
          document.querySelector('meta[name="viewport"]')?.content || "MISSING"
        }`,
        `Inner Width: ${window.innerWidth}`,
        `Inner Height: ${window.innerHeight}`,
        `Client Width: ${document.documentElement.clientWidth}`,
        `Screen Width: ${window.screen.width}`,
        `Device Pixel Ratio: ${window.devicePixelRatio}`,
        `Visual Scale: ${vv?.scale ?? "N/A"}`,
        `Visual Width: ${vv?.width ?? "N/A"}`,
        `Hero Width: ${hero?.getBoundingClientRect().width ?? "N/A"}`,
        `H1 Font Size: ${
          h1 ? getComputedStyle(h1).fontSize : "N/A"
        }`,
      ].join("\n"));
    };

    update();

    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);

    return () => {
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, []);

  return (
    <pre
      dir="ltr"
      className="fixed bottom-2 left-2 z-[99999] max-w-[95vw] whitespace-pre-wrap rounded-lg bg-black p-3 text-[10px] leading-5 text-green-400 shadow-2xl pointer-events-none"
    >
      {info}
    </pre>
  );
}