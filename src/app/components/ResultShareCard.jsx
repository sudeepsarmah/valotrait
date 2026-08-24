
export default function ResultShareCard() {
    return (
        <>
            <div className="flex border-2 border-amber-400 flex-col gap-6 justify-center items-center max-w-sm py-4 rounded-3xl">
                <h1>ValoTraits</h1>
                <div className="flex flex-col items-center border border-green-300 p-4 rounded-2xl">
                    <h2>Title</h2>
                    <span>Brain Entry Dash Casualty</span>
                </div>
                <div className="bg-sky-300 py-2 px-4 text-zinc-900 font-extrabold rounded-2xl shadow-md shadow-sky-500">
                    <h4>Initiator</h4>
                </div>
                <div className="flex flex-col items-center border border-green-300 p-4 rounded-2xl">
                    <h4>Top Agent</h4>
                    <span>Reyna</span>
                </div>
                <div className="flex flex-col px-4 items-center text-center">
                    <p>playstyle: Calculated leader who enters with strategy and foresight + first line of the description_template</p>
                    <div className="flex mt-4 gap-2">
                        <span className="border border-green-300 p-4 rounded-2xl">Strength: Brilliant tactical entries with game-reading ability </span>
                        <span className="border border-green-300 p-4 rounded-2xl">Weakness: Relies heavily on team executing the plan properly </span>
                    </div>
                </div>
                <span className="text-red-800 text-xs">ValoTraits</span>
            </div>
        </>
    )
}