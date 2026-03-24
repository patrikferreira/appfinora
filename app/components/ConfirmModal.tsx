"use client";
import { useContext } from "react";
import AppContext from "../AppContext";
import { useTranslation } from "react-i18next";
import Button from "./Button";

export default function ConfirmModal() {
  const { t } = useTranslation();
  const context = useContext(AppContext);
  if (!context) throw new Error("AppContext is not provided");

  const { confirmAction, setConfirmAction } = context;

  if (!confirmAction.show) return null;

  function handleCancel() {
    setConfirmAction({ ...confirmAction, show: false });
  }

  function handleConfirm() {
    confirmAction.onConfirm();
    setConfirmAction({ ...confirmAction, show: false });
  }

  return (
    <div
      onClick={handleCancel}
      className="fixed inset-0 bg-[#00000086] bg-opacity-30 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-(--bg-secondary) rounded-2xl shadow-lg w-full max-w-sm p-6"
      >
        <h2 className="text-lg font-semibold mb-2 text-[var(--foreground)]">
          {t(confirmAction.title)}
        </h2>
        <p className="mb-4">{t(confirmAction.message)}</p>
        <div className="flex justify-end space-x-2">
          <Button
            action={handleCancel}
            text="Cancel"
            className="bg-(--bg-tertiary)"
          />
          <Button
            action={handleConfirm}
            text="Confirm"
            className="bg-red-500"
          />
        </div>
      </div>
    </div>
  );
}
