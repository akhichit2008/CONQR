import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../ui/Button";

const linkButtonClasses = "rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200";

export function AuthButton() {
  const { user, isLoading, logout } = useAuth();

  if (isLoading) {
    return null;
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm text-neutral-400">{user.companyName}</span>
        <Button variant="secondary" onClick={() => void logout()}>
          Log out
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        to="/login"
        className={`${linkButtonClasses} border border-white/10 text-neutral-100 hover:border-white/20`}
      >
        Log in
      </Link>
      <Link
        to="/register"
        className={`${linkButtonClasses} bg-[#09C7C4] text-black hover:bg-[#09C7C4]/90`}
      >
        Sign up
      </Link>
    </div>
  );
}
