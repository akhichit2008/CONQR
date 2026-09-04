import { TeamMemberCard } from "../components/about/TeamMemberCard";
import ShaderBackground from "../components/ui/shader-background";

const TEAM_MEMBERS = ["Akhilesh JC", "Anantheshwaran B", "Rishi G", "Farriz J", "C Thishan"];

export function AboutPage() {
  return (
    <>
      <ShaderBackground />
      <main className="flex min-h-screen flex-col text-neutral-100">
        <div className="flex-1 px-6 py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-5xl text-[#B29E88]">About Conqr</h1>
            <p className="mt-6 font-display text-2xl leading-snug text-neutral-100">
              AI-powered CSR-NGO matchmaking, built for the Recursion Edition II Hackathon.
            </p>
            <p className="mx-auto mt-6 max-w-2xl font-display tracking-wide text-neutral-400">
              Enterprises shouldn't have to rely on fragmented data, manual spreadsheet comparisons,
              and keyword search to find the right NGO partner. Conqr aggregates NGO profiles from
              websites, reports, and impact assessments, then runs them through a matchmaking engine
              built on domain-aware similarity, spatio-temporal clustering, and multi-factor
              decisioning to surface evidence-backed, contextually relevant matches instead.
            </p>
          </div>

          <div className="mx-auto mt-20 max-w-3xl">
            <h2 className="text-center font-mono text-xs uppercase tracking-widest text-neutral-500">
              Team N1CHE
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {TEAM_MEMBERS.map((name) => (
                <TeamMemberCard key={name} name={name} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
