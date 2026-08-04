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
    // get the personality name and code from supabase
    // store the personality code to the results table in supabase
    const personalityDetails = { personalityCode, personalityName }
    return personalityDetails
}

const buildResult = (personalityDetails) => {
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
    // store the scores in the results table in supabase
}


export { calculateTraitScores, generatePersonalityCode, buildResult }