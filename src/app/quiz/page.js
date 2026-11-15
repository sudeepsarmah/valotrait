import { createClient } from "../../supabase/server"
import QuizPage from "../components/QuizPage"

export const metadata = {
    title: "ValoTraits — Discover Your Valorant Personality in 44 Questions",
    description: "Answer 44 questions to discover your Valorant playstyle, personality type, and the role that best matches your approach to the game.",
    openGraph: {
        title: "ValoTraits — Discover Your Valorant Personality in 44 Questions",
        description: "Answer 44 questions to discover your Valorant playstyle, personality type, and the role that best matches your approach to the game."
    }
}


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

    return (
        <div className="w-full min-w-0">
            <div className="mx-auto w-full max-w-7xl px-4 pt-3 sm:px-6 lg:px-8">
                <p className="mb-2 wrap-break-word text-xs text-[#A5ADB7] sm:text-sm">
                    {user ? `Signed in as ${user.email}` : "Not signed in"}
                </p>
            </div>

            <QuizPage questions={questionsData} />
        </div>
    );
}