// src/components/sections/Hero.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, ShoppingCart, Utensils, Package, Bike, Store, Banknote, Smartphone, CheckCircle, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const MENU_ITEMS = [
  { id: "1", name: "Pollo a la Brasa", desc: "Con papas y ensalada", price: 28.00 },
  { id: "2", name: "Ceviche Clásico", desc: "Pescado fresco al limón", price: 35.00 },
  { id: "3", name: "Hamburguesa Especial", desc: "Doble carne y queso", price: 25.00 },
  { id: "4", name: "Gaseosa 1.5L", desc: "Inca Kola o Coca Cola", price: 8.00 },
];

const GUARNICIONES = ["Papas Fritas", "Ensalada", "Arroz", "Camote frito"];

const INITIAL_MESSAGES = [
  { id: 1, from: "bot", text: "¡Hola! 👋 Bienvenido a *La Leña Parrilla*\n\nSoy tu asistente automático. ¿Qué deseas hacer?", time: "12:01", hasButton: true },
];

function MeshBackground() {
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
}

function PhoneMockup({ onFlowChange }: { onFlowChange: (open: boolean) => void }) {
  const [messages, setMessages]           = useState(INITIAL_MESSAGES);
  const [flowOpen, setFlowOpen]           = useState(false);
  const [flowStep, setFlowStep]           = useState(1);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [guarniciones, setGuarniciones]   = useState<Record<string, string>>({});
  const [name, setName]                   = useState("");
  const [address, setAddress]             = useState("");
  const [chatInputText, setChatInputText] = useState("");
  const [cursor, setCursor]               = useState({ x: 148, y: 300, visible: false, tapping: false });

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const timers           = useRef<ReturnType<typeof setTimeout>[]>([]);
  const onFlowChangeRef  = useRef(onFlowChange);
  onFlowChangeRef.current = onFlowChange;

  // Auto-scroll chat container
  useEffect(() => {
    const el = chatContainerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  // ── Auto-demo sequence ──────────────────────────────────────────
  useEffect(() => {
    /** Schedule a callback */
    function go(delay: number, fn: () => void) {
      const id = setTimeout(fn, delay);
      timers.current.push(id);
    }

    /** Move cursor to position */
    function moveTo(x: number, y: number, delay: number) {
      go(delay, () => setCursor(c => ({ ...c, x, y, visible: true, tapping: false })));
    }

    /** Move + tap (scale down) + optional action */
    function tap(x: number, y: number, delay: number, action?: () => void) {
      moveTo(x, y, delay);
      go(delay + 380, () => { setCursor(c => ({ ...c, tapping: true })); action?.(); });
      go(delay + 640, () => setCursor(c => ({ ...c, tapping: false })));
    }

    /** Type text letter by letter — returns timestamp when typing ends */
    function type(setter: (s: string) => void, text: string, startMs: number, charMs = 75): number {
      [...text].forEach((_, i) => {
        go(startMs + (i + 1) * charMs, () => setter(text.slice(0, i + 1)));
      });
      return startMs + text.length * charMs;
    }

    function runSequence() {
      // Clear all pending timers from previous cycle
      timers.current.forEach(clearTimeout);
      timers.current = [];

      // ── Reset state ──────────────────────────────
      setMessages(INITIAL_MESSAGES);
      setFlowOpen(false);
      setFlowStep(1);
      setSelectedItems([]);
      setGuarniciones({});
      setName("");
      setAddress("");
      setChatInputText("");
      setCursor({ x: 148, y: 300, visible: false, tapping: false });
      onFlowChangeRef.current(false);

      // ── 1. Tap "Ver Menú y Pedir" ────────────────
      // cursor positions are relative to the iPhone frame div (which has position:relative)
      tap(148, 267, 1600, () => { setFlowOpen(true); onFlowChangeRef.current(true); });

      // ── 2. Select Pollo a la Brasa ───────────────
      tap(252, 232, 3300, () => setSelectedItems(["1"]));

      // ── 3. Select Papas Fritas garnish ───────────
      tap(62, 304, 4600, () => setGuarniciones({ "1": "Papas Fritas" }));

      // ── 4. Select Ceviche Clásico ────────────────
      tap(252, 382, 5700, () => setSelectedItems(["1", "2"]));

      // ── 5. Tap Continuar ─────────────────────────
      tap(148, 554, 6900, () => setFlowStep(2));

      // ── 6. Tap address field + type ──────────────
      moveTo(148, 332, 8000);
      go(8280, () => setCursor(c => ({ ...c, tapping: true })));
      go(8520, () => setCursor(c => ({ ...c, tapping: false })));
      const addrDone = type(setAddress, "Jr. Los Pinos 245", 8620, 70);
      // addrDone ≈ 8620 + 17×70 = 9810

      // ── 7. Tap name field + type ─────────────────
      moveTo(148, 410, addrDone + 380);
      go(addrDone + 660,  () => setCursor(c => ({ ...c, tapping: true })));
      go(addrDone + 900,  () => setCursor(c => ({ ...c, tapping: false })));
      const nameDone = type(setName, "Carlos", addrDone + 980, 100);
      // nameDone ≈ addrDone + 980 + 600 = 11390

      // ── 8. Tap Confirmar ─────────────────────────
      const confirmAt = nameDone + 720;
      tap(148, 554, confirmAt, () => {
        const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        setMessages(prev => [...prev, {
          id: Date.now(),
          from: "client" as const,
          text: "📝 *Mi pedido:*\n• Pollo a la Brasa (Papas Fritas) — S/ 28.00\n• Ceviche Clásico — S/ 35.00\n\n*Total:* S/ 63.00\n*Entrega:* Delivery 🛵\n*Pago:* Efectivo",
          time: now,
          hasButton: false,
        }]);
        setFlowOpen(false);
        setFlowStep(1);
        onFlowChangeRef.current(false);
      });

      // ── 9. Bot confirms order ────────────────────
      go(confirmAt + 640 + 1300, () => {
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          from: "bot" as const,
          text: "✅ *¡Pedido confirmado, Carlos!*\n\nYa está en cocina. Te avisamos cuando el repartidor esté en camino 🛵",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          hasButton: false,
        }]);
      });

      // ── 10. Hide cursor briefly ──────────────────
      go(confirmAt + 820, () => setCursor(c => ({ ...c, visible: false })));

      // ── 11. User types thank-you message ─────────
      const thankAt = confirmAt + 640 + 1300 + 2600;
      moveTo(120, 560, thankAt - 620);
      go(thankAt - 320, () => setCursor(c => ({ ...c, tapping: true })));
      go(thankAt - 100, () => setCursor(c => ({ ...c, tapping: false })));
      const thankDone = type(setChatInputText, "Gracias por el servicio 🙌", thankAt, 65);
      // "Gracias por el servicio 🙌" = 25 chars → +1625ms

      // ── 12. Tap send button ──────────────────────
      const sendAt = thankDone + 520;
      tap(260, 560, sendAt, () => {
        const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        setMessages(prev => [...prev, {
          id: Date.now() + 2,
          from: "client" as const,
          text: "Gracias por el servicio 🙌",
          time: now,
          hasButton: false,
        }]);
        setChatInputText("");
      });

      // ── 13. Bot farewell ─────────────────────────
      go(sendAt + 640 + 1400, () => {
        setMessages(prev => [...prev, {
          id: Date.now() + 3,
          from: "bot" as const,
          text: "🌟 ¡Vuelve pronto! Aquí siempre tendrás tu mesa lista 🍽️",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          hasButton: false,
        }]);
      });

      // ── 14. Hide cursor + loop ───────────────────
      go(sendAt + 820, () => setCursor(c => ({ ...c, visible: false })));
      go(sendAt + 640 + 1400 + 3800, runSequence);
    }

    const startId = setTimeout(runSequence, 900);
    timers.current.push(startId);

    return () => { timers.current.forEach(clearTimeout); timers.current = []; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const total = selectedItems.reduce((acc, id) => {
    const item = MENU_ITEMS.find(i => i.id === id);
    return acc + (item?.price ?? 0);
  }, 0);

  return (
    <div className="relative mx-auto" style={{ width: "min(320px, 88vw)" }}>
      <div aria-hidden className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse, rgba(34,197,94,0.22) 0%, transparent 70%)", transform: "translateY(12%) scale(0.88)", filter: "blur(50px)" }} />

      {/* Label — reemplaza el badge de interacción manual */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.4 }} className="flex justify-center mb-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-body font-medium" style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)", color: "#22c55e" }}>
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-[#22c55e] flex-shrink-0"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
          Demo en vivo — así funciona GenViaYA
        </div>
      </motion.div>

      {/* Marco iPhone */}
      <div className="relative" style={{ borderRadius: "44px", padding: "12px", background: "linear-gradient(160deg, #4a4a4a 0%, #2a2a2a 30%, #1a1a1a 60%, #252525 100%)", boxShadow: "0 0 0 1px rgba(255,255,255,0.12), inset 0 0 0 1px rgba(0,0,0,0.8), 0 50px 100px rgba(0,0,0,0.6), 0 20px 50px rgba(0,0,0,0.5)" }}>

        {/* ── Cursor animado ─────────────────────────────────────────
            Vive DENTRO del frame div pero FUERA del screen div,
            así no lo recorta el overflow:hidden de la pantalla.     */}
        <motion.div
          className="absolute pointer-events-none"
          style={{ zIndex: 60, top: 0, left: 0 }}
          animate={{
            x: cursor.x - 10,
            y: cursor.y - 10,
            opacity: cursor.visible ? 1 : 0,
            scale: cursor.tapping ? 0.6 : 1,
          }}
          transition={{
            x: { type: "spring", stiffness: 370, damping: 32 },
            y: { type: "spring", stiffness: 370, damping: 32 },
            opacity: { duration: 0.18 },
            scale: { duration: 0.1 },
          }}
        >
          {/* Ripple ring on tap */}
          {cursor.tapping && (
            <motion.div
              initial={{ opacity: 0.55, scale: 0.4 }}
              animate={{ opacity: 0, scale: 2.2 }}
              transition={{ duration: 0.38 }}
              className="absolute rounded-full"
              style={{ inset: -4, background: "rgba(255,255,255,0.3)" }}
            />
          )}
          {/* Finger dot */}
          <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(255,255,255,0.95)", boxShadow: "0 2px 12px rgba(0,0,0,0.45), 0 0 0 1.5px rgba(0,0,0,0.1)" }} />
        </motion.div>

        {/* Botones laterales */}
        <div className="absolute left-[-3px] top-[90px] flex flex-col gap-2">
          <div className="w-[3px] h-7 rounded-l-full" style={{ background: "linear-gradient(180deg, #3a3a3a, #252525)" }} />
          <div className="w-[3px] h-7 rounded-l-full" style={{ background: "linear-gradient(180deg, #3a3a3a, #252525)" }} />
        </div>
        <div className="absolute left-[-3px] top-[60px]"><div className="w-[3px] h-6 rounded-l-full" style={{ background: "linear-gradient(180deg, #3a3a3a, #252525)" }} /></div>
        <div className="absolute right-[-3px] top-[100px]"><div className="w-[3px] h-10 rounded-r-full" style={{ background: "linear-gradient(180deg, #3a3a3a, #252525)" }} /></div>

        {/* Pantalla */}
        <div className="overflow-hidden relative" style={{ borderRadius: "36px", background: "#111b21" }}>
          <div aria-hidden className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-10" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)", borderRadius: "36px 36px 0 0" }} />

          {/* Status bar */}
          <div className="flex items-center justify-between px-5 pt-3 pb-1" style={{ background: "#075e54" }}>
            <span className="text-white text-[10px] font-bold">9:41</span>
            <div className="flex items-center gap-1.5">
              <div className="flex items-end gap-[2px]">
                {[3,5,7,9].map((h,i) => <div key={i} className="w-[3px] rounded-sm" style={{ height: h, background: i < 3 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)" }} />)}
              </div>
              <svg width="12" height="9" viewBox="0 0 22 16" fill="none">
                <path d="M11 12a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" fill="rgba(255,255,255,0.9)"/>
                <path d="M5.5 8.5C7 7 8.9 6 11 6s4 1 5.5 2.5" stroke="rgba(255,255,255,0.9)" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M2 5C4.5 2.5 7.6 1 11 1s6.5 1.5 9 4" stroke="rgba(255,255,255,0.4)" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              <div className="flex items-center gap-[1px]">
                <div className="w-5 h-[10px] rounded-[3px] border border-white/40 p-[1.5px]">
                  <div className="h-full w-4/5 rounded-[1px] bg-white/90" />
                </div>
              </div>
            </div>
          </div>

          {/* Notch */}
          <div className="flex justify-center" style={{ background: "#075e54" }}>
            <div style={{ width: 90, height: 18, background: "#000", borderRadius: "0 0 18px 18px" }} />
          </div>

          {/* WA Header */}
          <div className="px-3 py-2.5 flex items-center gap-2.5" style={{ background: "#075e54" }}>
            <svg width="8" height="13" viewBox="0 0 8 14" fill="none"><path d="M7 1L1 7L7 13" stroke="rgba(255,255,255,0.9)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 text-xs" style={{ background: "#128c7e" }}>LP</div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-[13px] font-semibold leading-none mb-0.5">La Leña Parrilla</p>
              <div className="flex items-center gap-1">
                <motion.span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-green-300" animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                <p className="text-green-200 text-[10px]">en línea</p>
              </div>
            </div>
            <div className="flex items-center gap-3.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.4 2.14 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
              <div className="flex flex-col gap-[3px]">{[0,1,2].map(i => <div key={i} className="w-[3px] h-[3px] rounded-full bg-white/70" />)}</div>
            </div>
          </div>

          {/* Chat */}
          <div
            ref={chatContainerRef}
            className="px-2.5 py-3 space-y-2 overflow-y-auto"
            style={{
              background: "#e5ddd5",
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              minHeight: 430,
              maxHeight: 380,
            }}
          >
            <div className="flex justify-center mb-1">
              <span className="text-[10px] px-3 py-1 rounded-full shadow-sm" style={{ background: "rgba(225,245,254,0.92)", color: "#546e7a" }}>Hoy</span>
            </div>
            {messages.map((msg, i) => (
              <motion.div key={msg.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i === 0 ? 0.4 : 0, duration: 0.3 }} className={cn("flex", msg.from === "client" ? "justify-end" : "justify-start")}>
                <div
                  className="max-w-[85%] px-3 py-2 text-[12px] leading-relaxed shadow-sm relative"
                  style={{
                    whiteSpace: "pre-line",
                    borderRadius: msg.from === "client" ? "12px 2px 12px 12px" : "2px 12px 12px 12px",
                    background: msg.from === "client" ? "#dcf8c6" : "#ffffff",
                    color: "#1a1a1a",
                    paddingBottom: msg.hasButton && !flowOpen ? 44 : undefined,
                  }}
                >
                  {msg.text}
                  {msg.hasButton && !flowOpen && (
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 36, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, borderTop: "1px solid #e8e8e8", color: "#075e54", fontSize: 12, fontWeight: 600 }}>
                      <ShoppingCart size={13} strokeWidth={2.5} />
                      Ver Menú y Pedir
                    </div>
                  )}
                  <div className="flex items-center justify-end gap-1 mt-0.5">
                    <span style={{ fontSize: 9, color: "#8a8a8a" }}>{msg.time}</span>
                    {msg.from === "client" && (
                      <svg width="13" height="8" viewBox="0 0 16 10" fill="none">
                        <path d="M1 5L4.5 8.5L14 1" stroke="#4fc3f7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5 5L8.5 8.5" stroke="#4fc3f7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input bar */}
          <div className="px-2.5 py-2 flex items-center gap-2" style={{ background: "#f0f0f0" }}>
            <div className="flex-1 rounded-full px-4 py-2 text-[11px] flex items-center gap-2 overflow-hidden" style={{ background: "#fff", color: chatInputText ? "#1a1a1a" : "#9e9e9e" }}>
              {chatInputText ? (
                <span className="truncate">{chatInputText}</span>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9e9e9e" strokeWidth="1.8" className="flex-shrink-0"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>
                  <span>Escribe un mensaje</span>
                </>
              )}
            </div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300" style={{ background: chatInputText ? "#22c55e" : "#075e54" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 18.5a1.5 1.5 0 01-1.5-1.5V7a1.5 1.5 0 013 0v10a1.5 1.5 0 01-1.5 1.5z" fill="white"/>
                <path d="M19 11a7 7 0 01-14 0" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 22v-3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* Home indicator */}
          <div className="flex justify-center py-2" style={{ background: "#f0f0f0" }}>
            <div className="rounded-full" style={{ width: 80, height: 3, background: "rgba(0,0,0,0.15)" }} />
          </div>

          {/* Modal overlay */}
          {flowOpen && (
            <>
              <div className="absolute inset-0 z-40" style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(1px)" }} />
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute bottom-0 left-0 right-0 z-50 flex flex-col overflow-hidden"
                style={{ background: "#f8fafc", borderRadius: "20px 20px 0 0", top: "auto", height: "85%", boxShadow: "0 -10px 40px rgba(0,0,0,0.45), 0 -2px 8px rgba(0,0,0,0.25)" }}
              >
                {/* Modal header */}
                <div className="flex items-center justify-between px-4 py-3 border-b flex-shrink-0" style={{ background: "#fff", borderColor: "#e2e8f0" }}>
                  <div className="p-1.5 rounded-full" style={{ background: "#f1f5f9" }}>
                    {flowStep === 1
                      ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      : <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M12 19l-7-7 7-7" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    }
                  </div>
                  <span className="text-[12px] font-black text-slate-800 tracking-tight flex items-center gap-1.5">
                    {flowStep === 1
                      ? <><Utensils size={13} strokeWidth={2.5} className="text-slate-600" /> Elige tus platos</>
                      : <><Package size={13} strokeWidth={2.5} className="text-slate-600" /> Completa tu pedido</>
                    }
                  </span>
                  <div className="flex gap-1">
                    {[1,2].map(s => <div key={s} className="w-2 h-2 rounded-full" style={{ background: s <= flowStep ? "#22c55e" : "#e2e8f0" }} />)}
                  </div>
                </div>

                {/* Step 1 — Menu items */}
                {flowStep === 1 && (
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex-1 overflow-y-auto p-3 space-y-2">
                      {MENU_ITEMS.map(item => {
                        const sel = selectedItems.includes(item.id);
                        return (
                          <div key={item.id} className="rounded-2xl border transition-all" style={{ background: "#fff", borderColor: sel ? "#22c55e" : "#e2e8f0", boxShadow: sel ? "0 0 0 1px rgba(34,197,94,0.2)" : "none" }}>
                            <div className="flex items-start p-3 gap-3">
                              <div className="flex-1">
                                <p className="text-[12px] font-bold transition-colors" style={{ color: sel ? "#16a34a" : "#0f172a" }}>{item.name}</p>
                                <p className="text-[10px] text-slate-400 mt-0.5">{item.desc}</p>
                                <p className="text-[11px] font-black text-slate-700 mt-1">S/ {item.price.toFixed(2)}</p>
                              </div>
                              {/* Custom checkbox visual */}
                              <div className="w-4 h-4 mt-0.5 rounded flex-shrink-0 border-2 flex items-center justify-center transition-all" style={{ borderColor: sel ? "#22c55e" : "#cbd5e1", background: sel ? "#22c55e" : "transparent" }}>
                                {sel && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                              </div>
                            </div>
                            {sel && (
                              <div className="px-3 pb-3 pt-1 border-t" style={{ borderColor: "#f1f5f9" }}>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Acompañamiento:</p>
                                <div className="flex flex-wrap gap-1.5">
                                  {GUARNICIONES.map(g => (
                                    <div key={g} className="px-2 py-1 rounded-full text-[10px] font-bold transition-all" style={{ background: guarniciones[item.id] === g ? "#22c55e" : "#f1f5f9", color: guarniciones[item.id] === g ? "#fff" : "#475569" }}>
                                      {g}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex-shrink-0 p-3 border-t" style={{ background: "#fff", borderColor: "#e2e8f0" }}>
                      <div className="w-full py-3 rounded-2xl text-[12px] font-black tracking-wide text-center transition-all" style={{ background: selectedItems.length > 0 ? "#22c55e" : "#e2e8f0", color: selectedItems.length > 0 ? "#fff" : "#94a3b8", boxShadow: selectedItems.length > 0 ? "0 4px 16px rgba(34,197,94,0.3)" : "none" }}>
                        Continuar · S/ {total.toFixed(2)}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2 — Delivery & payment */}
                {flowStep === 2 && (
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex-1 overflow-y-auto p-3 space-y-3">
                      {/* Entrega */}
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Método de entrega</p>
                        <div className="flex gap-2">
                          <div className="flex-1 py-3 rounded-2xl border-2 flex flex-col items-center gap-1 text-[11px] font-black" style={{ borderColor: "#22c55e", background: "rgba(34,197,94,0.08)", color: "#16a34a" }}>
                            <Bike size={16} strokeWidth={2} /> Delivery
                          </div>
                          <div className="flex-1 py-3 rounded-2xl border-2 flex flex-col items-center gap-1 text-[11px] font-black" style={{ borderColor: "#e2e8f0", background: "#fff", color: "#94a3b8" }}>
                            <Store size={16} strokeWidth={2} /> Recojo
                          </div>
                        </div>
                      </div>
                      {/* Dirección */}
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Dirección de entrega</p>
                        <div className="relative">
                          <MapPin size={13} strokeWidth={2} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <div className="w-full pl-9 pr-4 py-3 rounded-2xl text-[12px] font-medium flex items-center" style={{ background: "#fff", border: address ? "1.5px solid #22c55e" : "1px solid #e2e8f0", color: address ? "#0f172a" : "#94a3b8", minHeight: 44 }}>
                            <span>{address || "Calle, número, referencia..."}</span>
                            {address && <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} className="ml-px inline-block w-px h-[13px] bg-slate-700 flex-shrink-0" />}
                          </div>
                        </div>
                      </div>
                      {/* Nombre */}
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Tu nombre</p>
                        <div className="w-full px-4 py-3 rounded-2xl text-[12px] font-medium flex items-center" style={{ background: "#fff", border: name ? "1.5px solid #22c55e" : "1px solid #e2e8f0", color: name ? "#0f172a" : "#94a3b8", minHeight: 44 }}>
                          <span>{name || "¿A nombre de quién?"}</span>
                          {name && <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} className="ml-px inline-block w-px h-[13px] bg-slate-700 flex-shrink-0" />}
                        </div>
                      </div>
                      {/* Pago */}
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Método de pago</p>
                        <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "#e2e8f0" }}>
                          <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ background: "#fff", borderColor: "#f1f5f9" }}>
                            <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0" style={{ borderColor: "#22c55e" }}>
                              <div className="w-2 h-2 rounded-full bg-[#22c55e]" />
                            </div>
                            <Banknote size={14} strokeWidth={2} className="text-slate-500 flex-shrink-0" />
                            <span className="text-[11px] font-bold text-slate-700">Efectivo contra entrega</span>
                          </div>
                          <div className="flex items-center gap-3 px-4 py-3" style={{ background: "#fff" }}>
                            <div className="w-4 h-4 rounded-full border-2 flex-shrink-0" style={{ borderColor: "#cbd5e1" }} />
                            <Smartphone size={14} strokeWidth={2} className="text-slate-500 flex-shrink-0" />
                            <span className="text-[11px] font-bold text-slate-700">Yape / Plin</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 p-3 border-t" style={{ background: "#fff", borderColor: "#e2e8f0" }}>
                      <div className="w-full py-3 rounded-2xl text-[12px] font-black tracking-wide flex items-center justify-center gap-2 transition-all" style={{ background: name ? "#075e54" : "#e2e8f0", color: name ? "#fff" : "#94a3b8", boxShadow: name ? "0 4px 16px rgba(7,94,84,0.3)" : "none" }}>
                        <CheckCircle size={14} strokeWidth={2.5} />
                        Confirmar Pedido
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </div>
      </div>

      {/* Badges flotantes */}
      <motion.div initial={{ opacity: 0, x: 20, scale: 0.85 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ delay: 1.0, duration: 0.45 }} className="absolute -right-5 top-[42%] z-20">
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-2xl" style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "0 8px 32px rgba(0,0,0,0.25)" }}>
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0" style={{ background: "linear-gradient(135deg, rgba(34,197,94,0.2), rgba(6,182,212,0.15))" }}>🛵</div>
          <div>
            <p className="text-[11px] font-display font-bold text-[var(--text-primary)] leading-none mb-0.5">Pedido #284</p>
            <p className="text-[10px] font-body" style={{ color: "var(--green)" }}>En camino · 8 min</p>
          </div>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: -20, scale: 0.85 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ delay: 1.4, duration: 0.45 }} className="absolute -left-5 top-[22%] z-20">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>
          <span className="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ background: "var(--green)" }} />
          <p className="text-[10px] font-body text-[var(--text-secondary)] whitespace-nowrap">3 pedidos nuevos</p>
        </div>
      </motion.div>
    </div>
  );
}

export function Hero({ onOpenModal }: { onOpenModal: (e?: React.MouseEvent) => void }) {
  // ── FIX 4: estado para desactivar 3D cuando el flow está abierto
  const [flowActive, setFlowActive] = useState(false);

  return (
    <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28 min-h-screen flex items-center">
      <MeshBackground />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Columna izquierda */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <Badge variant="green" className="mb-7 w-fit mx-auto md:mx-0">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0" style={{ background: "var(--green)" }} />
                Automatización para restaurantes
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="font-display font-bold text-[var(--text-primary)] leading-[1.06] tracking-tight mb-6"
              style={{ fontSize: "clamp(2.6rem, 5.5vw, 4rem)" }}
            >
              Tu restaurante,{" "}
              <span className="font-display font-bold" style={{ WebkitTextStroke: "2px var(--green)", WebkitTextFillColor: "transparent", color: "transparent" }}>
                sin caos
              </span>
              <br />
              en WhatsApp
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-base font-body text-[var(--text-secondary)] leading-relaxed mb-9 max-w-md"
            >
              GenViaYA convierte tu WhatsApp en un sistema de pedidos, CRM y logística. Tus clientes piden como siempre.{" "}
              <span className="text-[var(--text-primary)] font-medium">Tú ganas control total.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.48 }}
              className="flex flex-wrap gap-3 mb-10 justify-center md:justify-start"
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
              <a href="#como-funciona" id="cta-hero-ver" data-event="hero_ver_click" className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-body font-medium text-sm transition-all duration-200 hover:opacity-80" style={{ border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text-secondary)" }}>
                <Play size={13} />
                Ver cómo funciona
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex items-center gap-3 justify-center md:justify-start"
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
            </motion.div>
          </div>

          {/* Columna derecha — FIX 4: sin 3D hover cuando flow abierto */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotateY: -8 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative flex justify-center items-center"
            style={{ perspective: "1000px" }}
          >
            <motion.div>
              <PhoneMockup onFlowChange={setFlowActive} />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}