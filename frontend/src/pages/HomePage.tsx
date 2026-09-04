import { Building2, Database, Layers, Puzzle, Scale, Sigma, SlidersHorizontal } from "lucide-react";
import { motion, useIsPresent } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Glass } from "@samasante/liquid-glass";
import ShaderBackground from "../components/ui/shader-background";
import { StrategyCard } from "../components/chat/StrategyCard";
import { WorkflowStep } from "../components/chat/WorkflowStep";
import { ImpactStat } from "../components/chat/ImpactStat";

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
  // Once this page starts exiting (e.g. navigating to Campaign), stop the
  // WebGL background and the liquid-glass SVG filters immediately instead of
  // leaving them running for the rest of the exit animation - they were
  // competing with the incoming page's own WebGL/filter setup and made the
  // transition feel laggy.
  const isPresent = useIsPresent();
  const isActive = hasEntered && isPresent;

  // useLocation is context-based, so it keeps updating even while this page
  // is being kept mounted for its exit animation - by the time we're exiting,
  // it already reflects the destination route. The glass-panel morph only
  // makes sense when the other side of the navigation is Campaign, so every
  // other destination should skip the special fade/morph treatment entirely.
  const location = useLocation();
  const isCampaignTransition = location.pathname === "/search";

  return (
    <>
      <motion.div
        initial={{ opacity: hasEntered ? 1 : 0 }}
        animate={{ opacity: hasEntered ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <ShaderBackground active={isActive} />
      </motion.div>
      <main className="flex min-h-screen flex-col text-neutral-100">
        <section className="relative flex h-screen w-full items-center justify-center px-6 sm:px-16">
          <motion.div
            layoutId="glass-panel"
            exit={{ opacity: 1 }}
            transition={{ duration: 0.35, ease: "easeInOut", delay: 0.1 }}
            className="absolute inset-0 bg-black/1 backdrop-blur-md"
          />

          {isActive && (
            <>
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
            </>
          )}

          {/* On the very first mount (still behind the splash) this should
              just appear with no animation of its own - initial={false}
              skips straight to the animate target. On every later mount
              (navigating back from Campaign) it needs a real fade-in,
              delayed so it doesn't show up before the glass panel has
              finished growing back to full size. Leaving to any page other
              than Campaign skips the fade entirely - there's no matching box
              on those pages for it to be sequenced against. */}
          <motion.div
            initial={hasEntered ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            exit={isCampaignTransition ? { opacity: 0 } : { opacity: 1 }}
            transition={
              isPresent
                ? { duration: 0.22, ease: "easeOut", delay: hasEntered ? 0.28 : 0 }
                : isCampaignTransition
                  ? { duration: 0.1, ease: "easeOut" }
                  : { duration: 0 }
            }
            className="relative z-10 mx-auto max-w-2xl text-center"
          >
            <h1 className="gradient-text font-display pb-10 text-8xl">CONQR</h1>
            <p className="mt-6 font-display text-2xl leading-snug text-neutral-100 sm:text-3xl">
              END-TO-END Enterprise Framework for Impactful Partnerships
            </p>
            <p className="mx-auto mt-6 max-w-xl font-display tracking-wide text-neutral-400">
              We foster impactful Corporate-NGO Collaborations by providing a Comparative Analysis framework
              enabling CSR Representatives to Find NGO Partners that share the same ideology as their enterprises
            </p>
          </motion.div>
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
                icon={Sigma}
                title="TF-IDF + WEK"
                description="Measures how closely a corporate requirement matches each NGO profile, using TF-IDF paired with a Weighted Exponential Kernel for domain-aware similarity."
              />
              <StrategyCard
                icon={Layers}
                title="K-MEDOIDS CLUSTERING"
                description="Clusters noisy CSR requirements to cut the candidate pool of NGOs down before anything gets ranked."
              />
              <StrategyCard
                icon={SlidersHorizontal}
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
