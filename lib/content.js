import fs from "fs/promises";
import path from "path";
import { cache } from "react";
import { validate } from "@/lib/validate";
import { db, fbConfigured } from "@/lib/firebase";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? "https://" + process.env.VERCEL_PROJECT_PRODUCTION_URL
    : "http://localhost:3000");
// Schema upgrades (idempotent) — applied to the default file AND to content already saved in Firestore, so old data never breaks.
const upgrade = (c) => {
  const s = c.studio;
  if (s) {
    s.slides ??= [];
    if (!s.slides.length) {
      const m = s.media || s.img;
      if (m) s.slides = [m];
    }
    for (const k of ["img", "media", "cover", "ratio", "fit"]) delete s[k];
  }
  if (c.events?.items)
    c.events.items = c.events.items.map((x) => ({
      title: x.title,
      cover: x.cover ?? x.img ?? "",
      ratio: x.ratio ?? "4/3",
      fit: x.fit ?? "cover",
      gallery: x.gallery ?? [],
    }));
  return c;
};
// default content ships with the app; the dashboard's edits live in Firestore (doc site/content, field "json")
export const getDefault = cache(async () =>
  upgrade(
    JSON.parse(
      await fs.readFile(
        path.join(process.cwd(), "data", "content.default.json"),
        "utf8",
      ),
    ),
  ),
);
// keep saved edits, add new keys from the default, drop keys that no longer exist
const fill = (d, v) =>
  Array.isArray(d)
    ? Array.isArray(v)
      ? d.length && d[0] && typeof d[0] === "object"
        ? v.map((x) => fill(d[0], x))
        : v
      : d
    : d && typeof d === "object"
      ? Object.fromEntries(
          Object.keys(d).map((k) => [
            k,
            v && typeof v === "object" && k in v ? fill(d[k], v[k]) : d[k],
          ]),
        )
      : v;
export const getContent = cache(async () => {
  const d = await getDefault();
  if (!fbConfigured()) return d;
  try {
    const s = await db().doc("site/content").get();
    if (s.exists) {
      const m = fill(d, upgrade(JSON.parse(s.data().json)));
      if (validate(d, m)) return m;
    }
  } catch (e) {
    console.error("content read failed:", e.message);
  }
  return d;
});
export async function saveContent(c) {
  const ref = db().doc("site/content"),
    prev = await ref.get(),
    b = db().batch();
  if (prev.exists)
    b.set(db().doc("site/backup"), {
      json: prev.data().json,
      at: prev.data().updatedAt || null,
    });
  b.set(ref, { json: JSON.stringify(c), updatedAt: new Date().toISOString() });
  await b.commit();
}
