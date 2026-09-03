import { SearchForm } from "../components/chat/SearchForm";
import { TopBar } from "../components/layout/TopBar";
import ShaderBackground from "../components/ui/shader-background";

export function SearchPage() {
  return (
    <>
      <ShaderBackground />
      <main className="flex min-h-screen flex-col text-neutral-100">
        <TopBar />
        <div className="flex flex-1 items-center justify-center px-6 py-24">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-black/40 p-8 backdrop-blur-md">
            <h1 className="font-display text-3xl text-[#B29E88]">Explore & Compare NGO Partner</h1>
            <p className="mt-2 text-sm text-neutral-400">
              Tell us what you're looking for and we'll narrow it down for you.
            </p>

            <div className="mt-6">
              <SearchForm />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
