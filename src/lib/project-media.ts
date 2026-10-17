import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/** A row of the `projects` table — the part of each project managed from /admin. */
export type ProjectRecord = {
  slug: string;
  name: string;
  role: string | null;
  year: string | null;
  category: string | null;
  intro: string | null;
  images: string[];
};

const BUCKET = "project-images";
const ONE_YEAR = 60 * 60 * 24 * 365;

/**
 * Signed URLs are cached for the whole session so moving between pages never
 * re-signs (and therefore never re-downloads) the same image.
 */
const signed = new Map<string, string>();

async function signPaths(paths: string[]): Promise<Record<string, string>> {
  const todo = paths.filter((p) => !signed.has(p) && !/^https?:\/\//i.test(p));
  if (todo.length) {
    const { data } = await supabase.storage.from(BUCKET).createSignedUrls(todo, ONE_YEAR);
    for (const row of data ?? []) {
      if (row.path && row.signedUrl) signed.set(row.path, row.signedUrl);
    }
  }
  const out: Record<string, string> = {};
  for (const p of paths) {
    const url = /^https?:\/\//i.test(p) ? p : signed.get(p);
    if (url) out[p] = url;
  }
  return out;
}

async function fetchRecords(): Promise<Record<string, ProjectRecord>> {
  const { data, error } = await supabase
    .from("projects")
    .select("slug,name,role,year,category,intro,images");
  if (error) throw error;
  const map: Record<string, ProjectRecord> = {};
  for (const row of (data ?? []) as ProjectRecord[]) {
    map[row.slug] = { ...row, images: row.images ?? [] };
  }
  return map;
}

/** All project records, fetched once per session. */
export function useProjectRecords() {
  return useQuery({
    queryKey: ["project-records"],
    queryFn: fetchRecords,
    staleTime: Infinity,
    retry: 1,
  });
}

/** slug → signed URL of the project's first image (its cover). */
export function useProjectCovers() {
  const records = useProjectRecords();
  return useQuery({
    queryKey: ["project-covers"],
    enabled: !!records.data,
    staleTime: Infinity,
    queryFn: async () => {
      const firsts = Object.values(records.data ?? {})
        .filter((r) => r.images.length)
        .map((r) => [r.slug, r.images[0]] as const);
      const urls = await signPaths(firsts.map(([, p]) => p));
      const out: Record<string, string> = {};
      for (const [slug, p] of firsts) if (urls[p]) out[slug] = urls[p];
      return out;
    },
  });
}

/** One project's record plus every image, signed, in the order set in /admin. */
export function useProjectDetail(slug: string) {
  const records = useProjectRecords();
  const record = records.data?.[slug] ?? null;
  const images = useQuery({
    queryKey: ["project-images", slug, record?.images.join("|") ?? ""],
    enabled: !!record,
    staleTime: Infinity,
    queryFn: async () => {
      const urls = await signPaths(record!.images);
      return record!.images.map((p) => urls[p]).filter(Boolean);
    },
  });
  return {
    record,
    images: images.data ?? [],
    loading: records.isPending || (!!record && images.isPending),
    failed: records.isError,
  };
}
