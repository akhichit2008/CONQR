import type { LucideIcon } from "lucide-react";

interface WorkflowStepProps {
  index: number;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  items: string[];
}

export function WorkflowStep({ index, icon: Icon, title, subtitle, items }: WorkflowStepProps) {
  return (
    <div className="flex-1 rounded-xl border border-white/10 bg-black/40 p-5 text-left backdrop-blur-md">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-[#B29E88]">
          {String(index).padStart(2, "0")}
        </span>
        <Icon className="h-5 w-5 text-[#09C7C4]" />
      </div>
      <h3 className="mt-3 font-display text-lg text-neutral-100">{title}</h3>
      <p className="mt-1 font-mono text-xs tracking-wide text-[#B29E88]">{subtitle}</p>
      <ul className="mt-3 flex flex-col gap-1.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-neutral-400">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#09C7C4]" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
