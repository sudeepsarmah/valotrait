const topAgent = (results) => {
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

    return {
        title: results.personality_name,
        agent: highestRatedAgent.agent,
        role: results.recommended_role
    }
}

export { topAgent }