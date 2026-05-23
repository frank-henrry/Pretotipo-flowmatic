// src/components/sections/Hero.tsx
"use client";

import { memo } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

// ── PhoneMockup: dynamic import ────────────────────────────────────────────
// Se carga como chunk JS separado, no bloquea el bundle principal.
// El skeleton reserva las dimensiones exactas del phone → sin layout shift (CLS 0).
function PhoneSkeleton() {
  return (
    <div className="relative mx-auto" style={{ width: "min(320px, 88vw)" }}>
      {/* Espacio del label */}
      <div className="flex justify-center mb-3">
        <div className="h-7 w-52 rounded-full" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.15)" }} />
      </div>
      {/* Cuerpo del iPhone */}
      <div style={{
        borderRadius: "44px", padding: "12px", minHeight: 600,
        background: "linear-gradient(160deg, #4a4a4a 0%, #2a2a2a 30%, #1a1a1a 60%, #252525 100%)",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.12), inset 0 0 0 1px rgba(0,0,0,0.8), 0 50px 100px rgba(0,0,0,0.6)",
        opacity: 0.5,
      }} />
    </div>
  );
}

const PhoneMockup = dynamic(
  () => import("@/components/sections/PhoneMockup").then(m => ({ default: m.PhoneMockup })),
  { ssr: false, loading: () => <PhoneSkeleton /> }
);

