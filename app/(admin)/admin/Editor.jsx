"use client";
import { useState } from "react";
import { ICONS } from "@/components/ui/Icon";
const TAB = {
  seo: "SEO",
  brand: "الهوية",
  contact: "بيانات التواصل",
  nav: "القائمة",
  ui: "نصوص عامة",
  hero: "الواجهة",
  stats: "الأرقام",
  sectors: "القطاعات",
  services: "الخدمات",
  studio: "الاستوديو",
  events: "الفعاليات",
  clients: "العملاء",
  workflow: "خطوات العمل",
  advantages: "المميزات",
  about: "من نحن",
  faq: "الأسئلة الشائعة",
  contactSection: "قسم التواصل",
  footer: "الفوتر",
};
const KEY = {
  slides: "شرائح الكاروسيل — صور وفيديوهات (بالترتيب، متعددة)",
  title: "العنوان",
  desc: "الوصف",
  description: "الوصف",
  tag: "الوسم",
  items: "العناصر",
  label: "النص",
  value: "القيمة",
  name: "الاسم",
  img: "الصورة",
  photo: "الصورة",
  logo: "اللوجو",
  icon: "الأيقونة",
  steps: "الخطوات",
  groups: "المجموعات",
  chips: "الوسوم",
  goals: "الأهداف",
  q: "السؤال",
  a: "الإجابة",
  sub: "نص فرعي",
  keywords: "الكلمات المفتاحية (مفصولة بفاصلة)",
  phone: "الهاتف",
  whatsapp: "واتساب (بصيغة دولية بدون +)",
  email: "الإيميل",
  address: "العنوان",
  city: "المدينة",
  url: "الرابط",
  href: "الرابط",
  text: "النص",
  bio: "نبذة",
  role: "الوظيفة",
  cta: "نص الزر",
  note: "ملاحظة",
  stats: "الأرقام",
  social: "السوشيال ميديا",
  sectors: "الخيارات",
  labels: "عناوين الحقول",
  pillars: "الركائز",
  vision: "الرؤية",
  slogan: "الشعار",
  since: "منذ",
  brand: "اسم الاستوديو",
  imgAlt: "وصف الصورة/الفيديو",
  photoAlt: "وصف الصورة",
  media: "صورة أو فيديو",
  ratio: "أبعاد الإطار",
  fit: "طريقة الملء",
  poster: "صورة الغلاف",
  cover: "صورة الغلاف (Cover)",
  gallery: "معرض الفعالية — صور وفيديوهات (تظهر عند الضغط على الفعالية)",
};
const SEL = {
  ratio: [
    ["16/9", "عريض 16:9"],
    ["21/9", "سينمائي 21:9"],
    ["4/3", "4:3"],
    ["1/1", "مربع 1:1"],
    ["3/4", "طولي 3:4"],
    ["9/16", "طولي 9:16 (ريلز)"],
  ],
  fit: [
    ["cover", "ملء الإطار (قد يقص الأطراف)"],
    ["contain", "عرض كامل بدون قص"],
  ],
  icon: Object.keys(ICONS).map((i) => [i, i]),
};
const isMedia = (k) =>
  k === "media" || /^(img|photo|logo|poster|cover)$/.test(k);
const isVid = (u) =>
  /\/video\/upload\//.test(u) || /\.(mp4|webm|mov)(\?|#|$)/i.test(u);
const AI =
  "image/jpeg,image/png,image/webp,image/avif,.jpg,.jpeg,.png,.webp,.avif";
const AM = AI + ",video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov,.m4v";
const isB = (v) =>
  v &&
  typeof v === "object" &&
  !Array.isArray(v) &&
  Object.keys(v).length === 2 &&
  "ar" in v &&
  "en" in v;
const blank = (v) =>
  isB(v)
    ? { ar: "", en: "" }
    : Array.isArray(v)
      ? v.length
        ? [blank(v[0])]
        : []
      : v && typeof v === "object"
        ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, blank(x)]))
        : "";
