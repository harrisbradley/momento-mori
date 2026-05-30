import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import AccountActions from "./AccountActions";

export const metadata: Metadata = {
  title: "My Account — Memento Mori",
};

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <main className="min-h-screen" style={{ background: "var(--background)" }}>
      <header
        className="px-6 py-16 md:py-24 text-center"
        style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}
      >
        <p
          className="text-xs tracking-[0.3em] uppercase mb-6"
          style={{ color: "var(--gold)", fontFamily: "var(--font-body)" }}
        >
          memento mori
        </p>
        <h1
          className="text-4xl md:text-6xl font-light"
          style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
        >
          My Account
        </h1>
      </header>

      <div className="max-w-xl mx-auto px-6 py-16 md:py-24">
        <section className="mb-12">
          <p
            className="text-xs tracking-[0.25em] uppercase mb-4"
            style={{ color: "var(--gold)", fontFamily: "var(--font-body)" }}
          >
            Signed in as
          </p>
          <p
            className="text-lg"
            style={{ color: "var(--foreground)", fontFamily: "var(--font-body)" }}
          >
            {session.user.email}
          </p>
        </section>

        <div style={{ borderTop: "1px solid var(--border)" }} className="my-12" />

        <AccountActions />
      </div>
    </main>
  );
}
