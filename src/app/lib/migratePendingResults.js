import { createClient } from "@/supabase/server"
const migratePendingResults = async (pendingStorageId) => {
    if (!pendingStorageId) {
        console.log("No session_id found in localStorage.")
        return { success: false }
    }
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
        console.log("Unauthorized user:", error.message)
        return { success: false }
    }
    const authenticatedUserId = user.id

    const { data, error: resultsError } = await supabase
        .from("results")
        .update({ user_id: authenticatedUserId })
        .eq("session_id", pendingStorageId)
        .is("user_id", null)
        .select("id")

    if (resultsError) {
        console.log("Results table not updated", resultsError.message)
        return { success: false }
    }

    if (data.length === 0) {
        console.log("Migration unsuccessful.")
        return { success: true, migrated: false }
    }

    console.log("Migration successfull.")
    return { success: true, migrated: true }
}

export { migratePendingResults }