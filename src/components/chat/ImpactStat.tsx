interface ImpactStatProps {
  value: string;
  label: string;
}

export function ImpactStat({ value, label }: ImpactStatProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/40 p-6 text-center backdrop-blur-md">
      <div className="font-mono text-4xl text-[#09C7C4]">{value}</div>
      <div className="mt-2 text-sm text-neutral-400">{label}</div>
    </div>
  );
}
