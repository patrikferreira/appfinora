"use client";
import { useContext, useState, useMemo, useEffect } from "react";
import AppContext from "../AppContext";
import LoadingSpin from "../components/LoadingSpin";
import { IoInformationCircleOutline } from "react-icons/io5";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import Controls from "../components/Controls";
import SortIcon from "../components/SortIcon";

type SortField = "description" | "amount" | "category" | "cycle";
type SortOrder = "asc" | "desc" | null;

const PAGE_SIZE = 10;

export default function Incomes() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext is not provided");
  }

  const {
    user,
    initialFetching,
    localIncomes,
    searchQuery,
    currentPage,
    setCurrentPage,
  } = context;

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
    let filtered = localIncomes;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (income) =>
          income.description?.toLowerCase().includes(query) ||
          income.category?.toLowerCase().includes(query) ||
          income.cycle?.toLowerCase().includes(query) ||
          income.amount?.toString().includes(query)
      );
    }

    if (!sortField || !sortOrder) return filtered;

    return [...filtered].sort((a, b) => {
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
  }, [localIncomes, sortField, sortOrder, searchQuery]);

  const totalPages = Math.ceil(sortedIncomes.length / PAGE_SIZE);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortField, sortOrder, setCurrentPage]);

  const visibleIncomes = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return sortedIncomes.slice(startIndex, endIndex);
  }, [sortedIncomes, currentPage]);

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
        <h1 className="text-2xl font-semibold">Incomes</h1>
        <span className="text-(--alt-color-3) text-sm">
          Track & manage your earnings
        </span>
      </div>

      {/* CONTROLS */}
      <Controls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* TABLE */}
      <div className="w-full rounded-xl border border-(--border-color) overflow-hidden">
        <table className="w-full table-fixed">
          <thead>
            <tr>
              <th
                onClick={() => handleSort("description")}
                className={`w-1/5 text-left bg-(--alt-color) text-(--alt-color-3) tracking-wider font-medium border-(--border-color) px-4 text-xs uppercase py-3 cursor-pointer transition-all ${
                  visibleIncomes.length === 0
                    ? "border-none"
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
                className={`w-1/5 text-left bg-(--alt-color) text-(--alt-color-3) tracking-wider font-medium border-(--border-color) px-4 text-xs uppercase py-3 cursor-pointer transition-all ${
                  visibleIncomes.length === 0
                    ? "border-none"
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
                className={`w-1/5 text-left bg-(--alt-color) text-(--alt-color-3) tracking-wider font-medium border-(--border-color) px-4 text-xs uppercase hidden md:table-cell py-3 cursor-default transition-all ${
                  visibleIncomes.length === 0
                    ? "border-none"
                    : "border-b border-(--border-color)"
                }`}
              >
                <div className="flex items-center gap-2">Category</div>
              </th>
              <th
                className={`w-1/5 text-left bg-(--alt-color) text-(--alt-color-3) tracking-wider font-medium border-(--border-color) px-4 text-xs uppercase hidden md:table-cell py-3 cursor-default transition-all ${
                  visibleIncomes.length === 0
                    ? "border-none"
                    : "border-b border-(--border-color)"
                }`}
              >
                <div className="flex items-center gap-2">Cycle</div>
              </th>
              <th
                className={`w-1/10 text-left bg-(--alt-color) px-4 text-xs border-(--border-color)  uppercase py-3 ${
                  visibleIncomes.length === 0
                    ? "border-none"
                    : "border-b border-(--border-color)"
                }`}
              ></th>
            </tr>
          </thead>

          <tbody>
            {visibleIncomes.map((income, index) => (
              <tr
                key={income.id}
                className={`border-b border-(--border-color) last:border-0 transition-all duration-300 ${
                  index % 2 === 1 ? "bg-(--alt-color)" : ""
                }`}
              >
                <td className="w-1/5 px-4 py-3 text-sm truncate">
                  {income.description}
                </td>
                <td className="w-1/5 px-4 py-3 text-sm">
                  €{income.amount.toLocaleString()}
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
                  <button className="border border-(--border-color) hover:border-(--border-color-2) group transition-all duration-300 cursor-pointer rounded-full p-2">
                    <HiMiniEllipsisVertical className="text-(--alt-color-3) group-hover:text-(--foreground) transition-all duration-300" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {sortedIncomes.length > 0 ? (
        <div className="px-4 text-sm w-max cursor-default text-(--alt-color-3) hover:text-(--foreground) transition duration-200 flex items-center gap-2">
          <IoInformationCircleOutline />
          <span>{`Showing ${visibleIncomes.length} of ${sortedIncomes.length}`}</span>
        </div>
      ) : (
        <div className="px-4 text-sm w-max cursor-default text-(--alt-color-3) hover:text-(--foreground) transition duration-200 flex items-center gap-2">
          <IoInformationCircleOutline />
          {searchQuery.trim()
            ? "No incomes found matching your search"
            : "You haven't added any incomes yet"}
        </div>
      )}
    </div>
  );
}
