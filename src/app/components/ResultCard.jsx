import TraitChart from "./recharts/TraitChart"
import DistributionBarChart from "./recharts/DistributionBarChart"
import ShareButtons from "./ShareButtons"
import ResultShareCard from "./ResultShareCard"

export default function ResultCard({ results }) {
    const recommendedAgents = Object.entries(results.recommended_agents).map(([key, value]) => {
        return {
            trait: key,
            agent: value
        }
    })

    // choosing the agent based on the highest scores
    const entries = Object.entries(results.scores)
    const highestRatedTrait = entries.reduce((max, current) => current[1] > max[1] ? current : max)
    console.log("highestTrait: ", highestRatedTrait)

    const highestRatedAgent = recommendedAgents.find(agent => agent.trait.toUpperCase() === highestRatedTrait[0].toUpperCase())

    const personalityDetails = {
        title: results.personality_name,
        agent: highestRatedAgent.agent,
        role: results.recommended_role
    }

    // logging results
    console.log("recommended: ", recommendedAgents)
    console.log("highestAgent: ", highestRatedAgent)
    console.log("agent:", personalityDetails.agent)

    return (
        <>
            <ResultShareCard />
            <ShareButtons resultsDetails={personalityDetails} />
            {results && (
                <div className="mt-6">
                    <section className="flex max-w-2xl ">
                        <div>
                            <p>Personality: {results.personality_name}</p>
                            <p>Description :
                                {results.personality_code} - {results.codenames}</p>
                            <p>Compatible Type: {results.compatible_type}</p>
                        </div>
                    </section>

                    <section className="flex flex-col md:flex-row items-center ">
                        <div className="flex-1 min-w-0">
                            <TraitChart data={results} />
                        </div>
                        <div className="flex-2 min-w-0  ">
                            <DistributionBarChart />
                        </div>
                    </section>

                    <section>
                        <h3>Your valorant role : </h3>
                        <h4>{results.recommended_role}</h4>
                        <h2>Role Description -</h2>
                        <p> {results.description_template}</p>
                    </section>

                    <section className="flex justify-center gap-4 flex-col mb-6">
                        <div className="flex justify-center gap-4">
                            {Object.entries(
                                results.recommended_agents
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
                </div>
            )}
        </>
    )
}

