"use client";
import { useContext } from "react";
import AppContext from "./AppContext";

export default function App() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext is not provided");
  }

  const { user } = context;

  if (!user) return null;

  return <div className="ml-64 p-6"></div>;
}
