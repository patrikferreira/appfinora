"use client";
import { useContext } from "react";
import AppContext from "../AppContext";
import LoadingSpin from "../components/LoadingSpin";

export default function Expenses() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext is not provided");
  }

  const { user, initialFetching, isSidebarOpen } = context;

  if (initialFetching)
    return (
      <div className="flex justify-center items-center h-svh w-full">
        <LoadingSpin className="" />
      </div>
    );

  if (!user) return;

  return (
    <div
      className={`p-4 ${
        isSidebarOpen ? "sm:ml-64" : ""
      } transition-all duration-300`}
    >
      Expenses view
    </div>
  );
}
