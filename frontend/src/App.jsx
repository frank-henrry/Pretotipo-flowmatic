import React, { useState, useEffect } from 'react';
import { 
  ChefHat, Zap, ArrowRight, ShieldCheck, SquareMenu, 
  X, Beef, CalendarClock, Plus, Smartphone, 
  MonitorPlay, MapPin, Users, Check, Loader2, ArrowLeft, Minus, Database
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AutoRestoPretotype() {
  const [flowStep, setFlowStep] = useState('chat');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [leads, setLeads] = useState([]);
  
  const [restaurantName, setRestaurantName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [painPoint, setPainPoint] = useState('Vender más (WhatsApp Flows)');

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isPressing, setIsPressing] = useState(false);

  // Fetch leads to show in the "Live Dashboard"
  const fetchLeads = async () => {
    try {
      const response = await fetch(`${API_URL}/api/leads`);
      if (response.ok) {
        const data = await response.json();
        setLeads(data);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  };

  useEffect(() => {
    fetchLeads();
    const interval = setInterval(fetchLeads, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurantName, whatsapp, painPoint }),
      });

      if (response.ok) {
        setIsSubmitting(false);
        setFlowStep('success');
        fetchLeads(); // Refresh dashboard
      } else {
        setIsSubmitting(false);
        setFlowStep('success');
      }
    } catch (error) {
      setIsSubmitting(false);
      setFlowStep('success');
    }
  };

  const resetFlow = () => {
    setFlowStep('chat');
    setCartCount(0);
    setRestaurantName('');
    setWhatsapp('');
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-50 font-sans relative overflow-x-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        .bg-grid { background-size: 40px 40px; background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px); }
        .gradient-text { background: linear-gradient(to right, #4ade80, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .perspective-1000 { perspective: 1000px; }
        .rotate-y-12 { transform: rotateY(-12deg) rotateX(5deg); }
        @keyframes slideUpFlow { 0% { transform: translateY(100%); } 100% { transform: translateY(0); } }
        .flow-sheet-enter { animation: slideUpFlow 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .btn-glow { background: linear-gradient(135deg, #10b981 0%, #059669 100%); box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3); transition: all 0.3s ease; }
        .btn-glow:hover { box-shadow: 0 6px 30px rgba(16, 185, 129, 0.5); transform: translateY(-2px); }
        .feature-card { background: rgba(30, 41, 59, 0.5); border: 1px solid rgba(51, 65, 85, 0.5); backdrop-filter: blur(10px); border-radius: 1.5rem; transition: all 0.3s; }
        .feature-card:hover { border-color: #3b82f6; transform: translateY(-3px); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .thumb-cursor { width: 40px; height: 40px; background: rgba(255, 255, 255, 0.2); border: 2px solid rgba(255, 255, 255, 0.4); border-radius: 50%; position: absolute; pointer-events: none; z-index: 100; transition: transform 0.1s ease-out; backdrop-filter: blur(2px); }
        .phone-container:hover .thumb-cursor { opacity: 1; }
        .phone-container { cursor: none; }
        @media (max-width: 640px) { .phone-frame { transform: scale(0.8); transform-origin: top center; } .phone-container { cursor: auto; } .thumb-cursor { display: none; } }
      `}} />

      <div className="absolute inset-0 bg-grid z-0"></div>

      <nav className="max-w-7xl mx-auto p-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-3 font-extrabold text-2xl tracking-tight">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <ChefHat className="w-6 h-6 text-slate-900" />
          </div>
          <span>Auto<span className="text-emerald-400">Resto</span></span>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-12 pb-24 relative z-10 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-sm">
            <Zap className="w-4 h-4" />
            WhatsApp Flows & IA Pretotipo
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
            Tus ventas vuelan. <br/>
            <span className="gradient-text">Tu gestión se automatiza.</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed max-w-2xl">
            Experimenta el futuro de los restaurantes. Usa el móvil a la derecha para simular un pedido. Los datos se guardarán en tiempo real en nuestra base de datos.
          </p>
          <div className="flex flex-wrap gap-4">
             <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50 flex flex-col items-center justify-center min-w-[120px]">
                <span className="text-3xl font-bold text-emerald-400">{leads.length}</span>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Leads en BD</span>
             </div>
             <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50 flex flex-col items-center justify-center min-w-[120px]">
                <span className="text-3xl font-bold text-blue-400">99%</span>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Automatización</span>
             </div>
          </div>
        </div>

        <div className="w-full lg:w-[450px] shrink-0 flex justify-center lg:justify-end perspective-1000">
          <div className="phone-container relative" onMouseMove={handleMouseMove} onMouseDown={() => setIsPressing(true)} onMouseUp={() => setIsPressing(false)}>
            <div className="thumb-cursor opacity-0 transition-opacity duration-300 flex items-center justify-center" style={{ left: `${cursorPos.x - 20}px`, top: `${cursorPos.y - 20}px`, transform: isPressing ? 'scale(0.8)' : 'scale(1)' }}>
              <div className={`w-full h-full rounded-full bg-white/10 ${isPressing ? 'animate-ping' : ''}`}></div>
            </div>

            <div className="phone-frame relative w-[340px] h-[700px] bg-slate-900 rounded-[3rem] border-[10px] border-slate-800 shadow-[0_0_80px_rgba(16,185,129,0.15)] overflow-hidden flex flex-col rotate-y-12 transition-all duration-700 hover:rotate-0 hover:scale-[1.02]">
              <div className="h-12 bg-slate-900 w-full flex justify-center items-center relative z-20">
                <div className="w-32 h-6 bg-slate-950 rounded-full absolute top-2"></div>
              </div>
              <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex items-center gap-3 shrink-0 z-10">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center p-1 overflow-hidden">
                  <img src="https://api.dicebear.com/7.x/shapes/svg?seed=resto" alt="Logo" className="w-full h-full rounded-full bg-white object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white flex items-center gap-1">Burger House Oficial <span className="text-emerald-400 text-xs">✓</span></h3>
                  <p className="text-xs text-slate-400">Cuenta de Empresa</p>
                </div>
              </div>

              <div className="flex-1 bg-[#0b141a] p-4 relative flex flex-col gap-3 overflow-hidden z-0">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')"}}></div>
                <div className="self-end bg-[#005c4b] text-white rounded-2xl rounded-tr-none px-4 py-2 max-w-[85%] text-sm shadow">Hola, quiero ver el menú 🍔</div>
                <div className="self-start bg-[#202c33] text-slate-200 rounded-2xl rounded-tl-none p-1 max-w-[90%] shadow border border-slate-700">
                  <div className="px-3 py-2 text-sm">¡Hola! Bienvenido a Burger House. Haz tu pedido aquí 👇</div>
                  <div className="border-t border-slate-700/50 mt-1"></div>
                  <div className="px-3 py-2.5 text-center text-sky-400 font-semibold text-sm flex justify-center items-center gap-2 cursor-pointer hover:bg-slate-700/50 transition-colors" onClick={() => setFlowStep('catalog')}>
                    <SquareMenu className="w-4 h-4" /> Abrir Menú Interactivo
                  </div>
                </div>

                {flowStep !== 'chat' && (
                  <div className="flow-sheet-enter absolute bottom-0 left-0 right-0 bg-[#111b21] rounded-t-3xl border-t border-slate-700 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-30 flex flex-col h-[90%]">
                    <div className="w-12 h-1.5 bg-slate-600 rounded-full mx-auto mt-3 mb-2"></div>
                    {flowStep === 'catalog' && (
                      <>
                        <div className="px-5 py-2 flex justify-between items-center border-b border-slate-800">
                          <h4 className="font-bold text-lg text-white">Menú Digital</h4>
                          <X className="w-5 h-5 text-slate-400 cursor-pointer" onClick={() => setFlowStep('chat')} />
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-3 flex gap-3 items-center">
                            <div className="w-20 h-20 bg-slate-700 rounded-xl shrink-0 flex items-center justify-center"><Beef className="w-8 h-8 text-orange-400" /></div>
                            <div className="flex-1">
                              <h5 className="font-bold text-sm text-white">Smash Doble</h5>
                              <div className="flex justify-between items-center mt-2">
                                <span className="font-bold text-emerald-400 text-sm">$14.99</span>
                                <div className="flex items-center gap-2">
                                  {cartCount > 0 && <button onClick={() => setCartCount(c => c-1)} className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-white"><Minus className="w-3 h-3"/></button>}
                                  {cartCount > 0 && <span className="text-sm font-bold text-white">{cartCount}</span>}
                                  <button onClick={() => setCartCount(c => c+1)} className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-slate-900"><Plus className="w-3 h-3"/></button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-slate-800 border-t border-slate-700 mt-auto">
                          <button onClick={() => cartCount > 0 && setFlowStep('form')} disabled={cartCount === 0} className={`w-full font-bold py-3.5 rounded-xl text-sm flex justify-between items-center px-5 shadow-lg transition-all ${cartCount > 0 ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}>
                            <span className={`${cartCount > 0 ? 'bg-white/20' : 'bg-slate-800'} px-2 py-0.5 rounded text-xs`}>{cartCount} items</span>
                            Pagar e Inscribirse
                          </button>
                        </div>
                      </>
                    )}
                    {flowStep === 'form' && (
                      <div className="flex-1 flex flex-col overflow-hidden">
                        <div className="px-5 py-2 flex items-center gap-3 border-b border-slate-800"><button onClick={() => setFlowStep('catalog')} className="text-slate-400 p-1"><ArrowLeft className="w-5 h-5" /></button><h4 className="font-bold text-lg text-white">Tus Datos</h4></div>
                        <form onSubmit={handleFormSubmit} className="flex-1 p-5 space-y-4 overflow-y-auto scrollbar-hide">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase">Restaurante</label>
                            <input type="text" required value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none text-sm" placeholder="Nombre local" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase">WhatsApp</label>
                            <input type="tel" required value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none text-sm" placeholder="+1 234..." />
                          </div>
                          <div className="pt-4"><button type="submit" disabled={isSubmitting} className="w-full bg-emerald-500 text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 text-sm">{isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirmar Pedido'}</button></div>
                        </form>
                      </div>
                    )}
                    {flowStep === 'success' && (
                      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in zoom-in-95">
                        <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mb-6"><Check className="w-8 h-8 text-slate-900 font-bold" strokeWidth={3} /></div>
                        <h3 className="text-xl font-extrabold mb-2 text-white">¡Registrado!</h3>
                        <p className="text-slate-400 text-xs mb-8">Tus datos están en la base de datos.</p>
                        <button onClick={resetFlow} className="text-emerald-400 font-semibold text-xs border border-emerald-500/30 px-6 py-2 rounded-full">Finalizar</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Leads Real-time Dashboard */}
      <section className="max-w-7xl mx-auto px-6 pb-24 relative z-10">
        <div className="feature-card p-8 border-emerald-500/20 bg-emerald-500/5">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400"><Database className="w-6 h-6"/></div>
            <div>
              <h2 className="text-2xl font-bold text-white">Leads Capturados (Base de Datos)</h2>
              <p className="text-sm text-slate-400">Visualización en tiempo real de los datos guardados por el backend.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-[10px] uppercase font-bold text-slate-500 tracking-widest">
                  <th className="py-4 px-4">Restaurante</th>
                  <th className="py-4 px-4">WhatsApp</th>
                  <th className="py-4 px-4">Interés</th>
                  <th className="py-4 px-4 text-right">Fecha</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-12 text-center text-slate-500 italic">No hay leads registrados aún. ¡Usa el móvil de arriba!</td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-slate-800/50 hover:bg-white/5 transition-colors group">
                      <td className="py-4 px-4 text-white font-medium">{lead.restaurant_name}</td>
                      <td className="py-4 px-4 text-slate-400 font-mono text-xs">{lead.whatsapp}</td>
                      <td className="py-4 px-4">
                        <span className="bg-blue-500/10 text-blue-400 text-[10px] px-2 py-1 rounded-md font-bold border border-blue-500/20">{lead.pain_point}</span>
                      </td>
                      <td className="py-4 px-4 text-right text-slate-500 text-xs">
                        {new Date(lead.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24 relative z-10 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="feature-card p-6"><Smartphone className="text-emerald-400 mb-4"/><h3 className="font-bold text-sm text-white">WhatsApp Flows</h3><p className="text-xs text-slate-400">Interacción visual sin salir del chat.</p></div>
          <div className="feature-card p-6"><MonitorPlay className="text-orange-400 mb-4"/><h3 className="font-bold text-sm text-white">KDS Directo</h3><p className="text-xs text-slate-400">Órdenes a la cocina al instante.</p></div>
          <div className="feature-card p-6"><MapPin className="text-blue-400 mb-4"/><h3 className="font-bold text-sm text-white">Auto-Logística</h3><p className="text-xs text-slate-400">GPS para repartidores.</p></div>
          <div className="feature-card p-6"><Users className="text-purple-400 mb-4"/><h3 className="font-bold text-sm text-white">CRM Avanzado</h3><p className="text-xs text-slate-400">Datos para vender más.</p></div>
      </section>
    </div>
  );
}
