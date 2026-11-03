export default function ProgressBar({
  progress,
  ansCount,
  totalQuestions,
  compact = false,
}) {
  const safeProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="w-full min-w-0">
      <div className="mb-3 flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <p className="hidden font-mono text-xs uppercase tracking-widest text-[#A5ADB7] sm:block">
            Progress
          </p>

          <p className="whitespace-nowrap text-sm font-semibold text-[#ECE8E1] sm:text-base">
            <span className="mr-1 text-lg text-[#00F5D4] sm:text-xl">
              {ansCount}
            </span>
            / {totalQuestions}
            <span className="hidden sm:inline"> answered</span>
          </p>
        </div>

        <span className="shrink-0 text-base font-semibold text-[#FF4655] sm:text-lg">
          {Math.round(safeProgress)}%
        </span>
      </div>

      <div
        className={`w-full overflow-hidden rounded-full bg-[#263341] ${
          compact ? "h-1.5" : "h-2"
        }`}
        role="progressbar"
        aria-valuenow={Math.round(safeProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Quiz completion"
      >
        <div
          className="h-full rounded-full bg-[#FF4655] transition-[width] duration-300 ease-out"
          style={{ width: `${safeProgress}%` }}
        />
      </div>
    </div>
  );
}
