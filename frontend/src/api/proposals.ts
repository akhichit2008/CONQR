import { getJson, postJson } from "./client";
import type { Proposal } from "../types/proposal";
import type { MatchRequest, NGOMatch } from "../types/match";

interface ProposalResponseBody {
  id: number;
  ngo_name: string;
  ngo_expertise: string[];
  ngo_regions: string[];
  ngo_beneficiaries: string[];
  fund_allocated: string;
  focus_area: string;
  timeline: string;
  expected_outcomes: string;
  status: string;
  created_at: string;
}

function toProposal(body: ProposalResponseBody): Proposal {
  return {
    id: body.id,
    ngoName: body.ngo_name,
    ngoExpertise: body.ngo_expertise,
    ngoRegions: body.ngo_regions,
    ngoBeneficiaries: body.ngo_beneficiaries,
    fundAllocated: body.fund_allocated,
    focusArea: body.focus_area,
    timeline: body.timeline,
    expectedOutcomes: body.expected_outcomes,
    status: body.status,
    createdAt: body.created_at,
  };
}

export async function createProposal(match: NGOMatch, requirement: MatchRequest): Promise<Proposal> {
  const body = await postJson<ProposalResponseBody>("/api/proposals", {
    ngo_name: match.name,
    ngo_expertise: match.expertise,
    ngo_regions: match.regions,
    ngo_beneficiaries: match.beneficiaries,
    fund_allocated: requirement.budget,
    focus_area: requirement.focusArea,
    timeline: requirement.timeline,
    expected_outcomes: requirement.expectedOutcomes,
  });
  return toProposal(body);
}

export async function getProposals(): Promise<Proposal[]> {
  const body = await getJson<ProposalResponseBody[]>("/api/proposals");
  return body.map(toProposal);
}
