import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ApiError } from "../../api/client";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

export function RegisterForm() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await register({ email, companyName, password });
      navigate("/");
    } catch (err) {
      const emailTaken = err instanceof ApiError && err.status === 409;
      setError(emailTaken ? "An account with this email already exists." : "Could not create your account. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        id="companyName"
        label="Company name"
        autoComplete="organization"
        value={companyName}
        onChange={(event) => setCompanyName(event.target.value)}
        required
      />
      <Input
        id="email"
        label="Work email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        autoComplete="new-password"
        minLength={8}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}
