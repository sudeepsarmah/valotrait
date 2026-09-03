// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "@supabase/functions-js/edge-runtime.d.ts";
import { error } from "node:console";
import { withSupabase } from "npm:@supabase/server@^1";
import { topAgent } from "../_shared/topAgent.js";

console.log("Hello from Functions!");

// This endpoint uses 'publishable' | 'secret' access, apiKey is required.
// Use publishable for Client-facing, key-validated endpoints
// Use secret for Server-to-server, internal calls
export default {
  fetch: withSupabase({ auth: "none" }, async (req, ctx) => {
    const siteUrl = Deno.env.get("SITE_URL");

    let email: string | undefined;
    let session_id: string | undefined;
    // Safely parse the JSON body first
    try {
      const body = await req.json();
      email = body?.email;
      session_id = body?.session_id;
    } catch (err) {
      return Response.json(
        { error: "Invalid or missing JSON req body" },
        { status: 400 },
      );
    }

    // Validate that the required fields are present
    if (!email || !session_id) {
      return Response.json(
        { error: "Missing required fields: Email & session_id" },
        { status: 400 },
      );
    }

    // creating the finalUrl
    if (!siteUrl) {
      return Response.json(
        { error: "Invalid or missing site URL" },
        { status: 500 },
      );
    }
    const finalUrl = `${siteUrl}/result/${session_id}`;
    // Query the database using the admin client
    try {
      const { data, error } = await ctx.supabaseAdmin
        .from("results")
        .select("*")
        .eq("session_id", session_id)
        .single();

      // Handling specific database/query errors
      if (error) {
        // If single() finds 0 rows, it returns a 406 / PGRST116 error code
        if (error.code === "PGRST116") {
          return Response.json(
            { error: "No results found for this session." },
            { status: 404 },
          );
        }
        return Response.json(
          { error: error.message },
          { status: 500 },
        );
      }
      const highestAgent = topAgent(data);
      const htmlEmail = `
        <h1>ValoTraits</h1>
            <p>You got : </p>
            <h4>${data.personality_name}</h4>
            <p>Role</p>
            <h5>${data.recommended_role}</h5>
            <p>Top Agent</p>
            <h5>${highestAgent.agent}</h5>
            <h3><a href="${finalUrl}">View my full result</a></h3>
        `;
      return Response.json({ data });
    } catch (dbError) {
      return Response.json(
        { error: "Internal server error querying database" },
        { status: 500 },
      );
    }
  }),
};

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/resend-email-results' \
    --header 'apiKey: sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH' \
    --data '{"name":"Functions"}'

*/
