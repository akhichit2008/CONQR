import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProposals } from "../api/proposals";
import { ActivityBarChart } from "../components/dashboard/ActivityBarChart";
import { BudgetPieChart } from "../components/dashboard/BudgetPieChart";
import { ProposalCard } from "../components/dashboard/ProposalCard";
import { ImpactStat } from "../components/chat/ImpactStat";
import ShaderBackground from "../components/ui/shader-background";
import { useAuth } from "../hooks/useAuth";
import type { Proposal } from "../types/proposal";

export function DashboardPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const navigate = useNavigate();

  const [proposals, setProposals] = useState<Proposal[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthLoading && !user) {
      navigate("/login");
    }
  }, [isAuthLoading, user, navigate]);

  useEffect(() => {
    if (!user) {
      return;
    }

    getProposals()
      .then(setProposals)
      .catch(() => setError("Could not load your proposals. Try again."));
  }, [user]);

  if (isAuthLoading || !user) {
    return null;
  }

  const regionCount = proposals
    ? new Set(proposals.flatMap((proposal) => proposal.ngoRegions)).size
    : 0;

  return (
    <>
      <ShaderBackground />
      <main className="flex min-h-screen flex-col text-neutral-100">
        <div className="flex-1 px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <h1 className="font-display text-3xl text-[#B29E88]">Your profile</h1>
            <p className="mt-2 text-sm text-neutral-400">
              Active proposals and campaign stats for {user.companyName}.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <ImpactStat value={String(proposals?.length ?? 0)} label="active proposals" />
              <ImpactStat value={String(regionCount)} label="regions covered" />
              <ImpactStat value="70%" label="less time spent finding the right NGO partner" />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <BudgetPieChart />
              <ActivityBarChart />
            </div>

            <div className="mt-10">
              <h2 className="font-display text-xl text-[#B29E88]">Active proposals</h2>

              {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

              {!error && proposals === null && (
                <p className="mt-4 text-sm text-neutral-500">Loading your proposals...</p>
              )}

              {!error && proposals !== null && proposals.length === 0 && (
                <div className="mt-4 rounded-xl border border-white/10 bg-black/40 p-6 text-sm text-neutral-400">
                  No proposals yet. Invite an NGO partner from the campaign search to see it here.
                </div>
              )}

              {proposals && proposals.length > 0 && (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {proposals.map((proposal) => (
                    <ProposalCard key={proposal.id} proposal={proposal} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
