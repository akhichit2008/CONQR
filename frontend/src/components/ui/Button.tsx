import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "success";
}

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  const variantClasses =
    variant === "primary"
      ? "bg-[#09C7C4] text-black hover:bg-[#09C7C4]/90"
      : variant === "success"
        ? "bg-emerald-500 text-black hover:bg-emerald-500/90"
        : "border border-white/10 text-neutral-100 hover:border-white/20";

  return (
    <button
      className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses} ${className}`}
      {...props}
    />
  );
}
