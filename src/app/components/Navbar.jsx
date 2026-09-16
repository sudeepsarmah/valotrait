import { createClient } from "@/supabase/server";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <>
      <nav>
        {user ? (
          <>
            <span>{user.email}</span>
            <LogoutButton />
          </>
        ) : (
          <a href="/login">Sign In</a>
        )}
      </nav>
    </>
  );
}
