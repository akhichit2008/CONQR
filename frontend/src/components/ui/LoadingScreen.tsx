import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lottie } from "lottie-react";
import ShaderBackground from "./shader-background";

interface LoadingScreenProps {
  onFinished: () => void;
}

// The wordmark slides up right as the icon's own leftward slide starts
// (scene.json's icon keyframes were shifted earlier to match, frames 15-51
// instead of the original 48-84), then dissolves back out around frame 90 -
// it never just sits there once revealed. Both are driven by the Lottie's
// own playback instead of a fixed delay, which drifts out of sync with the
// icon depending on how long the file takes to load.
const TEXT_REVEAL_FRAME = 15;
const TEXT_FADE_OUT_FRAME = 90;

type TextPhase = "hidden" | "visible" | "fading";

const textVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
  fading: { opacity: 0, y: 0 },
};

export function LoadingScreen({ onFinished }: LoadingScreenProps) {
  const [textPhase, setTextPhase] = useState<TextPhase>("hidden");

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
      <div className="absolute inset-0 blur-xl">
        <ShaderBackground />
      </div>
      <div className="relative aspect-video w-[98vw] max-w-[2400px]">
        <Lottie
          src="/scene.json"
          loop={false}
          autoplay
          speed={2}
          className="h-full w-full blur-[1px]"
          subscriptions={{
            complete: onFinished,
            error: onFinished,
            frame: (event) => {
              if (event.currentFrame >= TEXT_FADE_OUT_FRAME) setTextPhase("fading");
              else if (event.currentFrame >= TEXT_REVEAL_FRAME) setTextPhase("visible");
            },
          }}
        />
        <motion.span
          className="gradient-text font-display absolute top-1/2 left-[41.5%] -translate-y-1/2 pb-3 text-[9vw] leading-[1.15] sm:text-[7rem]"
          variants={textVariants}
          initial="hidden"
          animate={textPhase}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          CONQR
        </motion.span>
      </div>
    </motion.div>
  );
}
