import { createClient } from "@/supabase/server"
import { redirect } from "next/navigation"
import { topAgent as getTopAgent } from "../lib/topAgent"

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
      <h1>this is the dashboard</h1>
    </>
  )
}