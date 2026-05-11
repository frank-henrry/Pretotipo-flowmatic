// src/components/sections/Features.tsx
"use client";

import {
  MessageCircle,
  Users,
  Truck,
  CalendarCheck,
  LucideIcon,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";
import { features } from "@/data/features";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  MessageCircle,
  Users,
  Truck,
  CalendarCheck,
};

export function Features() {
  return (
    <section
      id="funcionalidades"
      className="py-24 max-w-6xl mx-auto px-4 sm:px-6"
    >
      {/* Header */}
      <AnimatedSection className="text-center mb-16">
        <Badge variant="cyan" className="mb-4">
          Funcionalidades
        </Badge>
        <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight tracking-tight mb-4"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
          Todo lo que necesita tu restaurante,{" "}
          <br className="hidden sm:block" />
          <span className="text-gradient-brand">en un solo lugar</span>
        </h2>
        <p className="text-base font-body text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
          Desde el primer mensaje hasta la entrega. GenViaYA cubre cada paso
          del proceso sin que tú tengas que estar pendiente.
        </p>
      </AnimatedSection>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, i) => {
          const Icon = iconMap[feature.icon];
          const isGreen = feature.accent === "green";

          return (
            <AnimatedSection
              key={feature.id}
              delay={i * 0.1}
              direction={i % 2 === 0 ? "left" : "right"}
            >
              <div
                className={cn(
                  "relative group rounded-2xl p-6 overflow-hidden card-glow",
                  "border border-[var(--border)] bg-[var(--surface)]",
                  "hover:border-[var(--border)] transition-all duration-300",
                  feature.size === "large" ? "md:row-span-1" : ""
                )}
              >
                {/* Hover background glow */}
                <div
                  aria-hidden
                  className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    "pointer-events-none rounded-2xl"
                  )}
                  style={{
                    background: isGreen
                      ? "radial-gradient(ellipse 60% 50% at 0% 100%, var(--green-dim), transparent)"
                      : "radial-gradient(ellipse 60% 50% at 100% 0%, var(--cyan-dim), transparent)",
                  }}
                />

                {/* Badge + icon */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className={cn(
                      "w-11 h-11 rounded-xl flex items-center justify-center",
                      isGreen
                        ? "bg-[var(--green-dim)] text-[var(--green)]"
                        : "bg-[var(--cyan-dim)] text-[var(--cyan)]"
                    )}
                  >
                    <Icon size={20} />
                  </div>
                  {feature.badge && (
                    <Badge variant={isGreen ? "green" : "cyan"} className="text-[11px]">
                      {feature.badge}
                    </Badge>
                  )}
                </div>

                {/* Content */}
                <h3 className="font-display font-semibold text-[var(--text-primary)] text-lg mb-2 leading-snug">
                  {feature.title}
                </h3>
                <p className="text-sm font-body text-[var(--text-secondary)] leading-relaxed mb-5">
                  {feature.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-2">
                  {feature.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2.5">
                      <span
                        className={cn(
                          "w-1.5 h-1.5 rounded-full flex-shrink-0",
                          isGreen ? "bg-[var(--green)]" : "bg-[var(--cyan)]"
                        )}
                      />
                      <span className="text-xs font-body text-[var(--text-secondary)]">
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </section>
  );
}
