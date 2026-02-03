"use client";
import { useContext, useEffect } from "react";
import AppContext from "./AppContext";
import { useRouter } from "next/navigation";
import LoadingView from "./components/LoadingView";

export default function App() {
  const router = useRouter();
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext is not provided");
  }

  const { isLoading } = context;

  useEffect(() => {
    router.push("/dashboard");
  }, [router]);

  if (isLoading)
    return (
      <div className="h-svh">
        <LoadingView />
      </div>
    );

  return;
}
