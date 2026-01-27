"use client";
import { useContext } from "react";
import AppContext from "./AppContext";

export default function App() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext is not provided");
  }

  const { user, isLoading, logout } = context;

  if (isLoading || !user) return null;

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>

      <button onClick={logout}>Logout</button>
    </div>
  );
}
