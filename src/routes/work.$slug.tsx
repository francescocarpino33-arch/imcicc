import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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

export const Route = createFileRoute("/work/$slug")({
  component: ProjectDetail,
});

async function signImages(paths: string[]): Promise<string[]> {
  if (!paths?.length) return [];
  const resolved = await Promise.all(
    paths.map(async (p) => {
      if (/^https?:\/\//i.test(p)) return p;
      const { data } = await supabase.storage
        .from("project-images")
        .createSignedUrl(p, 60 * 60 * 24 * 365);
      return data?.signedUrl ?? "";
    }),
  );
  return resolved.filter(Boolean);
}

function ProjectDetail() {
  const { slug } = Route.useParams();
  const [project, setProject] = useState<ProjectRow | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (cancelled) return;
      setProject((data as ProjectRow) ?? null);
      const urls = await signImages((data?.images as string[]) ?? []);
      if (!cancelled) setImageUrls(urls);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-40 px-8 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
        Loading…
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pt-40 px-8">
        <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: 12 }}>
          This project doesn't have any content yet.
        </p>
        <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: 24, fontSize: 13 }}>
          Upload images from the admin panel to make it visible here.
        </p>
        <div style={{ display: "flex", gap: 24 }}>
          <Link to="/work" style={{ color: "#f5a623", fontSize: 14 }}>
            ← Selected projects
          </Link>
          <Link to="/admin" style={{ color: "#f5a623", fontSize: 14 }}>
            Go to admin →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article style={{ paddingTop: 120, paddingBottom: 120 }}>
      <div style={{ padding: "0 48px" }}>
        <Link
          to="/work"
          style={{
            fontSize: 14,
            color: "#f5a623",
            letterSpacing: "0.05em",
            display: "inline-block",
            marginBottom: 64,
          }}
        >
          ← Selected projects
        </Link>

        <h1
          className="font-display"
          style={{
            fontSize: "clamp(8vw, 10vw, 140px)",
            fontWeight: 300,
            color: "#f5a623",
            letterSpacing: "-0.03em",
            lineHeight: 0.9,
            margin: 0,
          }}
        >
          {project.name}
        </h1>

        <div
          style={{
            marginTop: 40,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 20,
            fontSize: 13,
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.1em",
          }}
        >
          {[project.role, project.year, project.category].filter(Boolean).map((v, i, arr) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 20 }}>
              {v as string}
              {i < arr.length - 1 && (
                <span style={{ width: 1, height: 12, background: "rgba(255,255,255,0.2)" }} />
              )}
            </span>
          ))}
        </div>

        {project.intro && (
          <p
            style={{
              marginTop: 48,
              fontSize: 18,
              fontWeight: 300,
              color: "rgba(255,255,255,0.8)",
              maxWidth: 640,
              lineHeight: 1.8,
            }}
          >
            {project.intro}
          </p>
        )}

        <div
          style={{
            marginTop: 96,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
            gap: 24,
          }}
        >
          {imageUrls.length > 0
            ? imageUrls.map((url, i) => (
                <div
                  key={i}
                  style={{
                    width: "100%",
                    borderRadius: 4,
                    overflow: "hidden",
                    background: "#1a0d05",
                  }}
                >
                  <img
                    src={url}
                    alt={`${project.name} ${i + 1}`}
                    loading="lazy"
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>
              ))
            : (
                <div
                  style={{
                    gridColumn: "1 / -1",
                    padding: "64px 24px",
                    border: "1px solid rgba(245,166,35,0.25)",
                    borderRadius: 4,
                    background: "rgba(245,166,35,0.03)",
                    textAlign: "center",
                    color: "rgba(245,166,35,0.7)",
                    letterSpacing: "0.08em",
                  }}
                >
                  <p style={{ fontSize: 14, marginBottom: 12 }}>
                    No images uploaded yet for this project.
                  </p>
                  <Link to="/admin" style={{ fontSize: 13, color: "#f5a623" }}>
                    Upload from admin →
                  </Link>
                </div>
              )}
        </div>
      </div>
    </article>
  );
}
