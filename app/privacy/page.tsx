import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Memento Mori",
  description: "How Memento Mori handles your personal data.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--background)" }}>
      <header
        className="px-6 py-16 md:py-24 text-center"
        style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}
      >
        <Link
          href="/"
          className="text-xs tracking-[0.3em] uppercase mb-6 inline-block hover:opacity-70 transition-opacity"
          style={{ color: "var(--gold)", fontFamily: "var(--font-body)" }}
        >
          memento mori
        </Link>
        <h1
          className="text-4xl md:text-6xl font-light"
          style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
        >
          Privacy Policy
        </h1>
      </header>

      <article className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        <p
          className="text-sm mb-12"
          style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
        >
          Last updated: May 2025
        </p>

        <section className="mb-12">
          <h2
            className="text-2xl font-light mb-4"
            style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
          >
            What We Collect
          </h2>
          <p
            className="text-base leading-relaxed mb-4"
            style={{ color: "var(--foreground)", fontFamily: "var(--font-body)" }}
          >
            When you create an account, we store the following information:
          </p>
          <ul
            className="list-disc pl-6 flex flex-col gap-2 text-base leading-relaxed"
            style={{ color: "var(--foreground)", fontFamily: "var(--font-body)" }}
          >
            <li>Your email address (used for authentication via magic links)</li>
            <li>Your chosen username</li>
            <li>Your display name (if provided)</li>
            <li>Your legacy profile content: identity goals, funeral wishes, and final messages</li>
            <li>Account metadata: creation date, session tokens</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2
            className="text-2xl font-light mb-4"
            style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
          >
            How We Use Your Data
          </h2>
          <p
            className="text-base leading-relaxed mb-4"
            style={{ color: "var(--foreground)", fontFamily: "var(--font-body)" }}
          >
            Your data is used solely to provide the Memento Mori service:
          </p>
          <ul
            className="list-disc pl-6 flex flex-col gap-2 text-base leading-relaxed"
            style={{ color: "var(--foreground)", fontFamily: "var(--font-body)" }}
          >
            <li>Authenticating you via email magic links</li>
            <li>Storing and displaying your legacy profile</li>
            <li>Sharing your public legacy page (only content you mark as public)</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2
            className="text-2xl font-light mb-4"
            style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
          >
            Sharing &amp; Visibility
          </h2>
          <p
            className="text-base leading-relaxed mb-4"
            style={{ color: "var(--foreground)", fontFamily: "var(--font-body)" }}
          >
            Your legacy profile has a sharing setting that controls whether your page
            is accessible via your public URL. Only final messages explicitly marked
            as public will appear on your shared page. Private messages are never
            shown to anyone but you.
          </p>
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--foreground)", fontFamily: "var(--font-body)" }}
          >
            We do not sell, rent, or share your personal data with any third parties.
          </p>
        </section>

        <section className="mb-12">
          <h2
            className="text-2xl font-light mb-4"
            style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
          >
            Cookies &amp; Sessions
          </h2>
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--foreground)", fontFamily: "var(--font-body)" }}
          >
            We use session cookies to keep you signed in. No tracking cookies,
            analytics, or advertising cookies are used. Guest users who do not
            create an account have their data stored only in their browser&apos;s
            local storage — we never receive it.
          </p>
        </section>

        <section className="mb-12">
          <h2
            className="text-2xl font-light mb-4"
            style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
          >
            Data Storage
          </h2>
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--foreground)", fontFamily: "var(--font-body)" }}
          >
            Your data is stored in Google Cloud Firestore. We take reasonable
            precautions to protect your information, but no method of electronic
            storage is completely secure.
          </p>
        </section>

        <section className="mb-12">
          <h2
            className="text-2xl font-light mb-4"
            style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
          >
            Your Rights
          </h2>
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--foreground)", fontFamily: "var(--font-body)" }}
          >
            You can export all of your data or permanently delete your account at
            any time from the{" "}
            <Link href="/account" style={{ color: "var(--gold)" }} className="hover:opacity-70 transition-opacity">
              Account
            </Link>{" "}
            page. When you delete your account, all associated data — your profile,
            identity goals, final messages, and account information — is permanently
            removed from our systems.
          </p>
        </section>

        <section className="mb-12">
          <h2
            className="text-2xl font-light mb-4"
            style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
          >
            Contact
          </h2>
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--foreground)", fontFamily: "var(--font-body)" }}
          >
            If you have questions about this policy, contact us at{" "}
            <a
              href="mailto:privacy@momento-mo.rip"
              style={{ color: "var(--gold)" }}
              className="hover:opacity-70 transition-opacity"
            >
              privacy@momento-mo.rip
            </a>
            .
          </p>
        </section>
      </article>

      <footer
        className="px-6 py-12 text-center"
        style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}
      >
        <div className="flex items-center justify-center gap-6 mb-4">
          <Link
            href="/terms"
            className="text-xs tracking-widest uppercase hover:opacity-70 transition-opacity"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
          >
            Terms of Service
          </Link>
          <span style={{ color: "var(--border)" }}>&middot;</span>
          <Link
            href="/"
            className="text-xs tracking-widest uppercase hover:opacity-70 transition-opacity"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
          >
            Home
          </Link>
        </div>
        <p
          className="text-xs tracking-widest uppercase"
          style={{ color: "var(--border)", fontFamily: "var(--font-body)" }}
        >
          memento mori
        </p>
      </footer>
    </main>
  );
}
