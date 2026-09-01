// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "npm:@supabase/server@^1";
import { createClient } from "@/supabase/server";

console.log("Hello from Functions!");

// This endpoint uses 'publishable' | 'secret' access, apiKey is required.
// Use publishable for Client-facing, key-validated endpoints
// Use secret for Server-to-server, internal calls
export default {
  fetch: withSupabase({ auth: "none" }, async (req) => {
    let email: string | undefined;
    let session_id: string | undefined;
    const body = await req.json();
    email = body.email;
    session_id = body.session_id;
    try {
      const supabaseAdmin = await createClient(
        Deno.env.get("NEXT_PUBLIC_SUPABASE_URL")!,
        Deno.env.get("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY")!,
      );

      const { data, error } = await supabaseAdmin
        .from("results")
        .select("*")
        .eq("session_id", session_id)
        .eq("email", email)
        .single();

      if (error) throw error;
    } catch (error) {
      return Response.json(
        { error: "Missing JSON req body" },
        { status: 400 },
      );
    }

    if (!email || !session_id) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    return Response.json({
      message: `{email} - {session_id}`,
    });
  }),
};

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/resend-email-results' \
    --header 'apiKey: sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH' \
    --data '{"name":"Functions"}'

*/
