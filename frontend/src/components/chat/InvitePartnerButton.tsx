import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProposal } from "../../api/proposals";
import { useAuth } from "../../hooks/useAuth";
import type { MatchRequest, NGOMatch } from "../../types/match";
import { Button } from "../ui/Button";

interface InvitePartnerButtonProps {
  match: NGOMatch;
  requirement: MatchRequest;
}

export function InvitePartnerButton({ match, requirement }: InvitePartnerButtonProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isInvited, setIsInvited] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    if (!user) {
      navigate("/login");
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      await createProposal(match, requirement);
      setIsInvited(true);
    } catch {
      setError("Could not send the invite. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full">
      <Button
        variant="success"
        className="w-full"
        onClick={handleClick}
        disabled={isSubmitting || isInvited}
      >
        {isInvited ? "Invited" : isSubmitting ? "Sending invite..." : "Invite Partner"}
      </Button>
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  );
}
