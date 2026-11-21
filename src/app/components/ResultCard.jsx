import TraitChart from "./recharts/TraitChart";
import DistributionBarChart from "./recharts/DistributionBarChart";
import ResultShareCard from "./ResultShareCard";
import EmailResults from "./EmailResults";

export default function ResultCard({ results }) {
  return (
    <>
      <div className="mb-6 flex min-w-0 flex-col gap-4">
        <ResultShareCard results={results} />
        <EmailResults sessionId={results.session_id} />
      </div>

      {results && (
        <div className="w-full min-w-0 space-y-6 overflow-x-clip sm:space-y-8">
          {/* Personality overview */}
          <section className="rounded-xl border border-[#263341] bg-[#0F1923] p-4 sm:p-8">
            <div className="mb-5 flex flex-col items-start justify-between gap-4 sm:mb-6 sm:flex-row">
              <div className="min-w-0">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#A5ADB7] sm:text-xs">
                  Your personality profile
                </p>

                <h2 className="wrap-break-word text-2xl font-bold leading-tight text-[#ECE8E1] sm:text-3xl">
                  {results.codenames}
                </h2>
              </div>

              <span className="shrink-0 border border-[#FF4655]/40 bg-[#FF4655]/10 px-3 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#FF4655] sm:px-4 sm:text-sm">
                {results.personality_code}
              </span>
            </div>

            <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <div className="min-w-0 border border-[#263341] bg-[#080B10]/60 p-4">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#A5ADB7] sm:text-xs">
                  Personality type
                </p>

                <p className="wrap-break-word text-base font-semibold text-[#ECE8E1] sm:text-lg">
                  {results.personality_name}
                </p>
              </div>

              <div className="min-w-0 border border-[#263341] bg-[#080B10]/60 p-4">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#A5ADB7] sm:text-xs">
                  Compatible type
                </p>

                <p className="wrap-break-word text-base font-semibold text-[#00F5D4] sm:text-lg">
                  {results.compatible_type}
                </p>
              </div>
            </div>
          </section>

          {/* Role and trait analysis */}
          <section className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
            <div className="min-w-0 rounded-xl border border-[#263341] bg-[#0F1923] p-4 sm:p-8">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#A5ADB7] sm:text-xs">
                Recommended playstyle
              </p>

              <h2 className="mb-5 wrap-break-word text-2xl font-bold text-[#FF4655]">
                {results.recommended_role}
              </h2>

              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#ECE8E1]">
                Role description
              </h3>

              <p className="wrap-break-word text-sm leading-7 text-[#A5ADB7]">
                {results.description_template}
              </p>
            </div>

            <div className="min-w-0 overflow-hidden rounded-xl border border-[#263341] bg-[#0F1923] p-3 sm:p-6">
              <div className="mb-4 px-1 sm:mb-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A5ADB7] sm:text-xs">
                  Performance breakdown
                </p>

                <h2 className="mt-2 text-xl font-bold text-[#ECE8E1]">
                  Your traits
                </h2>
              </div>

              <div className="w-full min-w-0">
                <TraitChart data={results} />
              </div>
            </div>
          </section>

          {/* Recommended agents */}
          <section className="min-w-0 space-y-5">
            <div>
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#A5ADB7] sm:text-xs">
                Agent recommendations
              </p>

              <h2 className="wrap-break-word text-2xl font-bold text-[#ECE8E1] sm:text-3xl">
                Agents for your playstyle
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#A5ADB7]">
                Explore the agents recommended for your individual traits.
              </p>
            </div>

            <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(results.recommended_agents).map(
                ([trait, agent]) => (
                  <article
                    key={trait}
                    className="group flex min-w-0 flex-col border border-[#263341] bg-[#0F1923] p-4 transition-colors duration-200 hover:border-[#FF4655]/60 sm:p-5"
                  >
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <span className="wrap-break-word font-mono text-xs uppercase tracking-widest text-[#A5ADB7]">
                        {trait}
                      </span>

                      <span
                        className="shrink-0 text-[#00F5D4]"
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </div>

                    <h3 className="mb-3 wrap-break-word text-xl font-bold text-[#ECE8E1] transition-colors group-hover:text-[#FF4655]">
                      {agent}
                    </h3>

                    <p className="mb-5 flex-1 text-sm leading-6 text-[#A5ADB7]">
                      Recommended for your {trait.toLowerCase()} trait.
                    </p>

                    <a
                      href="#"
                      className="inline-flex min-h-11 w-fit items-center gap-2 border-b border-[#FF4655]/50 pb-1 text-sm font-semibold text-[#FF4655] transition-colors hover:border-[#FF4655] hover:text-[#ECE8E1]"
                    >
                      Read more <span aria-hidden="true">↗</span>
                    </a>
                  </article>
                ),
              )}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
