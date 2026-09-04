interface TeamMemberCardProps {
  name: string;
}

export function TeamMemberCard({ name }: TeamMemberCardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/40 px-6 py-5 text-center backdrop-blur-md transition-colors duration-300 hover:border-white/20">
      <p className="font-display text-lg text-[#B29E88]">{name}</p>
      <p className="mt-1 font-mono text-xs uppercase tracking-widest text-neutral-500">Team N1CHE</p>
    </div>
  );
}
