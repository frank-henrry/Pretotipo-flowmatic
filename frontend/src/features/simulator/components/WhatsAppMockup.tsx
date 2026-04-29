import React, { useRef, useEffect } from 'react';
import { ChevronLeft, ShoppingBag } from 'lucide-react';
import { useSimulatorStore } from '../../../store/useSimulatorStore';

export const WhatsAppMockup: React.FC = () => {
  const { chatMessages, isFlowOpen, setIsFlowOpen } = useSimulatorStore();
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  return (
    <div className="w-[320px] sm:w-[360px] h-[640px] sm:h-[720px] bg-[#0f172a] rounded-[3rem] shadow-[0_0_80px_rgba(16,185,129,0.15)] relative overflow-hidden border-[8px] sm:border-[12px] border-slate-800 flex flex-col mx-auto scale-90 sm:scale-100 transition-transform">
      {/* Notch */}
      <div className="absolute top-0 inset-x-0 h-6 bg-slate-800 rounded-b-3xl w-32 sm:w-40 mx-auto z-20 flex justify-center items-center">
        <div className="w-12 sm:w-16 h-2 sm:h-3 bg-black rounded-full"></div>
      </div>
      
      {/* Header */}
      <div className="bg-[#075e54] text-white p-3 pt-8 flex items-center gap-3 shrink-0 relative z-10 shadow-lg">
        <ChevronLeft size={24} />
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shrink-0 shadow-inner">
          🍽️
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="font-bold text-sm truncate tracking-tight">FoodFlow Demo</h1>
          <p className="text-[10px] text-emerald-100/80 font-medium">En línea ahora</p>
        </div>
      </div>

      {/* Chat Body */}
      <div 
        className="flex-1 overflow-y-auto bg-[#e5ddd5] p-4 space-y-4 relative" 
        style={{
          backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
          backgroundSize: '400px',
          opacity: 0.95
        }}
      >
        {chatMessages.map(m => (
          <div key={m.id} className={`flex ${m.sender === 'customer' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            <div className={`max-w-[85%] p-2.5 rounded-2xl text-[13.5px] sm:text-[14.5px] shadow-sm relative leading-snug ${
              m.sender === 'customer' 
                ? 'bg-[#dcf8c6] text-slate-800 rounded-tr-none' 
                : 'bg-white text-slate-800 rounded-tl-none'
            }`}>
              <div className="whitespace-pre-wrap">{m.text}</div>
              
              {m.hasFlowButton && !isFlowOpen && (
                <button 
                  onClick={() => setIsFlowOpen(true)}
                  className="w-full mt-3 py-2.5 text-[#075e54] font-extrabold border-t border-slate-100 flex items-center justify-center gap-2 hover:bg-slate-50/50 rounded-xl transition-colors active:scale-95"
                >
                  <ShoppingBag size={18} /> 
                  Ver Menú y Pedir
                </button>
              )}
              
              <div className="flex items-center justify-end gap-1 mt-1">
                <span className="text-[9px] text-slate-400 font-medium">{m.time}</span>
                {m.sender === 'customer' && <span className="text-[9px] text-blue-400 font-bold">✓✓</span>}
              </div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
    </div>
  );
};
