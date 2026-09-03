import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, id, className = "", ...props }: InputProps) {
  return (
    <div className="text-left">
      <label htmlFor={id} className="mb-1 block text-sm text-neutral-400">
        {label}
      </label>
      <input
        id={id}
        className={`w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-neutral-100 outline-none focus:border-[#09C7C4] ${className}`}
        {...props}
      />
    </div>
  );
}
