"use client";

import { useState } from "react";

interface FinalMessageDraft {
  toName: string;
  body: string;
  isPublic: boolean;
}

interface BeginFormProps {
  onSaved: (username: string) => void;
}

const identityPrompts = [
  "I am becoming someone who…",
  "I want to be remembered as…",
  "The quality I most want to embody is…",
  "I refuse to die without having…",
];

export default function BeginForm({ onSaved }: BeginFormProps) {
  const [step, setStep] = useState<"identity" | "legacy" | "save">("identity");
  const [identityGoals, setIdentityGoals] = useState<string[]>(["", "", ""]);
  const [funeralWishes, setFuneralWishes] = useState("");
  const [messages, setMessages] = useState<FinalMessageDraft[]>([
    { toName: "", body: "", isPublic: false },
  ]);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateGoal(i: number, val: string) {
    setIdentityGoals((prev) => prev.map((g, idx) => (idx === i ? val : g)));
  }

  function addGoal() {
    if (identityGoals.length < 8) setIdentityGoals((prev) => [...prev, ""]);
  }

  function removeGoal(i: number) {
    setIdentityGoals((prev) => prev.filter((_, idx) => idx !== i));
  }

  function updateMessage(i: number, field: keyof FinalMessageDraft, val: string | boolean) {
    setMessages((prev) =>
      prev.map((m, idx) => (idx === i ? { ...m, [field]: val } : m))
    );
  }

  function addMessage() {
    setMessages((prev) => [...prev, { toName: "", body: "", isPublic: false }]);
  }

  function removeMessage(i: number) {
    setMessages((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      // Sign in via email magic link first
      const signInRes = await fetch("/api/auth/signin/nodemailer", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ email, callbackUrl: "/" }),
      });
      if (!signInRes.ok) throw new Error("Failed to send sign-in email.");

      // Save profile data to localStorage so it can be picked up after auth
      const draft = {
        identityGoals: identityGoals.filter((g) => g.trim()),
        funeralWishes,
        finalMessages: messages.filter((m) => m.body.trim()),
        username: username.trim(),
      };
      localStorage.setItem("mm_draft", JSON.stringify(draft));

      // Navigate to verify page
      window.location.href = "/verify";
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setSaving(false);
    }
  }

  async function handleSaveGuest() {
    setSaving(true);
    setError(null);
    try {
      // Save as guest using a temporary session stored in localStorage
      const draft = {
        identityGoals: identityGoals.filter((g) => g.trim()),
        funeralWishes,
        finalMessages: messages.filter((m) => m.body.trim()),
        username: username.trim() || `guest-${Date.now()}`,
      };
      localStorage.setItem("mm_draft", JSON.stringify(draft));
      onSaved(draft.username);
    } catch {
      setError("Something went wrong.");
      setSaving(false);
    }
  }

  const inputStyle = {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    color: "var(--foreground)",
    fontFamily: "var(--font-body)",
    outline: "none",
    width: "100%",
    padding: "0.75rem 1rem",
    fontSize: "1rem",
    lineHeight: "1.6",
    borderRadius: 0,
  } as React.CSSProperties;

  const labelStyle = {
    color: "var(--muted)",
    fontFamily: "var(--font-body)",
    fontSize: "0.75rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    display: "block",
    marginBottom: "0.5rem",
  };

  const sectionTitleStyle = {
    fontFamily: "var(--font-display)",
    color: "var(--foreground)",
    fontSize: "2rem",
    fontWeight: 300,
    lineHeight: 1.2,
    marginBottom: "0.5rem",
  };

  return (
    <div>
      {/* Step tabs */}
      <div
        className="flex gap-0 mb-12"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        {(["identity", "legacy", "save"] as const).map((s, i) => {
          const labels = ["Who you're becoming", "Your legacy", "Save"];
          const active = step === s;
          return (
            <button
              key={s}
              onClick={() => setStep(s)}
              className="px-6 py-3 text-xs tracking-widest uppercase transition-colors"
              style={{
                fontFamily: "var(--font-body)",
                color: active ? "var(--gold)" : "var(--muted)",
                borderBottom: active ? "2px solid var(--gold)" : "2px solid transparent",
                marginBottom: "-1px",
                background: "none",
                cursor: "pointer",
              }}
            >
              {i + 1}. {labels[i]}
            </button>
          );
        })}
      </div>

      {/* Identity step */}
      {step === "identity" && (
        <div>
          <div className="mb-10">
            <h2 style={sectionTitleStyle}>
              Who are you <em>becoming?</em>
            </h2>
            <p
              style={{
                color: "var(--muted)",
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                lineHeight: 1.7,
              }}
            >
              Finish these sentences — or write your own. Think about the person
              you want to have been by the end of your life.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {identityGoals.map((goal, i) => (
              <div key={i} className="relative">
                <label style={labelStyle}>{identityPrompts[i] ?? "Another commitment…"}</label>
                <div className="flex gap-2">
                  <textarea
                    value={goal}
                    onChange={(e) => updateGoal(i, e.target.value)}
                    placeholder="Write freely…"
                    rows={2}
                    style={inputStyle}
                  />
                  {identityGoals.length > 1 && (
                    <button
                      onClick={() => removeGoal(i)}
                      className="px-3 flex-shrink-0 text-lg transition-opacity hover:opacity-60"
                      style={{ color: "var(--muted)", background: "none", cursor: "pointer" }}
                      aria-label="Remove"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            ))}

            {identityGoals.length < 8 && (
              <button
                onClick={addGoal}
                className="text-sm tracking-widest uppercase text-left transition-opacity hover:opacity-70"
                style={{
                  color: "var(--gold)",
                  fontFamily: "var(--font-body)",
                  background: "none",
                  cursor: "pointer",
                  letterSpacing: "0.15em",
                }}
              >
                + Add another
              </button>
            )}
          </div>

          <div className="mt-12 flex justify-end">
            <button
              onClick={() => setStep("legacy")}
              className="px-8 py-3 text-sm tracking-widest uppercase transition-opacity hover:opacity-80"
              style={{
                background: "var(--gold)",
                color: "var(--background)",
                fontFamily: "var(--font-body)",
                letterSpacing: "0.15em",
                cursor: "pointer",
              }}
            >
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* Legacy step */}
      {step === "legacy" && (
        <div>
          <div className="mb-10">
            <h2 style={sectionTitleStyle}>
              What will you <em>leave behind?</em>
            </h2>
            <p
              style={{
                color: "var(--muted)",
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                lineHeight: 1.7,
              }}
            >
              Document your wishes and write messages for the people you love.
              These can be shared with family when the time comes.
            </p>
          </div>

          {/* Funeral wishes */}
          <div className="mb-10">
            <label style={{ ...labelStyle, fontSize: "0.65rem" }}>
              Funeral &amp; burial wishes
            </label>
            <p
              className="mb-3 text-sm"
              style={{ color: "var(--muted)", fontFamily: "var(--font-body)", fontStyle: "italic" }}
            >
              Cremation or burial? Religious ceremony or not? Where? Any specific wishes?
            </p>
            <textarea
              value={funeralWishes}
              onChange={(e) => setFuneralWishes(e.target.value)}
              placeholder="Write freely — in whatever detail feels right…"
              rows={5}
              style={inputStyle}
            />
          </div>

          {/* Final messages */}
          <div>
            <label style={{ ...labelStyle, fontSize: "0.65rem" }}>Final messages</label>
            <p
              className="mb-6 text-sm"
              style={{ color: "var(--muted)", fontFamily: "var(--font-body)", fontStyle: "italic" }}
            >
              Write to the people you love — or leave an open letter to the world.
            </p>

            <div className="flex flex-col gap-8">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className="p-6"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <label style={labelStyle}>Message {i + 1}</label>
                    {messages.length > 1 && (
                      <button
                        onClick={() => removeMessage(i)}
                        className="text-sm transition-opacity hover:opacity-60"
                        style={{ color: "var(--muted)", background: "none", cursor: "pointer" }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={msg.toName}
                    onChange={(e) => updateMessage(i, "toName", e.target.value)}
                    placeholder="To… (leave blank for open letter)"
                    style={{ ...inputStyle, marginBottom: "0.75rem" }}
                  />
                  <textarea
                    value={msg.body}
                    onChange={(e) => updateMessage(i, "body", e.target.value)}
                    placeholder="Dear…"
                    rows={5}
                    style={{ ...inputStyle, marginBottom: "0.75rem" }}
                  />
                  <label
                    className="flex items-center gap-2 text-sm cursor-pointer"
                    style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
                  >
                    <input
                      type="checkbox"
                      checked={msg.isPublic}
                      onChange={(e) => updateMessage(i, "isPublic", e.target.checked)}
                      style={{ accentColor: "var(--gold)" }}
                    />
                    Show on public legacy page
                  </label>
                </div>
              ))}
            </div>

            <button
              onClick={addMessage}
              className="mt-4 text-sm tracking-widest uppercase transition-opacity hover:opacity-70"
              style={{
                color: "var(--gold)",
                fontFamily: "var(--font-body)",
                background: "none",
                cursor: "pointer",
                letterSpacing: "0.15em",
              }}
            >
              + Add another message
            </button>
          </div>

          <div className="mt-12 flex gap-4 justify-end">
            <button
              onClick={() => setStep("identity")}
              className="px-6 py-3 text-sm tracking-widest uppercase"
              style={{
                color: "var(--muted)",
                fontFamily: "var(--font-body)",
                background: "none",
                cursor: "pointer",
                letterSpacing: "0.15em",
              }}
            >
              ← Back
            </button>
            <button
              onClick={() => setStep("save")}
              className="px-8 py-3 text-sm tracking-widest uppercase transition-opacity hover:opacity-80"
              style={{
                background: "var(--gold)",
                color: "var(--background)",
                fontFamily: "var(--font-body)",
                letterSpacing: "0.15em",
                cursor: "pointer",
              }}
            >
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* Save step */}
      {step === "save" && (
        <div>
          <div className="mb-10">
            <h2 style={sectionTitleStyle}>
              Save your <em>legacy.</em>
            </h2>
            <p
              style={{
                color: "var(--muted)",
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                lineHeight: 1.7,
              }}
            >
              Create an account to save your progress and get a shareable page.
              Or save as a guest — your work will be stored in this browser only.
            </p>
          </div>

          <div
            className="p-8 mb-6"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <p
              className="text-xs tracking-widest uppercase mb-6"
              style={{ color: "var(--gold)", fontFamily: "var(--font-body)" }}
            >
              Create a free account
            </p>

            <div className="mb-4">
              <label style={labelStyle}>Your email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={inputStyle}
              />
            </div>

            <div className="mb-6">
              <label style={labelStyle}>Choose a username</label>
              <div className="flex items-center gap-0" style={{ border: "1px solid var(--border)" }}>
                <span
                  className="px-3 py-3 text-sm flex-shrink-0"
                  style={{
                    color: "var(--muted)",
                    fontFamily: "var(--font-body)",
                    background: "var(--background)",
                    borderRight: "1px solid var(--border)",
                  }}
                >
                  momento-mo.rip/legacy/
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="your-name"
                  style={{
                    ...inputStyle,
                    border: "none",
                    flex: 1,
                    width: "auto",
                  }}
                />
              </div>
            </div>

            {error && (
              <p
                className="mb-4 text-sm"
                style={{ color: "#e07070", fontFamily: "var(--font-body)" }}
              >
                {error}
              </p>
            )}

            <button
              onClick={handleSave}
              disabled={saving || !email.trim() || !username.trim()}
              className="w-full px-8 py-3 text-sm tracking-widest uppercase transition-opacity hover:opacity-80 disabled:opacity-40"
              style={{
                background: "var(--gold)",
                color: "var(--background)",
                fontFamily: "var(--font-body)",
                letterSpacing: "0.15em",
                cursor: saving ? "wait" : "pointer",
              }}
            >
              {saving ? "Sending magic link…" : "Send magic link"}
            </button>
          </div>

          <div
            className="p-6 text-center"
            style={{ border: "1px solid var(--border)" }}
          >
            <p
              className="text-sm mb-4"
              style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
            >
              Not ready to create an account? Save locally in this browser.
            </p>
            <div className="mb-4">
              <label style={labelStyle}>Choose a username (for your local page)</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="your-name"
                style={inputStyle}
              />
            </div>
            <button
              onClick={handleSaveGuest}
              disabled={saving || !username.trim()}
              className="px-8 py-3 text-sm tracking-widest uppercase border transition-opacity hover:opacity-70 disabled:opacity-40"
              style={{
                borderColor: "var(--border)",
                color: "var(--muted)",
                fontFamily: "var(--font-body)",
                letterSpacing: "0.15em",
                cursor: "pointer",
                background: "none",
              }}
            >
              Save as guest
            </button>
          </div>

          <div className="mt-8 flex justify-start">
            <button
              onClick={() => setStep("legacy")}
              className="text-sm tracking-widest uppercase transition-opacity hover:opacity-70"
              style={{
                color: "var(--muted)",
                fontFamily: "var(--font-body)",
                background: "none",
                cursor: "pointer",
                letterSpacing: "0.15em",
              }}
            >
              ← Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
