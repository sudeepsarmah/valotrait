import { createClient } from "../../supabase/client"


const calculateTraitScores = (selectedAnswers, questions) => {
    const optionsWeight = {
        1: { left_trait: 2, right_trait: 0 },
        2: { left_trait: 1, right_trait: 0 },
        3: { left_trait: 0.5, right_trait: 0.5 },
        4: { left_trait: 0, right_trait: 1 },
        5: { left_trait: 0, right_trait: 2 }
    }

    let traitScore = {
        AIM: 0, BRAIN: 0, SUPPORT: 0, ENTRY: 0, DASH: 0, RAT: 0, CASUALTY: 0, SURVIVOR: 0
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
        console.log("weight_object - ", weights)

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
            left_trait: "CASUALTY",
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
    const supabase = await createClient()
    const { data: personalityRow, error: personalityError } = await supabase
        .from("personalities")
        .select("role, description_template, traits, compatible_type, agents_recommendation")
        .eq("code", personalityCode)
        .single()
    // only select the personality row that matches the generated code
    if (personalityError) {
        console.log(personalityError.message)
        return null
    }

    return personalityRow
}

const buildResult = (personalityDetails) => {
    // get the personality name and code from supabase
    const getRole = (personalityCode) => {
        // get the role recommendation from the personalities table in supabase
        return userPrefferedRole
    }


    const getRecommendedAgents = (personalityCode) => {
        // get the recommended agents and the compatible types from the personilities table in supabase
        return agentsRecommended
    }
}

const saveResult = (buildResult) => {
    // store the personality code to the results table in supabase
    // store the scores in the results table in supabase
}


export { calculateTraitScores, generatePersonalityCode, buildResult }