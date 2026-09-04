import { postJson } from "./client";
import type {
  ComparisonField,
  EvidenceClaim,
  EvidenceDNA,
  MatchRequest,
  NGOMatch,
} from "../types/match";

interface ComparisonFieldBody {
  label: string;
  matched: boolean;
}

interface EvidenceClaimBody {
  category: string;
  label: string;
  confidence: number;
  source_count: number;
  independent_source_count: number;
  warning: string | null;
}

interface EvidenceDNABody {
  confidence: number;
  label: string;
  claims: EvidenceClaimBody[];
  warnings: string[];
}

interface NGOMatchResponseBody {
  name: string;
  match_score: number;
  expertise: string[];
  regions: string[];
  beneficiaries: string[];
  capabilities: string[];
  past_projects: string[];
  email: string;
  phone: string;
  address: string;
  comparison: ComparisonFieldBody[];
  evidence: EvidenceDNABody;
}

interface MatchResponseBody {
  matches: NGOMatchResponseBody[];
}

function toComparisonField(body: ComparisonFieldBody): ComparisonField {
  return { label: body.label, matched: body.matched };
}

function toEvidenceClaim(body: EvidenceClaimBody): EvidenceClaim {
  return {
    category: body.category,
    label: body.label,
    confidence: body.confidence,
    sourceCount: body.source_count,
    independentSourceCount: body.independent_source_count,
    warning: body.warning,
  };
}

function toEvidenceDNA(body: EvidenceDNABody): EvidenceDNA {
  return {
    confidence: body.confidence,
    label: body.label,
    claims: body.claims.map(toEvidenceClaim),
    warnings: body.warnings,
  };
}

function toNGOMatch(body: NGOMatchResponseBody): NGOMatch {
  return {
    name: body.name,
    matchScore: body.match_score,
    expertise: body.expertise,
    regions: body.regions,
    beneficiaries: body.beneficiaries,
    capabilities: body.capabilities,
    pastProjects: body.past_projects,
    email: body.email,
    phone: body.phone,
    address: body.address,
    comparison: body.comparison.map(toComparisonField),
    evidence: toEvidenceDNA(body.evidence),
  };
}

export async function findMatches(request: MatchRequest): Promise<NGOMatch[]> {
  const body = await postJson<MatchResponseBody>("/api/match", {
    focus_area: request.focusArea,
    location: request.location,
    budget: request.budget,
    timeline: request.timeline,
    expected_outcomes: request.expectedOutcomes,
  });
  return body.matches.map(toNGOMatch);
}

interface SuggestionsResponseBody {
  suggestions: string[];
}

export async function getNgoSuggestions(
  match: NGOMatch,
  requirement: MatchRequest,
): Promise<string[]> {
  const body = await postJson<SuggestionsResponseBody>("/api/match/suggestions", {
    requirement: {
      focus_area: requirement.focusArea,
      location: requirement.location,
      budget: requirement.budget,
      timeline: requirement.timeline,
      expected_outcomes: requirement.expectedOutcomes,
    },
    ngo_name: match.name,
    ngo_expertise: match.expertise,
    ngo_regions: match.regions,
    ngo_beneficiaries: match.beneficiaries,
    ngo_capabilities: match.capabilities,
    ngo_past_projects: match.pastProjects,
  });
  return body.suggestions;
}
