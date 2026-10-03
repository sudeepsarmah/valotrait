import { migratePendingResults } from "@/app/lib/migratePendingResults";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();

        const { sessionId, claimToken } = body;

        const migrationResult = await migratePendingResults(sessionId, claimToken)

        return NextResponse.json(migrationResult)
    } catch (error) {
        // Gracefully handle malformed JSON errors
        return NextResponse.json({ success: false }, { status: 400 });
    }
}