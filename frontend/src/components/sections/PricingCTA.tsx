// src/components/sections/PricingCTA.tsx
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { Check, ArrowRight, MessageSquare, Zap } from "lucide-react";

const plans = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Para restaurantes que quieren empezar a automatizar",
    price: "A consultar",
    priceNote: "Precio según volumen de pedidos",
    cta: "Lo quiero",
    ctaId: "cta-pricing-starter",
    ctaEvent: "pricing_starter_click",
    variant: "neutral" as const,
    features: [
      "Pedidos automáticos por WhatsApp",
      "Panel de gestión básico",
      "Historial de clientes",
      "Soporte por WhatsApp",
    ],
    badge: null,
    icon: MessageSquare,
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Para restaurantes con alta demanda y equipo de reparto",
    price: "A consultar",
    priceNote: "Todo lo de Starter, más:",
    cta: "Lo quiero",
    ctaId: "cta-pricing-pro",
    ctaEvent: "pricing_pro_click",
    variant: "featured" as const,
    features: [
      "Todo de Starter incluido",
      "Logística y despacho inteligente",
      "Gestión de mesas y reservas",
      "CRM con segmentación avanzada",
      "Integraciones con POS",
      "Onboarding dedicado",
    ],
    badge: "Más popular",
    icon: Zap,
  },
];

export function PricingCTA({ onOpenModal }: { onOpenModal: (e?: React.MouseEvent) => void }) {
  return (
    <section
      id="planes"
      className="py-24 bg-[var(--surface)] border-y border-[var(--border)]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <AnimatedSection className="text-center mb-14">
          <Badge variant="cyan" className="mb-4">
            Planes
          </Badge>
          <h2
            className="font-display font-bold text-[var(--text-primary)] tracking-tight mb-4"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
          >
            Empieza a automatizar{" "}
            <span className="text-gradient-brand">hoy mismo</span>
          </h2>
          <p className="text-base font-body text-[var(--text-secondary)] max-w-md mx-auto">
            Sin contratos largos. Sin costos ocultos. Adaptado al tamaño de tu
            restaurante.
          </p>
        </AnimatedSection>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            const isFeatured = plan.variant === "featured";

            return (
              <AnimatedSection key={plan.id} delay={i * 0.12}>
                <div
                  className={cn(
                    "relative rounded-2xl p-6 h-full flex flex-col",
                    isFeatured
                      ? [
                          "border-[var(--green)] bg-[var(--background)]",
                          "border shadow-[0_0_40px_var(--green-glow)]",
                        ]
                      : [
                          "border border-[var(--border)] bg-[var(--background)]",
                        ]
                  )}
                >
                  {/* Badge popular */}
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge variant="green" className="text-[11px] px-3 py-1">
                        ✦ {plan.badge}
                      </Badge>
                    </div>
                  )}

                  {/* Icon + name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center",
                        isFeatured
                          ? "bg-[var(--green-dim)] text-[var(--green)]"
                          : "bg-[var(--surface-2)] text-[var(--cyan)]"
                      )}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-[var(--text-primary)] text-base leading-none mb-0.5">
                        {plan.name}
                      </h3>
                      <p className="text-[11px] font-body text-[var(--text-muted)]">
                        {plan.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-5 pb-5 border-b border-[var(--border)]">
                    <p
                      className={cn(
                        "font-display font-bold text-2xl",
                        isFeatured
                          ? "text-[var(--green)]"
                          : "text-[var(--text-primary)]"
                      )}
                    >
                      {plan.price}
                    </p>
                    <p className="text-xs font-body text-[var(--text-muted)] mt-1">
                      {plan.priceNote}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-7 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check
                          size={14}
                          className={cn(
                            "mt-0.5 flex-shrink-0",
                            isFeatured
                              ? "text-[var(--green)]"
                              : "text-[var(--cyan)]"
                          )}
                        />
                        <span className="text-xs font-body text-[var(--text-secondary)]">
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTAs */}
                  <div className="space-y-2">
                    <button
                      onClick={onOpenModal}
                      id={plan.ctaId}
                      data-event={plan.ctaEvent}
                      className={cn(
                        "group flex items-center justify-center gap-2 w-full py-3 rounded-xl",
                        "font-medium font-body text-sm",
                        "transition-all duration-200",
                        isFeatured
                          ? [
                              "bg-[var(--green)] text-white",
                              "hover:bg-[var(--green-hover)] hover:shadow-[0_0_20px_var(--green-glow)]",
                            ]
                          : [
                              "border border-[var(--border)] text-[var(--text-secondary)]",
                              "hover:text-[var(--text-primary)] hover:border-[var(--cyan)] hover:bg-[var(--cyan-dim)]",
                            ]
                      )}
                    >
                      {plan.cta}
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-0.5 transition-transform duration-200"
                      />
                    </button>
                    <a
                      href="#"
                      id={`${plan.ctaId}-consultar`}
                      data-event={`${plan.ctaEvent}_consultar`}
                      className={cn(
                        "flex items-center justify-center w-full py-2.5 rounded-xl",
                        "text-xs font-body text-[var(--text-muted)]",
                        "hover:text-[var(--text-secondary)] transition-colors duration-150"
                      )}
                    >
                      Consultar planes →
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Demo CTA global */}
        <AnimatedSection delay={0.25} className="mt-10 text-center">
          <p className="text-sm font-body text-[var(--text-muted)] mb-4">
            ¿No estás seguro qué plan necesitas?
          </p>
          <button
            onClick={onOpenModal}
            id="cta-pricing-demo"
            data-event="pricing_demo_click"
            className={cn(
              "inline-flex items-center gap-2 px-6 py-3 rounded-xl",
              "border border-[var(--green)]/40 text-[var(--green)]",
              "bg-[var(--green-dim)] hover:bg-[var(--green-dim)]",
              "font-medium font-body text-sm",
              "hover:border-[var(--green)] hover:shadow-[0_0_16px_var(--green-glow)]",
              "transition-all duration-200"
            )}
          >
            Solicitar demo gratuita 14 días
            <ArrowRight size={14} />
          </button>
          <p className="text-xs font-body text-[var(--text-muted)] mt-3">
            Sin tarjeta de crédito · Onboarding incluido · Cancela cuando quieras
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
