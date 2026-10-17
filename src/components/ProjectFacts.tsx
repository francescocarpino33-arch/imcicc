import type { Project } from "@/data/projects";

/** Sport / discipline / format as a small definition list with hairlines. */
export function ProjectFacts({
  project,
  extra = [],
  withClient = true,
  className = "",
}: {
  project: Project;
  withClient?: boolean;
  extra?: [string, string | null | undefined][];
  className?: string;
}) {
  const rows = (
    [
      ["Client", withClient ? project.client : null],
      ["Sport", project.sport],
      ["Discipline", project.discipline],
      ["Format", project.format],
      ...extra,
    ] as [string, string | null | undefined][]
  ).filter(([, v]) => !!v && v.trim().length > 0) as [string, string][];

  return (
    <dl
      className={`grid grid-cols-[6.5rem_1fr] text-[0.9375rem] border-b border-line ${className}`}
    >
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="label py-2.5 rule">{k}</dt>
          <dd className="py-2.5 rule">{v}</dd>
        </div>
      ))}
    </dl>
  );
}
