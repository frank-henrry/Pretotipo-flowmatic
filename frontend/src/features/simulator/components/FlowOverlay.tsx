import React from 'react';
import { X, ArrowLeft, MapPin, Store, Send } from 'lucide-react';
import { useSimulatorStore } from '../../../store/useSimulatorStore';
import { useCreateOrder } from '../../../services/api';

const MENU_ITEMS = [
  { id: '1', name: 'Pollo a la Brasa (1/4)', desc: 'Tradicional sabor peruano con papas.', price: 20.00, customizable: true },
  { id: '2', name: 'Pizza Familiar', desc: 'Artesanal con mozzarella premium.', price: 45.00, customizable: true },
  { id: '3', name: 'Ceviche Clásico', desc: 'Pescado fresco marinado al limón.', price: 35.00, customizable: true },
  { id: '4', name: 'Hamburguesa Especial', desc: 'Doble carne, queso y tocino.', price: 25.00, customizable: true },
  { id: '5', name: 'Gaseosa 1.5L', desc: 'Inca Kola o Coca Cola.', price: 10.00, customizable: false },
  { id: '6', name: 'Tequeños x6', desc: 'Con abundante salsa de palta.', price: 12.00, customizable: false },
];

const GUARNICIONES = ['Papas Fritas', 'Ensalada Fresca', 'Arroz Blanco', 'Camote frito'];

