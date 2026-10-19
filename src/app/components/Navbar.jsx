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
      <nav className="flex flex-row gap-4 justify-between bg-[#0F1923] py-2">
        <div>
          <h2>ValoTraits</h2>
        </div>
        <div className="flex flex-row gap-4 items-center">
          {user ? (
            <>
              <span>{user.email}</span>
              <LogoutButton />
            </>
          ) : (
            <a href="/login">Sign In</a>
          )}
          <div>
            <p className="cta">
              <Link href={"/quiz"} className="cta-text">
                Take the quiz
              </Link>
            </p>
          </div>
        </div>
      </nav>
    </>
  );
}
