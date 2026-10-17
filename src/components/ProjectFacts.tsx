import { projectText, type Project } from "@/data/projects";
import { useCopy, useLang } from "@/i18n/lang";

/** Client / sport / discipline / format as a small definition list with hairlines. */
export function ProjectFacts({
  project,
  role,
  year,
  withClient = true,
  className = "",
}: {
  project: Project;
  role?: string | null;
  year?: string | null;
  withClient?: boolean;
  className?: string;
}) {
  const f = useCopy().facts;
  const text = projectText(project, useLang());
  const rows = (
    [
      [f.client, withClient ? project.client : null],
      [f.sport, text.sport],
      [f.discipline, text.discipline],
      [f.format, text.format],
      [f.role, role],
      [f.year, year],
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
