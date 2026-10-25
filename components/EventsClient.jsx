"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Img from "./ui/Img";
import Video from "./ui/Video";
import Icon from "./ui/Icon";
import { imgW, videoSrc, posterOf } from "@/lib/media";
const isVid = (u) =>
  /\/video\/upload\//.test(u) || /\.(mp4|webm|mov)(\?|#|$)/i.test(u);
// card width follows the chosen frame ratio (wide frames get wider cards)
const W = (r) => {
  const [a, b] = r.split("/").map(Number),
    x = a / b;
  return x >= 1.7
    ? "w-72 md:w-96"
    : x > 1.2
      ? "w-60 md:w-80"
      : x > 0.9
        ? "w-48 md:w-64"
        : "w-40 md:w-56";
};
const Play = () => (
  <svg
    viewBox="0 0 24 24"
    className="ms-0.5 h-5 w-5"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M8 5v14l11-7z" />
  </svg>
);
export default function EventsClient({ items, rtl, hint }) {
  const [ev, setEv] = useState(null),
    [i, setI] = useState(0),
    [ld, setLd] = useState(false),
    d = useRef(null);
  const e = ev == null ? null : items[ev],
    list = e ? (e.gallery.length ? e.gallery : e.cover ? [e.cover] : []) : [];
  const open = (n) => {
    setEv(n);
    setI(0);
    d.current?.showModal();
  };
  const go = useCallback(
    (s) => setI((x) => (list.length ? (x + s + list.length) % list.length : 0)),
    [list.length],
  );
  useEffect(() => {
    if (ev == null) return;
    const o = document.documentElement;
    o.style.overflow = "hidden";
    const n = rtl ? -1 : 1,
      k = (x) => {
        if (x.key === "ArrowRight") go(n);
        if (x.key === "ArrowLeft") go(-n);
      };
    addEventListener("keydown", k);
    return () => {
      o.style.overflow = "";
      removeEventListener("keydown", k);
    };
  }, [ev, go, rtl]);
  const u = list[i];
  useEffect(() => setLd(false), [u]);
  return (
    <>
      <ul className="events-scrollbar -mx-5 flex snap-x items-start gap-3 overflow-x-auto px-5 pb-3">
        {items.map((x, n) => {
          const hv = x.gallery.some(isVid);
          return (
            <li key={n} className={`shrink-0 snap-start ${W(x.ratio)}`}>
              <button
                type="button"
                onClick={() => open(n)}
                aria-haspopup="dialog"
                aria-label={`${x.title} — ${hint}`}
                className="panel group block w-full overflow-hidden text-start transition duration-300 hover:-translate-y-1"
              >
                <div
                  className="relative bg-panel"
                  style={{ aspectRatio: x.ratio }}
                >
                  {x.cover ? (
                    <Img
                      src={x.cover}
                      alt={x.title}
                      fill
                      loading="lazy"
                      sizes="(min-width:768px) 384px,288px"
                      className={
                        x.fit === "contain" ? "object-contain" : "object-cover"
                      }
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-panel to-bg" />
                  )}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 grid place-items-center bg-gradient-to-t from-black/50 via-transparent to-transparent"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-black/55 text-white ring-1 ring-white/40 backdrop-blur transition duration-300 group-hover:scale-110 group-hover:bg-gold group-hover:text-black">
                      {hv ? <Play /> : <Icon n="camera" />}
                    </span>
                  </span>
                  {x.gallery.length > 0 && (
                    <span
                      aria-hidden
                      className="absolute end-2 top-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[11px] backdrop-blur"
                    >
                      <Icon n={hv ? "video" : "camera"} className="h-3 w-3" />
                      {x.gallery.length}
                    </span>
                  )}
                </div>
                <p className="p-3 text-center text-xs font-bold md:text-sm">
                  {x.title}
                </p>
              </button>
            </li>
          );
        })}
      </ul>
      <dialog
        ref={d}
        onClick={(t) => t.target === d.current && d.current.close()}
        onClose={() => setEv(null)}
        className="m-auto w-[min(96vw,980px)] max-w-none rounded-2xl border border-gold/30 bg-bg p-3 text-white backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      >
        {e && (
          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <b className="text-gold2">{e.title}</b>
              <div className="flex items-center gap-3 text-xs text-mute">
                {list.length > 0 && (
                  <span dir="ltr">
                    {i + 1} / {list.length}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => d.current.close()}
                  aria-label="Close"
                  className="grid h-8 w-8 place-items-center rounded-full bg-gold text-black"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="relative flex max-h-[68svh] min-h-[200px] items-center justify-center overflow-hidden rounded-xl bg-black">
              {u && !isVid(u) && !ld && (
                <span
                  aria-hidden
                  className="absolute inset-0 m-auto h-10 w-10 animate-spin rounded-full border-[3px] border-white/25 border-t-gold"
                />
              )}
              {u ? (
                isVid(u) ? (
                  <Video
                    key={u}
                    src={videoSrc(u)}
                    poster={posterOf(u, "") || undefined}
                    controls
                    autoPlay
                    playsInline
                    className="relative max-h-[68svh] w-full object-contain"
                  />
                ) : (
                  <img
                    key={u}
                    src={imgW(u, 1600)}
                    alt={e.title}
                    onLoad={() => setLd(true)}
                    className="relative max-h-[68svh] w-full object-contain"
                  />
                )
              ) : null}
              {list.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous"
                    className="absolute start-2 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-xl backdrop-blur rtl:-scale-x-100"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next"
                    className="absolute end-2 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-xl backdrop-blur rtl:-scale-x-100"
                  >
                    ›
                  </button>
                </>
              )}
            </div>
            {list.length > 1 && (
              <ul className="mt-2 flex gap-2 overflow-x-auto pb-1">
                {list.map((t, n) => (
                  <li key={t + n} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => setI(n)}
                      aria-label={`${n + 1}`}
                      className={`relative block h-14 w-14 overflow-hidden rounded-lg border bg-panel ${n === i ? "border-gold" : "border-line"}`}
                    >
                      {isVid(t) ? (
                        <span className="grid h-full place-items-center">
                          <Play />
                        </span>
                      ) : (
                        <img
                          src={imgW(t, 160)}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
