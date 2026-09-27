import Link from "next/link";

export default function ResultSummaryCard({ results }) {
  // created_at = 2026-09-21 18:18:48.290182+00
  const resultSavedAt = new Date(results.created_at).toLocaleDateString(
    "en-GB",
  );

  return (
    <>
      <div className="relative flex min-h-48 w-full gap-4 rounded-4xl bg-amber-400 p-4 shadow-sm sm:p-5">
        {/* Image */}
        <div className="flex h-32 w-30 shrink-0 items-center justify-center rounded-3xl bg-white text-center text-sm font-bold">
          PLACEHOLDER
          <br />
          IMAGE
        </div>
        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col justify-between pr-16 mt-2 text-zinc-900 gap-4">
          <div>
            <h2 className="text-base font-black uppercase leading-tight">
              {results.codenames}
            </h2>

            <p className="mt-2 text-xs font-bold">{results.personality_name}</p>

            <p className="mt-2 text-sm font-black">{results.top_agent}</p>
          </div>

          <p className="text-sm font-bold">{resultSavedAt}</p>
        </div>
        {/* Full Result */}
        <Link
          href={`/result/${results.session_id}`}
          className="absolute bottom-4 right-4 text-xs font-bold text-neutral-900 hover:underline sm:text-sm"
        >
          View Full Result <span aria-hidden="true">↗</span>
        </Link>
        {/* Role Badge */}
        <div className="absolute right-4 top-4 rounded-full bg-neutral-900 px-4 py-1.5 text-sm font-semibold text-white sm:right-6 sm:top-6">
          {results.top_role}
        </div>
      </div>
    </>
  );
}
