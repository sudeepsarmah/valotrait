"use client";

import { createClient } from "@/supabase/client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log("Logout error:", error.message);
      return;
    }

    router.refresh();
  };
  return (
    <>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
