import { createClient } from "../../supabase/client"
import { topAgent as getTopAgent } from "./topAgent"

const calculateTraitScores = (selectedAnswers, questions) => {
    const optionsWeight = {
        1: { left_trait: 2, right_trait: 0 },
        2: { left_trait: 1, right_trait: 0 },
        3: { left_trait: 0.5, right_trait: 0.5 },
        4: { left_trait: 0, right_trait: 1 },
        5: { left_trait: 0, right_trait: 2 }
    }

    let traitScore = {
        AIM: 0, BRAIN: 0, SUPPORT: 0, ENTRY: 0, DASH: 0, RAT: 0, CASUALITY: 0, SURVIVOR: 0
    }

    for (let i = 0; i < questions.length; i++) {

        const question = questions[i]
        const answer = selectedAnswers[question.display_order]

        if (!answer) {
            continue
        }
        const weights = optionsWeight[answer]
        traitScore[question.left_trait] += weights.left_trait
        traitScore[question.right_trait] += weights.right_trait
        console.log("display_order - ", question.display_order)
        console.log("selected_answer - ", answer)

    }

    console.log(traitScore)
    return traitScore
}

const generatePersonalityCode = (traitScore) => {
    // generate the code AEDF/BSRC according to the traitscores
    const traitPairs = [
        {
            left_trait: "AIM",
            left_code: "A",

            right_trait: "BRAIN",
            right_code: "B"
        },
        {
            left_trait: "SUPPORT",
            left_code: "S",

            right_trait: "ENTRY",
            right_code: "E"
        },
        {
            left_trait: "DASH",
            left_code: "D",

            right_trait: "RAT",
            right_code: "R"
        },
        {
            left_trait: "CASUALITY",
            left_code: "C",

            right_trait: "SURVIVOR",
            right_code: "S"
        }
    ]

    let personalityCode = ""

    for (let i = 0; i < traitPairs.length; i++) {

        const traitPair = traitPairs[i]
        const traitScoreLeft = traitScore[traitPair.left_trait]
        const traitScoreRight = traitScore[traitPair.right_trait]

        if (traitScoreLeft === traitScoreRight) {
            personalityCode += traitPair.left_code
            // TODO:
            // Revisit tie-breaking strategy after collecting user feedback.
        }
        else if (traitScoreLeft > traitScoreRight) {
            personalityCode += traitPair.left_code
        } else if (traitScoreLeft < traitScoreRight) {
            personalityCode += traitPair.right_code
        }
    }

    console.log("Personality Code - ", personalityCode)
    return personalityCode
}

const getPersonality = async (personalityCode) => {
    // call supabase personality table
    const supabase = createClient()
    const { data: personalityRow, error: personalityError } = await supabase
        .from("personalities")
        .select("code, personality_name, role, name, description_template, traits, compatible_type, agents_recommendation")
        .eq("code", personalityCode)
        .single()
    // only select the personality row that matches the generated code
    console.log("Personality code:", personalityCode)
    console.log("Personality data:", personalityRow)
    console.log("Personality error:", personalityError)
    if (personalityError) {
        return null
    }

    return personalityRow
}

const buildResult = (personalityRow, traitScores) => {
    // for no personality returned by the getPersonality() function from supabase
    if (!personalityRow) {
        console.log("No personality row returned")
        return null
    }

    // for no traitscores received from calculateTraitScores() function
    if (!traitScores) {
        console.log("No trait scores received.")
        return null
    }


    const personalityDescription = `You are ${personalityRow.name}, now get up and do your job as the ${personalityRow.role} of the team. ${personalityRow.description_template}. Your playstyle is of a ${personalityRow.traits.playstyle}. Your strengths include ${personalityRow.traits.strengths}. However, you ${personalityRow.traits.weaknesses}. You are the most compatible with someone from the ${personalityRow.compatible_type} class. You should try out these agents - `

    // building the resultObject {}
    const resultObject = {
        "personality_code": personalityRow.code,
        "scores": traitScores,
        "personality_name": personalityRow.personality_name,
        "recommended_role": personalityRow.role,
        "recommended_agents": personalityRow.agents_recommendation,
        "compatible_type": personalityRow.compatible_type,
        "codenames": personalityRow.name,
        "description_template": personalityDescription,
        "traits": personalityRow.traits
    }
    return resultObject
}

const saveResult = async (resultObject, sessionId, userId) => {
    const topAgentDetails = getTopAgent(resultObject)
    console.log("recommended/personality.js: ", topAgentDetails.role)
    console.log("highestAgent/personality.js: ", topAgentDetails.agent)
    const supabase = createClient()
    const { data: resultsData, error: resultsError } = await supabase
        .from("results")
        .insert({
            personality_code: resultObject.personality_code,
            scores: resultObject.scores,
            recommended_role: resultObject.recommended_role,
            recommended_agents: resultObject.recommended_agents,
            compatible_type: resultObject.compatible_type,
            codenames: resultObject.codenames,
            description_template: resultObject.description_template,
            personality_name: resultObject.personality_name,
            traits: resultObject.traits,
            session_id: sessionId,
            user_id: userId,
            top_agent: topAgentDetails.agent,
            top_role: topAgentDetails.role
        })
        .select()
        .single()

    if (resultsError) {
        console.log("Unable to save results", resultsError)
        return null
    }
    return resultsData
}


export { calculateTraitScores, generatePersonalityCode, buildResult, getPersonality, saveResult }