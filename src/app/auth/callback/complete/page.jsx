import { Suspense } from "react";
import AuthCompleteCallback from "./AuthCompleteCallback";

export default function CompletionPage() {
  return (
    <>
      <Suspense fallback={<div>Confirming authentication...</div>}>
        <AuthCompleteCallback />
      </Suspense>
    </>
  );
}
