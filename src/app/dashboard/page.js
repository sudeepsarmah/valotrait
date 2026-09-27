import { createClient } from "@/supabase/server"
import { redirect } from "next/navigation"
import ResultSummaryCard from "./ResultSummaryCard"

export default async function Dashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  const { data: results, error: resultsError } = await supabase
    .from("results")
    .select("session_id, personality_name, created_at, codenames, top_agent, top_role")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (resultsError) {
    console.log("Database error")
    return
  }

  console.log("Dashboard")
  console.log(results);
  console.log(resultsError);

  return (
    <>
      <main className="p-6">
        <h1 className="mb-6 text-3xl font-bold">
          Your Results
        </h1>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {results.map((result) => (
            <ResultSummaryCard
              key={result.session_id}
              results={result}
            />
          ))}
        </div>
      </main>
    </>
  )
}