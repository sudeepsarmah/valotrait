import { createClient } from "@/supabase/server";
import LogoutButton from "./LogoutButton";
import Link from "next/link";

export default async function Navbar() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <>
      <header className="site-header">
        <nav className="site-nav" aria-label="Main navigation">
          <Link href="/" className="nav-brand">
            <span className="brand-mark">V</span>
            <span>
              VALO<span className="text-accent">TRAITS</span>
            </span>
          </Link>

          <div className="nav-links">
            <Link href="/#personalities" className="nav-text-link">
              Personalities
            </Link>

            {user ? (
              <>
                <Link href="/dashboard" className="nav-text-link">
                  Dashboard
                </Link>

                <span className="nav-user">{user.email || "Signed in"}</span>

                <LogoutButton />
              </>
            ) : (
              <Link href="/login" className="nav-text-link">
                Sign in
              </Link>
            )}

            <Link href="/quiz" className="nav-cta">
              Take the quiz <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}
