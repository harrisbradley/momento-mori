# Momento Mori

Mortality and legacy app ("remember you will die"). Users set identity goals, record funeral wishes, and write final messages to loved ones. Early development stage.

## Stack
- Next.js 16 (App Router) — see Next.js warning below
- React 19
- NextAuth.js 5 (beta) with email magic links via nodemailer
- Prisma 7 + better-sqlite3 (local SQLite database)
- Tailwind CSS 4
- TypeScript

## Dev Commands
```
npm run dev      # dev server on port 3001
npm run build    # production build
npm start        # production server
```

## Database
Prisma with SQLite. Key models:
- `User` — auth identity
- `LegacyProfile` — the user's legacy/memorial profile
- `IdentityGoal` — ordered list of who the user wants to be remembered as
- `FinalMessage` — messages to specific people (can be public or private)
- Standard NextAuth models: `Account`, `Session`, `VerificationToken`

```
npx prisma migrate dev    # apply migrations
npx prisma studio         # browse database
```

## Key Files
- `src/app/` — App Router pages
- `src/components/` — React components
- `prisma/schema.prisma` — database schema

## IMPORTANT — Next.js Version Warning
This project uses Next.js 16, which has breaking changes from prior versions. Read `AGENTS.md` before writing any Next.js-specific code. Check `node_modules/next/dist/docs/` for current API docs.

## Notes
- Runs on port 3001 (not default 3000) to avoid conflicts with other local projects
- Auth uses email magic links — nodemailer must be configured in `.env`
- **Planned:** Migrate database from SQLite/Prisma to Firebase (Firestore). Firebase is the preferred persistence layer across this project family. When suggesting persistence changes, lean toward Firebase.
