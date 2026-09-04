import { useState, type ReactNode } from "react";
import { AnimatePresence, useIsPresent } from "framer-motion";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { AboutPage } from "./pages/AboutPage";
import { DashboardPage } from "./pages/DashboardPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { SearchPage } from "./pages/SearchPage";
import { LoadingScreen } from "./components/ui/LoadingScreen";
import { TopBar } from "./components/layout/TopBar";

interface AnimatedRoutesProps {
  hasEntered: boolean;
}

// Outgoing pages switch to position: absolute the moment they start exiting,
// so they stop pushing the incoming page down the document - without this,
// both pages sit in normal flow at once during the transition and stack on
// top of each other instead of overlapping. This is done as a plain class
// toggle (via useIsPresent) rather than through framer-motion's own
// animate/exit style pipeline - routing that same position change through
// framer-motion was racing with the Home/Campaign glass-panel layoutId
// transition and freezing it instead of letting it interpolate smoothly.
function RouteLayer({ children }: { children: ReactNode }) {
  const isPresent = useIsPresent();
  return <div className={isPresent ? "w-full" : "absolute inset-0 w-full"}>{children}</div>;
}

function AnimatedRoutes({ hasEntered }: AnimatedRoutesProps) {
  const location = useLocation();

  return (
    <AnimatePresence>
      <RouteLayer key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<HomePage hasEntered={hasEntered} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </RouteLayer>
    </AnimatePresence>
  );
}

export function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <BrowserRouter>
      <AuthProvider>
        <AnimatePresence>
          {isLoading && <LoadingScreen onFinished={() => setIsLoading(false)} />}
        </AnimatePresence>
        {/* Rendered once here, outside the per-route AnimatePresence, so
            navigating between pages never briefly mounts two fixed-position
            top bars on top of each other. */}
        <TopBar revealed={!isLoading} />
        <AnimatedRoutes hasEntered={!isLoading} />
      </AuthProvider>
    </BrowserRouter>
  );
}
