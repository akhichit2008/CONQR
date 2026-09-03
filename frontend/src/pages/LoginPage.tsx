import { Link } from "react-router-dom";
import { LoginForm } from "../components/auth/LoginForm";
import { TopBar } from "../components/layout/TopBar";
import ShaderBackground from "../components/ui/shader-background";

export function LoginPage() {
  return (
    <>
      <ShaderBackground />
      <main className="flex min-h-screen flex-col text-neutral-100">
        <TopBar />
        <div className="flex flex-1 items-center justify-center px-6 py-24">
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-black/40 p-8 backdrop-blur-md">
            <h1 className="font-display text-3xl text-[#B29E88]">Sign in</h1>
            <p className="mt-2 text-sm text-neutral-400">Sign in to your Conqr account.</p>

            <div className="mt-6">
              <LoginForm />
            </div>

            <p className="mt-6 text-center text-sm text-neutral-500">
              Don't have an account?{" "}
              <Link to="/register" className="text-[#09C7C4] hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
