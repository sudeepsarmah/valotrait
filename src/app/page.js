import Link from "next/link";
import { createClient } from "@/supabase/server";


export const metadata = {
  title: "ValoTraits — Discover Your Valorant Personality",
  description: "Take a 44-question personality assessment to discover your Valorant playstyle, personality type, and recommended agents.",
  openGraph: {
    title: "ValoTraits — Discover Your Valorant Personality",
    description: "Take a 44-question personality assessment to discover your Valorant playstyle, personality type, and recommended agents.",
  }
}

export default async function Home() {
  const supabase = await createClient();
  const { data: personalities, error } = await supabase
    .from("personalities")
    .select(
      "id, code, personality_name, name, role, description_template, compatible_type",
    );

  const personalityList = personalities ?? [];
  return (
    <main className="w-full min-w-0 overflow-x-clip">
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-content min-w-0">
          <p className="eyebrow">
            <span className="status-dot" />
            YOUR PLAYSTYLE. DECODED.
          </p>

          <h1 className="hero-title">
            FIND YOUR
            <br />
            <span className="text-accent">VALORANT</span>
            <br />
            PERSONALITY.
          </h1>

          <p className="hero-description">
            Every player has a pattern. Discover yours with ValoTraits — a
            personality quiz that maps your playstyle, identifies your
            strengths, and matches you with the Valorant agents that fit how
            you think and play.
          </p>

          <div className="hero-actions">
            <Link href="/quiz" className="button-primary">
              Take the quiz <span aria-hidden="true">↗</span>
            </Link>

            <a href="#personalities" className="button-secondary">
              Explore personalities <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className="hero-meta">
            <span>16 PERSONALITY TYPES</span>
            <span className="meta-divider" />
            <span>44 QUESTIONS</span>
            <span className="meta-divider" />
            <span>ONE UNIQUE PLAYSTYLE</span>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-visual-top">
            <span>VALOTRAITS / SYSTEM</span>
            <span className="text-accent">ONLINE</span>
          </div>

          <div className="hero-emblem">
            <span className="emblem-line emblem-line-top" />
            <span className="emblem-letter">V</span>
            <span className="emblem-line emblem-line-bottom" />
          </div>

          <div className="hero-visual-bottom">
            <div>
              <p className="mono-label">YOUR GAME</p>
              <p className="visual-value">YOUR RULES.</p>
            </div>

            <span className="visual-coordinate">VT_001</span>
          </div>

          <div className="hero-decoration hero-decoration-one" />
          <div className="hero-decoration hero-decoration-two" />
        </div>
      </section>

      {/* How it works */}
      <section className="features-section" aria-labelledby="features-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE PROCESS / 001</p>
            <h2 id="features-heading" className="section-title">
              THREE STEPS. <span className="text-accent">ONE YOU.</span>
            </h2>
          </div>

          <p className="section-description">
            More than an agent preference. Find the playstyle behind your
            decisions.
          </p>
        </div>

        <div className="features-grid">
          <article className="feature-card">
            <span className="feature-number">01</span>
            <h3>Take the test.</h3>
            <p>
              Answer 44 questions designed to explore how you approach fights,
              make decisions, and support your team.
            </p>
            <span className="feature-footer">44 QUESTIONS / START HERE</span>
          </article>

          <article className="feature-card">
            <span className="feature-number">02</span>
            <h3>Get your type.</h3>
            <p>
              Discover your personality code, playstyle description, compatible
              type, and the role that best matches your tendencies.
            </p>
            <span className="feature-footer">16 TYPES / FIND YOUR FIT</span>
          </article>

          <article className="feature-card">
            <span className="feature-number">03</span>
            <h3>Share your results.</h3>
            <p>
              Save your results to your account, revisit previous attempts, and
              share your personality profile with your friends.
            </p>
            <span className="feature-footer">YOUR RESULTS / YOUR CALL</span>
          </article>
        </div>
      </section>

      {/* Personality directory */}
      <section
        id="personalities"
        className="personalities-section"
        aria-labelledby="personalities-heading"
      >
        <div className="section-heading personality-section-heading">
          <div>
            <p className="eyebrow">THE ARCHIVE / 002</p>
            <h2 id="personalities-heading" className="section-title">
              KNOW YOUR <span className="text-accent">TYPE.</span>
            </h2>
          </div>

          <p className="section-description">
            Sixteen distinct personalities. Different instincts, different
            approaches, different ways to win.
          </p>
        </div>

        {error ? (
          <div className="data-message" role="alert">
            <p>PERSONALITY DATA UNAVAILABLE</p>
            <span>
              We could not load the personality directory. Please try again
              later.
            </span>
          </div>
        ) : personalityList.length === 0 ? (
          <div className="data-message">
            <p>NO PERSONALITIES FOUND</p>
            <span>The personality directory is currently empty.</span>
          </div>
        ) : (
          <div className="personalities-grid">
            {personalityList.map((personality, index) => (
              <article
                key={personality.id}
                className="personality-card"
                style={{ "--card-index": index }}
              >
                <div className="personality-card-top">
                  <span className="personality-category">
                    {personality.personality_name || "UNCLASSIFIED"}
                  </span>

                  <span className="role-badge">
                    {personality.role || "Unknown"}
                  </span>
                </div>

                <div className="personality-card-main">
                  <span className="card-index">
                    TYPE / {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="personality-name">
                    {personality.name || "Unnamed Personality"}
                  </h3>

                  <p className="personality-description">
                    {personality.description_template ||
                      "A unique playstyle waiting to be discovered."}
                  </p>
                </div>

                <div className="personality-card-bottom">
                  <div className="personality-data">
                    <span className="mono-label">PERSONALITY CODE</span>
                    <span className="personality-code">
                      {personality.code || "----"}
                    </span>
                  </div>

                  <div className="personality-data compatible-data">
                    <span className="mono-label">COMPATIBLE TYPE</span>
                    <span className="compatible-code">
                      {personality.compatible_type || "—"}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="bottom-cta">
          <div className="min-w-0">
            <p className="eyebrow">YOUR TYPE IS WAITING</p>

            <h3>
              READY TO FIND <span className="text-accent">YOUR EDGE?</span>
            </h3>

            <p>
              Take the quiz and discover the personality behind your playstyle.
            </p>
          </div>

          <Link href="/quiz" className="button-primary bottom-cta-button">
            Discover your type <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