// ── MeshBackground: memo para evitar re-renders del padre ─────────────────
const MeshBackground = memo(function MeshBackground() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute rounded-full blur-[120px]"
        style={{ width: "55vw", height: "55vw", maxWidth: 700, maxHeight: 700, background: "radial-gradient(circle, rgba(34,197,94,0.18) 0%, transparent 70%)", top: "-10%", left: "-5%" }}
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full blur-[100px]"
        style={{ width: "40vw", height: "40vw", maxWidth: 500, maxHeight: 500, background: "radial-gradient(circle, rgba(6,182,212,0.14) 0%, transparent 70%)", top: "20%", right: "-8%" }}
        animate={{ x: [0, -50, 30, 0], y: [0, 40, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
      <motion.div
        className="absolute rounded-full blur-[140px]"
        style={{ width: "35vw", height: "35vw", maxWidth: 450, maxHeight: 450, background: "radial-gradient(circle, rgba(34,197,94,0.10) 0%, transparent 70%)", bottom: "0%", left: "30%" }}
        animate={{ x: [0, 30, -40, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 6 }}
      />
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle, var(--text-primary) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      {[
        { icon: "M3 3h18v14H3zM8 21h8M12 17v4", x: "8%", y: "15%", size: 28, rot: -12, delay: 0 },
        { icon: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z", x: "88%", y: "10%", size: 32, rot: 10, delay: 0.5 },
        { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", x: "5%", y: "72%", size: 26, rot: 8, delay: 1 },
        { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75", x: "92%", y: "65%", size: 30, rot: -8, delay: 1.5 },
        { icon: "M1 3h15v13H1zM16 8l4 3-4 3V8z", x: "75%", y: "82%", size: 26, rot: 15, delay: 2 },
        { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", x: "20%", y: "88%", size: 24, rot: -6, delay: 2.5 },
        { icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z", x: "82%", y: "38%", size: 22, rot: 20, delay: 3 },
        { icon: "M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM8 12l3 3 5-5", x: "3%", y: "42%", size: 28, rot: -15, delay: 3.5 },
      ].map((item, i) => (
        <motion.div key={i} className="absolute" style={{ left: item.x, top: item.y, transform: `rotate(${item.rot}deg)` }} animate={{ y: [0, -10, 0], opacity: [0.18, 0.45, 0.18] }} transition={{ duration: 4 + i * 0.6, repeat: Infinity, ease: "easeInOut", delay: item.delay }}>
          <svg width={item.size} height={item.size} viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "url(#iconGrad)", filter: "drop-shadow(0 0 6px rgba(34,197,94,0.4))" }}>
            <defs>
              <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <path d={item.icon} />
          </svg>
        </motion.div>
      ))}
    </div>
  );
});

// ── Hero ───────────────────────────────────────────────────────────────────
export function Hero({ onOpenModal }: { onOpenModal: (e?: React.MouseEvent) => void }) {
  return (
    <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28 min-h-screen flex items-center">
      <MeshBackground />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ── Columna izquierda — animaciones CSS puras ──────────────────
              Sin Framer Motion: visible en cuanto carga el CSS (~0ms),
              no espera hidratación JS (~1-2s). Elimina el FOIC.         */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">

            <div style={{ animation: "fadeUp 0.5s ease 0.1s both" }}>
              <Badge variant="green" className="mb-7 w-fit mx-auto md:mx-0">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0" style={{ background: "var(--green)" }} />
                Automatización para restaurantes
              </Badge>
            </div>

            <h1
              className="font-display font-bold text-[var(--text-primary)] leading-[1.06] tracking-tight mb-6"
              style={{ fontSize: "clamp(2.6rem, 5.5vw, 4rem)", animation: "fadeUp 0.65s cubic-bezier(0.21,0.47,0.32,0.98) 0.2s both" }}
            >
              Tu restaurante,{" "}
              <span className="font-display font-bold" style={{ WebkitTextStroke: "2px var(--green)", WebkitTextFillColor: "transparent", color: "transparent" }}>
                sin caos
              </span>
              <br />
              en WhatsApp
            </h1>

            <p
              className="text-base font-body text-[var(--text-secondary)] leading-relaxed mb-9 max-w-md"
              style={{ animation: "fadeUp 0.6s ease 0.35s both" }}
            >
              GenViaYA convierte tu WhatsApp en un sistema de pedidos, CRM y logística. Tus clientes piden como siempre.{" "}
              <span className="text-[var(--text-primary)] font-medium">Tú ganas control total.</span>
            </p>

            <div
              className="flex flex-wrap gap-3 mb-10 justify-center md:justify-start"
              style={{ animation: "fadeUp 0.6s ease 0.48s both" }}
            >
              <button
                onClick={onOpenModal}
                id="cta-hero-demo"
                data-event="hero_demo_click"
                className="group inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-medium font-body text-sm text-white transition-all duration-200 hover:opacity-90 hover:shadow-[0_0_24px_rgba(34,197,94,0.4)]"
                style={{ background: "var(--green)" }}
              >
                Solicitar demo 14 días gratis
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>
              <a
                href="#como-funciona"
                id="cta-hero-ver"
                data-event="hero_ver_click"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-body font-medium text-sm transition-all duration-200 hover:opacity-80"
                style={{ border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text-secondary)" }}
              >
                <Play size={13} />
                Ver cómo funciona
              </a>
            </div>

            <div
              className="flex items-center gap-3 justify-center md:justify-start"
              style={{ animation: "fadeUp 0.6s ease 0.65s both" }}
            >
              <div className="flex -space-x-2">
                {["GT", "MQ", "SR", "RM"].map((initials, i) => (
                  <div key={i} className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-display font-bold text-white" style={{ border: "2px solid var(--background)", background: i % 2 === 0 ? "var(--green)" : "var(--cyan)" }}>
                    {initials}
                  </div>
                ))}
              </div>
              <p className="text-sm font-body text-[var(--text-muted)]">
                +120 restaurantes <span className="text-[var(--text-secondary)]">ya automatizados</span>
              </p>
            </div>
          </div>

          {/* ── Columna derecha — dynamic import + CSS animation ───────────
              PhoneMockup se carga como chunk JS separado (no bloquea el
              bundle principal). El skeleton mantiene el espacio exacto
              → CLS = 0. La animación de entrada es CSS pura.            */}
          <div
            className="relative flex justify-center items-center"
            style={{ perspective: "1000px", animation: "slideInRight 0.9s cubic-bezier(0.21,0.47,0.32,0.98) 0.25s both" }}
          >
            <PhoneMockup />
          </div>

        </div>
      </div>
    </section>
  );
}
