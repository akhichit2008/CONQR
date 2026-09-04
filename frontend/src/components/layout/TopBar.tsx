import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Glass } from "@samasante/liquid-glass";
import { AuthButton } from "../auth/AuthButton";
import { useAuth } from "../../hooks/useAuth";

const hiddenTopBar = { y: -80, opacity: 0 };
const visibleTopBar = { y: 0, opacity: 1 };

interface TopBarProps {
  revealed?: boolean;
}

export function TopBar({ revealed = true }: TopBarProps) {
  const { user } = useAuth();

  return (
    <motion.header
      initial={revealed ? visibleTopBar : hiddenTopBar}
      animate={revealed ? visibleTopBar : hiddenTopBar}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-20"
    >
      <div className="relative mx-6 rounded-2xl">
        <Glass
          className="items-center justify-between gap-3 rounded-2xl border border-[#18028C]/15 px-4 py-2.5"
          style={{ display: "flex", background: "rgba(3, 0, 0, 0)" }}
          optics={{
            depth: 0.2,
            curvature: 0.3,
            bend: 0.2,
            bendWidth: 0.14,
            dispersion: 0,
            frost: 0,
            brightness: 0,
            glow: 0,
            glowSpread: 0.3,
            sheen: 1,
            sheenWidth: 4,
          }}
        >
          <div className="flex items-center gap-5">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo2-transparent.png" alt="Conqr logo" className="h-6 w-6 object-contain" />
              <span className="-translate-y-0.5 font-display text-lg text-[#B29E88]">Conqr</span>
            </Link>
            <Link to="/search" className="text-sm text-neutral-300 transition-colors hover:text-white">
              Campaign
            </Link>
            {user && (
              <Link to="/dashboard" className="text-sm text-neutral-300 transition-colors hover:text-white">
                Profile
              </Link>
            )}
            <Link to="/about" className="text-sm text-neutral-300 transition-colors hover:text-white">
              About
            </Link>
          </div>
          <AuthButton />
        </Glass>
      </div>
    </motion.header>
  );
}
