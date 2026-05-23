"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LegacyView from "./LegacyView";

interface Draft {
  identityGoals: string[];
  funeralWishes: string;
  finalMessages: { toName: string; body: string; isPublic: boolean }[];
  username: string;
}

export default function GuestLegacyLoader({ username }: { username: string }) {
  const [draft, setDraft] = useState<Draft | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("mm_draft");
      if (raw) {
        const parsed: Draft = JSON.parse(raw);
        if (parsed.username === username) {
          setDraft(parsed);
        }
      }
    } catch {
      // ignore
    }
    setChecked(true);
  }, [username]);

  if (!checked) return null;

  if (!draft) {
    return (
      <main
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
        style={{ background: "var(--background)" }}
      >
        <p
          className="text-xs tracking-[0.3em] uppercase mb-6"
          style={{ color: "var(--gold)", fontFamily: "var(--font-body)" }}
        >
          memento mori
        </p>
        <h1
          className="text-4xl md:text-5xl font-light mb-4"
          style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
        >
          Legacy not found.
        </h1>
        <p
          className="text-base max-w-sm mb-8"
          style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
        >
          This page doesn&rsquo;t exist, or its author hasn&rsquo;t shared it yet.
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
          Begin your own legacy
        </Link>
      </main>
    );
  }

  // Convert draft to the LegacyView profile shape
  const profile = {
    identityGoals: draft.identityGoals.map((text, i) => ({ id: String(i), text })),
    funeralWishes: draft.funeralWishes || null,
    finalMessages: draft.finalMessages
      .filter((m) => m.isPublic)
      .map((m, i) => ({
        id: String(i),
        toName: m.toName || null,
        body: m.body,
        isPublic: true,
      })),
  };

  return <LegacyView displayName={username} username={username} profile={profile} />;
}
