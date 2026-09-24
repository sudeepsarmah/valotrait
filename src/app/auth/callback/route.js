import { NextResponse } from 'next/server';
import { createClient } from '@/supabase/server';

export async function GET(request) {
    console.log("OAuth callback reached");
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    // 'next' is an optional query parameter indicating where to route the user after login
    const requestedNext = searchParams.get("next") ?? "/quiz";

    const next =
        !requestedNext.startsWith("/") || requestedNext.startsWith("//")
            ? "/quiz"
            : requestedNext;

    if (code) {
        const supabase = await createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        console.log("OAuth code exchange:", {
            success: !error,
            error: error?.message,
        });

        if (!error) {
            // Forward the user to the intended destination or dashboard
            const completionUrl = new URL("/auth/callback/complete", origin)
            completionUrl.searchParams.set("next", next)

            return NextResponse.redirect(completionUrl)
        }
    }

    // If something goes wrong, redirect the user to an error page
    return NextResponse.redirect(`${origin}/login`);
}
