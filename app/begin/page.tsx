"use client";

import { useState } from "react";
import Link from "next/link";
import BeginForm from "@/components/BeginForm";

export default function BeginPage() {
  const [saved, setSaved] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  if (saved && username) {
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
          className="text-4xl md:text-6xl font-light mb-6"
          style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
        >
          Your legacy is{" "}
          <em>recorded.</em>
        </h1>
        <p
          className="text-base md:text-lg max-w-md leading-relaxed mb-10"
          style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
        >
          Return whenever life gives you something new to reflect on.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={`/legacy/${username}`}
            className="px-8 py-3 text-sm tracking-widest uppercase hover:opacity-80 transition-opacity"
            style={{
              background: "var(--gold)",
              color: "var(--background)",
              fontFamily: "var(--font-body)",
              letterSpacing: "0.15em",
            }}
          >
            View Your Legacy Page
          </Link>
          <Link
            href="/"
            className="px-8 py-3 text-sm tracking-widest uppercase border"
            style={{
              borderColor: "var(--border)",
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
              letterSpacing: "0.15em",
            }}
          >
            Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen px-6 py-16 md:py-24"
      style={{ background: "var(--background)" }}
    >
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="text-xs tracking-widest uppercase hover:opacity-70 transition-opacity"
          style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
        >
          ← Memento Mori
        </Link>

        <div className="mt-12 mb-14">
          <p
            className="text-xs tracking-[0.25em] uppercase mb-4"
            style={{ color: "var(--gold)", fontFamily: "var(--font-body)" }}
          >
            begin
          </p>
          <h1
            className="text-4xl md:text-6xl font-light leading-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
          >
            Let&rsquo;s begin
            <br />
            <em>your reflection.</em>
          </h1>
          <p
            className="mt-4 text-base leading-relaxed"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
          >
            Take your time. There are no right answers — only honest ones. You
            can always return to add more.
          </p>
        </div>

        <BeginForm
          onSaved={(u) => {
            setUsername(u);
            setSaved(true);
          }}
        />
      </div>
    </main>
  );
}
