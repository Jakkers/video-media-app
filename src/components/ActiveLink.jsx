"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@radix-ui/themes";

export function ActiveLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Button variant={isActive ? "solid" : "soft"}>
      <Link href={href}>{children}</Link>
    </Button>
  );
}
