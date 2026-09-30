import Link from "next/link";

export default function ResultSummaryCard({ results }) {
  // created_at = 2026-09-21 18:18:48.290182+00
  const resultSavedAt = new Date(results.created_at).toLocaleDateString(
    "en-GB",
  );

  return (
    <>
      <div className="relative flex w-full min-w-0 flex-col gap-3 overflow-hidden rounded-4xl bg-amber-400 p-4 shadow-sm md:flex-row md:gap-3 lg:p-5">
        {/* Image */}
        <div className="flex h-24 w-full shrink-0 items-center justify-center rounded-3xl bg-white text-center text-sm font-bold md:h-20 md:w-30 lg:h-24 lg:w-24">
          PLACEHOLDER
          <br />
          IMAGE
        </div>
        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-4 pr-12 text-zinc-900 sm:mt-2 sm:pr-16">
          <h2 className="text-base font-black uppercase leading-tight sm:text-lg">
            {results.codenames}
          </h2>
          <div>
            <p className="mt-2 text-xs font-bold">{results.personality_name}</p>
            <p className="mt-2 text-sm font-black">
              Top Agent - {results.top_agent}
            </p>
          </div>
          <div className="mt-auto flex items-center justify-between gap-2">
            <p className="text-xs font-bold">{resultSavedAt}</p>

            <Link
              href={`/result/${results.session_id}`}
              className="text-xs font-bold text-neutral-900 hover:underline"
            >
              View Full Result ↗
            </Link>
          </div>
        </div>

        {/* Role Badge */}
        <div className="absolute right-3 top-3 rounded-full bg-neutral-900 px-3 py-1 text-[10px] font-semibold text-white lg:right-4 lg:top-4 lg:px-4 lg:py-1.5 lg:text-sm">
          {results.top_role || "Unknown"}
        </div>
      </div>
    </>
  );
}
