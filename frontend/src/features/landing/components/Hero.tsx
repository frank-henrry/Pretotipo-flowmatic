import React from 'react';
import { Rocket, ShoppingBag, UtensilsCrossed } from 'lucide-react';

interface HeroProps {
  onOpenFakeDoor: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenFakeDoor }) => {
  return (
    <div className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
      <div className="absolute top-0 left-1/4 w-72 h-72 lg:w-96 lg:h-96 bg-emerald-500/10 rounded-full blur-[80px] lg:blur-[120px]"></div>
      
      <div className="w-full lg:w-3/5 text-center lg:text-left z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold text-xs lg:text-sm mb-6 border border-emerald-500/20 animate-fade-in">
          <Rocket size={16} />
          <span>Automatización Inteligente v2.0</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.1] mb-6 tracking-tight">
          Vende más por <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 drop-shadow-sm">
            WhatsApp Flows
          </span>
        </h1>
        
        <p className="text-lg lg:text-xl text-slate-400 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
          Convierte tu chat en una máquina de ventas. Sin descargar apps, sin comisiones de terceros y con total control de tu negocio.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <button 
            onClick={onOpenFakeDoor}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-3 group"
          >
            <UtensilsCrossed size={24} className="group-hover:rotate-12 transition-transform" /> 
            Empezar Ahora
          </button>
          
          <button className="bg-slate-800/50 hover:bg-slate-800 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all border border-slate-700/50 flex items-center justify-center gap-3">
            Ver Demo
          </button>
        </div>
      </div>
      
      {/* Mockup Placeholder (Will be replaced by the real WhatsAppMockup in App.tsx) */}
      <div className="w-full lg:w-2/5 hidden lg:block h-[600px]"></div>
    </div>
  );
};
