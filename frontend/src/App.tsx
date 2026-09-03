import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { AboutPage } from "./pages/AboutPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { SearchPage } from "./pages/SearchPage";
import { LoadingScreen } from "./components/ui/LoadingScreen";

export function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <BrowserRouter>
      <AuthProvider>
        <AnimatePresence>
          {isLoading && <LoadingScreen onFinished={() => setIsLoading(false)} />}
        </AnimatePresence>
        <Routes>
          <Route path="/" element={<HomePage hasEntered={!isLoading} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
