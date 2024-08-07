"use client";
import { usePathname } from "next/navigation";
export function HomeChecker() {
  const path = usePathname();
  // console.log("checked");
  // console.log(path);
  if (path === "/") {
    return true;
  } else {
    return false;
  }
}
