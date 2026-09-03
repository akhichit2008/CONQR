import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ConstellationNode {
  id: number;
  topPercent: number;
  leftPercent: number;
  driftX: number;
  driftY: number;
  duration: number;
  delay: number;
  size: number;
}

const NODE_COUNT = 16;
const CONNECTION_STEP = 10;

function createNodes(): ConstellationNode[] {
  return Array.from({ length: NODE_COUNT }, (_, index) => ({
    id: index,
    topPercent: Math.random() * 100,
    leftPercent: Math.random() * 100,
    driftX: 15 + Math.random() * 25,
    driftY: 15 + Math.random() * 25,
    duration: 18 + Math.random() * 14,
    delay: Math.random() * -20,
    size: 2 + Math.random() * 2,
  }));
}

function createConnections(nodes: ConstellationNode[]) {
  return nodes.map((node, index) => {
    const partner = nodes[(index + CONNECTION_STEP) % nodes.length];
    return [node, partner] as const;
  });
}

export function ConstellationBackground() {
  const prefersReducedMotion = useReducedMotion();
  const nodes = useMemo(createNodes, []);
  const connections = useMemo(() => createConnections(nodes), [nodes]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {connections.map(([from, to]) => (
          <line
            key={`${from.id}-${to.id}`}
            x1={from.leftPercent}
            y1={from.topPercent}
            x2={to.leftPercent}
            y2={to.topPercent}
            stroke="#3D3125"
            strokeWidth={0.08}
            opacity={0.4}
          />
        ))}
      </svg>

      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute rounded-full bg-[#09C7C4]"
          style={{
            top: `${node.topPercent}%`,
            left: `${node.leftPercent}%`,
            width: node.size,
            height: node.size,
            boxShadow: "0 0 6px rgba(9, 199, 196, 0.6)",
          }}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  x: [0, node.driftX, 0, -node.driftX, 0],
                  y: [0, -node.driftY, 0, node.driftY, 0],
                  opacity: [0.5, 0.9, 0.5],
                }
          }
          transition={{
            duration: node.duration,
            delay: node.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
