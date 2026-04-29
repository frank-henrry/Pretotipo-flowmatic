import React, { useState, useEffect } from 'react';
import {
  WhatsAppMockup
} from './features/simulator/components/WhatsAppMockup';
import { FlowOverlay } from './features/simulator/components/FlowOverlay';
import { FakeDoorModal } from './features/pretotype/FakeDoorModal';
import { AdminPanel, AdminLogin } from './features/admin/AdminPanel';
import {
  Rocket, ArrowRight, ChevronRight,
  Smartphone, BarChart3, Truck, Users,
  CheckCircle, Star, Zap, Shield, Clock
} from 'lucide-react';

// ── DATA ──────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Smartphone,
    color: 'emerald',
    badge: 'Core',
    title: 'Pedidos por WhatsApp',
    desc: 'Menú interactivo nativo en el chat. El cliente personaliza y confirma sin salir de WhatsApp.',
  },
  {
    icon: BarChart3,
    color: 'violet',
    badge: 'CRM',
    title: 'Panel y Visor de Chats',
    desc: 'Historial de compras por cliente y transcripción exacta de cada conversación automatizada.',
  },
  {
    icon: Truck,
    color: 'sky',
    badge: 'Logística',
    title: 'Despacho Inteligente',
    desc: 'Asigna repartidores, cambia estados de pedido y controla entregas en tiempo real.',
  },
  {
    icon: Users,
    color: 'orange',
    badge: 'Local',
    title: 'Gestión de Mesas y Reservas',
    desc: 'Administra la capacidad de tu local y reservas desde un solo panel centralizado.',
  },
];

const STATS = [
  { value: '3×', label: 'más pedidos/hora' },
  { value: '0%', label: 'comisión de delivery' },
  { value: '< 2min', label: 'tiempo de respuesta' },
  { value: '24/7', label: 'atención automática' },
];

const TESTIMONIALS = [
  {
    name: 'Carlos R.',
    role: 'Dueño · La Brasa Dorada',
    text: 'Antes perdía pedidos por llamadas perdidas. Ahora todo llega por WhatsApp y yo solo cocino.',
    stars: 5,
  },
  {
    name: 'Milagros T.',
    role: 'Administradora · Pizza Hermanos',
    text: 'El sistema gestiona 40 pedidos diarios sin que yo tenga que estar pendiente del teléfono.',
    stars: 5,
  },
  {
    name: 'Jorge P.',
    role: 'Chef · Cevichería El Muelle',
    text: 'Los pedidos llegan directo a cocina. Cero errores de comunicación entre sala y cocina.',
    stars: 5,
  },
];

const COLOR_MAP: Record<string, string> = {
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  violet: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  sky: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
};

const ICON_BG: Record<string, string> = {
  emerald: 'bg-emerald-500/15 text-emerald-400',
  violet: 'bg-violet-500/15 text-violet-400',
  sky: 'bg-sky-500/15 text-sky-400',
  orange: 'bg-orange-500/15 text-orange-400',
};

// ── COMPONENTS ────────────────────────────────────────────────────────────

function Navbar({ onCTA }: { onCTA: () => void }) {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 h-14 flex items-center px-4 sm:px-6 lg:px-8 border-b border-white/5 bg-[#080c14]/80 backdrop-blur-lg">
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-slate-900 font-black text-sm">F</div>
          <span className="font-extrabold text-base tracking-tight">FoodFlow</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-slate-400 font-medium">
          <a href="#features" className="hover:text-white transition-colors">Funciones</a>
          <a href="#testimonials" className="hover:text-white transition-colors">Testimonios</a>
          <a href="#pricing" className="hover:text-white transition-colors">Precios</a>
        </div>
        <button
          onClick={onCTA}
          className="bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-900 font-bold text-sm px-4 py-2 rounded-xl transition-all flex items-center gap-1.5"
        >
          Empezar gratis <ArrowRight size={14} />
        </button>
      </div>
    </nav>
  );
}

