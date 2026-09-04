export interface MatchRequest {
  focusArea: string;
  location: string;
  budget: string;
  timeline: string;
  expectedOutcomes: string;
}

export interface ComparisonField {
  label: string;
  matched: boolean;
}

export interface EvidenceClaim {
  category: string;
  label: string;
  confidence: number;
  sourceCount: number;
  independentSourceCount: number;
  warning: string | null;
}

export interface EvidenceDNA {
  confidence: number;
  label: string;
  claims: EvidenceClaim[];
  warnings: string[];
}

export interface NGOMatch {
  name: string;
  matchScore: number;
  expertise: string[];
  regions: string[];
  beneficiaries: string[];
  capabilities: string[];
  pastProjects: string[];
  email: string;
  phone: string;
  address: string;
  comparison: ComparisonField[];
  evidence: EvidenceDNA;
}