const inp =
  "w-full rounded-lg border border-gold/30 bg-bg px-3 py-2 text-sm outline-none focus:border-gold";
const Txt = ({ v, on, dir }) =>
  v.length > 70 || v.includes("\n") ? (
    <textarea
      dir={dir}
      rows={Math.min(8, Math.ceil(v.length / 55) + 1)}
      value={v}
      onChange={(e) => on(e.target.value)}
      className={inp}
    />
  ) : (
    <input
      dir={dir}
      value={v}
      onChange={(e) => on(e.target.value)}
      className={inp}
    />
  );
// Direct upload to Cloudinary (image or video; "media" auto-detects from the chosen file) with progress.
function up(f, kind, on, prog) {
  return new Promise(async (res) => {
    window.__up = (window.__up || 0) + 1;
    const done = () => {
      window.__up--;
      prog(0);
      res();
    };
    const k =
      kind === "media"
        ? f.type.startsWith("video/") || /\.(mp4|webm|mov|m4v)$/i.test(f.name)
          ? "video"
          : "image"
        : kind;
    if (f.size > (k === "video" ? 100e6 : 10e6)) {
      alert(
        k === "video" ? "الحد الأقصى للفيديو 100MB" : "الحد الأقصى للصورة 10MB",
      );
      return done();
    }
    const r = await fetch("/api/upload-sign", {
      method: "POST",
      body: JSON.stringify({ kind: k }),
    });
    if (!r.ok) {
      alert("غير مصرح أو Cloudinary غير مُعدّ");
      return done();
    }
    const s = await r.json();
    const d = new FormData();
    d.append("file", f);
    ["api_key", "timestamp", "signature", "folder", "allowed_formats"].forEach(
      (x) => d.append(x, s[x]),
    );
    const x = new XMLHttpRequest();
    x.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${s.cloud_name}/${k}/upload`,
    );
    x.upload.onprogress = (e) =>
      e.lengthComputable &&
      prog(Math.max(1, Math.round((e.loaded / e.total) * 99)));
    x.onload = () => {
      try {
        const j = JSON.parse(x.responseText);
        j.secure_url
          ? on(j.secure_url)
          : alert("فشل الرفع: " + (j.error?.message || ""));
      } catch {
        alert("فشل الرفع");
      }
      done();
    };
    x.onerror = () => {
      alert("فشل الرفع");
      done();
    };
    x.send(d);
  });
}
function Up({ kind, on, text }) {
  const [p, setP] = useState(0);
  return (
    <label className="btn cursor-pointer border border-gold/40 text-xs">
      <input
        type="file"
        hidden
        accept={kind === "media" ? AM : AI}
        onChange={(e) => {
          const f = e.target.files[0];
          e.target.value = "";
          f && up(f, kind, on, setP);
        }}
      />
      {p ? `جاري الرفع ${p}%` : text}
    </label>
  );
}
function Media({ lab, k, s, on }) {
  return (
    <div className="grid gap-2 text-xs text-gold2">
      <span>{lab}</span>
      {s ? (
        isVid(s) ? (
          <video
            src={s}
            controls
            preload="metadata"
            className="max-h-48 w-auto max-w-full rounded-lg"
          />
        ) : (
          <img
            src={s}
            alt=""
            className="max-h-48 w-auto max-w-full rounded-lg object-cover"
          />
        )
      ) : (
        <span className="text-mute">لا يوجد ملف</span>
      )}
      <div className="flex flex-wrap gap-2">
        <Up
          kind={k === "media" ? "media" : "image"}
          on={on}
          text={
            s ? "استبدال" : k === "media" ? "رفع صورة أو فيديو" : "رفع صورة"
          }
        />
        {(k === "media" || k === "cover") && s && (
          <button
            type="button"
            onClick={() => confirm("إزالة الملف من القسم؟") && on("")}
            className="btn border border-red-400/40 text-xs text-red-400"
          >
            إزالة
          </button>
        )}
      </div>
    </div>
  );
}
const Sm = ({ children, ...p }) => (
  <button
    type="button"
    {...p}
    className="rounded-md border border-gold/30 px-2 py-0.5 text-xs disabled:opacity-30"
  >
    {children}
  </button>
);
function Gallery({
  lab,
  v,
  on,
  empty = "لا توجد ملفات بعد — عند الضغط على الفعالية سيظهر الغلاف فقط",
}) {
  const [p, setP] = useState("");
  async function add(fl) {
    let cur = v;
    for (let i = 0; i < fl.length; i++) {
      await up(
        fl[i],
        "media",
        (u) => {
          cur = [...cur, u];
          on(cur);
        },
        (x) => setP(`${i + 1}/${fl.length}${x ? " · " + x + "%" : ""}`),
      );
    }
    setP("");
  }
  const mv = (i, d) => {
    const b = [...v];
    [b[i], b[i + d]] = [b[i + d], b[i]];
    on(b);
  };
  return (
    <div className="grid gap-2 text-xs text-gold2">
      <span>{lab}</span>
      {v.length === 0 && <span className="text-mute">{empty}</span>}
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {v.map((u, i) => (
          <li
            key={u + i}
            className="rounded-lg border border-gold/20 bg-bg p-1"
          >
            {isVid(u) ? (
              <video
                src={u}
                preload="metadata"
                muted
                className="aspect-square w-full rounded object-cover"
              />
            ) : (
              <img
                src={u}
                alt=""
                className="aspect-square w-full rounded object-cover"
              />
            )}
            <div className="mt-1 flex flex-wrap justify-between gap-1">
              <span className="flex gap-1">
                <Sm disabled={i === 0} onClick={() => mv(i, -1)}>
                  قبل
                </Sm>
                <Sm disabled={i === v.length - 1} onClick={() => mv(i, 1)}>
                  بعد
                </Sm>
              </span>
              <Sm
                onClick={() =>
                  confirm("حذف هذا الملف؟") && on(v.filter((_, j) => j !== i))
                }
              >
                حذف
              </Sm>
            </div>
          </li>
        ))}
      </ul>
      <label className="btn cursor-pointer border border-gold/40 text-xs">
        <input
          type="file"
          hidden
          multiple
          accept={AM}
          onChange={(e) => {
            const fl = [...e.target.files];
            e.target.value = "";
            fl.length && add(fl);
          }}
        />
        {p
          ? `جاري الرفع ${p}`
          : "+ رفع صور / فيديوهات (يمكن اختيار أكثر من ملف)"}
      </label>
    </div>
  );
}
function Node({ k, v, on, del }) {
  const lab = /^\d+$/.test(k) ? "#" + k : (KEY[k] ?? k);
  const X = del && (
    <button
      type="button"
      onClick={() => confirm("حذف هذا العنصر؟") && del()}
      className="text-xs text-red-400"
    >
      حذف ✕
    </button>
  );
  if ((k === "gallery" || k === "slides") && Array.isArray(v))
    return (
      <Gallery
        lab={lab}
        v={v}
        on={on}
        empty={
          k === "slides"
            ? "لا توجد شرائح — سيظهر الصورة/الفيديو القديم إن وُجد"
            : undefined
        }
      />
    );
  if (isB(v))
    return (
      <div className="grid gap-1">
        <div className="flex justify-between text-xs text-gold2">
          <span>{lab}</span>
          {X}
        </div>
        <div className="grid gap-2 md:grid-cols-2">
          <Txt dir="rtl" v={v.ar} on={(x) => on({ ...v, ar: x })} />
          <Txt dir="ltr" v={v.en} on={(x) => on({ ...v, en: x })} />
        </div>
      </div>
    );
  if (Array.isArray(v))
    return (
      <fieldset className="grid gap-3 rounded-xl border border-gold/20 p-3">
        <legend className="px-2 text-sm font-bold text-gold">{lab}</legend>
        {v.map((x, i) => (
          <div key={i} className="rounded-lg bg-white/[.03] p-3">
            <Node
              k={String(i + 1)}
              v={x}
              on={(n) => on(v.map((y, j) => (j === i ? n : y)))}
              del={() => on(v.filter((_, j) => j !== i))}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => on([...v, blank(v[0])])}
          className="btn border border-gold/40 text-gold2"
        >
          + إضافة
        </button>
      </fieldset>
    );
  if (v && typeof v === "object")
    return (
      <div className="grid gap-3">
        {(del || !/^\d+$/.test(k)) && (
          <div className="flex justify-between text-xs text-gold2">
            <span>{lab}</span>
            {X}
          </div>
        )}
        {Object.entries(v).map(([kk, x]) => (
          <Node key={kk} k={kk} v={x} on={(n) => on({ ...v, [kk]: n })} />
        ))}
      </div>
    );
  const s = String(v ?? "");
  if (isMedia(k)) return <Media lab={lab} k={k} s={s} on={on} />;
  return (
    <label className="grid gap-1 text-xs text-gold2">
      <span className="flex justify-between">
        {lab}
        {X}
      </span>
      {SEL[k] ? (
        <select value={s} onChange={(e) => on(e.target.value)} className={inp}>
          {SEL[k].map(([o, t]) => (
            <option key={o} value={o}>
              {t}
            </option>
          ))}
        </select>
      ) : (
        <Txt dir="auto" v={s} on={on} />
      )}
    </label>
  );
}
export default function Editor({ initial }) {
  const [d, setD] = useState(() =>
    initial.studio && !initial.studio.slides
      ? { ...initial, studio: { ...initial.studio, slides: [] } }
      : initial,
  );
  const [tab, setTab] = useState("hero");
  const [msg, setMsg] = useState("");
  const keys = Object.keys(TAB).filter((k) => k in d);
  async function save() {
    if (window.__up > 0)
      return setMsg("⏳ انتظر انتهاء رفع الملفات ثم اضغط حفظ");
    setMsg("جاري الحفظ...");
    const r = await fetch("/api/content", {
      method: "POST",
      body: JSON.stringify(d),
    });
    if (r.status === 401) return location.reload();
    setMsg(
      r.ok
        ? "تم الحفظ ✓ — الموقع تحدّث"
        : r.status === 400
          ? "بيانات غير صالحة (تأكد من الروابط وعدم ترك عناصر ناقصة)"
          : r.status === 429
            ? "محاولات كثيرة، انتظر قليلاً"
            : "فشل الحفظ",
    );
  }
  async function out() {
    await fetch("/api/login", { method: "DELETE" });
    location.reload();
  }
  return (
    <div className="mx-auto max-w-5xl p-4 pb-28">
      <header className="sticky top-0 z-10 -mx-4 mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-gold/20 bg-bg/90 p-3 backdrop-blur">
        <h1 className="gold-text text-xl font-extrabold">
          لوحة تحكم Media Sharks
        </h1>
        <div className="flex items-center gap-2 text-xs">
          <span role="status">{msg}</span>
          <a href="/admin/messages" className="chip !border-gold !text-gold2">
            الرسائل
          </a>
          <a href="/ar" target="_blank" className="chip">
            AR
          </a>
          <a href="/en" target="_blank" className="chip">
            EN
          </a>
          <button onClick={out} className="chip">
            خروج
          </button>
          <button onClick={save} className="btn gold-btn">
            حفظ التعديلات
          </button>
        </div>
      </header>
      <nav className="mb-4 flex flex-wrap gap-2">
        {keys.map((k) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            aria-pressed={tab === k}
            className={`chip ${tab === k ? "gold-btn !text-black" : ""}`}
          >
            {TAB[k]}
          </button>
        ))}
      </nav>
      <div className="panel p-4">
        <Node k={tab} v={d[tab]} on={(n) => setD({ ...d, [tab]: n })} />
      </div>
    </div>
  );
}
