"use client"

import { useRef } from "react"
import ActionButtons from './ActionButtons'


export default function ResultShareCard({ results, agentDetails }) {

    const rersultCardRef = useRef(null)
    return (
        <>
            <div className="absolute w-0 h-0 overflow-hidden pointer-events-none -z-50">
                <div ref={rersultCardRef}
                    className="w-100 h-200 flex flex-col gap-6 justify-center items-center border-2 border-amber-400 bg-zinc-900 p-6 rounded-3xl">
                    <h1>ValoTraits</h1>
                    <div className="flex flex-col items-center border border-green-300 p-4 rounded-2xl">
                        <h2>{results.codenames}</h2>
                        <span>{results.personality_name}</span>
                    </div>
                    <div className="bg-sky-300 py-2 px-4 text-zinc-900 font-extrabold rounded-2xl shadow-md shadow-sky-500">
                        <h4>{agentDetails.role}</h4>
                    </div>
                    <div className="flex flex-col items-center border border-green-300 p-4 rounded-2xl">
                        <h4>Top Agent</h4>
                        <span>{agentDetails.agent}</span>
                    </div>
                    <div className="flex flex-col px-4 items-center text-center">
                        <p>{results.traits.playstyle} </p>
                        <div className="flex mt-4 gap-2">
                            <span className="border border-green-300 p-4 rounded-2xl"><h4>Strength - </h4>{results.traits.strengths} </span>
                            <span className="border border-green-300 p-4 rounded-2xl"><h4>Weakness - </h4>{results.traits.weaknesses} </span>
                        </div>
                    </div>
                    <span className="text-red-800 text-xs">ValoTraits</span>
                </div>
            </div>

            <ActionButtons cardRef={rersultCardRef} resultsDetails={agentDetails} />
        </>
    )
}