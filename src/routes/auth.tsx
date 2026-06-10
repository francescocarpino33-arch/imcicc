import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setStatus("");
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        setStatus("Account created. Signing you in…");
      }
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate({ to: "/admin" });
    } catch (e: any) {
      setStatus(`Error: ${e?.message ?? e}`);
    } finally {
      setBusy(false);
    }
  }

  const input: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(245,166,35,0.2)",
    color: "#fff",
    padding: "12px 14px",
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
    borderRadius: 2,
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 48 }}>
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 380 }}>
        <h1
          className="font-display"
          style={{
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 300,
            color: "#f5a623",
            letterSpacing: "-0.02em",
            marginBottom: 32,
          }}
        >
          {mode === "signin" ? "Sign in" : "Sign up"}
        </h1>
        <input
          style={{ ...input, marginBottom: 12 }}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          style={input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />
        <button
          type="submit"
          disabled={busy}
          style={{
            marginTop: 20,
            width: "100%",
            background: "#f5a623",
            color: "#0a0503",
            border: "none",
            padding: "14px 28px",
            fontSize: 13,
            letterSpacing: "0.15em",
            cursor: busy ? "default" : "pointer",
            fontFamily: "inherit",
            borderRadius: 2,
            opacity: busy ? 0.6 : 1,
          }}
        >
          {busy ? "…" : mode === "signin" ? "Sign in" : "Create account"}
        </button>
        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          style={{
            marginTop: 20,
            background: "transparent",
            border: "none",
            color: "rgba(245,166,35,0.7)",
            fontSize: 13,
            letterSpacing: "0.05em",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          {mode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"}
        </button>
        {status && (
          <p style={{ marginTop: 16, fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
            {status}
          </p>
        )}
      </form>
    </div>
  );
}
