// src/components/sections/FinalCTA.tsx
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Glow } from "@/components/ui/GreenGlow";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function FinalCTA({ onOpenModal }: { onOpenModal: (e?: React.MouseEvent) => void }) {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Glows decorativos */}
      <Glow color="green" size="lg" className="-bottom-10 left-1/4" intensity="low" />
      <Glow color="cyan" size="md" className="-top-10 right-1/4" intensity="low" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div
            className={cn(
              "relative rounded-3xl overflow-hidden",
              "border border-[var(--green)]/20",
              "p-10 md:p-16 text-center"
            )}
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 50%, var(--green-dim), transparent 70%), var(--surface)",
            }}
          >
            {/* Noise */}
            <div className="noise-overlay absolute inset-0 rounded-3xl" aria-hidden />

            <div className="relative z-10">
              {/* Stat */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-[var(--green)] animate-pulse" />
                <span className="text-xs font-body text-[var(--text-muted)] uppercase tracking-widest">
                  +120 restaurantes activos esta semana
                </span>
              </div>

              {/* Headline */}
              <h2
                className="font-display font-bold text-[var(--text-primary)] tracking-tight mb-5 leading-tight"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
              >
                Tu restaurante merece operar
                <br />
                <span className="text-gradient-brand">sin el caos de siempre</span>
              </h2>

              <p className="text-base font-body text-[var(--text-secondary)] max-w-lg mx-auto mb-10 leading-relaxed">
                Empieza con 14 días gratis. Sin contratos, sin tarjeta de
                crédito. Solo tú, tu restaurante y FoodFlow.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={onOpenModal}
                  id="cta-final-demo"
                  data-event="final_demo_click"
                  className={cn(
                    "group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl",
                    "bg-[var(--green)] text-white font-medium font-body",
                    "hover:bg-[var(--green-hover)] hover:shadow-[0_0_32px_var(--green-glow)]",
                    "transition-all duration-200 text-sm"
                  )}
                >
                  Agendar demo ahora
                  <ArrowRight
                    size={15}
                    className="group-hover:translate-x-0.5 transition-transform duration-200"
                  />
                </button>
                <a
                  href="#"
                  id="cta-final-consultar"
                  data-event="final_consult_click"
                  className={cn(
                    "inline-flex items-center gap-2 px-6 py-3.5 rounded-xl",
                    "border border-[var(--border)] text-[var(--text-secondary)] font-body font-medium",
                    "hover:text-[var(--text-primary)] hover:border-[var(--cyan)] hover:bg-[var(--cyan-dim)]",
                    "transition-all duration-200 text-sm"
                  )}
                >
                  Consultar planes
                </a>
              </div>

              {/* Micro credenciales */}
              <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-xs font-body text-[var(--text-muted)]">
                {[
                  "✓ 14 días gratis",
                  "✓ Sin tarjeta de crédito",
                  "✓ Onboarding incluido",
                  "✓ Cancela cuando quieras",
                ].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
