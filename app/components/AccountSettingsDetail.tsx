"use client";
import { useContext, useState } from "react";
import AppContext from "../AppContext";
import { IoCloseOutline } from "react-icons/io5";
import Select from "./Select";
import { Currency, Language } from "../AppTypes";
import Spin from "./Spin";

export default function AccountSettingsDetail() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currency: "USD" as Currency,
    language: "en" as Language,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext is not provided");
  }

  const { user, accountSettingsDetail, setAccountSettingsDetail } = context;

  function onClose() {
    setAccountSettingsDetail?.({ show: false });
  }

  function submit() {}

  if (!accountSettingsDetail.show) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-40 flex items-center justify-center bg-[#00000086] backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col justify-between w-full h-full sm:h-auto sm:w-md border border-(--border) sm:rounded-2xl bg-(--bg-primary) animate-modalGrow"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-(--border)">
          <h3 className="text-base">Account preferences</h3>
          <button
            onClick={onClose}
            className="cursor-pointer opacity-50 hover:opacity-100 transition-all duration-200"
          >
            <IoCloseOutline size={18} />
          </button>
        </div>

        <div className="flex flex-col flex-1 gap-4 px-4 py-3 text-sm overflow-y-auto">
          <div className="flex items-center gap-2 w-full">
            <div className="flex-1">
              <label className="block text-sm mb-2" htmlFor="category">
                Currency *
              </label>

              <Select<Currency>
                value={formData.currency as Currency}
                onChange={(val) =>
                  setFormData((prev) => ({ ...prev, currency: val }))
                }
                options={[
                  { value: "USD", label: "USD".toUpperCase() },
                  { value: "EUR", label: "EUR".toUpperCase() },
                  { value: "BRL", label: "BRL".toUpperCase() },
                ]}
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm mb-2" htmlFor="language">
                Language *
              </label>
              <Select
                value={formData.language}
                onChange={(val) =>
                  setFormData((prev) => ({ ...prev, language: val }))
                }
                options={[
                  { value: "en", label: "English" },
                  { value: "pt", label: "Portuguese" },
                  { value: "es", label: "Spanish" },
                ]}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 w-full">
            <div className="flex-1">
              <label className="block text-sm mb-2" htmlFor="name">
                Name
              </label>
              <p className="opacity-50">{user?.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full">
            <div className="flex-1">
              <label className="block text-sm mb-2" htmlFor="email">
                Email
              </label>
              <p className="opacity-50">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end border-t border-(--border) px-4 py-3">
          <div className="flex items-center gap-2">
            <button
              onClick={submit}
              disabled={isLoading}
              className={`h-9 px-3 w-15 text-sm rounded-2xl flex items-center justify-center bg-(--primary) text-white transition duration-200 hover:brightness-115 ${
                isLoading ? "cursor-default" : "cursor-pointer"
              }`}
            >
              {isLoading ? <Spin /> : "Save"}
            </button>
            <button
              onClick={onClose}
              className="text-sm h-9 px-3 2-15 rounded-2xl bg-(--bg-tertiary) cursor-pointer transition duration-200 hover:brightness-115"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
