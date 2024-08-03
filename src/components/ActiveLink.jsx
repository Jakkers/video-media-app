"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function ActiveLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={
        isActive ? "flex text-green-600 bg-white rounded-lg items-center" : ""
      }
    >
      {children}
    </Link>
  );
}
