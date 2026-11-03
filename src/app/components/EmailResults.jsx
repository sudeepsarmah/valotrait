"use client";

import { useState } from "react";
import { createClient } from "@/supabase/client";

export default function EmailResults({ sessionId }) {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    console.log("sessionId:", sessionId);
    console.log("email:", email);
    if (!email) {
      return;
    }

    setSending(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.functions.invoke(
        "resend-email-results",
        {
          body: {
            email,
            session_id: sessionId,
          },
        },
      );
      if (error) {
        throw new Error(error.message || "Failed to send email");
      }
      console.log("Email Sent.", data);
    } catch (err) {
      console.error("Email error: ", err);
    } finally {
      setSending(false);
    }
    setEmail("");
  };

  return (
    <div className="flex w-full min-w-0 flex-col gap-3 rounded-xl border border-[#263341] bg-[#0F1923] p-4 sm:flex-row sm:items-end sm:gap-4 sm:p-5">
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <label
          htmlFor="userEmail"
          className="text-xs font-semibold uppercase tracking-wider text-[#A5ADB7]"
        >
          Send my results
        </label>

        <input
          id="userEmail"
          type="email"
          required
          placeholder="Enter your email here"
          value={email}
          onChange={handleChange}
          className="min-h-11 w-full min-w-0 rounded-lg border border-[#263341] bg-[#080B10] px-4 py-3 text-base text-[#ECE8E1] outline-none transition-colors placeholder:text-[#66717D] focus:border-[#00F5D4] focus:ring-1 focus:ring-[#00F5D4]"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={sending}
        className="min-h-11 w-full shrink-0 rounded-lg bg-[#FF4655] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#E83B49] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {sending ? "Sending .. " : "Send Email"}
      </button>
    </div>
  );
}
