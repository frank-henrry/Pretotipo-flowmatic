import React from 'react';
import { Smartphone, Monitor, MapPin, Users } from 'lucide-react';

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

export const FeatureGrid: React.FC = () => {
  return (
    <div className="bg-[#0f172a] py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 lg:mb-24">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 tracking-tight">
          La magia sucede detrás de escena
        </h2>
        <p className="text-slate-400 text-lg lg:text-xl max-w-2xl mx-auto">
          Tú solo ves cómo crecen tus ventas. El sistema se encarga del resto de la operación.
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {FEATURES.map((f, i) => (
          <div 
            key={i} 
            className="group bg-[#1e293b]/50 hover:bg-[#1e293b] p-8 rounded-[2rem] border border-slate-700/50 hover:border-emerald-500/30 transition-all duration-300"
          >
            <div className="mb-6 p-4 bg-slate-800 rounded-2xl w-fit group-hover:scale-110 group-hover:bg-slate-700 transition-all duration-500 shadow-lg">
              {f.icon}
            </div>
            <h3 className="text-xl lg:text-2xl font-bold mb-4 text-white">{f.title}</h3>
            <p className="text-slate-400 text-sm lg:text-base leading-relaxed font-medium">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
