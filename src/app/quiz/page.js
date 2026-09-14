import { createClient } from "../../supabase/server"
import QuizPage from "../components/QuizPage"


export default async function Home() {
    const supabase = await createClient()
    const { data: questionsData, error: questionsError } = await supabase
        .from("questions")
        .select("*")
        .order("display_order", { ascending: true })

    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    console.log("Server user:", user?.email);
    console.log("Server auth error:", error?.message);
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
                <p>{user ? `Signed in as ${user.email}` : "Not signed in"}</p>
                <QuizPage
                    questions={questionsData}
                />

            </div>
        </>
    )
}