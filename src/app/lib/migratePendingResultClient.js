const migratePendingResultClient = async () => {
    const sessionId = localStorage.getItem("valotraits_session_id")
    const claimToken = localStorage.getItem("valotraits_claim_token")

    if (!sessionId || !claimToken) {
        console.log("No session_id found in localStorage.")
        return { success: false }
    }

    const response = await fetch("/api/migrate-result", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            sessionId: sessionId,
            claimToken: claimToken
        })
    });
    const result = await response.json();

    if (result.success && result.migrated) {
        localStorage.removeItem("valotraits_session_id")
        localStorage.removeItem("valotraits_claim_token")
        console.log("Migration successful.")
    } else if (result.success && !result.migrated) {
        console.log("No pending result was migrated.")
    } else {
        console.log("Migration failed.")
    }
    return result
}

export { migratePendingResultClient }