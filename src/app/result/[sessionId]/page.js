import { createClient } from "@/supabase/server"
import ResultCard from "@/app/components/ResultCard"

export async function generateMetadata({ params }) {
    const { sessionId } = await params
    const supabase = await createClient()
    const { data: resultsData, error } = await supabase
        .from("results")
        .select("*")
        .eq("session_id", sessionId)
        .single()

    if (error) {
        console.log("Error fetching the results from Supabase", error.message)
        return
    }

    const playstyle = resultsData?.traits?.playstyle;

    return {
        title: `${resultsData.codenames} - Your Valorant Personality | ValoTraits`,
        openGraph: {
            title: `${resultsData.codenames} - Your Valorant Personality | ValoTraits`,
            description: `${playstyle}. Explore your playstyle, strengths, and Valorant personality on ValoTraits.`
        }
    }
}

export default async function ResultPage({ params }) {

    const supabase = await createClient()
    const { sessionId } = await params
    const { data: resultsData, error } = await supabase
        .from("results")
        .select("*")
        .eq("session_id", sessionId)
        .single()

    if (error) {
        console.log("Error fetching the results from Supabase", error.message)
        return
    }
    return (
        <main className="mx-auto w-full min-w-0 max-w-7xl overflow-x-clip px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <ResultCard results={resultsData} />
        </main>
    );
}