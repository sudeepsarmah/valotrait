import { createClient } from "@/supabase/server"
import ResultCard from "@/app/components/ResultCard"

export default async function ResultPage({ params }) {
    const { id } = await params

    const supabase = await createClient()

    const { data: resultsData, error } = await supabase
        .from("results")
        .select("*")
        .eq("id", id)
        .single()

    if (error) {
        console.log("Error fetching the results from Supabase", error.message)
        return
    }



    console.log("Result ID : ", id)
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