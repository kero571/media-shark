"use client";
import { useState } from "react";
import Image from "next/image";
// Cloudinary images are optimised by Cloudinary; if that URL ever fails we retry the original file.
// Non-priority images show a pulsing skeleton and fade in when loaded; a failed image shows a ⚠ box instead of an empty hole.
const loader = ({ src, width, quality }) =>
  src.replace(
    "/upload/",
    `/upload/f_auto,q_${quality || "auto"},c_limit,w_${width}/`,
  );
export default function Img({ src, className = "", priority, fill, ...p }) {
  const [st, setSt] = useState(0); // 0 loading · 1 loaded · 2 retrying original · 3 failed
  const cl = src?.startsWith("https://res.cloudinary.com/"),
    shown = st === 1 || !!priority;
  if (st === 3)
    return (
      <span
        role="img"
        aria-label={p.alt}
        className={`${fill ? "absolute inset-0" : ""} grid place-items-center bg-white/5 text-xs text-mute`}
      >
        ⚠
      </span>
    );
  const q = {
    ...p,
    fill,
    priority,
    className: `${className} transition-opacity duration-500 ${shown ? "opacity-100" : "opacity-0"}`,
    onLoad: () => setSt(1),
    onError: () => setSt(cl && st === 0 ? 2 : 3),
  };
  return (
    <>
      {fill && !shown && (
        <span
          aria-hidden
          className="absolute inset-0 animate-pulse bg-white/5"
        />
      )}
      {cl && st !== 2 ? (
        <Image key="o" src={src} loader={loader} {...q} />
      ) : (
        <Image key="r" src={src} unoptimized={cl} {...q} />
      )}
    </>
  );
}
