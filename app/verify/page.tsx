import Link from "next/link";

export default function VerifyPage() {
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
        className="text-4xl md:text-6xl font-light mb-4"
        style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
      >
        Check your email.
      </h1>
      <p
        className="text-base md:text-lg max-w-sm leading-relaxed mb-10"
        style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
      >
        A magic link is on its way. Click it to sign in and save your legacy.
      </p>
      <p
        className="text-sm italic"
        style={{ color: "var(--muted)", fontFamily: "var(--font-display)" }}
      >
        &ldquo;The secret of getting ahead is getting started.&rdquo;
      </p>
      <Link
        href="/"
        className="mt-10 text-xs tracking-widest uppercase hover:opacity-70 transition-opacity"
        style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
      >
        ← Back to home
      </Link>
    </main>
  );
}
