import { useContext, useState } from "react";
import { CiExport } from "react-icons/ci";
import AppContext from "../AppContext";
import Spin from "./Spin";

type Props = {
  view: string;
};

export default function Export({ view }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext is not provided");
  }

  const { localIncomes } = context;

  function exportData() {
    setIsLoading(true);
    try {
    } catch {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      className={`h-10 min-w-10 flex items-center justify-center rounded-full border border-(--border-primary) group text-sm bg-(--bg-secondary) group transition duration-200 cursor-pointer`}
      onClick={exportData}
      aria-label="Export local incomes to Excel"
      disabled={!localIncomes || localIncomes.length === 0}
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
