# AgroApp Starter (Expo + React Native Web + Supabase)

This is a starter project scaffold generated for a multiplatform agricultural management app:
- Android, iOS (Expo)
- Web / PWA (React Native Web)
- Desktop packaging: prepare web build and wrap with Tauri (instructions below)

## Features included
- Supabase auth skeleton (email/password)
- CRUD: Establishments and Lots
- Inventory (entries/exits)
- Applications screen with camera/gallery (expo-image-picker)
- Simple Dashboard screen

## How to use
1. Install dependencies:
   ```
   npm install
   ```
2. Create a Supabase project and get URL + ANON KEY.
3. Copy `.env.example` to `.env` and fill `SUPABASE_URL` and `SUPABASE_ANON_KEY`.
4. Run locally:
   ```
   npm start
   npm run web
   ```

## Tauri (desktop) prep
1. Build web:
   ```
   npm run build:web
   ```
2. Follow Tauri docs (https://tauri.app) to create a Tauri project that serves the generated `web-build` folder.

## Notes
- This scaffold is minimal and meant to be extended module-by-module.
- For offline sync, integrate SQLite / WatermelonDB and background sync logic.
- Security: move sensitive server-side logic to a protected backend when needed.


---
# PWA and Build instructions (added)

## Generate PWA (web) build
1. From project root install deps:
   ```bash
   npm install
   ```
2. Start dev web server:
   ```bash
   npm run web
   ```
   This opens the app in the browser. To produce a production web build:
   ```bash
   npm run build:web
   ```
   The web build will be created in `web-build/`. Copy the files to any static host (Netlify, Vercel, Surge) or serve locally with a static server (`npx serve web-build`).
3. The `web/manifest.json` and `web/service-worker.js` are included to enable PWA features (install to home screen, offline behavior). You can customize icons in `web/` folder.

## Generate Android .apk using Expo EAS (cloud build)
1. Install EAS CLI and login:
   ```bash
   npm install -g eas-cli
   npx eas login
   ```
2. Start a production build for Android (will generate an .apk):
   ```bash
   npx eas build --platform android --profile production
   ```
3. When the build finishes, EAS gives you a download URL for the `.apk` file.

---
If you want, puedo also generate a quick "how-to" PDF or step-by-step file for someone on your team to follow.
