import { motion, useIsPresent } from "framer-motion";
import { useLocation } from "react-router-dom";
import { SearchForm } from "../components/chat/SearchForm";
import ShaderBackground from "../components/ui/shader-background";

export function SearchPage() {
  const isPresent = useIsPresent();

  // Same reasoning as HomePage: useLocation keeps updating while this page
  // is held mounted for its exit animation, so it already reflects the
  // destination route by the time we're exiting.
  const location = useLocation();
  const isHomeTransition = location.pathname === "/";

  return (
    <>
      <ShaderBackground />
      <main className="flex min-h-screen flex-col text-neutral-100">
        <div className="flex flex-1 items-center justify-center px-6 py-24">
          <motion.div
            layoutId="glass-panel"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="w-full max-w-lg rounded-2xl border border-white/10 bg-black/40 p-8 backdrop-blur-md"
          >
            {/* Content fades out fast on its own, before the box starts
                reshaping back into the hero - the box's own transition on
                the Home side is delayed so it doesn't visibly start
                reshaping until this fade is done. */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={isHomeTransition ? { opacity: 0 } : { opacity: 1 }}
              transition={
                isPresent
                  ? { duration: 0.22, ease: "easeOut", delay: 0.2 }
                  : isHomeTransition
                    ? { duration: 0.1, ease: "easeOut" }
                    : { duration: 0 }
              }
            >
              <h1 className="font-display text-3xl text-[#B29E88]">Explore & Compare NGO Partner</h1>
              <p className="mt-2 text-sm text-neutral-400">
                Tell us what you're looking for and we'll narrow it down for you.
              </p>

              <div className="mt-6">
                <SearchForm />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
