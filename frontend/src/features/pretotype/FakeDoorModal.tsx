import React, { useState } from 'react';
import { X, Star, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useCreateLead } from '../../services/api';

interface FakeDoorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FakeDoorModal: React.FC<FakeDoorModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [leadContact, setLeadContact] = useState('');
  const createLeadMutation = useCreateLead();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (leadContact.trim().length > 5) {
      createLeadMutation.mutate({ contact: leadContact }, {
        onSuccess: () => setStep('success'),
        onError: () => setStep('success'), // Fallback for UX
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-[#1e293b] rounded-[2.5rem] shadow-2xl max-w-md w-full overflow-hidden border border-slate-700/50 animate-in zoom-in-95 duration-300">
        {step === 'form' ? (
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <div className="p-3 bg-amber-500/10 rounded-2xl">
                <Star className="text-amber-400" size={32} />
              </div>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-white transition-colors">
                <X size={28} />
              </button>
            </div>
            
            <h3 className="text-3xl font-black mb-3 tracking-tight text-white">¡Sé de los primeros!</h3>
            <p className="text-slate-400 mb-8 font-medium leading-relaxed">
              Estamos en fase de lanzamiento limitado. Déjanos tu contacto y obtén beneficios exclusivos como <b>1 mes GRATIS</b> y acceso prioritario.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">
                  WhatsApp o Correo del Negocio
                </label>
                <input 
                  type="text" 
                  required 
                  value={leadContact} 
                  onChange={(e) => setLeadContact(e.target.value)} 
                  placeholder="Ej. 987654321 o info@mi-restaurante.com" 
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl p-4 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-bold text-white placeholder:text-slate-600"
                />
              </div>
              
              <button 
                type="submit" 
                disabled={createLeadMutation.isLoading}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black py-4 rounded-2xl transition-all shadow-lg shadow-emerald-500/20 active:scale-95 disabled:opacity-50 uppercase tracking-widest text-sm"
              >
                {createLeadMutation.isLoading ? 'Enviando...' : 'Solicitar Acceso VIP'}
              </button>
            </form>
            
            <p className="text-[11px] text-slate-500 text-center mt-6 flex items-center justify-center gap-2 font-bold">
              <ShieldCheck size={14} className="text-emerald-500/50" /> Sin spam. Privacidad garantizada.
            </p>
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="w-24 h-24 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
              <CheckCircle2 size={48} />
            </div>
            <h3 className="text-3xl font-black mb-3 tracking-tight text-white">¡Registro Exitoso!</h3>
            <p className="text-slate-400 mb-10 font-medium leading-relaxed">
              Hemos guardado tus datos. Un especialista de <b>FoodFlow</b> te contactará pronto para darte acceso.
            </p>
            <button 
              onClick={onClose} 
              className="text-emerald-400 font-black hover:text-emerald-300 transition-colors uppercase tracking-widest text-sm"
            >
              Volver a la Demo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
