import { motion, useReducedMotion } from "framer-motion";

interface AuroraBlob {
  id: number;
  color: string;
  topPercent: number;
  leftPercent: number;
  size: number;
  duration: number;
}

const BLOBS: AuroraBlob[] = [
  { id: 0, color: "#09C7C4", topPercent: 20, leftPercent: 25, size: 560, duration: 34 },
  { id: 1, color: "#18028C", topPercent: 70, leftPercent: 75, size: 620, duration: 40 },
  { id: 2, color: "#09C7C4", topPercent: 82, leftPercent: 18, size: 480, duration: 46 },
];

export function AuroraBackground() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-[#030000]">
      {BLOBS.map((blob) => (
        <motion.div
          key={blob.id}
          className="absolute rounded-full opacity-20 blur-3xl"
          style={{
            top: `${blob.topPercent}%`,
            left: `${blob.leftPercent}%`,
            width: blob.size,
            height: blob.size,
            backgroundColor: blob.color,
          }}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  x: [0, 60, -40, 0],
                  y: [0, -50, 40, 0],
                }
          }
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
