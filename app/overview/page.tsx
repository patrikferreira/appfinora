"use client";
import { useContext } from "react";
import AppContext from "../AppContext";
import LoadingSpin from "../components/LoadingSpin";
import ExpenseChart from "../components/ExpenseChart";

export default function Overview() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext is not provided");
  }

  const { user, initialFetching, localExpenses } = context;

  if (initialFetching)
    return (
      <div className="flex justify-center items-center h-svh w-full">
        <LoadingSpin className="" />
      </div>
    );

  if (!user) return;

  return (
    <div
      className={`p-4 flex flex-col overflow-auto gap-4  w-full animate-fadeIn`}
    >
      {/* TITLE VIEW */}
      <div className="hidden md:flex flex-col">
        <h1 className="text-2xl font-semibold">Overview</h1>
        <span className="opacity-50 text-sm">Summary overview</span>
      </div>

      {/* DASHBOARD */}
      <div className="flex-1 flex-col lg:grid lg:grid-cols-4 lg:grid-rows-2 gap-4 lg:overflow-hidden">
        <ExpenseChart
          data={localExpenses}
          className="lg:col-span-2 lg:row-span-1"
        />
      </div>
    </div>
  );
}
