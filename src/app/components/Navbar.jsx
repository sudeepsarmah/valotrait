import { createClient } from "@/supabase/server";
import LogoutButton from "./LogoutButton";
import Link from "next/link";

export default async function Navbar() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="site-header w-full min-w-0">
      <nav className="site-nav" aria-label="Main navigation">
        {/* Logo and mobile CTA */}
        <div className="nav-brand-row">
          <Link href="/" className="nav-brand shrink-0">
            <span className="brand-mark">V</span>
            <span>
              VALO<span className="text-accent">TRAITS</span>
            </span>
          </Link>

          <Link href="/quiz" className="nav-cta nav-cta-mobile">
            Take the quiz <span aria-hidden="true">↗</span>
          </Link>
        </div>

        {/* Navigation actions */}
        <div className="nav-content">
          <div className="nav-actions">
            <Link href="/#personalities" className="nav-text-link">
              Personalities
            </Link>

            {user ? (
              <>
                <Link href="/dashboard" className="nav-text-link">
                  Dashboard
                </Link>

                <span className="nav-user nav-user-desktop">
                  {user.email || "Signed in"}
                </span>

                <LogoutButton />
              </>
            ) : (
              <Link href="/login" className="nav-text-link">
                Sign in
              </Link>
            )}

            <Link href="/quiz" className="nav-cta nav-cta-desktop">
              Take the quiz <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
