// src/components/ui/GreenGlow.tsx
// Elemento decorativo: orbe de luz verde/cyan, usado con moderación

import { cn } from "@/lib/utils";

interface GlowProps {
  color?: "green" | "cyan";
  size?: "sm" | "md" | "lg";
  className?: string;
  intensity?: "low" | "medium" | "high";
}

export function Glow({
  color = "green",
  size = "md",
  intensity = "medium",
  className,
}: GlowProps) {
  const sizes = {
    sm: "w-32 h-32",
    md: "w-64 h-64",
    lg: "w-96 h-96",
  };

  const opacities = {
    low: "opacity-20",
    medium: "opacity-30",
    high: "opacity-50",
  };

  return (
    <div
      aria-hidden
      className={cn(
        "absolute rounded-full blur-3xl pointer-events-none",
        sizes[size],
        opacities[intensity],
        color === "green" ? "bg-[var(--green)]" : "bg-[var(--cyan)]",
        "animate-pulse-slow",
        className
      )}
    />
  );
}
