import { Check, X } from "lucide-react";
import type { MatchRequest, NGOMatch } from "../../types/match";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import { evidenceConfidenceColor } from "./EvidenceClaimRow";
import { EvidenceConfidencePanel } from "./EvidenceConfidencePanel";
import { InvitePartnerButton } from "./InvitePartnerButton";
import { NGOSuggestions } from "./NGOSuggestions";

interface NGOComparisonModalProps {
  match: NGOMatch;
  requirement: MatchRequest;
  onClose: () => void;
}

function joinOrDash(values: string[]) {
  return values.length > 0 ? values.join(", ") : "—";
}

export function NGOComparisonModal({ match, requirement, onClose }: NGOComparisonModalProps) {
  return (
    <Modal onClose={onClose}>
      <h2 className="font-display text-2xl text-[#B29E88]">{match.name}</h2>
      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-sm">
        <span className="text-[#09C7C4]">{match.matchScore}% match</span>
        <span style={{ color: evidenceConfidenceColor(match.evidence.confidence) }}>
          {match.evidence.confidence}% evidence confidence
        </span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-white/10 bg-black/40 p-3">
          <h3 className="font-mono text-xs uppercase tracking-wide text-neutral-500">
            Your requirement
          </h3>
          <dl className="mt-3 flex flex-col gap-3 text-sm">
            <div>
              <dt className="text-neutral-500">Focus area</dt>
              <dd className="text-neutral-200">{requirement.focusArea}</dd>
            </div>
            <div>
              <dt className="text-neutral-500">Geography</dt>
              <dd className="text-neutral-200">{requirement.location}</dd>
            </div>
            <div>
              <dt className="text-neutral-500">Budget</dt>
              <dd className="text-neutral-200">{requirement.budget}</dd>
            </div>
            <div>
              <dt className="text-neutral-500">Timeline</dt>
              <dd className="text-neutral-200">{requirement.timeline}</dd>
            </div>
            <div>
              <dt className="text-neutral-500">Expected outcomes</dt>
              <dd className="text-neutral-200">{requirement.expectedOutcomes}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-lg border border-white/10 bg-black/40 p-3">
          <h3 className="font-mono text-xs uppercase tracking-wide text-neutral-500">
            {match.name}
          </h3>
          <dl className="mt-3 flex flex-col gap-3 text-sm">
            <div>
              <dt className="text-neutral-500">Expertise</dt>
              <dd className="text-neutral-200">{joinOrDash(match.expertise)}</dd>
            </div>
            <div>
              <dt className="text-neutral-500">Geography</dt>
              <dd className="text-neutral-200">{joinOrDash(match.regions)}</dd>
            </div>
            <div>
              <dt className="text-neutral-500">Beneficiaries</dt>
              <dd className="text-neutral-200">{joinOrDash(match.beneficiaries)}</dd>
            </div>
            <div>
              <dt className="text-neutral-500">Capabilities</dt>
              <dd className="text-neutral-200">{joinOrDash(match.capabilities)}</dd>
            </div>
            <div>
              <dt className="text-neutral-500">Past projects</dt>
              <dd className="text-neutral-200">{joinOrDash(match.pastProjects)}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {match.comparison.map((field) => (
          <div
            key={field.label}
            className="flex items-center justify-between rounded-lg border border-white/10 bg-black/40 px-4 py-2"
          >
            <span className="text-sm text-neutral-300">{field.label}</span>
            {field.matched ? (
              <Check className="h-5 w-5 text-[#09C7C4]" />
            ) : (
              <X className="h-5 w-5 text-red-400" />
            )}
          </div>
        ))}
      </div>

      <EvidenceConfidencePanel evidence={match.evidence} />

      <div className="mt-6 border-t border-white/10 pt-4 text-sm text-neutral-400">
        <p>{match.email}</p>
        <p>{match.phone}</p>
        <p>{match.address}</p>
      </div>

      <div className="mt-6 flex gap-3">
        <Button variant="secondary" className="w-full">
          Contact NGO
        </Button>
        <InvitePartnerButton match={match} requirement={requirement} />
      </div>

      <NGOSuggestions match={match} requirement={requirement} />
    </Modal>
  );
}
