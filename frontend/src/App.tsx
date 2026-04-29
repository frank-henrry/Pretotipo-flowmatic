import React, { useState } from 'react';
import { Hero } from './features/landing/components/Hero';
import { FeatureGrid } from './features/landing/components/FeatureGrid';
import { WhatsAppMockup } from './features/simulator/components/WhatsAppMockup';
import { FlowOverlay } from './features/simulator/components/FlowOverlay';
import { FakeDoorModal } from './features/pretotype/FakeDoorModal';
import { ShoppingBag, Smartphone } from 'lucide-react';

export default function App() {
  const [isFakeDoorOpen, setIsFakeDoorOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white font-sans selection:bg-emerald-500/30">
      
      {/* Navbar (Mini) */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-slate-950/20 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-black text-slate-900">F</div>
            <span className="font-black text-xl tracking-tighter uppercase">FoodFlow</span>
          </div>
          <button 
            onClick={() => setIsFakeDoorOpen(true)}
            className="hidden sm:flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-xl font-bold text-sm hover:bg-emerald-400 transition-colors"
          >
            <Smartphone size={16} /> Probar ahora
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16">
        <Hero onOpenFakeDoor={() => setIsFakeDoorOpen(true)} />
        
        {/* Simulator Integration for Desktop */}
        <div className="hidden lg:block absolute top-[15%] right-[8%] z-20 pointer-events-auto">
          <div className="relative group">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <WhatsAppMockup />
            <FlowOverlay />
          </div>
        </div>
      </section>

      {/* Simulator Section for Mobile/Tablet */}
      <section className="lg:hidden py-12 bg-slate-900/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center mb-10">
          <h2 className="text-3xl font-black mb-3">Pruébalo tú mismo</h2>
          <p className="text-slate-400 font-medium">Interactúa con el simulador de WhatsApp de abajo</p>
        </div>
        <div className="relative max-w-sm mx-auto px-4">
          <WhatsAppMockup />
          <FlowOverlay />
        </div>
      </section>

      {/* Features Grid */}
      <section id="features">
        <FeatureGrid />
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#0f172a] to-slate-950 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/5 rounded-full blur-[120px]"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl lg:text-6xl font-black mb-8 leading-tight">¿Listo para llevar tu restaurante al siguiente nivel?</h2>
          <p className="text-xl text-slate-400 mb-12 font-medium">Únete a cientos de dueños que ya están automatizando sus pedidos.</p>
          <button 
            onClick={() => setIsFakeDoorOpen(true)}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-10 py-5 rounded-[2rem] font-black text-xl transition-all shadow-xl shadow-emerald-500/20 active:scale-95"
          >
            Solicitar Acceso Gratuito
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/5 text-center bg-slate-950">
        <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">© 2026 FoodFlow Technologies. Made with ❤️ for Restaurants.</p>
      </footer>

      {/* Global Modals */}
      <FakeDoorModal 
        isOpen={isFakeDoorOpen} 
        onClose={() => setIsFakeDoorOpen(false)} 
      />
    </div>
  );
}
