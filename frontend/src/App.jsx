import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, Send, CheckCircle2, Info, ArrowLeft, ShoppingBag } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Mock de datos: Añadido "1/8 de Pollo" como pediste
const MENU_ITEMS = [
  { id: '1', name: 'Pollo Entero', desc: 'Ideal para 4 personas.', price: 65.00, customizable: true },
  { id: '2', name: '1/2 Pollo', desc: 'Para compartir.', price: 35.00, customizable: true },
  { id: '3', name: '1/4 de Pollo', desc: 'Porción personal.', price: 20.00, customizable: true },
  { id: '6', name: '1/8 de Pollo', desc: 'Para el antojo.', price: 12.00, customizable: true },
  { id: '4', name: 'Porción de Tequeños', desc: 'Seis unidades con salsa de palta.', price: 12.00, customizable: false },
  { id: '7', name: 'Porción de Ensalada', desc: 'Fresca clásica.', price: 8.00, customizable: false },
  { id: '5', name: 'Gaseosa 1.5L', desc: 'Inca Kola o Coca Cola.', price: 10.00, customizable: false },
];

const GUARNICIONES = ['Pura Papa', 'Combinado (Papa y Ensalada)', 'Pura Ensalada'];
const CREMAS = ['Ají Pollero', 'Mayonesa', 'Ketchup', 'Ocopa', 'Mostaza'];

