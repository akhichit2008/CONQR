import { Dna } from "lucide-react";
import type { EvidenceDNA } from "../../types/match";
import { EvidenceClaimRow, evidenceConfidenceColor } from "./EvidenceClaimRow";

interface EvidenceConfidencePanelProps {
  evidence: EvidenceDNA;
}

export function EvidenceConfidencePanel({ evidence }: EvidenceConfidencePanelProps) {
  const color = evidenceConfidenceColor(evidence.confidence);

  return (
    <div className="mt-6 border-t border-white/10 pt-4">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-neutral-500">
          <Dna className="h-3.5 w-3.5 text-[#09C7C4]" />
          Evidence DNA
        </h3>
        <span className="font-mono text-sm" style={{ color }}>
          {evidence.confidence}% confidence
        </span>
      </div>

      <p className="mt-1 text-xs text-neutral-500">
        {evidence.label} · separate from the fit score above, this reflects how
        well-documented this profile is, not how good a match it is.
      </p>

      <div className="mt-4 flex flex-col gap-4">
        {evidence.claims.map((claim) => (
          <EvidenceClaimRow key={claim.category} claim={claim} />
        ))}
      </div>
    </div>
  );
}
