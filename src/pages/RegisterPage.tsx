import { Link } from "react-router-dom";
import { RegisterForm } from "../components/auth/RegisterForm";
import { TopBar } from "../components/layout/TopBar";
import ShaderBackground from "../components/ui/shader-background";

export function RegisterPage() {
  return (
    <>
      <ShaderBackground />
      <main className="flex min-h-screen flex-col text-neutral-100">
        <TopBar />
        <div className="flex flex-1 items-center justify-center px-6 py-24">
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-black/40 p-8 backdrop-blur-md">
            <h1 className="font-display text-3xl text-[#B29E88]">Create your account</h1>
            <p className="mt-2 text-sm text-neutral-400">
              Set up Conqr for your company.
            </p>

            <div className="mt-6">
              <RegisterForm />
            </div>

            <p className="mt-6 text-center text-sm text-neutral-500">
              Already have an account?{" "}
              <Link to="/login" className="text-[#09C7C4] hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
