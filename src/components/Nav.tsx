"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation"
import { ComponentProps } from "react";

export function Nav({ children }: { children: React.ReactNode }) {
  return (
    <nav className="bg-primary text-primary-foreground flex justify-center px-4">
      {children}
    </nav>
  )
}

const navLinkStyles = {
  base: "p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground",
  active: "bg-background text-foreground hover:bg-background hover:text-foreground"
} as const;

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname();
  return (
    <Link 
      {...props} 
      className={cn(
        navLinkStyles.base,
        pathname === props.href && navLinkStyles.active
      )} 
    />
  );
}