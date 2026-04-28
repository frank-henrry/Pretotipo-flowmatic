import React, { useState, useEffect, useRef } from 'react';
import { 
  X, ChevronLeft, Send, CheckCircle2, ArrowLeft, ShoppingBag, 
  Rocket, Star, TrendingUp, ShieldCheck, Info, UtensilsCrossed,
  Smartphone, Monitor, MapPin, Users, Store, Calendar
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const MENU_ITEMS = [
  { id: '1', name: 'Pollo a la Brasa (1/4)', desc: 'Tradicional sabor peruano con papas.', price: 20.00, customizable: true },
  { id: '2', name: 'Pizza Familiar', desc: 'Artesanal con mozzarella premium.', price: 45.00, customizable: true },
  { id: '3', name: 'Ceviche Clásico', desc: 'Pescado fresco marinado al limón.', price: 35.00, customizable: true },
  { id: '4', name: 'Hamburguesa Especial', desc: 'Doble carne, queso y tocino.', price: 25.00, customizable: true },
  { id: '5', name: 'Gaseosa 1.5L', desc: 'Inca Kola o Coca Cola.', price: 10.00, customizable: false },
  { id: '6', name: 'Tequeños x6', desc: 'Con abundante salsa de palta.', price: 12.00, customizable: false },
];

const GUARNICIONES = ['Papas Fritas', 'Ensalada Fresca', 'Arroz Blanco', 'Camote frito'];
const CREMAS = ['Ají de la casa', 'Mayonesa', 'Ketchup', 'Ocopa', 'Mostaza', 'Tártara'];

const FEATURES = [
  {
    icon: <Smartphone className="text-emerald-500" size={32} />,
    title: "WhatsApp Flows",
    desc: "Módulo de Pedidos Interactivos: Interfaz nativa donde el cliente navega el menú, personaliza y pide sin salir del chat."
  },
  {
    icon: <Monitor className="text-orange-500" size={32} />,
    title: "KDS Directo a Cocina",
    desc: "Módulo de Gestión de Local: Las órdenes aparecen instantáneamente en el monitor del chef. Cero errores de comunicación."
  },
  {
    icon: <MapPin className="text-blue-500" size={32} />,
    title: "Logística Auto-Despacho",
    desc: "Módulo de Logística (Delivery): Gestiona repartidores, cambia estados de pedido y controla entregas en tiempo real."
  },
  {
    icon: <Users className="text-purple-500" size={32} />,
    title: "CRM y Soporte",
    desc: "Módulo CRM y Visor de Chats: Panel administrativo para ver historial de compras y transcripción exacta de conversaciones."
  }
];

export default function WhatsAppFlowSimulator() {
  const [showFakeDoorModal, setShowFakeDoorModal] = useState(false);
  const [fakeDoorStep, setFakeDoorStep] = useState('form');
  const [leadContact, setLeadContact] = useState('');
  const [isFlowOpen, setIsFlowOpen] = useState(false);
  const [flowStep, setFlowStep] = useState(1);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'business', time: '18:30', text: '¡Hola! Bienvenido a *FoodFlow* 🍽️✨.\n¿Te gustaría ver nuestra carta de hoy?' },
    { id: 2, sender: 'customer', time: '18:31', text: 'Hola, sí por favor. Tengo hambre 🤤' },
    { id: 3, sender: 'business', time: '18:31', text: '¡Excelente elección! Toca el botón de abajo para ver nuestro menú interactivo y armar tu pedido.', hasFlowButton: true }
  ]);
  
  const [formData, setFormData] = useState({
    selectedItems: [],
    customizations: {}, 
    name: '',
    address: '',
    reference: '',
    paymentMethod: 'efectivo',
    deliveryMethod: 'delivery'
  });

  const chatEndRef = useRef(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleFakeDoorSubmit = async (e) => {
    e.preventDefault();
    if(leadContact.trim().length > 5) {
      try {
        await axios.post(`${API_URL}/leads`, { contact: leadContact });
        setFakeDoorStep('success');
      } catch (error) {
        setFakeDoorStep('success');
      }
    }
  };

  const handleOpenFlow = () => {
    setIsFlowOpen(true);
    setFlowStep(1);
    setFormData({ selectedItems: [], customizations: {}, name: '', address: '', reference: '', paymentMethod: 'efectivo', deliveryMethod: 'delivery' });
  };

  const handleCloseFlow = () => setIsFlowOpen(false);

  const handleItemToggle = (itemId) => {
    setFormData(prev => {
      const isSelected = prev.selectedItems.includes(itemId);
      let newSelected = isSelected ? prev.selectedItems.filter(id => id !== itemId) : [...prev.selectedItems, itemId];
      let newCustomizations = { ...prev.customizations };
      if (isSelected) {
        delete newCustomizations[itemId];
      } else {
        const item = MENU_ITEMS.find(i => i.id === itemId);
        if (item.customizable) {
          newCustomizations[itemId] = { guarnicion: 'Papas Fritas', cremas: [] };
        }
      }
      return { ...prev, selectedItems: newSelected, customizations: newCustomizations };
    });
  };

  const handleGuarnicionChange = (itemId, value) => {
    setFormData(prev => ({
      ...prev,
      customizations: { ...prev.customizations, [itemId]: { ...prev.customizations[itemId], guarnicion: value } }
    }));
  };

  const handleCremaToggle = (itemId, crema) => {
    setFormData(prev => {
      const currentCremas = prev.customizations[itemId].cremas;
      const newCremas = currentCremas.includes(crema) ? currentCremas.filter(c => c !== crema) : [...currentCremas, crema];
      return { ...prev, customizations: { ...prev.customizations, [itemId]: { ...prev.customizations[itemId], cremas: newCremas } } };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateTotal = () => {
    return formData.selectedItems.reduce((total, itemId) => {
      const item = MENU_ITEMS.find(i => i.id === itemId);
      return total + (item ? item.price : 0);
    }, 0);
  };

  const handleSubmitFlow = async () => {
    const total = calculateTotal();
    try {
      await axios.post(`${API_URL}/orders`, { ...formData, total });
    } catch (error) {
      console.error(error);
    }

    setIsFlowOpen(false);
    const orderItems = formData.selectedItems.map(id => {
      const item = MENU_ITEMS.find(i => i.id === id);
      let text = `*${item.name}*`;
      if (item.customizable && formData.customizations[id]) {
        const cust = formData.customizations[id];
        text += `\n  ↳ _Opción:_ ${cust.guarnicion}\n  ↳ _Extras:_ ${cust.cremas.length > 0 ? cust.cremas.join(', ') : 'Ninguno'}`;
      }
      return text;
    }).join('\n\n');

    const customerMsg = {
      id: Date.now(),
      sender: 'customer',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `📝 *Nuevo Pedido*\n\n${orderItems}\n\n*Total:* S/ ${total.toFixed(2)}\n*Método:* ${formData.deliveryMethod === 'delivery' ? 'Delivery 🛵' : 'Retiro en Tienda 🏬'}\n*Pago:* ${formData.paymentMethod === 'efectivo' ? 'Efectivo' : 'Yape / Plin'}`
    };

    setChatMessages(prev => [...prev, customerMsg]);
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'business',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `¡Recibido! ✅ Su pedido ya está en cocina.\n\n${formData.deliveryMethod === 'delivery' ? 'En breve un motorizado le avisará cuando esté en camino.' : 'Le avisaremos cuando pueda pasar a recogerlo.'} 🍴✨`
      }]);
    }, 1500);
  };

  // --- FLOW STEPS ---
  const renderFlowStep1 = () => (
    <div className="flex flex-col h-full bg-[#f0f2f5]">
      <div className="p-4 bg-white shadow-sm mb-2 z-10 sticky top-0">
        <h3 className="font-bold text-[#111b21] text-lg mb-1">Menú Interactivo 🍽️</h3>
        <p className="text-sm text-[#667781]">Selecciona tus platos favoritos y personalízalos.</p>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-3 pb-24">
        {MENU_ITEMS.map((item) => {
          const isSelected = formData.selectedItems.includes(item.id);
          return (
            <div key={item.id} className={`bg-white rounded-xl shadow-sm border transition-all duration-300 ${isSelected ? 'border-[#00a884]' : 'border-gray-200'}`}>
              <label className="flex items-start p-4 cursor-pointer">
                <div className="flex-1">
                  <h4 className={`font-semibold ${isSelected ? 'text-[#00a884]' : 'text-[#111b21]'}`}>{item.name}</h4>
                  <p className="text-sm text-[#667781] mt-1">{item.desc}</p>
                  <p className="font-bold text-[#111b21] mt-2">S/ {item.price.toFixed(2)}</p>
                </div>
                <div className="ml-4 mt-1">
                  <input type="checkbox" className="w-6 h-6 accent-[#00a884] rounded-md" checked={isSelected} onChange={() => handleItemToggle(item.id)} />
                </div>
              </label>
              {isSelected && item.customizable && formData.customizations[item.id] && (
                <div className="px-4 pb-4 pt-2 bg-gray-50 border-t border-gray-100 rounded-b-xl">
                  <h5 className="text-sm font-bold text-[#111b21] mb-2 mt-2">Personaliza tu pedido:</h5>
                  <div className="space-y-2 mb-4 bg-white p-3 rounded-lg border">
                    {GUARNICIONES.map(g => (
                      <label key={g} className="flex items-center cursor-pointer">
                        <input type="radio" name={`g-${item.id}`} value={g} checked={formData.customizations[item.id].guarnicion === g} onChange={(e) => handleGuarnicionChange(item.id, e.target.value)} className="w-4 h-4 text-[#00a884]" />
                        <span className="ml-3 text-sm">{g}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="p-4 bg-white border-t absolute bottom-0 w-full">
        <button onClick={() => setFlowStep(2)} disabled={formData.selectedItems.length === 0} className={`w-full py-3 rounded-full font-bold ${formData.selectedItems.length > 0 ? 'bg-[#00a884] text-white' : 'bg-gray-200 text-gray-400'}`}>
          Siguiente (S/ {calculateTotal().toFixed(2)})
        </button>
      </div>
    </div>
  );

  const renderFlowStep2 = () => (
    <div className="flex flex-col h-full bg-[#f0f2f5]">
      <div className="p-4 bg-white shadow-sm mb-2 flex items-center">
        <button onClick={() => setFlowStep(1)} className="mr-3 p-1"><ArrowLeft size={20} /></button>
        <h3 className="font-bold text-[#111b21] text-lg">Envío y Pago 🛵</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <label className="block text-sm font-bold mb-3 text-[#111b21]">¿Cómo prefieres tu pedido?</label>
          <div className="flex gap-4">
            <button onClick={() => setFormData({...formData, deliveryMethod: 'delivery'})} className={`flex-1 p-3 rounded-xl border flex flex-col items-center gap-2 ${formData.deliveryMethod === 'delivery' ? 'border-[#00a884] bg-[#e7f7f3]' : 'bg-white'}`}>
              <MapPin size={24} className={formData.deliveryMethod === 'delivery' ? 'text-[#00a884]' : 'text-gray-400'} />
              <span className="text-xs font-bold">Delivery</span>
            </button>
            <button onClick={() => setFormData({...formData, deliveryMethod: 'pickup'})} className={`flex-1 p-3 rounded-xl border flex flex-col items-center gap-2 ${formData.deliveryMethod === 'pickup' ? 'border-[#00a884] bg-[#e7f7f3]' : 'bg-white'}`}>
              <Store size={24} className={formData.deliveryMethod === 'pickup' ? 'text-[#00a884]' : 'text-gray-400'} />
              <span className="text-xs font-bold">Recojo</span>
            </button>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm space-y-3">
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Nombre completo" className="w-full p-3 border rounded-lg" />
          <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Dirección exacta" className="w-full p-3 border rounded-lg" />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <label className="block text-sm font-bold mb-3">Método de pago</label>
          <div className="space-y-2">
            {['efectivo', 'yape'].map(m => (
              <label key={m} className="flex items-center p-2 border rounded-lg cursor-pointer">
                <input type="radio" name="pay" value={m} checked={formData.paymentMethod === m} onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})} className="text-[#00a884]" />
                <span className="ml-3 capitalize text-sm">{m === 'efectivo' ? 'Efectivo contra entrega' : 'Yape / Plin'}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4 bg-white border-t">
        <button onClick={handleSubmitFlow} disabled={!formData.name || !formData.address} className="w-full py-3 rounded-full font-bold bg-[#00a884] text-white">
          Confirmar Pedido
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white font-sans overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <div className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]"></div>
        
        <div className="w-full lg:w-1/2 text-center lg:text-left z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold text-sm mb-6 border border-emerald-500/20">
            <Rocket size={16} />
            <span>Automatización Inteligente v2.0</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6">
            Vende más por <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              WhatsApp Flows
            </span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Convierte tu chat en una máquina de ventas. Sin descargar apps, sin comisiones de delivery y con total control de tu negocio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button onClick={() => setShowFakeDoorModal(true)} className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3">
              <ShoppingBag size={24} /> Empezar Ahora
            </button>
          </div>
        </div>

        {/* MOCKUP MOVIL */}
        <div className="w-full lg:w-1/2 flex justify-center z-10">
          <div className="w-[360px] h-[720px] bg-[#0f172a] rounded-[45px] shadow-[0_0_50px_rgba(16,185,129,0.2)] relative overflow-hidden border-[10px] border-slate-800 flex flex-col">
            <div className="absolute top-0 inset-x-0 h-6 bg-slate-800 rounded-b-3xl w-40 mx-auto z-20 flex justify-center items-center">
              <div className="w-16 h-3 bg-black rounded-full"></div>
            </div>
            
            <div className="bg-[#075e54] text-white p-3 pt-8 flex items-center gap-3 shrink-0">
              <ChevronLeft size={24} />
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shrink-0">🍽️</div>
              <div className="flex-1 min-w-0">
                <h1 className="font-semibold text-sm truncate">FoodFlow Demo</h1>
                <p className="text-[10px] text-emerald-100">En línea</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-[#e5ddd5] p-4 space-y-4" style={{backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', opacity: 0.9}}>
              {chatMessages.map(m => (
                <div key={m.id} className={`flex ${m.sender === 'customer' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-2 rounded-lg text-sm shadow-sm relative ${m.sender === 'customer' ? 'bg-[#dcf8c6] text-slate-900' : 'bg-white text-slate-900'}`}>
                    {m.text}
                    {m.hasFlowButton && !isFlowOpen && (
                      <button onClick={handleOpenFlow} className="w-full mt-2 py-2 text-[#075e54] font-bold border-t flex items-center justify-center gap-2">
                        <ShoppingBag size={16} /> Ver Menú y Pedir
                      </button>
                    )}
                    <span className="block text-[9px] text-slate-400 text-right mt-1">{m.time}</span>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {isFlowOpen && (
              <div className="absolute inset-0 z-50 bg-black/40 flex flex-col justify-end">
                <div className="bg-white h-[90%] w-full rounded-t-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-full duration-300">
                  <div className="flex items-center justify-between p-4 border-b">
                    <button onClick={handleCloseFlow} className="text-slate-500"><X size={24} /></button>
                    <span className="font-bold text-slate-900">FoodFlow Order</span>
                    <div className="w-6"></div>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    {flowStep === 1 ? renderFlowStep1() : renderFlowStep2()}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- FEATURES SECTION (DARK STYLE) --- */}
      <div className="bg-[#0f172a] py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">La magia sucede detrás de escena</h2>
          <p className="text-slate-400 text-lg">Tú solo ves cómo crecen tus ventas. El sistema se encarga del resto.</p>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((f, i) => (
            <div key={i} className="bg-[#1e293b] p-8 rounded-3xl border border-slate-700/50 hover:border-emerald-500/50 transition-all group">
              <div className="mb-6 p-4 bg-slate-800 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* --- MODAL PUERTA FALSA --- */}
      {showFakeDoorModal && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1e293b] rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-700">
            {fakeDoorStep === 'form' ? (
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <Star className="text-amber-400" size={32} />
                  <button onClick={() => setShowFakeDoorModal(false)} className="text-slate-400 hover:text-white"><X size={24} /></button>
                </div>
                <h3 className="text-2xl font-bold mb-2">¡Sé de los primeros!</h3>
                <p className="text-slate-400 mb-6">Estamos en fase de lanzamiento limitado. Déjanos tu contacto y obtén beneficios exclusivos.</p>
                <form onSubmit={handleFakeDoorSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">WhatsApp o Email</label>
                    <input type="text" required value={leadContact} onChange={(e) => setLeadContact(e.target.value)} placeholder="Ej. 987654321" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 outline-none focus:border-emerald-500 transition-all" />
                  </div>
                  <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-4 rounded-xl transition-all">Solicitar Acceso VIP</button>
                </form>
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-2">¡Registro Exitoso!</h3>
                <p className="text-slate-400">Nuestro equipo te contactará pronto para darte acceso a la plataforma.</p>
                <button onClick={() => setShowFakeDoorModal(false)} className="mt-8 text-emerald-400 font-bold hover:underline">Cerrar</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
