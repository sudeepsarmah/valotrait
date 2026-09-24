"use client";
import { migratePendingResultClient } from "@/app/lib/migratePendingResultClient";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function AuthCompleteCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const requestedNext = searchParams.get("next") || "/quiz";

  const next =
    !requestedNext.startsWith("/") || requestedNext.startsWith("//")
      ? "/quiz"
      : requestedNext;

  useEffect(() => {
    const routing = async () => {
      await migratePendingResultClient();
      router.replace(next);
    };
    routing();
  }, [router, next]);

  return (
    <>
      <h1>Login with Google Successful. Redirecting now...</h1>
    </>
  );
}
