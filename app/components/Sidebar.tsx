"use client";

import { usePathname } from "next/navigation";
import { useContext } from "react";
import { BsCreditCard2Back, BsWallet2 } from "react-icons/bs";
import AppContext from "../AppContext";
import Logo from "./Logo";
import { GoHome } from "react-icons/go";
import LogoutButton from "./LogoutButton";

export default function Sidebar() {
  const pathname = usePathname();
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext is not provided");
  }

  const { isLoading } = context;

  const links = [
    { name: "Dashboard", href: "/", icon: <GoHome size={18} /> },
    { name: "Incomes", href: "/incomes", icon: <BsWallet2 size={16} /> },
    {
      name: "Expenses",
      href: "/expenses",
      icon: <BsCreditCard2Back size={16} />,
    },
  ];

  if (pathname === "/login" || pathname === "/signup" || isLoading) {
    return null;
  }

  return (
    <div className="fixed left-0 h-svh w-64 border-r border-(--color-border) p-6 flex flex-col justify-between gap-4 animate-fadeIn">
      <div className="flex flex-col gap-6">
        <Logo />
        <nav>
          <ul className="flex flex-col gap-3">
            {links.map((link) => (
              <li key={link.name}>
                <a href={link.href} className={"flex items-center gap-3"}>
                  <div
                    className={`h-9 w-9 rounded-full flex items-center justify-center`}
                    style={{
                      backgroundColor:
                        pathname === link.href
                          ? "var(--color-primary)"
                          : "var(--color-alt)",
                    }}
                  >
                    {link.icon}
                  </div>
                  <span className="text-sm">{link.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <LogoutButton />
    </div>
  );
}
