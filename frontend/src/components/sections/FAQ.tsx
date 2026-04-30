// src/components/sections/FAQ.tsx
"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";
import { faqItems } from "@/data/faq";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="preguntas"
      className="py-24 max-w-6xl mx-auto px-4 sm:px-6"
    >
      <div className="grid md:grid-cols-[1fr_1.8fr] gap-12 lg:gap-20 items-start">
        {/* Left: título fijo */}
        <AnimatedSection direction="left" className="md:sticky md:top-28">
          <Badge variant="cyan" className="mb-4">
            Preguntas frecuentes
          </Badge>
          <h2
            className="font-display font-bold text-[var(--text-primary)] tracking-tight mb-4"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
          >
            Tenemos respuesta para tus{" "}
            <span className="text-gradient-brand">dudas</span>
          </h2>
          <p className="text-sm font-body text-[var(--text-secondary)] leading-relaxed mb-6">
            Si no encuentras lo que buscas, escríbenos directamente.
          </p>
          <a
            href="#"
            id="cta-faq-consultar"
            data-event="faq_consult_click"
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-body font-medium",
              "border border-[var(--border)] text-[var(--text-secondary)]",
              "hover:text-[var(--green)] hover:border-[var(--green)] hover:bg-[var(--green-dim)]",
              "transition-all duration-200"
            )}
          >
            Hacer una consulta →
          </a>
        </AnimatedSection>

        {/* Right: acordeón */}
        <AnimatedSection direction="right">
          <div className="space-y-2">
            {faqItems.map((item, i) => {
              const isOpen = openIndex === i;

              return (
                <div
                  key={i}
                  className={cn(
                    "rounded-xl border overflow-hidden transition-all duration-200",
                    isOpen
                      ? "border-[var(--green)]/30 bg-[var(--surface)]"
                      : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border)]"
                  )}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={cn(
                        "text-sm font-body font-medium leading-snug",
                        isOpen
                          ? "text-[var(--text-primary)]"
                          : "text-[var(--text-secondary)]"
                      )}
                    >
                      {item.question}
                    </span>
                    <span
                      className={cn(
                        "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-200",
                        isOpen
                          ? "bg-[var(--green-dim)] text-[var(--green)]"
                          : "bg-[var(--surface-2)] text-[var(--text-muted)]"
                      )}
                    >
                      {isOpen ? <Minus size={12} /> : <Plus size={12} />}
                    </span>
                  </button>

                  {/* Respuesta con transición CSS pura */}
                  <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{
                      maxHeight: isOpen ? "300px" : "0px",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <p className="px-5 pb-5 text-sm font-body text-[var(--text-secondary)] leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
