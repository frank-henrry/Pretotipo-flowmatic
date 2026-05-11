// src/components/sections/HowItWorks.tsx
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "Conecta tu WhatsApp Business",
    description:
      "Vincula tu número actual a través de la API oficial de Meta. Sin cambios de número, sin configuraciones técnicas complicadas. El proceso toma menos de 10 minutos.",
    accent: "green",
    detail: "Setup en < 10 min",
  },
  {
    number: "02",
    title: "Configura tu menú y flujos",
    description:
      "Carga tus platos con fotos, precios y variantes. Define los horarios, zonas de delivery y mensajes automáticos. Todo desde tu panel, sin tocar código.",
    accent: "cyan",
    detail: "Sin código técnico",
  },
  {
    number: "03",
    title: "Tus clientes piden, tú controlas",
    description:
      "El bot atiende 24/7, confirma pedidos y notifica a cocina y repartidores. Tú ves todo en tiempo real desde el dashboard. Solo intervenes cuando quieres.",
    accent: "green",
    detail: "Automatización 24/7",
  },
];

export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="py-24 bg-[var(--surface)] border-y border-[var(--border)]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <Badge variant="green" className="mb-4">
            Cómo funciona
          </Badge>
          <h2
            className="font-display font-bold text-[var(--text-primary)] tracking-tight mb-4"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
          >
            De cero a automatizado
            <br />
            <span className="text-gradient-brand">en tres pasos</span>
          </h2>
          <p className="text-base font-body text-[var(--text-secondary)] max-w-lg mx-auto">
            No necesitas saber de tecnología. Si puedes usar WhatsApp,
            puedes usar GenViaYA.
          </p>
        </AnimatedSection>

        {/* Steps */}
        <div className="relative">
          {/* Línea conectora (solo desktop) */}
          <div
            aria-hidden
            className="hidden md:block absolute top-10 left-[calc(50%_-_1px)] w-px h-[calc(100%_-_80px)]"
            style={{
              background:
                "linear-gradient(to bottom, var(--green), var(--cyan), transparent)",
              opacity: 0.2,
            }}
          />

          <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-6">
            {steps.map((step, i) => (
              <AnimatedSection key={step.number} delay={i * 0.15}>
                <div
                  className={cn(
                    "relative p-6 rounded-2xl card-glow",
                    "border border-[var(--border)] bg-[var(--background)]",
                    "hover:border-[var(--border)] transition-all duration-300 h-full"
                  )}
                >
                  {/* Número */}
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className={cn(
                        "font-display font-bold text-4xl leading-none tabular-nums",
                        step.accent === "green"
                          ? "text-[var(--green)]"
                          : "text-[var(--cyan)]"
                      )}
                      style={{ opacity: 0.3 }}
                    >
                      {step.number}
                    </span>
                    <span
                      className={cn(
                        "text-xs font-body px-2 py-1 rounded-full",
                        step.accent === "green"
                          ? "bg-[var(--green-dim)] text-[var(--green)]"
                          : "bg-[var(--cyan-dim)] text-[var(--cyan)]"
                      )}
                    >
                      {step.detail}
                    </span>
                  </div>

                  <h3 className="font-display font-semibold text-[var(--text-primary)] text-base mb-3 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-sm font-body text-[var(--text-secondary)] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
