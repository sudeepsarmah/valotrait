import { createClient } from "@/supabase/server";
import { ImageResponse } from "next/og";

// Image metadata
export const alt = "ValoTraits personality result";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Generic fallback for unavailable or private results
function fallbackImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        background: "#080B10",
        color: "#ECE8E1",
        fontSize: 64,
        fontWeight: 600,
      }}
    >
      <div>
        VALO<span style={{ color: "#FF4655" }}>TRAITS</span>
      </div>

      <div
        style={{
          marginTop: 20,
          fontSize: 28,
          color: "#A5ADB7",
        }}
      >
        Discover your Valorant personality.
      </div>
    </div>,
    {
      ...size,
    },
  );
}

// Dynamic OG image generation
export default async function Image({ params }) {
  let resultsData;
  try {
    const { sessionId } = await params;

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("results")
      .select(
        "codenames, personality_name, personality_code, traits, recommended_role, top_agent",
      )
      .eq("session_id", sessionId)
      .eq("is_public", true)
      .single();

    // Handle database errors and unavailable/private results
    if (error || !data) {
      if (error) {
        console.error(
          "Error fetching public result for OG image:",
          error.message,
        );
      }

      return fallbackImage();
    }
    resultsData = data;
  } catch (error) {
    console.error("OG image generation failed:", error);

    return fallbackImage();
  }
  // Extract personality information
  const playstyle = resultsData.traits?.playstyle;

  // Temporary placeholder until the final OG design
  return new ImageResponse(
    <div
      style={{
        fontSize: 72,
        background: "#080B10",
        color: "#ECE8E1",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        VALO<span style={{ color: "#FF4655" }}>TRAITS</span>
      </div>

      <div style={{ fontSize: 42, marginTop: 30 }}>{resultsData.codenames}</div>

      <div
        style={{
          fontSize: 24,
          color: "#00F5D4",
          marginTop: 20,
        }}
      >
        {playstyle ||
          resultsData.personality_name ||
          "Your Valorant personality"}
      </div>
    </div>,
    {
      ...size,
    },
  );
}
