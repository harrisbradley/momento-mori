"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

export default function AccountActions() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleExport() {
    const res = await fetch("/api/account");
    if (!res.ok) return;
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `memento-mori-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleDelete() {
    setDeleting(true);
    const res = await fetch("/api/account", { method: "DELETE" });
    if (res.ok) {
      await signOut({ callbackUrl: "/" });
    } else {
      setDeleting(false);
    }
  }

  return (
    <div>
      {/* Export */}
      <section className="mb-12">
        <h2
          className="text-2xl font-light mb-4"
          style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
        >
          Export Your Data
        </h2>
        <p
          className="text-base leading-relaxed mb-6"
          style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
        >
          Download a JSON file containing all of your profile data, identity
          goals, and final messages.
        </p>
        <button
          onClick={handleExport}
          className="px-6 py-3 text-sm tracking-widest uppercase transition-all duration-300 hover:opacity-80 cursor-pointer"
          style={{
            background: "var(--gold)",
            color: "var(--background)",
            fontFamily: "var(--font-body)",
            letterSpacing: "0.15em",
            border: "none",
          }}
        >
          Download My Data
        </button>
      </section>

      <div style={{ borderTop: "1px solid var(--border)" }} className="my-12" />

      {/* Delete */}
      <section>
        <h2
          className="text-2xl font-light mb-4"
          style={{ fontFamily: "var(--font-display)", color: "#c94c4c" }}
        >
          Delete Account
        </h2>
        <p
          className="text-base leading-relaxed mb-6"
          style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
        >
          Permanently delete your account and all associated data. This action
          cannot be undone.
        </p>

        {!showConfirm ? (
          <button
            onClick={() => setShowConfirm(true)}
            className="px-6 py-3 text-sm tracking-widest uppercase transition-all duration-300 hover:opacity-80 cursor-pointer"
            style={{
              background: "transparent",
              color: "#c94c4c",
              fontFamily: "var(--font-body)",
              letterSpacing: "0.15em",
              border: "1px solid #c94c4c",
            }}
          >
            Delete My Account
          </button>
        ) : (
          <div
            className="p-8"
            style={{ background: "var(--surface)", border: "1px solid #c94c4c" }}
          >
            <p
              className="text-base mb-6"
              style={{ color: "var(--foreground)", fontFamily: "var(--font-body)" }}
            >
              Are you sure? All your data — profile, identity goals, and final
              messages — will be permanently deleted.
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-6 py-3 text-sm tracking-widest uppercase transition-all duration-300 hover:opacity-80 cursor-pointer disabled:opacity-50"
                style={{
                  background: "#c94c4c",
                  color: "var(--foreground)",
                  fontFamily: "var(--font-body)",
                  letterSpacing: "0.15em",
                  border: "none",
                }}
              >
                {deleting ? "Deleting..." : "Yes, Delete Everything"}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                disabled={deleting}
                className="px-6 py-3 text-sm tracking-widest uppercase transition-all duration-300 hover:opacity-80 cursor-pointer disabled:opacity-50"
                style={{
                  background: "transparent",
                  color: "var(--muted)",
                  fontFamily: "var(--font-body)",
                  letterSpacing: "0.15em",
                  border: "1px solid var(--border)",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
