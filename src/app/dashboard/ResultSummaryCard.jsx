import Link from "next/link";

export default function ResultSummaryCard({ results }) {
  // created_at = 2026-09-21 18:18:48.290182+00
  const resultSavedAt = new Date(results.created_at).toLocaleDateString(
    "en-GB",
  );

  return (
    <>
      <div className="group relative flex w-full min-w-0 flex-col gap-4 overflow-hidden rounded-xl border border-[#263341] bg-[#0F1923] p-4 shadow-lg transition-all duration-300 hover:border-[#FF4655]/60 sm:rounded-2xl sm:p-5">
        {/* Top accent */}
        <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#FF4655] via-[#FF4655]/50 to-transparent" />

        {/* Header */}
        <div className="flex min-w-0 items-start justify-between gap-2 pt-1 sm:gap-3">
          <div className="min-w-0">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#00F5D4]">
              Personality Profile
            </p>

            <h2 className="break-words font-[var(--font-heading)] text-xl font-bold uppercase leading-tight tracking-wide text-[#ECE8E1] sm:text-2xl">
              {results.codenames}
            </h2>
          </div>

          {/* Role badge */}
          <div className="max-w-[45%] shrink-0 rounded-md border border-[#00F5D4]/30 bg-[#00F5D4]/10 px-2 py-1.5 sm:px-3">
            <span className="break-words font-mono text-[9px] font-bold uppercase tracking-wider text-[#00F5D4] sm:text-[10px]">
              {results.top_role || "Unknown"}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-[#263341]" />

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div>
            <p className="break-words text-sm font-semibold leading-5 text-[#ECE8E1]">
              {results.personality_name}
            </p>
          </div>

          <div className="min-w-0 rounded-lg border border-[#263341] bg-[#080B10] p-3">
            <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-[#A5ADB7]">
              Top Agent
            </p>

            <p className="break-words text-sm font-bold text-[#FF4655]">
              {results.top_agent}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-[#263341] pt-4">
          <p className="font-mono text-[10px] text-[#A5ADB7]">
            {resultSavedAt}
          </p>

          <Link
            href={`/result/${results.session_id}`}
            className="inline-flex min-h-11 items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#ECE8E1] transition-colors hover:text-[#FF4655] sm:text-xs"
          >
            View Result
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              ↗
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
