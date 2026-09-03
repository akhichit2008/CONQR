import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getCurrentUser, login as loginRequest, logout as logoutRequest, registerAccount } from "../api/auth";
import type { LoginRequest, RegisterRequest, User } from "../types/auth";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  register: (request: RegisterRequest) => Promise<void>;
  login: (request: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .finally(() => setIsLoading(false));
  }, []);

  async function register(request: RegisterRequest) {
    const registeredUser = await registerAccount(request);
    setUser(registeredUser);
  }

  async function login(request: LoginRequest) {
    const loggedInUser = await loginRequest(request);
    setUser(loggedInUser);
  }

  async function logout() {
    await logoutRequest();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
