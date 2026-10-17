import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type ProjectRow = {
  id: string;
  slug: string;
  name: string;
  role: string | null;
  year: string | null;
  category: string | null;
  intro: string | null;
  images: string[] | null;
};

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminPage,
});

async function signOne(path: string): Promise<string> {
  if (/^https?:\/\//i.test(path)) return path;
  const { data } = await supabase.storage
    .from("project-images")
    .createSignedUrl(path, 60 * 60 * 24 * 365);
  return data?.signedUrl ?? "";
}

function AdminPage() {
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [form, setForm] = useState({ role: "", year: "", category: "", intro: "" });
  const [signedMap, setSignedMap] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      setUserEmail(u.user?.email ?? "");
      if (!u.user) {
        setIsAdmin(false);
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", u.user.id);
      setIsAdmin((roles ?? []).some((r: { role: string }) => r.role === "admin"));
    })();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/auth";
  }

  const selected = projects.find((p) => p.id === selectedId) ?? null;

  async function loadProjects() {
    const { data } = await supabase.from("projects").select("*").order("name");
    const rows = (data as ProjectRow[]) ?? [];
    setProjects(rows);
    if (!selectedId && rows.length) setSelectedId(rows[0].id);
  }

  useEffect(() => {
    if (isAdmin) loadProjects();
  }, [isAdmin]);

  useEffect(() => {
    if (!selected) return;
    setForm({
      role: selected.role ?? "",
      year: selected.year ?? "",
      category: selected.category ?? "",
      intro: selected.intro ?? "",
    });
    (async () => {
      const entries = await Promise.all(
        (selected.images ?? []).map(async (p) => [p, await signOne(p)] as const),
      );
      setSignedMap(Object.fromEntries(entries));
    })();
  }, [selectedId]);

  if (isAdmin === null) {
    return (
      <div style={{ padding: "120px 48px", color: "rgba(255,255,255,0.5)", fontSize: 14 }}>
        Loading…
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div style={{ padding: "120px 48px", maxWidth: 560 }}>
        <h1
          className="font-display"
          style={{
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 300,
            color: "#ff6a1a",
            letterSpacing: "-0.02em",
            marginBottom: 16,
          }}
        >
          Not authorized
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginBottom: 24 }}>
          Your account ({userEmail}) does not have admin access. Ask an existing admin to grant your account the
          admin role, then reload this page.
        </p>
        <button
          onClick={signOut}
          style={{
            background: "transparent",
            color: "#ff6a1a",
            border: "1px solid rgba(255,106,26,0.5)",
            padding: "10px 20px",
            fontSize: 13,
            letterSpacing: "0.15em",
            cursor: "pointer",
            fontFamily: "inherit",
            borderRadius: 2,
          }}
        >
          Sign out
        </button>
      </div>
    );
  }

  async function handleFiles(files: FileList | null) {
    if (!files || !selected) return;
    setUploading(true);
    setStatus("");
    try {
      const newPaths: string[] = [];
      for (const file of Array.from(files)) {
        const ext = file.name.split(".").pop() ?? "png";
        const path = `${selected.slug}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error } = await supabase.storage
          .from("project-images")
          .upload(path, file, { contentType: file.type });
        if (error) throw error;
        newPaths.push(path);
      }
      const updated = [...(selected.images ?? []), ...newPaths];
      const { error: dbErr } = await supabase
        .from("projects")
        .update({ images: updated })
        .eq("id", selected.id);
      if (dbErr) throw dbErr;
      setStatus("Uploaded.");
      if (fileRef.current) fileRef.current.value = "";
      await loadProjects();
      const entries = await Promise.all(updated.map(async (p) => [p, await signOne(p)] as const));
      setSignedMap(Object.fromEntries(entries));
    } catch (e: any) {
      setStatus(`Error: ${e?.message ?? e}`);
    } finally {
      setUploading(false);
    }
  }

  async function deleteImage(path: string) {
    if (!selected) return;
    const remaining = (selected.images ?? []).filter((p) => p !== path);
    await supabase.storage.from("project-images").remove([path]);
    await supabase.from("projects").update({ images: remaining }).eq("id", selected.id);
    setStatus("Removed.");
    await loadProjects();
  }

  /** Reorder images. The first image is the project's cover on the homepage and work index. */
  async function moveImage(path: string, to: number) {
    if (!selected) return;
    const list = [...(selected.images ?? [])];
    const from = list.indexOf(path);
    if (from < 0 || to < 0 || to >= list.length || from === to) return;
    list.splice(from, 1);
    list.splice(to, 0, path);
    const { error } = await supabase.from("projects").update({ images: list }).eq("id", selected.id);
    setStatus(error ? `Error: ${error.message}` : to === 0 ? "Cover updated." : "Order saved.");
    await loadProjects();
  }

  async function saveMeta() {
    if (!selected) return;
    setStatus("");
    const { error } = await supabase
      .from("projects")
      .update(form)
      .eq("id", selected.id);
    setStatus(error ? `Error: ${error.message}` : "Saved.");
    await loadProjects();
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,106,26,0.2)",
    color: "#fff",
    padding: "10px 12px",
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
    borderRadius: 2,
  };
  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 11,
    letterSpacing: "0.15em",
    color: "rgba(255,106,26,0.6)",
    marginBottom: 8,
  };

  return (
    <div style={{ paddingTop: 120, paddingBottom: 120, padding: "120px 48px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, gap: 24, flexWrap: "wrap" }}>
      <h1
        className="font-display"
        style={{
          fontSize: "clamp(3rem, 6vw, 5rem)",
          fontWeight: 300,
          color: "#ff6a1a",
          letterSpacing: "-0.02em",
          margin: 0,
        }}
      >
        Admin
      </h1>
        <button
          onClick={signOut}
          style={{
            background: "transparent",
            color: "rgba(255,106,26,0.7)",
            border: "1px solid rgba(255,106,26,0.3)",
            padding: "8px 16px",
            fontSize: 12,
            letterSpacing: "0.15em",
            cursor: "pointer",
            fontFamily: "inherit",
            borderRadius: 2,
          }}
        >
          Sign out · {userEmail}
        </button>
      </div>
      <p
        style={{
          fontSize: 13,
          color: "rgba(255,255,255,0.5)",
          letterSpacing: "0.1em",
          marginBottom: 48,
        }}
      >
        Manage projects & images
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 48, alignItems: "start" }}>
        {/* project list */}
        <div>
          <div style={labelStyle}>Project</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {projects.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                style={{
                  textAlign: "left",
                  background: p.id === selectedId ? "rgba(255,106,26,0.12)" : "transparent",
                  border: "1px solid",
                  borderColor: p.id === selectedId ? "rgba(255,106,26,0.4)" : "rgba(255,255,255,0.08)",
                  color: p.id === selectedId ? "#ff6a1a" : "rgba(255,255,255,0.75)",
                  padding: "10px 12px",
                  fontSize: 14,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  borderRadius: 2,
                }}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* right column */}
        {selected && (
          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            {/* uploader */}
            <div>
              <div style={labelStyle}>Upload images</div>
              <label
                htmlFor="admin-file"
                style={{
                  display: "block",
                  border: "1px dashed rgba(255,106,26,0.4)",
                  borderRadius: 4,
                  padding: "48px 24px",
                  textAlign: "center",
                  color: "rgba(255,106,26,0.7)",
                  cursor: "pointer",
                  fontSize: 14,
                  letterSpacing: "0.05em",
                  background: "rgba(255,106,26,0.03)",
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleFiles(e.dataTransfer.files);
                }}
              >
                {uploading ? "Uploading…" : "Drop PNG / JPG here, or click to choose"}
              </label>
              <input
                id="admin-file"
                ref={fileRef}
                type="file"
                accept="image/png,image/jpeg"
                multiple
                style={{ display: "none" }}
                onChange={(e) => handleFiles(e.target.files)}
              />
            </div>

            {/* current images */}
            <div>
              <div style={labelStyle}>
                Current images ({selected.images?.length ?? 0}). The first one is the cover; the order here is
                the order on the project page.
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                  gap: 12,
                }}
              >
                {(selected.images ?? []).map((path, idx) => (
                  <div
                    key={path}
                    style={{
                      position: "relative",
                      aspectRatio: "4 / 5",
                      background: "#121211",
                      borderRadius: 4,
                      overflow: "hidden",
                    }}
                  >
                    {signedMap[path] && (
                      <img
                        src={signedMap[path]}
                        alt=""
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      />
                    )}
                    {idx === 0 && (
                      <span
                        style={{
                          position: "absolute",
                          left: 6,
                          top: 6,
                          background: "#ff6a1a",
                          color: "#000",
                          fontSize: 11,
                          padding: "3px 6px",
                        }}
                      >
                        Cover
                      </span>
                    )}
                    <div style={{ position: "absolute", left: 6, bottom: 6, display: "flex", gap: 4 }}>
                      {[
                        { label: "←", title: "Move earlier", to: idx - 1, show: idx > 0 },
                        { label: "→", title: "Move later", to: idx + 1, show: idx < (selected.images?.length ?? 0) - 1 },
                        { label: "Make cover", title: "Make this the cover", to: 0, show: idx > 0 },
                      ]
                        .filter((b) => b.show)
                        .map((b) => (
                          <button
                            key={b.title}
                            onClick={() => moveImage(path, b.to)}
                            title={b.title}
                            aria-label={b.title}
                            style={{
                              background: "rgba(0,0,0,0.75)",
                              color: "#f1f0ec",
                              border: "1px solid rgba(255,255,255,0.25)",
                              padding: "2px 7px",
                              fontSize: 12,
                              cursor: "pointer",
                              fontFamily: "inherit",
                            }}
                          >
                            {b.label}
                          </button>
                        ))}
                    </div>
                    <button
                      onClick={() => deleteImage(path)}
                      aria-label="Delete"
                      style={{
                        position: "absolute",
                        top: 6,
                        right: 6,
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: "rgba(0,0,0,0.7)",
                        color: "#ff6a1a",
                        border: "1px solid rgba(255,106,26,0.5)",
                        cursor: "pointer",
                        fontSize: 14,
                        lineHeight: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
                {(selected.images?.length ?? 0) === 0 && (
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
                    No images yet.
                  </p>
                )}
              </div>
            </div>

            {/* meta editor */}
            <div>
              <div style={labelStyle}>Edit meta</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 16 }}>
                <div>
                  <div style={labelStyle}>Role</div>
                  <input
                    style={inputStyle}
                    value={form.role}
                    onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                  />
                </div>
                <div>
                  <div style={labelStyle}>Year</div>
                  <input
                    style={inputStyle}
                    value={form.year}
                    onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
                  />
                </div>
                <div>
                  <div style={labelStyle}>Category</div>
                  <input
                    style={inputStyle}
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <div style={labelStyle}>Intro</div>
                <textarea
                  rows={4}
                  style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
                  value={form.intro}
                  onChange={(e) => setForm((f) => ({ ...f, intro: e.target.value }))}
                />
              </div>
              <button
                onClick={saveMeta}
                style={{
                  marginTop: 20,
                  background: "#ff6a1a",
                  color: "#000",
                  border: "none",
                  padding: "12px 28px",
                  fontSize: 13,
                  letterSpacing: "0.15em",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  borderRadius: 2,
                }}
              >
                Save
              </button>
              {status && (
                <span
                  style={{
                    marginLeft: 16,
                    fontSize: 12,
                    color: "rgba(255,255,255,0.5)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {status}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
