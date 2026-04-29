import React, { useState } from 'react';
import { X, User, Mail, Phone, Store, CheckCircle2, ShieldCheck, Rocket } from 'lucide-react';
import { useCreateLead, type LeadData } from '../../services/api';

interface FakeDoorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RESTAURANT_TYPES = [
  'Pollería', 'Pizzería', 'Cevichería', 'Hamburguesería',
  'Restaurante', 'Cafetería', 'Otro',
];

export const FakeDoorModal: React.FC<FakeDoorModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [form, setForm] = useState<LeadData>({
    name: '',
    email: '',
    phone: '',
    restaurant_type: '',
  });
  const [errors, setErrors] = useState<Partial<LeadData>>({});

  const createLeadMutation = useCreateLead();

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: Partial<LeadData> = {};
    if (!form.name.trim()) newErrors.name = 'Requerido';
    if (!form.email.includes('@')) newErrors.email = 'Email inválido';
    if (form.phone.trim().length < 7) newErrors.phone = 'Número inválido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    createLeadMutation.mutate(form, {
      onSuccess: () => {
        setStep('success');
        setForm({ name: '', email: '', phone: '', restaurant_type: '' });
      },
      onError: () => setStep('success'), // UX fallback
    });
  };

  const handleChange = (field: keyof LeadData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#111827] rounded-3xl shadow-2xl max-w-md w-full border border-white/10 overflow-hidden">
        {step === 'form' ? (
          <>
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-start justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold mb-3">
                  <Rocket size={11} /> Acceso anticipado
                </div>
                <h3 className="text-xl font-black text-white tracking-tight">Solicita tu demo gratuita</h3>
                <p className="text-slate-400 text-sm mt-1">
                  Completa el formulario y te contactamos en menos de 2 horas.
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-slate-500 hover:text-white transition-colors p-1 -mt-1 -mr-1 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Tu nombre *
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => handleChange('name', e.target.value)}
                    placeholder="Carlos Rodríguez"
                    className={`w-full bg-slate-900 border rounded-xl pl-9 pr-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-emerald-500 transition-all ${errors.name ? 'border-red-500' : 'border-slate-700'}`}
                  />
                </div>
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Correo electrónico *
                </label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => handleChange('email', e.target.value)}
                    placeholder="carlos@mirestaurante.com"
                    className={`w-full bg-slate-900 border rounded-xl pl-9 pr-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-emerald-500 transition-all ${errors.email ? 'border-red-500' : 'border-slate-700'}`}
                  />
                </div>
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  WhatsApp / Teléfono *
                </label>
                <div className="relative">
                  <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => handleChange('phone', e.target.value)}
                    placeholder="+51 987 654 321"
                    className={`w-full bg-slate-900 border rounded-xl pl-9 pr-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-emerald-500 transition-all ${errors.phone ? 'border-red-500' : 'border-slate-700'}`}
                  />
                </div>
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Restaurant type */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Tipo de negocio
                </label>
                <div className="relative">
                  <Store size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <select
                    value={form.restaurant_type}
                    onChange={e => handleChange('restaurant_type', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-3 text-sm text-white outline-none focus:border-emerald-500 transition-all appearance-none"
                  >
                    <option value="">Selecciona tu tipo de local</option>
                    {RESTAURANT_TYPES.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={createLeadMutation.isLoading}
                className="w-full bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-900 font-black py-3.5 rounded-2xl transition-all text-sm uppercase tracking-widest disabled:opacity-60 mt-2"
              >
                {createLeadMutation.isLoading ? 'Enviando...' : 'Solicitar Demo Gratuita'}
              </button>

              <p className="text-[11px] text-slate-600 text-center flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck size={12} className="text-emerald-600" />
                Tus datos están seguros. Sin spam, prometido.
              </p>
            </form>
          </>
        ) : (
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={44} className="text-emerald-500" />
            </div>
            <h3 className="text-2xl font-black mb-2 text-white">¡Registro exitoso!</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Recibimos tu solicitud. Un especialista de <strong className="text-white">FoodFlow</strong> te escribirá por WhatsApp o email en las próximas 2 horas.
            </p>
            <button
              onClick={() => { setStep('form'); onClose(); }}
              className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors text-sm uppercase tracking-widest"
            >
              Volver al simulador →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
