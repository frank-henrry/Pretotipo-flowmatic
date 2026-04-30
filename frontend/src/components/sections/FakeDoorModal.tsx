"use client";

import React, { useState } from 'react';
import { sendGAEvent } from '@next/third-parties/google';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, MessageSquare, Utensils, Phone, Mail, User } from 'lucide-react';
import { createLead } from '../../lib/api';

interface FakeDoorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FakeDoorModal({ isOpen, onClose }: FakeDoorModalProps) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    restaurant_type: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await createLead(formData);
      setStep('success');
      
      // Tracking conversion in Google Analytics
      sendGAEvent('event', 'lead_captured', {
        restaurant_type: formData.restaurant_type,
        value: 1
      });
    } catch (err) {
      console.error(err);
      setError('Hubo un error al procesar tu solicitud. Por favor intenta de nuevo.');
      // En un pretotipo, a veces mostramos éxito igual para no perder al usuario
      // pero aquí queremos que funcione de verdad.
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-[#111111] border border-[#282828] rounded-3xl overflow-hidden shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            {step === 'form' ? (
              <div className="p-8 sm:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#22c55e]/10 rounded-xl flex items-center justify-center text-[#22c55e]">
                    <MessageSquare size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-white">Solicitar Acceso Gratuito</h2>
                </div>
                
                <p className="text-gray-400 text-sm mb-8">
                  Déjanos tus datos y te contactaremos en menos de 24 horas para activar tu demo de 14 días.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-4">
                    <div className="relative">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        required
                        name="name"
                        type="text"
                        placeholder="Tu nombre completo"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-[#191919] border border-[#282828] rounded-xl pl-11 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#22c55e] transition-colors"
                      />
                    </div>

                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        required
                        name="email"
                        type="email"
                        placeholder="Correo electrónico"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-[#191919] border border-[#282828] rounded-xl pl-11 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#22c55e] transition-colors"
                      />
                    </div>

                    <div className="relative">
                      <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        required
                        name="phone"
                        type="tel"
                        placeholder="WhatsApp / Teléfono"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-[#191919] border border-[#282828] rounded-xl pl-11 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#22c55e] transition-colors"
                      />
                    </div>

                    <div className="relative">
                      <Utensils size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <select
                        name="restaurant_type"
                        value={formData.restaurant_type}
                        onChange={handleChange}
                        className="w-full bg-[#191919] border border-[#282828] rounded-xl pl-11 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#22c55e] transition-colors appearance-none"
                      >
                        <option value="">Tipo de negocio</option>
                        <option value="Pollería">Pollería</option>
                        <option value="Pizzería">Pizzería</option>
                        <option value="Cevichería">Cevichería</option>
                        <option value="Cafetería">Cafetería</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>
                  </div>

                  {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

                  <button
                    disabled={isLoading}
                    type="submit"
                    className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-[#22c55e]/20 mt-4 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>Pedir mi acceso gratis <Send size={16} /></>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="p-10 text-center">
                <div className="w-20 h-20 bg-[#22c55e]/10 rounded-full flex items-center justify-center text-[#22c55e] mx-auto mb-6">
                  <CheckCircle size={40} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">¡Solicitud Enviada!</h2>
                <p className="text-gray-400 mb-8">
                  Gracias por tu interés en FoodFlow. Uno de nuestros asesores te contactará vía WhatsApp para activar tu demo gratuita.
                </p>
                <button
                  onClick={onClose}
                  className="w-full bg-[#191919] hover:bg-[#222222] text-white font-bold py-4 rounded-xl transition-all border border-[#282828]"
                >
                  Entendido
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
