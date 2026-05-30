# Momento Mori

Mortality and legacy app ("remember you will die"). Users set identity goals, record funeral wishes, and write final messages to loved ones. Early development stage.

## Stack
- Next.js 16 (App Router) — see Next.js warning below
- React 19
- NextAuth.js 5 (beta) with email magic links via nodemailer
- Firebase Admin SDK + Firestore
- Tailwind CSS 4
- TypeScript

## Dev Commands
```
npm run dev      # dev server on port 3001
npm run build    # production build
npm start        # production server
```

## Database
Firebase Firestore. Collections:
- `users/{id}` — auth identity (managed by NextAuth FirestoreAdapter, plus `username` field)
- `legacyProfiles/{userId}` — the user's legacy/memorial profile with embedded `identityGoals` and `finalMessages` arrays
- `accounts/{id}`, `sessions/{id}`, `verification_tokens/{id}` — managed by NextAuth FirestoreAdapter

Environment variables required:
```
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY=...
```

## Key Files
- `app/` — App Router pages
- `components/` — React components
- `lib/firebase.ts` — Firebase Admin SDK initialization
- `lib/db.ts` — Firestore helper functions

## IMPORTANT — Next.js Version Warning
This project uses Next.js 16, which has breaking changes from prior versions. Read `AGENTS.md` before writing any Next.js-specific code. Check `node_modules/next/dist/docs/` for current API docs.

## Notes
- Runs on port 3001 (not default 3000) to avoid conflicts with other local projects
- Auth uses email magic links — nodemailer must be configured in `.env`
- Firebase is the persistence layer across this project family.
