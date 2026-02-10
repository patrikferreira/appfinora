"use client";
import { useContext, useState, useMemo } from "react";
import AppContext from "../AppContext";
import LoadingSpin from "../components/LoadingSpin";
import { IoInformationCircleOutline } from "react-icons/io5";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import Controls from "../components/Controls";
import SortIcon from "../components/SortIcon";

type SortField = "description" | "amount" | "category" | "cycle";
type SortOrder = "asc" | "desc" | null;

export default function Incomes() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext is not provided");
  }

  const { user, initialFetching, localIncomes } = context;

  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(
        sortOrder === "asc" ? "desc" : sortOrder === "desc" ? null : "asc"
      );
      if (sortOrder === "desc") setSortField(null);
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedIncomes = useMemo(() => {
    if (!sortField || !sortOrder) return localIncomes;

    return [...localIncomes].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (aValue == null) aValue = sortField === "amount" ? 0 : "";
      if (bValue == null) bValue = sortField === "amount" ? 0 : "";

      if (typeof aValue === "string") aValue = aValue.toLowerCase();
      if (typeof bValue === "string") bValue = bValue.toLowerCase();

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [localIncomes, sortField, sortOrder]);

  const PAGE_SIZE = 10;
  const visibleIncomes = sortedIncomes.slice(0, PAGE_SIZE);

  if (initialFetching)
    return (
      <div className="flex justify-center items-center h-svh w-full">
        <LoadingSpin className="" />
      </div>
    );

  if (!user) return;

  return (
    <div
      className={`p-4  flex flex-col overflow-auto gap-4  w-full animate-fadeIn`}
    >
      {/* TITLE VIEW */}
      <div className="hidden md:flex flex-col">
        <h1 className="text-2xl font-semibold">Incomes</h1>
        <span className="text-(--alt-color-3) text-sm">
          Track & manage your earnings
        </span>
      </div>
      {/* CONTROLS */}
      {/* <Controls /> */}

      {/* TABLE */}
      <div className="w-full rounded-xl border border-(--border-color)">
        <table className="w-full">
          <thead>
            <tr>
              <th
                onClick={() => handleSort("description")}
                className={`w-1/5 text-left text-(--alt-color-3) tracking-wider font-medium px-4 text-xs uppercase py-3 cursor-pointer transition-all ${
                  localIncomes.length === 0
                    ? "border-b-0"
                    : "border-b border-(--border-color)"
                }`}
              >
                <div className="flex items-center gap-2">
                  Description
                  <SortIcon
                    field="description"
                    sortField={sortField}
                    sortOrder={sortOrder}
                  />
                </div>
              </th>
              <th
                onClick={() => handleSort("amount")}
                className={`w-1/5 text-left text-(--alt-color-3) tracking-wider font-medium px-4 text-xs uppercase py-3 cursor-pointer transition-all ${
                  localIncomes.length === 0
                    ? "border-b-0"
                    : "border-b border-(--border-color)"
                }`}
              >
                <div className="flex items-center gap-2">
                  Amount
                  <SortIcon
                    field="amount"
                    sortField={sortField}
                    sortOrder={sortOrder}
                  />
                </div>
              </th>
              <th
                className={`w-1/5 text-left text-(--alt-color-3) tracking-wider font-medium px-4 text-xs uppercase hidden md:table-cell py-3 cursor-default transition-all ${
                  localIncomes.length === 0
                    ? "border-b-0"
                    : "border-b border-(--border-color)"
                }`}
              >
                <div className="flex items-center gap-2">Category</div>
              </th>
              <th
                className={`w-1/5 text-left text-(--alt-color-3) tracking-wider font-medium px-4 text-xs uppercase hidden md:table-cell py-3 cursor-default transition-all ${
                  localIncomes.length === 0
                    ? "border-b-0"
                    : "border-b border-(--border-color)"
                }`}
              >
                <div className="flex items-center gap-2">Cycle</div>
              </th>
              <th
                className={`w-1/10 text-left px-4 text-xs  uppercase py-3 ${
                  localIncomes.length === 0
                    ? "border-b-0"
                    : "border-b border-(--border-color)"
                }`}
              ></th>
            </tr>
          </thead>

          <tbody>
            {visibleIncomes.map((income, index) => (
              <tr
                key={income.id}
                className={`border-b border-(--border-color) last:border-0 hover:brightness-115 transition-all duration-300 ${
                  index % 2 === 0 ? "bg-[var(--alt-color)]" : ""
                }`}
              >
                <td className="w-1/5 px-4 py-3 text-sm">
                  {income.description}
                </td>
                <td className="w-1/5 px-4 py-3 text-sm">
                  ${income.amount.toLocaleString()}
                </td>
                <td className="w-1/5 px-4 py-3 text-sm hidden md:table-cell">
                  {income?.category
                    ? income.category.charAt(0).toUpperCase() +
                      income.category.slice(1)
                    : ""}
                </td>
                <td className="w-1/5 px-4 py-3 text-sm hidden md:table-cell">
                  {income?.cycle
                    ? income.cycle.charAt(0).toUpperCase() +
                      income.cycle.slice(1)
                    : ""}
                </td>
                <td className="w-1/10 px-4 text-sm">
                  <button className="border border-(--border-color) group hover:opacity-100 transition-all duration-300 cursor-pointer rounded-full p-2">
                    <HiMiniEllipsisVertical className=" group-hover:opacity-100 transition-all duration-300" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {localIncomes.length === 0 && (
        <div className="px-4 text-sm  flex items-center gap-2">
          <IoInformationCircleOutline />
          You haven{"'"}t added any incomes yet
        </div>
      )}
    </div>
  );
}
