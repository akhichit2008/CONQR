import type { PointerEvent } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { GlassGlint } from "../ui/GlassGlint";

interface StrategyCardProps {
  title: string;
  description: string;
}

export function StrategyCard({ title, description }: StrategyCardProps) {
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
      className="relative rounded-xl"
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <GlassGlint />
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ opacity: glareOpacity, background: glareBackground }}
      />
      <div className="rounded-xl border border-white/10 bg-black/40 px-6 py-6 text-left backdrop-blur-md transition-colors duration-300 hover:border-white/20 hover:bg-black/30">
        <h3 className="font-mono text-sm tracking-widest text-[#09C7C4]">{title}</h3>
        <p className="mt-3 text-sm text-neutral-300">{description}</p>
      </div>
    </div>
  );
}
