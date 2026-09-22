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
        redirectTo: "http://localhost:3000/auth/callback",
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
    <>
      <h1>This is the login page</h1>
      <button onClick={handleSignInWithGoogle} className="bg-green-700">
        Sign in with Google
      </button>
      <label htmlFor="loginEmail">Send my results.</label>
      <input
        id="loginEmail"
        type="email"
        required
        placeholder="Enter your email here"
        value={email}
        onChange={handleEmailChange}
        className="border border-blue-500"
      />
      <input
        type="password"
        id="loginPassword"
        required
        placeholder="Enter your password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button className="bg-amber-500" onClick={handleSignInWithEmail}>
        Sign In
      </button>
      <button className="bg-zinc-500" onClick={handleSignUp}>
        Do not have an account yet? Sign Up
      </button>
      {signupMessage && <p>{signupMessage}</p>}
    </>
  );
}
