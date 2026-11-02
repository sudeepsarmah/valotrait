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
      <header className="site-header w-full min-w-0">
        <nav
          className="site-nav flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between"
          aria-label="Main navigation"
        >
          <Link href="/" className="nav-brand shrink-0">
            <span className="brand-mark">V</span>
            <span>
              VALO<span className="text-accent">TRAITS</span>
            </span>
          </Link>

          <div className="nav-links flex w-full min-w-0 flex-wrap items-center gap-x-4 gap-y-3 sm:w-auto sm:justify-end">
            <Link href="/#personalities" className="nav-text-link">
              Personalities
            </Link>

            {user ? (
              <>
                <Link href="/dashboard" className="nav-text-link">
                  Dashboard
                </Link>

                <span className="nav-user max-w-full break-all text-xs sm:max-w-48">
                  {user.email || "Signed in"}
                </span>

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
