// src/components/sections/Testimonials.tsx
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";

export function Testimonials() {
  return (
    <section
      id="testimonios"
      className="py-24 max-w-6xl mx-auto px-4 sm:px-6"
    >
      {/* Header */}
      <AnimatedSection className="text-center mb-16">
        <Badge variant="green" className="mb-4">
          Testimonios
        </Badge>
        <h2
          className="font-display font-bold text-[var(--text-primary)] tracking-tight mb-4"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
        >
          Lo que dicen los{" "}
          <span className="text-gradient-brand">restaurantes</span>
        </h2>
        <p className="text-base font-body text-[var(--text-secondary)] max-w-md mx-auto">
          Restaurantes reales que transformaron su operación con GenViaYA.
        </p>
      </AnimatedSection>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {testimonials.map((t, i) => (
          <AnimatedSection key={t.name} delay={i * 0.1}>
            <div
              className={cn(
                "relative p-6 rounded-2xl h-full card-glow",
                "border border-[var(--border)] bg-[var(--surface)]",
                "hover:bg-[var(--surface-2)] transition-all duration-300"
              )}
            >
              {/* Quote icon */}
              <Quote
                size={18}
                className={cn(
                  "mb-4",
                  t.accentColor === "green"
                    ? "text-[var(--green)]"
                    : "text-[var(--cyan)]"
                )}
                style={{ opacity: 0.6 }}
              />

              {/* Text */}
              <p className="text-sm font-body text-[var(--text-secondary)] leading-relaxed mb-6">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-auto">
                <div
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center",
                    "font-display font-bold text-xs text-white",
                    t.accentColor === "green"
                      ? "bg-[var(--green)]"
                      : "bg-[var(--cyan)]"
                  )}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-display font-semibold text-[var(--text-primary)] leading-none mb-0.5">
                    {t.name}
                  </p>
                  <p className="text-xs font-body text-[var(--text-muted)]">
                    {t.role} · {t.restaurant}, {t.city}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
