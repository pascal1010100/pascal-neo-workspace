import { NextResponse } from "next/server";
import { OPS_PROJECTS } from "@/lib/ops-bridge/project-map";

export const dynamic = "force-dynamic";

export async function GET() {
  const githubMapped = OPS_PROJECTS.filter(
    (project) => project.githubRepoId,
  ).length;
  const vercelMapped = OPS_PROJECTS.filter(
    (project) => project.vercelProjectId,
  ).length;
  const supabaseMapped = OPS_PROJECTS.filter(
    (project) => project.supabaseRefs.length > 0,
  ).length;

  return NextResponse.json({
    ok: true,
    service: "pascal-ops-bridge",
    mappedProjects: OPS_PROJECTS.length,
    mappings: {
      github: githubMapped,
      vercel: vercelMapped,
      supabase: supabaseMapped,
    },
    configuration: {
      notion: Boolean(process.env.NOTION_API_TOKEN),
      githubWebhook: Boolean(process.env.GITHUB_WEBHOOK_SECRET),
    },
  });
}
