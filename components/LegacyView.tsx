import Link from "next/link";
import CopyLinkButton from "./CopyLinkButton";

interface IdentityGoal {
  id: string;
  text: string;
}

interface FinalMessage {
  id: string;
  toName: string | null;
  body: string;
  isPublic: boolean;
}

interface Profile {
  identityGoals: IdentityGoal[];
  funeralWishes: string | null;
  finalMessages: FinalMessage[];
}

interface LegacyViewProps {
  displayName: string;
  username: string;
  profile: Profile;
}

export default function LegacyView({ displayName, username, profile }: LegacyViewProps) {
  const hasContent =
    profile.identityGoals.length > 0 ||
    profile.funeralWishes ||
    profile.finalMessages.length > 0;

  return (
    <main className="min-h-screen" style={{ background: "var(--background)" }}>
      {/* Header */}
      <header
        className="px-6 py-16 md:py-24 text-center"
        style={{
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <p
          className="text-xs tracking-[0.3em] uppercase mb-6"
          style={{ color: "var(--gold)", fontFamily: "var(--font-body)" }}
        >
          memento mori
        </p>
        <h1
          className="text-5xl md:text-7xl font-light mb-4"
          style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
        >
          {displayName}
        </h1>
        <p
          className="text-base"
          style={{ color: "var(--muted)", fontFamily: "var(--font-body)", fontStyle: "italic" }}
        >
          A life in progress. A legacy taking shape.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <CopyLinkButton />
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        {!hasContent && (
          <div className="text-center py-16">
            <p
              className="text-lg italic mb-6"
              style={{ color: "var(--muted)", fontFamily: "var(--font-display)" }}
            >
              This legacy page is still being written.
            </p>
            <Link
              href="/begin"
              className="text-sm tracking-widest uppercase"
              style={{ color: "var(--gold)", fontFamily: "var(--font-body)" }}
            >
              Begin your own →
            </Link>
          </div>
        )}

        {/* Identity Goals */}
        {profile.identityGoals.length > 0 && (
          <section className="mb-16">
            <p
              className="text-xs tracking-[0.25em] uppercase mb-8"
              style={{ color: "var(--gold)", fontFamily: "var(--font-body)" }}
            >
              Who I am becoming
            </p>
            <ul className="flex flex-col gap-6">
              {profile.identityGoals.map((goal) => (
                <li
                  key={goal.id}
                  className="pl-6 text-xl md:text-2xl font-light leading-relaxed"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--foreground)",
                    borderLeft: "2px solid var(--gold)",
                  }}
                >
                  <em>{goal.text}</em>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Divider */}
        {profile.identityGoals.length > 0 &&
          (profile.funeralWishes || profile.finalMessages.length > 0) && (
            <div
              className="my-12"
              style={{ borderTop: "1px solid var(--border)" }}
            />
          )}

        {/* Funeral wishes */}
        {profile.funeralWishes && (
          <section className="mb-16">
            <p
              className="text-xs tracking-[0.25em] uppercase mb-6"
              style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
            >
              My wishes
            </p>
            <p
              className="text-lg leading-relaxed whitespace-pre-wrap"
              style={{ color: "var(--foreground)", fontFamily: "var(--font-body)" }}
            >
              {profile.funeralWishes}
            </p>
          </section>
        )}

        {/* Final messages */}
        {profile.finalMessages.length > 0 && (
          <section>
            <p
              className="text-xs tracking-[0.25em] uppercase mb-8"
              style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
            >
              Final messages
            </p>
            <div className="flex flex-col gap-10">
              {profile.finalMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-8"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                >
                  {msg.toName && (
                    <p
                      className="text-xs tracking-widest uppercase mb-4"
                      style={{ color: "var(--gold)", fontFamily: "var(--font-body)" }}
                    >
                      To {msg.toName}
                    </p>
                  )}
                  <p
                    className="text-lg leading-relaxed whitespace-pre-wrap italic"
                    style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
                  >
                    {msg.body}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <footer
        className="px-6 py-12 text-center"
        style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}
      >
        <p
          className="text-xs tracking-widest uppercase mb-4"
          style={{ color: "var(--border)", fontFamily: "var(--font-body)" }}
        >
          memento mori
        </p>
        <Link
          href="/begin"
          className="text-sm tracking-widest uppercase hover:opacity-70 transition-opacity"
          style={{ color: "var(--gold)", fontFamily: "var(--font-body)", letterSpacing: "0.15em" }}
        >
          Begin your own legacy →
        </Link>
      </footer>
    </main>
  );
}