function HeroSection({ onCTA }: { onCTA: () => void }) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: 'calc(100vh - 56px)', paddingTop: '56px' }}
    >
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-emerald-500/8 rounded-full blur-[100px]" />
      <div className="pointer-events-none absolute top-20 right-0 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[80px]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 w-full py-8 lg:py-0">

          {/* LEFT: copy */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-emerald-400 font-semibold text-xs mb-5">
              <Rocket size={12} />
              WhatsApp Business Automation · v2.0
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight mb-4">
              Tu restaurante<br />
              vende solo por<br />
              <span className="text-gradient">WhatsApp</span>
            </h1>

            <p className="text-slate-400 text-sm lg:text-base leading-relaxed mb-6 max-w-md mx-auto lg:mx-0">
              Pedidos, delivery, cocina y CRM en un solo sistema automatizado. Sin comisiones. Sin apps extra.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
              <button
                onClick={onCTA}
                className="bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-900 font-bold px-6 py-3 rounded-2xl transition-all glow-emerald flex items-center justify-center gap-2 text-sm"
              >
                <Zap size={16} /> Solicitar acceso gratuito
              </button>
              <a
                href="#features"
                className="glass hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-2xl transition-all flex items-center justify-center gap-2 text-sm"
              >
                Ver funciones <ChevronRight size={15} />
              </a>
            </div>

            {/* Mini trust */}
            <div className="flex items-center gap-4 justify-center lg:justify-start text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><CheckCircle size={12} className="text-emerald-500" /> Sin tarjeta</span>
              <span className="flex items-center gap-1.5"><CheckCircle size={12} className="text-emerald-500" /> Setup en 24h</span>
              <span className="flex items-center gap-1.5"><Shield size={12} className="text-emerald-500" /> Datos seguros</span>
            </div>
          </div>

          {/* RIGHT: phone mockup — scaled to fit viewport height */}
          <div id="simulator" className="relative flex-shrink-0 hidden lg:block">
            {/* Glow halo */}
            <div className="absolute inset-0 scale-110 bg-emerald-500/10 rounded-[3rem] blur-3xl pointer-events-none" />
            {/* Scale wrapper keeps phone visually smaller so it fits in viewport */}
            <div className="relative" style={{ transform: 'scale(0.78)', transformOrigin: 'top center' }}>
              <WhatsAppMockup />
              <FlowOverlay />
            </div>
            {/* Floating badge — offset to match scaled phone */}
            <div className="absolute bottom-20 -left-2 glass px-3 py-2 rounded-xl flex items-center gap-2 text-xs font-semibold text-white shadow-xl">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              En línea · Demo en vivo
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <section className="border-y border-white/5 bg-white/2 py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-gradient mb-0.5">{s.value}</div>
              <div className="text-xs text-slate-500 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-slate-400 text-xs font-semibold mb-4">
            <Zap size={12} className="text-emerald-400" /> Módulos del sistema
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
            Todo lo que necesita<br className="hidden sm:block" /> tu restaurante
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Un ecosistema completo de automatización. Desde el pedido hasta el despacho.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="group glass-dark rounded-2xl p-6 hover:bg-slate-800/60 transition-all duration-300 cursor-default"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${ICON_BG[f.color]} shrink-0`}>
                    <Icon size={22} />
                  </div>
                  <div>
                    <div className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider mb-2 ${COLOR_MAP[f.color]}`}>
                      {f.badge}
                    </div>
                    <h3 className="font-bold text-base text-white mb-1.5">{f.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


function CtaSection({ onCTA }: { onCTA: () => void }) {
  return (
    <section id="pricing" className="py-16 lg:py-24 border-t border-white/5">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-amber-400 text-xs font-semibold mb-6">
          <Clock size={12} /> Lanzamiento limitado · Primeros 20 negocios
        </div>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
          Empieza gratis,<br />crece sin límites
        </h2>
        <p className="text-slate-400 text-base mb-8 leading-relaxed">
          Primer mes sin costo. Sin contrato. Sin permanencia. Cancela cuando quieras.
        </p>
        <button
          onClick={onCTA}
          className="bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-900 font-bold px-8 py-4 rounded-2xl transition-all glow-emerald text-base inline-flex items-center gap-2"
        >
          <Rocket size={18} /> Solicitar mi acceso ahora
        </button>
        <p className="text-xs text-slate-600 mt-4 flex items-center justify-center gap-4">
          <span className="flex items-center gap-1"><Shield size={12} /> Sin spam</span>
          <span className="flex items-center gap-1"><CheckCircle size={12} /> Sin tarjeta</span>
          <span className="flex items-center gap-1"><Zap size={12} /> Respuesta en 2h</span>
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 text-center">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-slate-900 font-black text-[10px]">F</div>
          <span className="font-semibold text-slate-500">FoodFlow</span>
        </div>
        <p>© 2026 FoodFlow Technologies · Todos los derechos reservados</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-slate-400 transition-colors">Privacidad</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Términos</a>
        </div>
      </div>
    </footer>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────

export default function App() {
  const [isFakeDoorOpen, setIsFakeDoorOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const isAdminRoute = window.location.pathname === '/admin';
  const openCTA = () => setIsFakeDoorOpen(true);

  // Always start at top on page load, regardless of browser scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Admin route
  if (isAdminRoute) {
    if (!isAdmin) return <AdminLogin onLogin={() => setIsAdmin(true)} />;
    return <AdminPanel onLogout={() => setIsAdmin(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#080c14] text-white selection:bg-emerald-500/30">
      <Navbar onCTA={openCTA} />
      <HeroSection onCTA={openCTA} />
      <StatsBar />
      <FeaturesSection />
      <CtaSection onCTA={openCTA} />
      <Footer />
      <FakeDoorModal isOpen={isFakeDoorOpen} onClose={() => setIsFakeDoorOpen(false)} />
    </div>
  );
}
