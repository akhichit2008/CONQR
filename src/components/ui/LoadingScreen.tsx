import { useEffect } from "react";
import { motion } from "framer-motion";
import { Lottie } from "lottie-react";

interface LoadingScreenProps {
  onFinished: () => void;
}

export function LoadingScreen({ onFinished }: LoadingScreenProps) {
  useEffect(() => {
    // Safety net: never let a stuck or failed animation trap the user on
    // the splash screen indefinitely.
    const fallbackTimer = setTimeout(onFinished, 6000);
    return () => clearTimeout(fallbackTimer);
  }, [onFinished]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#030000]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <div className="relative aspect-video w-[90vw] max-w-6xl">
        <Lottie
          src="/scene.json"
          loop={false}
          autoplay
          className="h-full w-full"
          subscriptions={{
            complete: onFinished,
            error: onFinished,
          }}
        />
        <motion.span
          className="gradient-text font-display absolute top-1/2 left-[44%] -translate-y-1/2 text-[7vw] leading-none sm:text-[4.5rem]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.5 }}
        >
          CONQR
        </motion.span>
      </div>
    </motion.div>
  );
}
