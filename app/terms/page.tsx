import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Memento Mori",
  description: "Terms of service for using Memento Mori.",
};

export default function TermsPage() {
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
          Terms of Service
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
            Acceptance of Terms
          </h2>
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--foreground)", fontFamily: "var(--font-body)" }}
          >
            By accessing or using Memento Mori (&ldquo;the Service&rdquo;), you
            agree to be bound by these Terms of Service. If you do not agree, you
            may not use the Service.
          </p>
        </section>

        <section className="mb-12">
          <h2
            className="text-2xl font-light mb-4"
            style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
          >
            The Service
          </h2>
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--foreground)", fontFamily: "var(--font-body)" }}
          >
            Memento Mori is a personal reflection and legacy platform. It allows
            you to record identity goals, funeral wishes, and final messages. The
            Service is provided &ldquo;as is&rdquo; and &ldquo;as
            available&rdquo; without warranties of any kind, either express or
            implied.
          </p>
        </section>

        <section className="mb-12">
          <h2
            className="text-2xl font-light mb-4"
            style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
          >
            User Content
          </h2>
          <p
            className="text-base leading-relaxed mb-4"
            style={{ color: "var(--foreground)", fontFamily: "var(--font-body)" }}
          >
            You retain ownership of all content you create on Memento Mori,
            including your identity goals, funeral wishes, and final messages. By
            using the sharing features, you grant us a limited license to display
            your public content on your legacy page.
          </p>
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--foreground)", fontFamily: "var(--font-body)" }}
          >
            You are solely responsible for the content you create. You agree not
            to post content that is unlawful, harmful, threatening, abusive,
            defamatory, or otherwise objectionable.
          </p>
        </section>

        <section className="mb-12">
          <h2
            className="text-2xl font-light mb-4"
            style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
          >
            Accounts
          </h2>
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--foreground)", fontFamily: "var(--font-body)" }}
          >
            You are responsible for maintaining the security of your email
            account used to sign in. You may delete your account at any time from
            the{" "}
            <Link href="/account" style={{ color: "var(--gold)" }} className="hover:opacity-70 transition-opacity">
              Account
            </Link>{" "}
            page. We reserve the right to suspend or terminate accounts that
            violate these terms.
          </p>
        </section>

        <section className="mb-12">
          <h2
            className="text-2xl font-light mb-4"
            style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
          >
            Acceptable Use
          </h2>
          <p
            className="text-base leading-relaxed mb-4"
            style={{ color: "var(--foreground)", fontFamily: "var(--font-body)" }}
          >
            You agree not to:
          </p>
          <ul
            className="list-disc pl-6 flex flex-col gap-2 text-base leading-relaxed"
            style={{ color: "var(--foreground)", fontFamily: "var(--font-body)" }}
          >
            <li>Use the Service for any unlawful purpose</li>
            <li>Attempt to gain unauthorized access to other accounts or systems</li>
            <li>Interfere with or disrupt the Service or its infrastructure</li>
            <li>Impersonate another person or entity</li>
            <li>Use automated tools to scrape or access the Service</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2
            className="text-2xl font-light mb-4"
            style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
          >
            Limitation of Liability
          </h2>
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--foreground)", fontFamily: "var(--font-body)" }}
          >
            To the fullest extent permitted by law, Memento Mori and its
            operators shall not be liable for any indirect, incidental, special,
            or consequential damages, including loss of data, arising from your
            use of the Service. We strongly recommend exporting your data
            regularly as a personal backup.
          </p>
        </section>

        <section className="mb-12">
          <h2
            className="text-2xl font-light mb-4"
            style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
          >
            Changes to Terms
          </h2>
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--foreground)", fontFamily: "var(--font-body)" }}
          >
            We may update these terms from time to time. Continued use of the
            Service after changes constitutes acceptance of the new terms. We
            will note the date of the last update at the top of this page.
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
            If you have questions about these terms, contact us at{" "}
            <a
              href="mailto:hello@momento-mo.rip"
              style={{ color: "var(--gold)" }}
              className="hover:opacity-70 transition-opacity"
            >
              hello@momento-mo.rip
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
            href="/privacy"
            className="text-xs tracking-widest uppercase hover:opacity-70 transition-opacity"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
          >
            Privacy Policy
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
