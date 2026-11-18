"use client";
import { createClient } from "@/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { migratePendingResultClient } from "../lib/migratePendingResultClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupMessage, setSignUpMessage] = useState("");

  const router = useRouter();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Sign in with Google account
  const handleSignInWithGoogle = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.log("OAuth error", error.message);
    }
  };

  // Sign in with Email and Password
  const handleSignInWithEmail = async () => {
    const supabase = createClient();
    if (!email || !password) {
      console.log("Email/password is missing.");
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log("Email sign-in error:", error.message);
      setPassword("");
      setEmail("");
      return;
    }

    await migratePendingResultClient();

    router.push("/quiz");
    router.refresh();
  };

  // Signup with email and password
  const handleSignUp = async () => {
    const supabase = createClient();
    setSignUpMessage("");
    if (!email || !password) {
      console.log("Email/password is missing.");
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      console.log("Sign up error:", error.message);
      setSignUpMessage(error.message);
      setPassword("");
      return;
    }

    // checking for identical emails
    if (data.user && data.user.identities?.length === 0) {
      setSignUpMessage(
        "An account may already exist with this email. Try signing in instead.",
      );
      setPassword("");
      return;
    }
    if (!data.session) {
      setSignUpMessage(
        "Account created. Check your email to confirm your account.",
      );
      setPassword("");
      return;
    }
    await migratePendingResultClient();
    router.push("/quiz");
    router.refresh();
    setPassword("");
  };

  return (
    <main className="flex min-h-[75vh] w-full min-w-0 items-center justify-center px-4 py-10 sm:py-12">
      <div className="w-full min-w-0 max-w-md">
        {/* Heading */}
        <div className="mb-7 text-center sm:mb-8">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#00F5D4] sm:text-xs sm:tracking-[0.3em]">
            ValoTraits // Authentication
          </p>

          <h1 className="break-words font-[var(--font-heading)] text-4xl font-bold uppercase tracking-wide text-[#ECE8E1] sm:text-5xl">
            Welcome Back
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[#A5ADB7]">
            Sign in or create an account to access and save your personality
            results.
          </p>
        </div>

        {/* Login panel */}
        <div className="min-w-0 rounded-xl border border-[#263341] bg-[#0F1923] p-4 shadow-xl sm:rounded-2xl sm:p-8">
          {/* Google sign-in */}
          <button
            onClick={handleSignInWithGoogle}
            className="flex min-h-12 w-full items-center justify-center gap-3 rounded-lg border border-[#263341] bg-[#17232F] px-5 py-3 text-sm font-semibold text-[#ECE8E1] transition-all duration-200 hover:border-[#00F5D4] hover:bg-[#1B2B38]"
          >
            <span className="text-lg font-bold">G</span>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3 sm:my-6 sm:gap-4">
            <div className="h-px flex-1 bg-[#263341]" />

            <span className="whitespace-nowrap font-mono text-[9px] uppercase tracking-widest text-[#A5ADB7] sm:text-[10px]">
              Or continue with email
            </span>

            <div className="h-px flex-1 bg-[#263341]" />
          </div>

          {/* Email input */}
          <div className="mb-5">
            <label
              htmlFor="loginEmail"
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#A5ADB7]"
            >
              Email Address
            </label>

            <input
              id="loginEmail"
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              className="min-h-12 w-full min-w-0 rounded-lg border border-[#263341] bg-[#080B10] px-4 py-3 text-base text-[#ECE8E1] outline-none transition-colors placeholder:text-[#66717D] focus:border-[#00F5D4] focus:ring-1 focus:ring-[#00F5D4]"
            />
          </div>

          {/* Password input */}
          <div className="mb-6">
            <label
              htmlFor="loginPassword"
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#A5ADB7]"
            >
              Password
            </label>

            <input
              type="password"
              id="loginPassword"
              required
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              className="min-h-12 w-full min-w-0 rounded-lg border border-[#263341] bg-[#080B10] px-4 py-3 text-base text-[#ECE8E1] outline-none transition-colors placeholder:text-[#66717D] focus:border-[#00F5D4] focus:ring-1 focus:ring-[#00F5D4]"
            />
          </div>

          {/* Sign-in */}
          <button
            className="min-h-12 w-full rounded-lg bg-[#FF4655] px-5 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all duration-200 hover:bg-[#E83B49]"
            onClick={handleSignInWithEmail}
          >
            Sign In
          </button>

          {/* Sign-up */}
          <button
            className="mt-3 min-h-12 w-full rounded-lg border border-[#263341] bg-transparent px-5 py-3 text-sm font-semibold text-[#ECE8E1] transition-all duration-200 hover:border-[#00F5D4] hover:text-[#00F5D4]"
            onClick={handleSignUp}
          >
            Create an Account
          </button>

          {/* Signup feedback */}
          {signupMessage && (
            <p className="mt-5 wrap-break-word rounded-lg border border-[#FF4655]/30 bg-[#FF4655]/10 p-3 text-center text-sm leading-relaxed text-[#FF8B94]">
              {signupMessage}
            </p>
          )}
        </div>

        <p className="mt-6 text-center font-mono text-[9px] uppercase tracking-widest text-[#66717D] sm:text-[10px]">
          ValoTraits // Discover Your Playstyle
        </p>
      </div>
    </main>
  );
}
