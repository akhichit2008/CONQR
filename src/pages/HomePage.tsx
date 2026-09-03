import { Building2, Database, Puzzle, Scale } from "lucide-react";
import { motion } from "framer-motion";
import { Glass } from "@samasante/liquid-glass";
import ShaderBackground from "../components/ui/shader-background";
import { TopBar } from "../components/layout/TopBar";
import { StrategyCard } from "../components/chat/StrategyCard";
import { WorkflowStep } from "../components/chat/WorkflowStep";
import { ImpactStat } from "../components/chat/ImpactStat";

const headingContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
};

const headingLetter = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
} as const;

const heroGlassOptics = {
  depth: 0.5,
  curvature: 0.75,
  bend: 0.6,
  bendWidth: 0.22,
  dispersion: 0.6,
  frost: 0.5,
  brightness: 0,
  glow: 0,
  glowSpread: 0.3,
  sheen: 1,
  sheenWidth: 8,
};

interface HomePageProps {
  hasEntered?: boolean;
}

export function HomePage({ hasEntered = true }: HomePageProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: hasEntered ? 1 : 0 }}
        animate={{ opacity: hasEntered ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <ShaderBackground />
      </motion.div>
      <main className="flex min-h-screen flex-col text-neutral-100">
        <TopBar revealed={hasEntered} />

        <section className="relative flex h-screen w-full items-center justify-center px-6 sm:px-16">
          <div className="absolute inset-0 bg-black/1 backdrop-blur-md" />

          <Glass
            className="absolute inset-x-0 top-0 h-10"
            style={{ background: "rgba(3, 0, 0, 0)" }}
            optics={heroGlassOptics}
          />
          <Glass
            className="absolute inset-x-0 bottom-0 h-10"
            style={{ background: "rgba(3, 0, 0, 0)" }}
            optics={heroGlassOptics}
          />
          <Glass
            className="absolute inset-y-0 left-0 w-10"
            style={{ background: "rgba(3, 0, 0, 0)" }}
            optics={heroGlassOptics}
          />
          <Glass
            className="absolute inset-y-0 right-0 w-10"
            style={{ background: "rgba(3, 0, 0, 0)" }}
            optics={heroGlassOptics}
          />

          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <motion.h1
              className="gradient-text font-display pb-6 text-6xl"
              variants={headingContainer}
              initial={hasEntered ? "visible" : "hidden"}
              animate={hasEntered ? "visible" : "hidden"}
            >
              {"CONQR".split("").map((letter, index) => (
                <motion.span key={index} variants={headingLetter} style={{ display: "inline-block" }}>
                  {letter}
                </motion.span>
              ))}
            </motion.h1>
            <p className="mt-6 font-display text-100xl leading-tight text-neutral-100 sm:text-5xl">
              END-TO-END Enterprise Framework for Impactful Partnerships
            </p>
            <p className="mx-auto mt-6 max-w-xl font-display tracking-wide text-neutral-400">
              We foster impactful Corporate-NGO Collaborations by providing a Comparative Analysis framework
              enabling CSR Representatives to Find NGO Partners that share the same ideology as their enterprises
            </p>
          </div>
        </section>

        <div className="px-6 pb-24">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-col gap-8 text-left sm:flex-row">
              <WorkflowStep
                index={1}
                icon={Building2}
                title="Corporate Requirements"
                subtitle="Corporate submits specifications"
                items={[
                  "Focus area / theme",
                  "Location / region",
                  "Target beneficiaries",
                  "Budget & timeline",
                  "Expected outcomes",
                  "Other preferences",
                ]}
              />
              <WorkflowStep
                index={2}
                icon={Database}
                title="Profile Aggregation"
                subtitle="Conqr aggregates"
                items={[
                  "NGO websites",
                  "Annual reports",
                  "Project reports",
                  "Impact assessments",
                  "Databases & portals",
                  "Public documents",
                ]}
              />
              <WorkflowStep
                index={3}
                icon={Puzzle}
                title="Matchmaking Engine"
                subtitle="Runs on your specification"
                items={[
                  "Semantic matching",
                  "Multi-factor decisioning",
                  "Match scores",
                  "Custom spatio-temporal clustering",
                ]}
              />
              <WorkflowStep
                index={4}
                icon={Scale}
                title="Decision Compare"
                subtitle="Conqr delivers"
                items={[
                  "Side-by-side comparisons",
                  "AI-assisted recommendations",
                  "Contact information",
                  "Smart profiling",
                  "Constraint management",
                ]}
              />
            </div>

            <div className="mt-16 grid gap-4 text-left sm:grid-cols-3">
              <StrategyCard
                title="TF-IDF + WEK"
                description="Measures how closely a corporate requirement matches each NGO profile, using TF-IDF paired with a Weighted Exponential Kernel for domain-aware similarity."
              />
              <StrategyCard
                title="K-MEDOIDS CLUSTERING"
                description="Clusters noisy CSR requirements to cut the candidate pool of NGOs down before anything gets ranked."
              />
              <StrategyCard
                title="MULTI-FACTOR DECISIONING"
                description="Ranks the remaining NGOs on multiple factors plus a spatio-temporal signal, then builds the formal proposal."
              />
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-10">
              <ImpactStat value="70%" label="less time spent finding the right NGO partner" />
              <ImpactStat value="Multi-source" label="verification behind every NGO profile" />
              <ImpactStat value="Evidence-backed" label="scoring, not keyword guesses" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
