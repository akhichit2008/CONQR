import { useEffect, useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { getNgoSuggestions } from "../../api/match";
import type { MatchRequest, NGOMatch } from "../../types/match";

interface NGOSuggestionsProps {
  match: NGOMatch;
  requirement: MatchRequest;
}

export function NGOSuggestions({ match, requirement }: NGOSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);
    setHasError(false);

    getNgoSuggestions(match, requirement)
      .then((result) => {
        if (!isCancelled) setSuggestions(result);
      })
      .catch(() => {
        if (!isCancelled) setHasError(true);
      })
      .finally(() => {
        if (!isCancelled) setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [match, requirement]);

  return (
    <div className="mt-6 border-t border-white/10 pt-4">
      <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-neutral-500">
        <Sparkles className="h-3.5 w-3.5 text-[#09C7C4]" />
        Suggestions
      </h3>

      {isLoading && (
        <div className="mt-3 flex items-center gap-2 text-sm text-neutral-500">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Analyzing this match...
        </div>
      )}

      {!isLoading && hasError && (
        <p className="mt-3 text-sm text-neutral-500">Could not load suggestions. Try again later.</p>
      )}

      {!isLoading && !hasError && (
        <ul className="mt-3 flex flex-col gap-2">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="flex gap-2 text-sm text-neutral-300">
              <span className="text-[#09C7C4]">•</span>
              <span>{suggestion}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
