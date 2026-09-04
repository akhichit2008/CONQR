import type { Proposal } from "../../types/proposal";

interface ProposalCardProps {
  proposal: Proposal;
}

function joinOrDash(values: string[]) {
  return values.length > 0 ? values.join(", ") : "—";
}

export function ProposalCard({ proposal }: ProposalCardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/40 p-5 backdrop-blur-md">
      <h3 className="font-display text-lg text-[#B29E88]">{proposal.ngoName}</h3>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-neutral-500">Fund allocated</dt>
          <dd className="text-neutral-200">{proposal.fundAllocated}</dd>
        </div>
        <div>
          <dt className="text-neutral-500">Focus area</dt>
          <dd className="text-neutral-200">{proposal.focusArea}</dd>
        </div>
        <div>
          <dt className="text-neutral-500">Expertise</dt>
          <dd className="text-neutral-200">{joinOrDash(proposal.ngoExpertise)}</dd>
        </div>
        <div>
          <dt className="text-neutral-500">Geography</dt>
          <dd className="text-neutral-200">{joinOrDash(proposal.ngoRegions)}</dd>
        </div>
        <div>
          <dt className="text-neutral-500">Timeline</dt>
          <dd className="text-neutral-200">{proposal.timeline}</dd>
        </div>
        <div>
          <dt className="text-neutral-500">Beneficiaries</dt>
          <dd className="text-neutral-200">{joinOrDash(proposal.ngoBeneficiaries)}</dd>
        </div>
      </dl>
    </div>
  );
}
