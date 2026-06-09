# 💀 Momento Mori

### *Spiritual Legacy Planner and Life Reflection Tool*

> *"It is not death that a man should fear, but he should fear never beginning to live."* — Marcus Aurelius

**Momento Mori** (Latin for "remember you will die") is a solemn, reflective Next.js web application designed to help users contemplate their mortality and organize their spiritual legacy. It provides a quiet, intentional space to answer two critical questions: *Who are you becoming?* and *What will you leave behind?*

---

## 🕊️ Key Features

### 🕯️ 1. Identity & Becoming ("Who are you becoming?")
- **Identity Commitments**: Define the values, character traits, and commitments you want to cultivate in your life before it ends. 
- **Dynamic Prioritization**: Rank and order your character commitments as you grow.

### 📜 2. Legacy & Leaving Behind ("What will you leave behind?")
- **Final Letters & Messages**: Write private or public final letters to loved ones (e.g. spouse, children, friends).
- **Funeral Arrangements & Wishes**: Document your funeral readings, music choices, and overall wishes so your family doesn't have to guess during a time of grief.
- **Legacy Profiles**: Shareable public profiles (optional and passwordless/authenticated) located at `/legacy/[username]` to share your life reflections and public statements with the world.

### 🔒 3. Secure & Private Authentication
- Uses NextAuth.js for secure, passwordless authentication (magic email links) so that your private reflections and messages remain confidential.

---

## 🛠️ Technology Stack
- **Framework**: Next.js 15 (React 19, App Router)
- **Database ORM**: Prisma Client
- **Database**: SQLite (local `dev.db` file)
- **Auth**: NextAuth.js (Email Magic Links, Google Sign-in)
- **Styling**: Tailwind CSS
- **Design System**: A premium dark-monochrome palette with antique gold (`#c9a84c`) accents and typography suited for solemn contemplation.

---

## 🚀 Getting Started

### Prerequisites
You will need:
- Node.js 18 or later.
- A SMTP email server or [Resend](https://resend.com/) key (for NextAuth magic login links).

### 1. Clone the Repository
```bash
git clone https://github.com/harrisbradley/momento-mori.git
cd momento-mori
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Database Migration
Deploy the SQLite database schema using Prisma:
```bash
npx prisma migrate deploy
```

### 4. Configure Environment
Create a `.env` file at the root:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your_nextauth_secret_hash"
NEXTAUTH_URL="http://localhost:3000"

# SMTP config for passwordless magic link sign-ins
EMAIL_SERVER_HOST="smtp.example.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your_smtp_user"
EMAIL_SERVER_PASSWORD="your_smtp_password"
EMAIL_FROM="noreply@example.com"
```

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

---

## 📜 License
For the reflection of life, the contemplation of death, and the glory of God.

