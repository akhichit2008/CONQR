import { AlertTriangle } from "lucide-react";
import type { EvidenceClaim } from "../../types/match";

interface EvidenceClaimRowProps {
  claim: EvidenceClaim;
}

export function evidenceConfidenceColor(confidence: number) {
  if (confidence >= 80) return "#09C7C4";
  if (confidence >= 55) return "#B29E88";
  return "#f87171";
}

export function EvidenceClaimRow({ claim }: EvidenceClaimRowProps) {
  const color = evidenceConfidenceColor(claim.confidence);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between text-sm">
        <span className="text-neutral-300">{claim.label}</span>
        <span className="font-mono text-xs" style={{ color }}>
          {claim.confidence}%
        </span>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full"
          style={{ width: `${claim.confidence}%`, backgroundColor: color }}
        />
      </div>

      <div className="flex items-center justify-between gap-3 text-xs text-neutral-500">
        <span>
          {claim.sourceCount} source{claim.sourceCount === 1 ? "" : "s"}
          {claim.independentSourceCount > 1
            ? ` · ${claim.independentSourceCount} independent`
            : ""}
        </span>
        {claim.warning && (
          <span className="flex items-center gap-1 text-amber-400">
            <AlertTriangle className="h-3 w-3 shrink-0" />
            {claim.warning}
          </span>
        )}
      </div>
    </div>
  );
}
