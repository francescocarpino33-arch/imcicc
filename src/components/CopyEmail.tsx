import { useEffect, useState } from "react";
import { CONTACT } from "@/data/projects";

/** Copies the contact email; useful when someone's default mail app isn't set up. */
export function CopyEmail({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(id);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${CONTACT.email}`;
    }
  }

  return (
    <button type="button" onClick={copy} className={className}>
      <span aria-live="polite">{copied ? "Email copied" : "Copy email address"}</span>
    </button>
  );
}
