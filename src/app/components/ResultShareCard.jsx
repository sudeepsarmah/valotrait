"use client";

import { useRef } from "react";
import ActionButtons from "./ActionButtons";

export default function ResultShareCard({ results }) {
  const rersultCardRef = useRef(null);
  return (
    <>
      <div className="pointer-events-none absolute -z-50 h-0 w-0 overflow-hidden">
        <div
          ref={rersultCardRef}
          className="flex h-200 w-125 flex-col items-center justify-between gap-6 border-2 border-[#FF4655] bg-[#080B10] p-8 text-center text-[#ECE8E1]"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#00F5D4]">
              YOUR PLAYSTYLE. DECODED.
            </p>

            <h1 className="mt-3 text-4xl font-extrabold uppercase tracking-wider">
              VALO<span className="text-[#FF4655]">TRAITS</span>
            </h1>
          </div>

          <div className="w-full border border-[#263341] bg-[#0F1923] p-6">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[#A5ADB7]">
              Personality profile
            </p>

            <h2 className="text-3xl font-extrabold uppercase text-[#FF4655]">
              {results.codenames}
            </h2>

            <p className="mt-3 text-lg font-semibold text-[#ECE8E1]">
              {results.personality_name}
            </p>
          </div>

          <div className="w-full border border-[#00F5D4]/40 bg-[#00F5D4]/10 px-5 py-4">
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[#A5ADB7]">
              Recommended role
            </p>

            <h3 className="text-2xl font-bold text-[#00F5D4]">
              {results.top_role}
            </h3>
          </div>

          <div className="w-full border border-[#263341] p-5">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-[#A5ADB7]">
              Top agent
            </p>

            <h4 className="text-2xl font-bold text-[#ECE8E1]">
              {results.top_agent}
            </h4>
          </div>

          <div className="w-full">
            <p className="text-sm leading-6 text-[#ECE8E1]">
              {results.traits.playstyle}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3 text-left">
              <div className="border border-[#263341] bg-[#0F1923] p-4">
                <h4 className="mb-2 font-mono text-xs uppercase tracking-wider text-[#00F5D4]">
                  Strength
                </h4>

                <p className="text-sm leading-5 text-[#ECE8E1]">
                  {results.traits.strengths}
                </p>
              </div>

              <div className="border border-[#263341] bg-[#0F1923] p-4">
                <h4 className="mb-2 font-mono text-xs uppercase tracking-wider text-[#FF4655]">
                  Weakness
                </h4>

                <p className="text-sm leading-5 text-[#ECE8E1]">
                  {results.traits.weaknesses}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full border-t border-[#263341] pt-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#A5ADB7]">
              ValoTraits / Discover your playstyle
            </p>
          </div>
        </div>
      </div>

      <ActionButtons cardRef={rersultCardRef} results={results} />
    </>
  );
}
