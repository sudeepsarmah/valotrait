import { createClient } from "@/supabase/server"
import { Metadata, ResolvingMetadata } from "next"
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

    return {
        title: resultsData.codenames,
        openGraph: {
            title: resultsData.codenames,
            description: `${resultsData.codenames} on ValoTraits - ${resultsData.recommended_role}`
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

    // console.log("Result ID : ", id)
    console.log("Result : ", resultsData)

    return (
        <>
            <h1>This is the result Page</h1>
            <ResultCard
                results={resultsData}
            />
        </>
    )
}