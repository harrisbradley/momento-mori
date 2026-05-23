"use client";

import { useState } from "react";

export default function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button
      onClick={handleCopy}
      className="px-6 py-2 text-xs tracking-widest uppercase border transition-opacity hover:opacity-70"
      style={{
        borderColor: "var(--border)",
        color: "var(--muted)",
        fontFamily: "var(--font-body)",
        letterSpacing: "0.15em",
        background: "none",
        cursor: "pointer",
      }}
    >
      {copied ? "Copied!" : "Copy link"}
    </button>
  );
}
