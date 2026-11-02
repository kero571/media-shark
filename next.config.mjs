const dev = process.env.NODE_ENV !== "production";

// الدومينات المسموح لها تعمل iframe للموقع ده
const ALLOWED_EMBEDDERS = [
  "https://kerolesadel.vercel.app",
  "https://nodern-web.vercel.app",
];

const frameAncestorsPublic = [
  "'self'",
  ...ALLOWED_EMBEDDERS,
  ...(dev ? ["http://localhost:3000"] : []),
].join(" ");

const buildCsp = (frameAncestors) =>
  [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://res.cloudinary.com",
    "media-src 'self' https://res.cloudinary.com",
    "font-src 'self' data:",
    `connect-src 'self' https://api.cloudinary.com${dev ? " ws: wss:" : ""}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    `frame-ancestors ${frameAncestors}`,
    ...(dev ? [] : ["upgrade-insecure-requests"]),
  ].join("; ");

const baseHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), interest-cohort=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  ...(dev
    ? []
    : [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]),
];

// الصفحات العامة: متاحة للـ iframe من موقعيك بس (من غير X-Frame-Options)
const publicSecurity = [
  { key: "Content-Security-Policy", value: buildCsp(frameAncestorsPublic) },
  ...baseHeaders,
];

// الـ admin: ممنوع تمامًا
const adminSecurity = [
  { key: "Content-Security-Policy", value: buildCsp("'none'") },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Cache-Control", value: "no-store" },
  { key: "X-Robots-Tag", value: "noindex, nofollow" },
];

export default {
  serverExternalPackages: ["firebase-admin"],
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"], minimumCacheTTL: 31536000 },
  async redirects() {
    return [{ source: "/", destination: "/ar", permanent: false }];
  },
  async headers() {
    return [
      { source: "/:path*", headers: publicSecurity },
      {
        source: "/images/:p*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=86400",
          },
        ],
      },
      // لازم يجي بعد القاعدة العامة علشان يعمل override
      { source: "/admin/:path*", headers: adminSecurity },
      { source: "/:lang/admin/:path*", headers: adminSecurity },
      {
        source: "/api/:p*",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },
};
