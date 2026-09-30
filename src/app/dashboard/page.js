import { createClient } from "@/supabase/server"
import { redirect } from "next/navigation"
import ResultSummaryCard from "./ResultSummaryCard"
import Link from "next/link"
import DistributionBarChart from "../components/recharts/DistributionBarChart"

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
    <>
      <main className="p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">
            Your Results
          </h1>

          <Link
            href="/quiz"
            className="rounded-full bg-amber-400 px-5 py-2 font-bold text-zinc-900 hover:bg-amber-300"
          >
            Retake Test
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {results.map((result) => (
            <ResultSummaryCard
              key={result.session_id}
              results={result}
            />
          ))}
        </div>
        <div>
          <DistributionBarChart data={distributionData} />
        </div>
      </main>
    </>
  )
}