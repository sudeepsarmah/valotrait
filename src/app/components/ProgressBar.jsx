
export default function ProgressBar({ progress, ansCount, totalQuestions }) {
    return (
        <>

            <div className="sticky top-0 z-50 bg-black/90 backdrop-blur border-b border-zinc-800 px-6 py-4">
                <div className="max-w-5xl mx-auto">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-zinc-400">
                            {ansCount} / {totalQuestions} answered
                        </span>

                        <span className="text-sm font-medium">
                            {Math.round(progress)}%
                        </span>
                    </div>

                    <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-600 transition-all duration-300"
                            style={{
                                width: `${progress}%`,
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

{/* Simple progress bar - 
    <div className="flex justify-center gap-6">
                <h2>{ansCount} out of 44 questions answered </h2>
                <progress className="border  h- w-2xl sticky top-1" value={progress} max={100}></progress>
                {`${Math.floor(progress)} %`}
            </div> */}