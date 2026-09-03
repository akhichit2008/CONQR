import { TopBar } from "../components/layout/TopBar";
import ShaderBackground from "../components/ui/shader-background";

export function AboutPage() {
  return (
    <>
      <ShaderBackground />
      <main className="flex min-h-screen flex-col text-neutral-100">
        <TopBar />
        <div className="flex flex-1 items-center justify-center px-6 py-24 text-center">
          <h1 className="font-display text-5xl text-[#B29E88]">About us</h1>
        </div>
      </main>
    </>
  );
}
