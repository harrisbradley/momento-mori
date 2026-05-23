import Link from "next/link";

export default function SignInPage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: "var(--background)" }}
    >
      <p
        className="text-xs tracking-[0.3em] uppercase mb-8"
        style={{ color: "var(--gold)", fontFamily: "var(--font-body)" }}
      >
        memento mori
      </p>
      <h1
        className="text-4xl md:text-5xl font-light mb-4"
        style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
      >
        Sign in to your account
      </h1>
      <p
        className="text-base max-w-sm mb-10"
        style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
      >
        Enter your email and we&rsquo;ll send you a magic link. No password required.
      </p>
      <Link
        href="/begin"
        className="px-8 py-3 text-sm tracking-widest uppercase hover:opacity-80 transition-opacity"
        style={{
          background: "var(--gold)",
          color: "var(--background)",
          fontFamily: "var(--font-body)",
          letterSpacing: "0.15em",
        }}
      >
        Begin a new legacy
      </Link>
    </main>
  );
}
