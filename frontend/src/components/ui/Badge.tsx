// src/components/ui/Badge.tsx
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "green" | "cyan" | "neutral";
  className?: string;
}

export function Badge({ children, variant = "green", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium tracking-wide font-body",
        variant === "green" && [
          "bg-[var(--green-dim)] text-[var(--green)]",
          "border border-[var(--green)]/20",
        ],
        variant === "cyan" && [
          "bg-[var(--cyan-dim)] text-[var(--cyan)]",
          "border border-[var(--cyan)]/20",
        ],
        variant === "neutral" && [
          "bg-[var(--surface-2)] text-[var(--text-secondary)]",
          "border border-[var(--border)]",
        ],
        className
      )}
    >
      {children}
    </span>
  );
}
