import { createClient } from "@/supabase/server"

const migratePendingResults = async (pendingStorageId, claimToken) => {
    if (!pendingStorageId || !claimToken) {
        console.log("No session_id or claim_token found in localStorage.")
        return { success: false }
    }
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
        console.log("Unauthorized user:", error?.message)
        return { success: false }
    }

    const { data, error: resultsError } = await supabase.rpc(
        "claim_guest_result",
        {
            p_session_id: pendingStorageId,
            p_claim_token: claimToken
        }
    )
    if (resultsError) {
        console.log("Guest result migration failed:", resultsError.message)
        return { success: false }
    }

    if (!data) {
        console.log("Migration unsuccessful.")
        return { success: true, migrated: false }
    }

    console.log("Migration successfull.")
    return { success: true, migrated: true }
}

export { migratePendingResults }