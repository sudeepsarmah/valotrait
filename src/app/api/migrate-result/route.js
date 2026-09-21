import { migratePendingResults } from "@/app/lib/migratePendingResults";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();

        const { sessionId } = body;

        const migrationResult = await migratePendingResults(sessionId)

        return NextResponse.json(migrationResult)
    } catch (error) {
        // Gracefully handle malformed JSON errors
        return NextResponse({ success: false }, { status: 400 });
    }
}