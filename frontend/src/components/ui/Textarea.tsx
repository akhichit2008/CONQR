import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function Textarea({ label, id, className = "", ...props }: TextareaProps) {
  return (
    <div className="text-left">
      <label htmlFor={id} className="mb-1 block text-sm text-neutral-400">
        {label}
      </label>
      <textarea
        id={id}
        className={`w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-neutral-100 outline-none focus:border-[#09C7C4] ${className}`}
        {...props}
      />
    </div>
  );
}