export const FlowOverlay: React.FC = () => {
  const { 
    isFlowOpen, setIsFlowOpen, flowStep, setFlowStep, 
    formData, toggleItem, updateCustomization, updateFormData, 
    addChatMessage, resetForm 
  } = useSimulatorStore();
  
  const createOrderMutation = useCreateOrder();

  if (!isFlowOpen) return null;

  const calculateTotal = () => {
    return formData.selectedItems.reduce((total, itemId) => {
      const item = MENU_ITEMS.find(i => i.id === itemId);
      return total + (item ? item.price : 0);
    }, 0);
  };

  const handleSubmit = async () => {
    const total = calculateTotal();
    
    // API Call
    createOrderMutation.mutate({ ...formData, total });

    setIsFlowOpen(false);
    
    const orderItems = formData.selectedItems.map(id => {
      const item = MENU_ITEMS.find(i => i.id === id);
      let text = `*${item.name}*`;
      if (item.customizable && formData.customizations[id]) {
        const cust = formData.customizations[id];
        text += `\n  ↳ _Opción:_ ${cust.guarnicion}`;
      }
      return text;
    }).join('\n\n');

    addChatMessage({
      id: Date.now(),
      sender: 'customer',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `📝 *Nuevo Pedido*\n\n${orderItems}\n\n*Total:* S/ ${total.toFixed(2)}\n*Método:* ${formData.deliveryMethod === 'delivery' ? 'Delivery 🛵' : 'Retiro en Tienda 🏬'}`
    });

    setTimeout(() => {
      addChatMessage({
        id: Date.now() + 1,
        sender: 'business',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `¡Recibido! ✅ Su pedido ya está en cocina.\n\n${formData.deliveryMethod === 'delivery' ? 'En breve un motorizado le avisará cuando esté en camino.' : 'Le avisaremos cuando pueda pasar a recogerlo.'} 🍴✨`
      });
    }, 1500);
  };

  const renderStep1 = () => (
    <div className="flex flex-col h-full bg-[#f8fafc]">
      <div className="p-4 bg-white border-b sticky top-0 z-10">
        <h3 className="font-black text-slate-900 text-lg">Menú Interactivo 🍽️</h3>
        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-0.5">Arma tu pedido ahora</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-32">
        {MENU_ITEMS.map((item) => {
          const isSelected = formData.selectedItems.includes(item.id);
          return (
            <div 
              key={item.id} 
              className={`bg-white rounded-2xl shadow-sm border transition-all duration-300 ${
                isSelected ? 'border-emerald-500 ring-1 ring-emerald-500/20' : 'border-slate-200'
              }`}
            >
              <label className="flex items-start p-4 cursor-pointer">
                <div className="flex-1">
                  <h4 className={`font-bold text-[15px] ${isSelected ? 'text-emerald-600' : 'text-slate-900'}`}>{item.name}</h4>
                  <p className="text-[13px] text-slate-500 mt-0.5 leading-tight">{item.desc}</p>
                  <p className="font-black text-slate-900 mt-2 text-sm">S/ {item.price.toFixed(2)}</p>
                </div>
                <div className="ml-4 mt-0.5">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 rounded-lg border-slate-300 text-emerald-500 focus:ring-emerald-500 transition-all"
                    checked={isSelected}
                    onChange={() => toggleItem(item.id, item)}
                  />
                </div>
              </label>
              
              {isSelected && item.customizable && formData.customizations[item.id] && (
                <div className="px-4 pb-4 pt-1 bg-slate-50/50 border-t border-slate-100 rounded-b-2xl animate-in fade-in duration-200">
                  <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 mt-2">Acompañamiento:</h5>
                  <div className="flex flex-wrap gap-2">
                    {GUARNICIONES.map(g => (
                      <button 
                        key={g}
                        onClick={() => updateCustomization(item.id, { guarnicion: g })}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                          formData.customizations[item.id].guarnicion === g 
                            ? 'bg-emerald-500 border-emerald-500 text-white shadow-md' 
                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="p-4 bg-white border-t absolute bottom-0 w-full shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => setFlowStep(2)}
          disabled={formData.selectedItems.length === 0}
          className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
            formData.selectedItems.length > 0 
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 active:scale-95' 
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          Siguiente (S/ {calculateTotal().toFixed(2)})
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="flex flex-col h-full bg-[#f8fafc]">
      <div className="p-4 bg-white border-b flex items-center gap-4 sticky top-0 z-10">
        <button onClick={() => setFlowStep(1)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-slate-600" />
        </button>
        <h3 className="font-black text-slate-900 text-lg uppercase tracking-tight">Envío y Pago 🛵</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-5 pb-32">
        {/* Delivery Method */}
        <div className="space-y-3">
          <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">Método de entrega</h4>
          <div className="flex gap-3">
            <button 
              onClick={() => updateFormData({ deliveryMethod: 'delivery' })}
              className={`flex-1 p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                formData.deliveryMethod === 'delivery' 
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                  : 'border-slate-200 bg-white text-slate-400'
              }`}
            >
              <MapPin size={24} />
              <span className="text-[13px] font-black uppercase tracking-tighter">Delivery</span>
            </button>
            <button 
              onClick={() => updateFormData({ deliveryMethod: 'pickup' })}
              className={`flex-1 p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                formData.deliveryMethod === 'pickup' 
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                  : 'border-slate-200 bg-white text-slate-400'
              }`}
            >
              <Store size={24} />
              <span className="text-[13px] font-black uppercase tracking-tighter">Recojo</span>
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-3">
          <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">Tus Datos</h4>
          <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 space-y-4">
            <input 
              type="text" 
              placeholder="¿A nombre de quién?" 
              className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/20"
              value={formData.name}
              onChange={(e) => updateFormData({ name: e.target.value })}
            />
            <input 
              type="text" 
              placeholder="Dirección de entrega" 
              className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/20"
              value={formData.address}
              onChange={(e) => updateFormData({ address: e.target.value })}
            />
          </div>
        </div>

        {/* Payment */}
        <div className="space-y-3">
          <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">Método de pago</h4>
          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
            {['efectivo', 'yape'].map(m => (
              <label key={m} className="flex items-center p-5 border-b border-slate-50 last:border-none cursor-pointer hover:bg-slate-50/50 transition-colors">
                <input 
                  type="radio" 
                  name="pay" 
                  checked={formData.paymentMethod === m}
                  onChange={() => updateFormData({ paymentMethod: m })}
                  className="w-5 h-5 text-emerald-500 focus:ring-emerald-500"
                />
                <span className="ml-4 text-sm font-bold text-slate-700 capitalize">
                  {m === 'efectivo' ? 'Efectivo contra entrega' : 'Yape / Plin'}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-white border-t absolute bottom-0 w-full shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <button 
          onClick={handleSubmit}
          disabled={!formData.name || !formData.address || createOrderMutation.isLoading}
          className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
            formData.name && formData.address 
              ? 'bg-slate-900 text-white shadow-lg active:scale-95' 
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          {createOrderMutation.isLoading ? 'Enviando...' : 'Confirmar Pedido'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="absolute inset-0 z-50 bg-slate-900/40 backdrop-blur-[2px] flex flex-col justify-end">
      <div className="bg-white h-[92%] w-full rounded-t-[2.5rem] overflow-hidden flex flex-col shadow-2xl animate-in slide-in-from-bottom-full duration-500 ease-out">
        <div className="flex items-center justify-between p-4 bg-white border-b">
          <button 
            onClick={() => setIsFlowOpen(false)} 
            className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400"
          >
            <X size={24} />
          </button>
          <span className="font-black text-slate-900 uppercase tracking-tighter">FoodFlow Interactive</span>
          <div className="w-10"></div>
        </div>
        
        <div className="flex-1 overflow-hidden">
          {flowStep === 1 ? renderStep1() : renderStep2()}
        </div>
      </div>
    </div>
  );
};
