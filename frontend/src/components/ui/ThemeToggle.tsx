// src/components/ui/ThemeToggle.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className={cn("w-9 h-9 rounded-lg", className)} aria-hidden />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className={cn(
        "relative w-9 h-9 rounded-lg flex items-center justify-center",
        "border border-[var(--border)] bg-[var(--surface)]",
        "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
        "hover:border-[var(--green)] hover:bg-[var(--green-dim)]",
        "transition-all duration-200 cursor-pointer",
        className
      )}
    >
      <span
        className="absolute transition-all duration-300"
        style={{
          opacity: isDark ? 1 : 0,
          transform: isDark ? "rotate(0deg) scale(1)" : "rotate(90deg) scale(0)",
        }}
      >
        <Moon size={15} />
      </span>
      <span
        className="absolute transition-all duration-300"
        style={{
          opacity: isDark ? 0 : 1,
          transform: isDark ? "rotate(-90deg) scale(0)" : "rotate(0deg) scale(1)",
        }}
      >
        <Sun size={15} />
      </span>
    </button>
  );
}
