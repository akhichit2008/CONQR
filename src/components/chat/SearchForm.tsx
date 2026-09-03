import { useState, type FormEvent } from "react";
import { findMatches } from "../../api/match";
import type { MatchRequest, NGOMatch } from "../../types/match";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { NGOComparisonModal } from "./NGOComparisonModal";

export function SearchForm() {
  const [focusArea, setFocusArea] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [expectedOutcomes, setExpectedOutcomes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [matches, setMatches] = useState<NGOMatch[] | null>(null);
  const [submittedRequirement, setSubmittedRequirement] = useState<MatchRequest | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<NGOMatch | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const requirement: MatchRequest = {
      focusArea,
      location,
      budget,
      timeline,
      expectedOutcomes,
    };

    try {
      const results = await findMatches(requirement);
      setMatches(results);
      setSubmittedRequirement(requirement);
    } catch {
      setError("Could not find matches. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (matches) {
    if (matches.length === 0) {
      return (
        <div className="rounded-lg border border-white/10 bg-black/40 p-6 text-left backdrop-blur-md">
          <p className="text-neutral-200">No NGOs matched that requirement yet.</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-3 text-left">
        {matches.map((match) => (
          <button
            key={match.name}
            type="button"
            onClick={() => setSelectedMatch(match)}
            className="rounded-lg border border-white/10 bg-black/40 p-4 text-left backdrop-blur-md transition-colors hover:border-white/20"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg text-[#B29E88]">{match.name}</h3>
              <span className="font-mono text-sm text-[#09C7C4]">{match.matchScore}%</span>
            </div>
            <p className="mt-1 text-sm text-neutral-400">
              {[...match.expertise, ...match.regions, ...match.beneficiaries].join(" · ")}
            </p>
          </button>
        ))}

        {selectedMatch && submittedRequirement && (
          <NGOComparisonModal
            match={selectedMatch}
            requirement={submittedRequirement}
            onClose={() => setSelectedMatch(null)}
          />
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        id="focusArea"
        label="CSR focus area"
        placeholder="e.g. clean water access"
        value={focusArea}
        onChange={(event) => setFocusArea(event.target.value)}
        required
      />
      <Input
        id="location"
        label="Location"
        placeholder="e.g. East Africa"
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          id="budget"
          label="Budget"
          placeholder="e.g. $50,000"
          value={budget}
          onChange={(event) => setBudget(event.target.value)}
          required
        />
        <Input
          id="timeline"
          label="Timeline"
          placeholder="e.g. 6 months"
          value={timeline}
          onChange={(event) => setTimeline(event.target.value)}
          required
        />
      </div>
      <Textarea
        id="expectedOutcomes"
        label="Expected outcomes"
        rows={4}
        placeholder="What does success look like?"
        value={expectedOutcomes}
        onChange={(event) => setExpectedOutcomes(event.target.value)}
        required
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Finding matches..." : "Find NGO matches"}
      </Button>
    </form>
  );
}
