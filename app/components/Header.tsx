"use client";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import AppContext from "../AppContext";
import Logo from "./Logo";
import { FiSidebar } from "react-icons/fi";

export default function Header() {
  const pathname = usePathname();
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext is not provided");
  }

  const { user, setIsSidebarOpen, isSidebarOpen, isLoading } = context;

  if (
    !user ||
    isLoading ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/"
  ) {
    return null;
  }

  return (
    <div
      className={`h-16 bg-(--background) flex justify-between items-center px-4 z-40 animate-fadeIn ${
        isSidebarOpen ? "ml-64" : ""
      }`}
    >
      <div
        className={`${
          isSidebarOpen ? "hidden" : "flex"
        } items-center gap-4 animate-fadeIn`}
      >
        <button>
          <Logo logoOnly={true} />
        </button>
        <button
          onClick={() => setIsSidebarOpen?.(true)}
          className="cursor-pointer p-2 rounded-full hover:bg-(--color-alt-2) transition duration-200 opacity-60 hover:opacity-100 "
        >
          <FiSidebar size={18} />
        </button>
      </div>
    </div>
  );
}
