import { createClient } from "@/supabase/server"


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
            {resultsData && (
                <div className="mt-6">
                    <section className="flex max-w-2xl ">
                        <p>Personality: {resultsData.personality_name}</p>
                        <p>Description :
                            {resultsData.personality_code} - {resultsData.codenames}</p>
                        <p>Compatible Type: {resultsData.compatible_type}</p>
                    </section>

                    <section>
                        <h3>Your valorant role : </h3>
                        <h4>{resultsData.recommended_role}</h4>
                        <p>Role Description - {resultsData.description_template}</p>
                    </section>

                    <section className="flex justify-center gap-4 flex-col mb-6">
                        <h2>Recommended Agents: </h2>
                        <div className="flex justify-center gap-4">
                            {Object.entries(
                                resultsData.recommended_agents
                            ).map(([trait, agent]) => (
                                <div
                                    key={trait}
                                    className="cards"
                                >
                                    <h3 className="h3-cards">
                                        {agent}
                                    </h3>

                                    <p className="p-cards">
                                        Recommended for your{" "}
                                        {trait.toLowerCase()} trait.
                                    </p>

                                    <a
                                        href="#"
                                        className="href-cards"
                                    >
                                        Read more
                                    </a>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <p>Your playstyle: {resultsData.traits.playstyle}</p>
                        <p>Your Strengths : {resultsData.traits.strengths}</p>
                        <p>Your weakness : {resultsData.traits.weaknesses}</p>
                    </section>
                </div>
            )}
        </>
    )
}