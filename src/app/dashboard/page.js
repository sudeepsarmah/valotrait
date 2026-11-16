import { createClient } from "@/supabase/server"
import { redirect } from "next/navigation"
import ResultSummaryCard from "./ResultSummaryCard"
import Link from "next/link"
import DistributionBarChart from "../components/recharts/DistributionBarChart"


export const metadata = {
  robots: {
    index: false,
    follow: false,
  }
}

export default async function Dashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  const { data: results, error: resultsError } = await supabase
    .from("results")
    .select("session_id, personality_name, created_at, codenames, top_agent, top_role, personality_code")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (resultsError) {
    console.log("Database error")
    return
  }

  // generating the data for the DistributionBarChart.jsx
  console.log("personality_codes : ", results[0].personality_code)

  // creting the object to hold the count of each Personality_Code
  const personalityCodeCounts = results.reduce((accumulator, currentValue) => {
    if (!accumulator[currentValue.personality_code]) {
      accumulator[currentValue.personality_code] = 0
    }
    accumulator[currentValue.personality_code] += 1
    return accumulator
  }, {})

  // converting it into an array required for the distribution bar chart to use
  const distributionData = Object.entries(personalityCodeCounts).map(([personalityCode, count]) => {
    return {
      name: personalityCode,
      distribution: count
    }
  })


  console.log("Dashboard")
  console.log(results);
  console.log(resultsError);
  console.log(personalityCodeCounts)
  console.log(distributionData)

  return (
    <main className="mx-auto w-full min-w-0 max-w-7xl overflow-x-clip px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      {/* Page heading */}
      <div className="mb-8 flex min-w-0 flex-col gap-5 border-b border-[#263341] pb-6 sm:mb-10 sm:flex-row sm:items-center sm:justify-between sm:pb-7">
        <div className="min-w-0">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#00F5D4] sm:text-xs">
            Player Dashboard
          </p>

          <h1 className="break-words font-[var(--font-heading)] text-3xl font-bold uppercase tracking-wide text-[#ECE8E1] sm:text-5xl">
            Your Results
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#A5ADB7]">
            Your personality profiles and previous quiz results.
          </p>
        </div>

        <Link
          href="/quiz"
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#FF4655] bg-[#FF4655] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all duration-200 hover:border-[#E83B49] hover:bg-[#E83B49] sm:w-fit"
        >
          <span>Retake Test</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>

      {/* Result cards */}
      <section className="mb-10 min-w-0 sm:mb-12">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-[var(--font-heading)] text-xl font-bold uppercase tracking-wide text-[#ECE8E1] sm:text-2xl">
            Previous Attempts
          </h2>

          <span className="font-mono text-[10px] text-[#A5ADB7] sm:text-xs">
            {results.length} RECORDS
          </span>
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {results.map((result) => (
            <ResultSummaryCard
              key={result.session_id}
              results={result}
            />
          ))}
        </div>
      </section>

      {/* Personality distribution */}
      <section className="min-w-0 overflow-hidden rounded-xl border border-[#263341] bg-[#0F1923] p-3 sm:rounded-2xl sm:p-7">
        <div className="mb-5 border-b border-[#263341] pb-4 sm:mb-6 sm:pb-5">
          <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#00F5D4]">
            Analytics
          </p>

          <h2 className="break-words font-[var(--font-heading)] text-xl font-bold uppercase tracking-wide text-[#ECE8E1] sm:text-2xl">
            Personality Distribution
          </h2>

          <p className="mt-1 text-xs leading-5 text-[#A5ADB7] sm:text-sm">
            Breakdown of your personality types across previous attempts.
          </p>
        </div>

        <div className="w-full min-w-0">
          <DistributionBarChart data={distributionData} />
        </div>
      </section>
    </main>
  );
}