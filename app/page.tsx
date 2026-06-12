import Link from "next/link";

const quote = {
  text: "It is not death that a man should fear, but he should fear never beginning to live.",
  author: "Marcus Aurelius",
};

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="fade-in mb-8 flex justify-center">
            <img
              src="/mori-logo.png"
              alt="Memento Mori Logo"
              className="w-[260px] md:w-[420px] h-auto object-contain"
            />
          </div>

          <h1
            className="fade-in-delay text-6xl md:text-8xl font-light leading-none mb-6"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--foreground)",
              letterSpacing: "-0.02em",
            }}
          >
            Remember
            <br />
            <em>you will die.</em>
          </h1>

          <p
            className="fade-in-delay2 text-lg md:text-xl font-light max-w-xl mx-auto leading-relaxed mb-12"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
          >
            Not as a warning — as an invitation. To live with intention, become
            who you were meant to be, and leave behind something that matters.
          </p>

          <div className="fade-in-delay3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/begin"
              className="px-8 py-3 text-sm tracking-widest uppercase transition-all duration-300 hover:opacity-80"
              style={{
                background: "var(--gold)",
                color: "var(--background)",
                fontFamily: "var(--font-body)",
                letterSpacing: "0.15em",
              }}
            >
              Begin Your Legacy
            </Link>
            <a
              href="#what-is-this"
              className="px-8 py-3 text-sm tracking-widest uppercase border transition-all duration-300"
              style={{
                borderColor: "var(--border)",
                color: "var(--muted)",
                fontFamily: "var(--font-body)",
                letterSpacing: "0.15em",
              }}
            >
              Learn More
            </a>
          </div>
        </div>

        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)", fontSize: "0.65rem" }}
          >
            scroll
          </span>
          <div
            className="w-px h-12"
            style={{ background: "linear-gradient(to bottom, var(--muted), transparent)" }}
          />
        </div>
      </section>

      {/* Two-panel concept */}
      <section
        id="what-is-this"
        className="px-6 py-24 md:py-32"
        style={{ background: "var(--surface)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-light mb-4"
              style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
            >
              Two questions.{" "}
              <em style={{ color: "var(--gold)" }}>One life.</em>
            </h2>
            <p
              className="text-base md:text-lg max-w-xl mx-auto leading-relaxed"
              style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
            >
              Memento Mori is a space for honest reflection — on who you are
              becoming, and what you will leave behind.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-1">
            <div
              className="p-10 md:p-14 flex flex-col justify-between min-h-64"
              style={{ background: "var(--background)", borderLeft: "3px solid var(--gold)" }}
            >
              <div>
                <p
                  className="text-xs tracking-[0.25em] uppercase mb-6"
                  style={{ color: "var(--gold)", fontFamily: "var(--font-body)" }}
                >
                  How will you live?
                </p>
                <h3
                  className="text-3xl md:text-4xl font-light leading-tight mb-4"
                  style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
                >
                  Who are you
                  <br />
                  <em>becoming?</em>
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
                >
                  Define the person you want to be before you die. Your values,
                  your character, your commitments. Not goals you accomplish —
                  the human you are growing into.
                </p>
              </div>
              <p
                className="mt-8 text-sm"
                style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
              >
                Identity goals &middot; Character commitments &middot; Regret minimization
              </p>
            </div>

            <div
              className="p-10 md:p-14 flex flex-col justify-between min-h-64"
              style={{ background: "var(--background)", borderLeft: "3px solid var(--border)" }}
            >
              <div>
                <p
                  className="text-xs tracking-[0.25em] uppercase mb-6"
                  style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
                >
                  What will you leave behind?
                </p>
                <h3
                  className="text-3xl md:text-4xl font-light leading-tight mb-4"
                  style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
                >
                  What is your
                  <br />
                  <em>legacy?</em>
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
                >
                  Document your wishes for when the time comes. Write final
                  messages to the people you love. Leave a record of who you
                  were — in your own words.
                </p>
              </div>
              <p
                className="mt-8 text-sm"
                style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
              >
                Funeral wishes &middot; Final messages &middot; Shareable with loved ones
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-4xl md:text-5xl font-light mb-16"
            style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
          >
            How it works
          </h2>

          <div className="flex flex-col gap-16">
            {[
              {
                num: "I",
                title: "Begin your reflection",
                body: "Answer a few quiet questions. No account required to start. Just you, your thoughts, and a space to be honest.",
              },
              {
                num: "II",
                title: "Build your profile over time",
                body: "Save your progress and return whenever life gives you something new to think about. Your legacy is a living document.",
              },
              {
                num: "III",
                title: "Share with those who matter",
                body: "When you're ready, share your legacy page with family, a partner, or an executor. Let them know who you were.",
              },
            ].map(({ num, title, body }) => (
              <div key={num} className="flex flex-col items-center gap-4">
                <span
                  className="text-5xl font-light"
                  style={{ fontFamily: "var(--font-display)", color: "var(--gold)" }}
                >
                  {num}
                </span>
                <h3
                  className="text-2xl font-light"
                  style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
                >
                  {title}
                </h3>
                <p
                  className="text-base leading-relaxed max-w-md"
                  style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-20">
            <Link
              href="/begin"
              className="px-10 py-4 text-sm tracking-widest uppercase transition-all duration-300 hover:opacity-80"
              style={{
                background: "var(--gold)",
                color: "var(--background)",
                fontFamily: "var(--font-body)",
                letterSpacing: "0.15em",
              }}
            >
              Begin Your Legacy
            </Link>
          </div>
        </div>
      </section>

      {/* Quote footer */}
      <footer
        className="mt-auto px-6 py-16 text-center"
        style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}
      >
        <blockquote className="max-w-2xl mx-auto">
          <p
            className="text-xl md:text-2xl font-light italic leading-relaxed mb-4"
            style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
          >
            &ldquo;{quote.text}&rdquo;
          </p>
          <cite
            className="text-xs tracking-widest uppercase not-italic"
            style={{ color: "var(--gold)", fontFamily: "var(--font-body)" }}
          >
            — {quote.author}
          </cite>
        </blockquote>

        <p
          className="mt-12 text-xs tracking-widest uppercase"
          style={{ color: "var(--border)", fontFamily: "var(--font-body)" }}
        >
          memento mori &mdash; remember you will die
        </p>
      </footer>
    </main>
  );
}
