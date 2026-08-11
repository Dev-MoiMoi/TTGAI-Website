# AGENTS.md

TTGAI scholarship website. Single-page React app — **no server side**: every external interaction (Supabase, EmailJS, Cloudinary) happens from the browser bundle.

## Stack & commands

- React 18 + Vite 4 + react-router-dom 6. Plain JSX, no TypeScript. `package.json` has `"type": "module"`.
- `npm run dev` / `npm start` — Vite dev server on port 3000 (`host: true`, for Docker).
- `npm run build` — outputs to `dist/`. **`dist/` is committed to git**; rebuild it before committing UI changes or the repo goes stale.
- `npm run preview` — serve the built bundle.
- **Do NOT use `npm run lint` as a gate.** There is no eslint config, and the script lints `dist/`'s minified bundle: it currently reports ~2600 problems (769 errors, 1832 warnings). It always "fails". Just run `npm run build` to verify.
- No test suite exists.

## Environment

- `.env.local` is required and gitignored. Without it the Supabase client logs an error and falls back to a placeholder (`lib/supabase.js`).
- Vars used (`lib/*.js`, `pages/*.jsx`): `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_WELCOME_TEMPLATE`, `VITE_EMAILJS_NOTIFY_TEMPLATE`, `VITE_EMAILJS_PUBLIC_KEY`, `VITE_CLOUDINARY_CLOUD_NAME`, `VITE_CLOUDINARY_UPLOAD_PRESET`, `VITE_ADMIN_PASSWORD_HASH`.
- Never add a `VITE_` secret — Vite inlines those into the public bundle.

## Architecture (client-side only)

- `lib/supabase.js` — single shared client (anon key). Public ops: subscribe, unsubscribe (`is_active=false`), read approved newsletters, submit pending newsletters. Admin ops (`getAllSubscribers`, update/delete) currently work only because RLS allows them; once `supabase-rls-policies.sql` is applied, subscribers are NOT readable by the anon key and the admin notify/subscriber flows break.
- `lib/security.js` — sanitization, rate limiting, and the admin session gate. Admin "auth" is **not real auth**: the SHA-256 password hash is compared in the browser and a `sessionStorage` flag is set (30 min expiry). Treat it as UI gating only.
- `lib/emailjs.js` — welcome + per-subscriber newsletter notify emails sent from the browser.
- `pages/Newsletter.jsx` — unsigned Cloudinary upload for submissions (preset `ttgai_submissions`, max 10 MB, JPG/PNG/WebP/PDF), then inserts a `status: 'pending'` row.
- Routing in `App.jsx`: pages render inside `Layout` (Navbar/Footer) except `/admin/newsletters` and `/unsubscribe`.
- Layout conventions: one file per page/component in `styles/`, imported by that component (e.g. `pages/About.jsx` imports `../styles/about.css`). `styles/global.css` is the base. `index.css` is a thin entry.

## Repo gotchas

- `README.md` is unmodified Create React App boilerplate — trust `package.json`, not the README.
- Root `*.mjs` / `replace*.js` files (`test-supabase*.mjs`, `check-newsletters.mjs`, `replace.mjs`, `replaceColors.js`) are throwaway dev scratch scripts with the anon key hardcoded. Don't treat them as tests or infrastructure.
- `supabase-rls-policies.sql` is the source of truth for DB permissions — apply via Supabase dashboard SQL editor.
- Git: work on `main` (feature branches use `feature/…`), conventional commits (`feat:`, `fix:`). Remote: `Dev-MoiMoi/TTGAI-Website`.