export default function WhatsAppFlowSimulator() {
  const [isFlowOpen, setIsFlowOpen] = useState(false);
  const [flowStep, setFlowStep] = useState(1);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'business',
      time: '18:30',
      text: '¡Hola! Bienvenido a *Pollería El Buen Sabor* 🍗🔥.\n\nPara hacer tu pedido de forma rápida y sencilla, toca el botón de abajo. 👇',
      hasFlowButton: true
    }
  ]);
  
  const [formData, setFormData] = useState({
    selectedItems: [],
    customizations: {}, 
    name: '',
    address: '',
    reference: '',
    paymentMethod: 'efectivo'
  });

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleOpenFlow = () => {
    setIsFlowOpen(true);
    setFlowStep(1);
    setFormData({
      selectedItems: [],
      customizations: {},
      name: '',
      address: '',
      reference: '',
      paymentMethod: 'efectivo'
    });
  };

  const handleCloseFlow = () => setIsFlowOpen(false);

  // Seleccionar productos y preparar sus personalizaciones al instante
  const handleItemToggle = (itemId) => {
    setFormData(prev => {
      const isSelected = prev.selectedItems.includes(itemId);
      let newSelected = [];
      let newCustomizations = { ...prev.customizations };

      if (isSelected) {
        newSelected = prev.selectedItems.filter(id => id !== itemId);
        delete newCustomizations[itemId]; 
      } else {
        newSelected = [...prev.selectedItems, itemId];
        const item = MENU_ITEMS.find(i => i.id === itemId);
        if (item.customizable) {
          newCustomizations[itemId] = { guarnicion: 'Combinado (Papa y Ensalada)', cremas: [] };
        }
      }
      return { ...prev, selectedItems: newSelected, customizations: newCustomizations };
    });
  };

  const handleGuarnicionChange = (itemId, value) => {
    setFormData(prev => ({
      ...prev,
      customizations: {
        ...prev.customizations,
        [itemId]: { ...prev.customizations[itemId], guarnicion: value }
      }
    }));
  };

  const handleCremaToggle = (itemId, crema) => {
    setFormData(prev => {
      const currentCremas = prev.customizations[itemId].cremas;
      const hasCrema = currentCremas.includes(crema);
      const newCremas = hasCrema 
        ? currentCremas.filter(c => c !== crema)
        : [...currentCremas, crema];

      return {
        ...prev,
        customizations: {
          ...prev.customizations,
          [itemId]: { ...prev.customizations[itemId], cremas: newCremas }
        }
      };
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
    
    // Preparar datos para el backend
    const orderData = {
      ...formData,
      total: total
    };

    try {
      // Enviar al backend
      await axios.post(`${API_URL}/orders`, orderData);
      console.log("Pedido guardado en BD");
    } catch (error) {
      console.error("Error al guardar pedido:", error);
    }

    setIsFlowOpen(false);
    
    const orderItems = formData.selectedItems.map(id => {
      const item = MENU_ITEMS.find(i => i.id === id);
      let text = `*${item.name}*`;
      
      if (item.customizable && formData.customizations[id]) {
        const cust = formData.customizations[id];
        text += `\n  ↳ _Guarnición:_ ${cust.guarnicion}`;
        text += `\n  ↳ _Cremas:_ ${cust.cremas.length > 0 ? cust.cremas.join(', ') : 'Ninguna'}`;
      }
      return text;
    }).join('\n\n');

    const customerMsg = {
      id: Date.now(),
      sender: 'customer',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `📝 *Mi Pedido*\n\n${orderItems}\n\n*Total:* S/ ${total.toFixed(2)}\n\n*Entrega a:*\n${formData.name}\n${formData.address}\n\n*Pago:* ${formData.paymentMethod === 'efectivo' ? 'Efectivo contra entrega' : 'Yape / Plin'}`
    };

    setChatMessages(prev => [...prev, customerMsg]);

    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'business',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `¡Excelente, ${formData.name.split(' ')[0]}! ✅🍗\n\nTu pedido personalizado ya está en la cocina y llegará a tu domicilio pronto. 🛵💨`
      }]);
    }, 1500);
  };

  // --- PANTALLA 1: MENÚ CON DESGLOSE INSTANTÁNEO ---
  const renderFlowStep1 = () => (
    <div className="flex flex-col h-full bg-[#f0f2f5]">
      <div className="p-4 bg-white shadow-sm mb-2 z-10 sticky top-0">
        <h3 className="font-bold text-[#111b21] text-lg mb-1">Nuestro Menú 🍗</h3>
        <p className="text-sm text-[#667781]">Selecciona tus productos. Las opciones aparecerán al instante.</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-3 pb-24">
        {MENU_ITEMS.map((item) => {
          const isSelected = formData.selectedItems.includes(item.id);
          const itemCustomization = formData.customizations[item.id];

          return (
            <div key={item.id} className={`bg-white rounded-xl shadow-sm border transition-all duration-300 ${isSelected ? 'border-[#00a884]' : 'border-gray-200'}`}>
              
              {/* Fila Principal del Producto */}
              <label className="flex items-start p-4 cursor-pointer">
                <div className="flex-1">
                  <h4 className={`font-semibold ${isSelected ? 'text-[#00a884]' : 'text-[#111b21]'}`}>{item.name}</h4>
                  <p className="text-sm text-[#667781] mt-1">{item.desc}</p>
                  <p className="font-bold text-[#111b21] mt-2">S/ {item.price.toFixed(2)}</p>
                </div>
                <div className="ml-4 mt-1">
                  <input 
                    type="checkbox" 
                    className="w-6 h-6 accent-[#00a884] rounded-md border-gray-300 focus:ring-[#00a884]"
                    checked={isSelected}
                    onChange={() => handleItemToggle(item.id)}
                  />
                </div>
              </label>

              {/* SECCIÓN DESGLOSADA (Condicional/Acordeón) */}
              {isSelected && item.customizable && itemCustomization && (
                <div className="px-4 pb-4 pt-2 bg-gray-50 border-t border-gray-100 animate-in slide-in-from-top-2 fade-in duration-200 rounded-b-xl">
                  
                  {/* Guarnición */}
                  <h5 className="text-sm font-bold text-[#111b21] mb-2 mt-2">1. Elige tu guarnición:</h5>
                  <div className="space-y-2 mb-4 bg-white p-3 rounded-lg border border-gray-200">
                    {GUARNICIONES.map(guarnicion => (
                      <label key={guarnicion} className="flex items-center cursor-pointer">
                        <input 
                          type="radio" 
                          name={`guarnicion-${item.id}`}
                          value={guarnicion}
                          checked={itemCustomization.guarnicion === guarnicion}
                          onChange={(e) => handleGuarnicionChange(item.id, e.target.value)}
                          className="w-5 h-5 text-[#00a884] focus:ring-[#00a884] border-gray-300"
                        />
                        <span className="ml-3 text-sm text-[#111b21]">{guarnicion}</span>
                      </label>
                    ))}
                  </div>

                  {/* Cremas */}
                  <h5 className="text-sm font-bold text-[#111b21] mb-2">2. Elige tus cremas:</h5>
                  <div className="grid grid-cols-2 gap-2 bg-white p-3 rounded-lg border border-gray-200">
                    {CREMAS.map(crema => (
                      <label key={crema} className="flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={itemCustomization.cremas.includes(crema)}
                          onChange={() => handleCremaToggle(item.id, crema)}
                          className="w-5 h-5 accent-[#00a884] rounded border-gray-300 focus:ring-[#00a884]"
                        />
                        <span className="ml-2 text-sm text-[#111b21] truncate">{crema}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-white border-t border-gray-200 absolute bottom-0 w-full z-10">
        <button 
          onClick={() => setFlowStep(2)}
          disabled={formData.selectedItems.length === 0}
          className={`w-full py-3 rounded-full font-bold transition-colors ${formData.selectedItems.length > 0 ? 'bg-[#00a884] text-white shadow-md hover:bg-[#008f6f]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
        >
          Ir a Datos de Envío (S/ {calculateTotal().toFixed(2)})
        </button>
      </div>
    </div>
  );

  // --- PANTALLA 2: DATOS DE ENVÍO ---
  const renderFlowStep2 = () => (
    <div className="flex flex-col h-full bg-[#f0f2f5]">
      <div className="p-4 bg-white shadow-sm mb-2 flex items-center">
        <button onClick={() => setFlowStep(1)} className="mr-3 p-1 rounded-full hover:bg-gray-100 text-[#54656f]">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h3 className="font-bold text-[#111b21] text-lg">Datos de Envío 🛵</h3>
          <p className="text-sm text-[#667781]">¿A dónde llevamos el pedido?</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <label className="block text-sm font-medium text-[#111b21] mb-2">Nombre completo</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Ej. Juan Pérez"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00a884] focus:ring-1 focus:ring-[#00a884]"
          />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <label className="block text-sm font-medium text-[#111b21] mb-2">Dirección de entrega</label>
          <input 
            type="text" 
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Ej. Av. Los Fresnos 123"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00a884] focus:ring-1 focus:ring-[#00a884] mb-3"
          />
          <label className="block text-sm font-medium text-[#111b21] mb-2">Referencia (Opcional)</label>
          <input 
            type="text" 
            name="reference"
            value={formData.reference}
            onChange={handleInputChange}
            placeholder="Frente al parque"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00a884] focus:ring-1 focus:ring-[#00a884]"
          />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <label className="block text-sm font-medium text-[#111b21] mb-3">Método de pago</label>
          <div className="space-y-3">
            <label className="flex items-center cursor-pointer">
              <input 
                type="radio" 
                name="paymentMethod" 
                value="efectivo"
                checked={formData.paymentMethod === 'efectivo'}
                onChange={handleInputChange}
                className="w-5 h-5 text-[#00a884] focus:ring-[#00a884] border-gray-300"
              />
              <span className="ml-3 text-[#111b21]">Efectivo contra entrega</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input 
                type="radio" 
                name="paymentMethod" 
                value="yape"
                checked={formData.paymentMethod === 'yape'}
                onChange={handleInputChange}
                className="w-5 h-5 text-[#00a884] focus:ring-[#00a884] border-gray-300"
              />
              <span className="ml-3 text-[#111b21]">Yape / Plin</span>
            </label>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
        <button 
          onClick={() => setFlowStep(3)}
          disabled={!formData.name || !formData.address}
          className={`w-full py-3 rounded-full font-bold transition-colors ${formData.name && formData.address ? 'bg-[#00a884] text-white hover:bg-[#008f6f]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
        >
          Revisar y Enviar
        </button>
      </div>
    </div>
  );

  // --- PANTALLA 3: RESUMEN FINAL ---
  const renderFlowStep3 = () => (
    <div className="flex flex-col h-full bg-[#f0f2f5]">
      <div className="p-4 bg-white shadow-sm mb-2 flex items-center">
        <button onClick={() => setFlowStep(2)} className="mr-3 p-1 rounded-full hover:bg-gray-100 text-[#54656f]">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h3 className="font-bold text-[#111b21] text-lg">Confirma tu Pedido</h3>
          <p className="text-sm text-[#667781]">Revisa que todo esté correcto.</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h4 className="font-bold text-[#111b21] border-b pb-2 mb-3">Tus Productos</h4>
          <div className="space-y-4 mb-4 text-[#111b21]">
            {formData.selectedItems.map(id => {
              const item = MENU_ITEMS.find(i => i.id === id);
              const custom = formData.customizations[id];
              return (
                <div key={id} className="text-sm">
                  <div className="flex justify-between font-bold">
                    <span>1x {item.name}</span>
                    <span>S/ {item.price.toFixed(2)}</span>
                  </div>
                  {custom && (
                    <div className="text-[#54656f] mt-1 pl-4 border-l-2 border-[#00a884]">
                      <p>• {custom.guarnicion}</p>
                      <p>• Cremas: {custom.cremas.length > 0 ? custom.cremas.join(', ') : 'Ninguna'}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-between font-bold text-lg text-[#111b21] border-t pt-3">
            <span>Total:</span>
            <span className="text-[#00a884]">S/ {calculateTotal().toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h4 className="font-bold text-[#111b21] border-b pb-2 mb-3">Datos de Entrega</h4>
          <div className="text-sm text-[#54656f] space-y-1">
            <p><span className="font-medium text-[#111b21]">A nombre de:</span> {formData.name}</p>
            <p><span className="font-medium text-[#111b21]">Dirección:</span> {formData.address}</p>
            {formData.reference && <p><span className="font-medium text-[#111b21]">Ref:</span> {formData.reference}</p>}
            <p><span className="font-medium text-[#111b21]">Pago:</span> {formData.paymentMethod === 'efectivo' ? 'Efectivo' : 'Yape / Plin'}</p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
        <button 
          onClick={handleSubmitFlow}
          className="w-full py-3 rounded-full font-bold bg-[#00a884] text-white hover:bg-[#008f6f] transition-colors flex justify-center items-center gap-2 shadow-lg"
        >
          <Send size={18} />
          Enviar Pedido por WhatsApp
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      
      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl w-full items-center lg:items-start justify-center">
        
        {/* Panel de Información */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-200 order-2 lg:order-1">
          <div className="flex items-center gap-3 mb-6 text-[#00a884]">
            <ShoppingBag size={28} />
            <h2 className="text-2xl font-bold text-gray-800">Desglose Instántaneo (Renderizado Condicional)</h2>
          </div>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            WhatsApp Flows permite modificar la interfaz en tiempo real sin recargar la página, utilizando variables de estado internas.
          </p>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-800">¿Cómo se programa esto en Meta?</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-sm text-gray-600">
                <CheckCircle2 className="text-[#00a884] shrink-0" size={20} />
                <span><b>Propiedad <code>visible</code>:</b> En el JSON de Flows, los bloques de guarnición están ocultos. Se programan con <code>"visible": "$&#123;data.is_pollo_checked&#125;"</code>, de modo que solo aparecen si marcas el pollo.</span>
              </li>
              <li className="flex gap-3 text-sm text-gray-600">
                <CheckCircle2 className="text-[#00a884] shrink-0" size={20} />
                <span><b>Agilidad (UX):</b> Esto mejora la experiencia del usuario (UX) enormemente porque ven el menú completo y personalizan sus productos en un solo vistazo, como en Rappi o PedidosYa.</span>
              </li>
              <li className="flex gap-3 text-sm text-gray-600">
                <CheckCircle2 className="text-[#00a884] shrink-0" size={20} />
                <span><b>Múltiples Pollo:</b> Como verás, puedes marcar el 1/4 de pollo y configurarlo, y al mismo tiempo marcar el 1/8 de pollo y configurarlo con otras cremas diferentes de forma independiente.</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 p-4 bg-green-50 text-green-800 rounded-lg text-sm flex gap-3 border border-green-200">
            <Info size={24} className="shrink-0 text-green-600" />
            <p><strong>Haz la prueba en el celular:</strong> Marca "1/4 de Pollo" e inmediatamente verás cómo se despliegan sus opciones. Marca también "1/8 de Pollo" o una ensalada. ¡Todo fluye en una sola pantalla!</p>
          </div>
        </div>

        {/* Mockup del Teléfono */}
        <div className="w-[360px] h-[700px] bg-black rounded-[40px] shadow-2xl relative overflow-hidden border-[8px] border-gray-900 flex flex-col shrink-0 order-1 lg:order-2">
          
          <div className="bg-[#008069] text-white p-3 flex items-center gap-3 shrink-0 z-10 relative shadow-sm">
            <ChevronLeft size={24} />
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
              <span className="text-xl">🍗</span>
            </div>
            <div>
              <h1 className="font-semibold leading-tight">El Buen Sabor</h1>
              <p className="text-xs text-green-100">Cuenta de empresa</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-[#efeae2] p-4 relative" style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundSize: 'cover', opacity: 0.9 }}>
            <div className="space-y-4">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-lg p-2 shadow-sm relative ${msg.sender === 'customer' ? 'bg-[#d9fdd3]' : 'bg-white'}`}>
                    <div className="text-[14.5px] text-[#111b21] whitespace-pre-wrap leading-snug">
                      {msg.text}
                    </div>
                    {msg.hasFlowButton && !isFlowOpen && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <button 
                          onClick={handleOpenFlow}
                          className="w-full py-2 text-center text-[#00a884] font-bold flex items-center justify-center gap-2 hover:bg-gray-50 rounded"
                        >
                          <ShoppingBag size={18} />
                          Hacer Pedido
                        </button>
                      </div>
                    )}
                    <div className="text-[10px] text-[#667781] text-right mt-1 ml-4 float-right">
                      {msg.time}
                      {msg.sender === 'customer' && <span className="ml-1 text-[#53bdeb]">✓✓</span>}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </div>

          {isFlowOpen && (
            <div className="absolute inset-0 z-50 bg-black/50 flex flex-col justify-end animate-in fade-in duration-200">
              <div className="bg-white h-[92%] w-full rounded-t-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-full duration-300">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white shrink-0">
                  <div className="flex items-center gap-2 text-[#111b21] font-semibold text-lg">
                    <button onClick={handleCloseFlow} className="p-1 hover:bg-gray-100 rounded-full text-[#54656f]">
                      <X size={24} />
                    </button>
                    Pedido - El Buen Sabor
                  </div>
                </div>
                
                <div className="flex-1 overflow-hidden bg-[#f0f2f5] relative">
                  {flowStep === 1 && renderFlowStep1()}
                  {flowStep === 2 && renderFlowStep2()}
                  {flowStep === 3 && renderFlowStep3()}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
