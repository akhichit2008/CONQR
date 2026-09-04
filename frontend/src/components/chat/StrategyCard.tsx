import type { PointerEvent } from "react";
import type { LucideIcon } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { GlassGlint } from "../ui/GlassGlint";

interface StrategyCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function StrategyCard({ icon: Icon, title, description }: StrategyCardProps) {
  const pointerX = useMotionValue("50%");
  const pointerY = useMotionValue("50%");
  const glareOpacity = useSpring(0, { stiffness: 200, damping: 24 });
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${pointerX} ${pointerY}, rgba(255,255,255,0.3), transparent 60%)`;

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(`${((event.clientX - bounds.left) / bounds.width) * 100}%`);
    pointerY.set(`${((event.clientY - bounds.top) / bounds.height) * 100}%`);
  }

  function handlePointerEnter() {
    glareOpacity.set(1);
  }

  function handlePointerLeave() {
    glareOpacity.set(0);
  }

  return (
    <div
      className="relative h-full rounded-xl"
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <GlassGlint />
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ opacity: glareOpacity, background: glareBackground }}
      />
      <div className="h-full rounded-xl border border-white/10 bg-black/40 p-5 text-left backdrop-blur-md transition-colors duration-300 hover:border-white/20 hover:bg-black/30">
        <Icon className="h-5 w-5 text-[#09C7C4]" />
        <h3 className="mt-3 font-mono text-base tracking-wide text-neutral-100">{title}</h3>
        <p className="mt-2 text-sm text-neutral-400">{description}</p>
      </div>
    </div>
  );
}
