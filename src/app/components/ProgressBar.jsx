export default function ProgressBar({ progress, ansCount, totalQuestions }) {
  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-[#A5ADB7]">
            Your Progress
          </p>

          <p className="font-semibold text-[#ECE8E1]">
            <span className="mr-2 text-2xl text-[#00F5D4]">{ansCount}</span>/{" "}
            {totalQuestions} answered
          </p>
        </div>

        <span className="text-2xl font-semibold text-[#FF4655]">
          {Math.round(progress)}%
        </span>
      </div>

      {/* Progress track */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-[#263341]">
        {/* Filled portion */}
        <div
          className="h-full rounded-full bg-[#FF4655] transition-all duration-300 ease-out"
          style={{
            width: `${Math.min(100, Math.max(0, progress))}%`,
          }}
        />
      </div>
    </div>
  );
}

{
  /* Simple progress bar - 
    <div className="flex justify-center gap-6">
                <h2>{ansCount} out of 44 questions answered </h2>
                <progress className="border  h- w-2xl sticky top-1" value={progress} max={100}></progress>
                {`${Math.floor(progress)} %`}
            </div> */
}
