"use client";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useRef } from "react";
import { BsCreditCard2Back, BsWallet2 } from "react-icons/bs";
import AppContext from "../AppContext";
import Logo from "./Logo";
import { GoHome } from "react-icons/go";
import Link from "next/link";
import Profile from "./Profile";
import { FiSidebar } from "react-icons/fi";

export default function Sidebar() {
  const pathname = usePathname();
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext is not provided");
  }

  const { user, isSidebarOpen, setIsSidebarOpen, isLoading } = context;

  function closeSidebar() {
    setIsSidebarOpen?.(false);
  }

  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!isSidebarOpen || typeof window === "undefined") return;
      if (window.innerWidth >= 640) return;
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        closeSidebar();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640 && isSidebarOpen) {
        closeSidebar();
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSidebarOpen]);

  const links = [
    { name: "Dashboard", href: "/dashboard", icon: <GoHome size={18} /> },
    { name: "Incomes", href: "/incomes", icon: <BsWallet2 size={14} /> },
    {
      name: "Expenses",
      href: "/expenses",
      icon: <BsCreditCard2Back size={14} />,
    },
  ];

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
      ref={sidebarRef}
      className={`bg-(--color-alt) fixed left-0 h-svh border-r border-(--color-border) p-2 flex flex-col justify-between gap-4 z-20 shadow w-64 transition-all duration-300 ease-in-out animate-fadeIn ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between p-2">
          <Logo />
          <button
            onClick={() => setIsSidebarOpen?.(false)}
            className="cursor-pointer p-2 rounded-full hover:bg-(--color-alt-2) transition duration-200 opacity-60 hover:opacity-100 "
          >
            <FiSidebar size={18} />
          </button>
        </div>
        <nav className="flex flex-col gap-2">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => {
                  if (window.innerWidth < 640) {
                    closeSidebar();
                  }
                }}
                className={`flex items-center gap-2 rounded-full hover:bg-(--color-alt-2) transition duration-200 p-2 cursor-pointer ${
                  active ? "bg-(--color-alt-2)" : ""
                }`}
              >
                <div className="p-1">{link.icon}</div>
                <span className="text-sm">{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <Profile />
    </div>
  );
}
