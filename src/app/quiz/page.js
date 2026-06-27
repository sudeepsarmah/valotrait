import { createClient } from "../../supabase/server"
import QuizPage from "../components/QuizPage"


export default async function Home() {
    const supabase = await createClient()
    const { data: questionsData, error: questionsError } = await supabase
        .from("questions")
        .select("*")


    // console.log(questionsData[0].question_text)

    // if (questionsError) {
    //     console.log(questionsError.message)
    // }
    // if (!questionsData?.length) {
    //     console.log("No questions returned")
    // }

    return (
        <>
            <div>
                <h2>This is the quiz page</h2>

                <QuizPage
                    questions={questionsData}
                />
            </div>
        </>
    )
}