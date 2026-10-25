# Media Sharks — Next.js 15 + Tailwind + Firebase + Cloudinary (Vercel)
Local: `npm i && npm run dev` (works without keys using default content; dashboard needs the keys below).

## 1) Firebase
1. console.firebase.google.com → create project.
2. Build > Firestore Database > Create (production mode). Rules tab → `allow read, write: if false;` (server uses Admin SDK).
3. Build > Authentication > Sign-in method > enable Email/Password. Settings > User actions > untick "Enable create (sign-up)".
4. Authentication > Users > Add user (admin email + strong password). Copy its **UID** → ADMIN_UID.
5. Project settings > Service accounts > Generate new private key → FIREBASE_PROJECT_ID / CLIENT_EMAIL / PRIVATE_KEY.
6. Project settings > General > Web API Key → FIREBASE_API_KEY (if you restrict it, restrict by API, not by HTTP referrer).
## 2) Cloudinary
Dashboard > API Keys → CLOUDINARY_CLOUD_NAME / API_KEY / API_SECRET.
## 3) Vercel
Import the repo, add every variable from .env.example (Production + Preview), deploy. Dashboard: /admin
Content = Firestore doc `site/content` (previous version kept in `site/backup`). Images = Cloudinary folder `media-sharks`.
