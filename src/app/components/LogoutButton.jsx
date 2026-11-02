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
      <button
        onClick={handleLogout}
        className="min-h-11 rounded-lg border border-[#263341] bg-[#0F1923] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#A5ADB7] transition-all duration-200 hover:border-[#FF4655] hover:bg-[#FF4655]/10 hover:text-[#FF4655] cursor-pointer"
      >
        Logout
      </button>
    </>
  );
}
