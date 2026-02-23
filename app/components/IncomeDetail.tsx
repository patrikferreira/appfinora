"use client";
import { useContext, useState } from "react";
import AppContext from "../AppContext";
import { IoCloseOutline } from "react-icons/io5";
import { Income } from "../AppTypes";
import Spin from "./Spin";

export default function IncomeDetail() {
  const [formData, setFormData] = useState<Income>({
    description: "",
    amount: 0,
    category: "",
    cycle: "",
  });
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext is not provided");
  }

  const { incomeDetail, setIncomeDetail, setIsLoading, isLoading } = context;

  function onClose() {
    setIncomeDetail({ ...incomeDetail, show: false });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function submit() {
    setIsLoading(true);
    console.log(`formData`, formData);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }

  if (!incomeDetail.show) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-40 flex items-center justify-center bg-[#00000086] backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col justify-between w-full h-full sm:h-auto sm:w-sm border border-(--border-color) sm:rounded-xl bg-(--alt-color) animate-modalGrow"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-(--border-color)">
          <h3 className="text-base">
            {incomeDetail.newIncome ? "New income" : "Edit income"}
          </h3>
          <button
            onClick={onClose}
            className="cursor-pointer opacity-50 hover:opacity-100 transition-all duration-200"
          >
            <IoCloseOutline size={18} />
          </button>
        </div>

        <div className="flex flex-col flex-1 gap-4 px-4 py-3 text-sm overflow-y-auto">
          <div>
            <label className="block text-sm mb-2" htmlFor="description">
              Description *
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              autoFocus
              className="w-full border border-(--border-color) rounded-xl px-4 py-2.5 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm mb-2" htmlFor="amount">
              Amount *
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              autoFocus
              className="w-full border border-(--border-color) rounded-xl px-4 py-2.5 outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          </div>

          <div>
            <label className="block text-sm mb-2" htmlFor="category">
              Category *
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              autoFocus
              className="w-full border border-(--border-color) rounded-xl px-4 py-2.5 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm mb-2" htmlFor="cycle">
              Cycle *
            </label>
            <input
              type="text"
              id="cycle"
              name="cycle"
              value={formData.cycle}
              onChange={handleChange}
              autoFocus
              className="w-full border border-(--border-color) rounded-xl px-4 py-2.5 outline-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-(--border-color) px-4 py-3">
          <button
            onClick={submit}
            disabled={isLoading}
            className={`h-9 px-3 w-15 text-sm rounded-xl flex items-center justify-center bg-(--primary-color) transition duration-200 hover:brightness-115 ${
              isLoading ? "cursor-default" : "cursor-pointer"
            }`}
          >
            {isLoading ? <Spin /> : "Save"}
          </button>
          <button
            onClick={onClose}
            className="text-sm h-9 px-3 2-15 rounded-xl bg-(--alt-color-2) cursor-pointer transition duration-200 hover:brightness-115"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
