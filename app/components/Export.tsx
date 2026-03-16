import { useContext, useState } from "react";
import { CiExport } from "react-icons/ci";
import AppContext from "../AppContext";
import Spin from "./Spin";
import { exportToExcel } from "../utils/exportExcel";

type Props = {
  view: string;
};

export default function Export({ view }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext is not provided");
  }

  const { localIncomes, localExpenses } = context;

  function exportData() {
    setIsLoading(true);
    try {
      const isExpenseView = view === "expenses";
      const data = isExpenseView ? localExpenses : localIncomes;
      const viewName = isExpenseView ? "expenses" : "incomes";

      const columns = [
        { key: "description", label: "Description" },
        { key: "amount", label: "Amount" },
        { key: "category", label: "Category" },
        { key: "cycle", label: "Cycle" },
      ];

      exportToExcel<Record<string, unknown>>({
        data: data,
        columns,
        filename: `${viewName}-${new Date().toISOString().split("T")[0]}.xlsx`,
      });
    } catch (error) {
      console.error("Error exporting data:", error);
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  }

  const currentData = view === "expenses" ? localExpenses : localIncomes;

  return (
    <button
      className={`h-10 min-w-10 flex items-center justify-center rounded-full border border-(--border) group text-sm bg-(--bg-secondary) group transition duration-200 ${
        isLoading ? "cursor-default" : "cursor-pointer"
      }`}
      onClick={exportData}
      aria-label={`Export local ${view} to Excel`}
      disabled={!currentData || isLoading}
    >
      {isLoading ? (
        <Spin className="border-t-black/70" />
      ) : (
        <CiExport
          className="opacity-50 group-hover:opacity-100 transition-all duration-200"
          size={18}
        />
      )}
    </button>
  );
}
