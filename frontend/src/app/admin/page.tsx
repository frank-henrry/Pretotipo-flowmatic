"use client";

import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, Mail, Phone, Store, RefreshCw, Lock, LogOut } from 'lucide-react';
import { getAdminLeads, getAdminStats, type AdminLead, type AdminStats } from '../../lib/api';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [leads, setLeads] = useState<AdminLead[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === (process.env.NEXT_PUBLIC_ADMIN_SECRET ?? '')) {
      setIsAuthenticated(true);
      setError(null);
    } else {
      setError('Contraseña incorrecta');
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [leadsData, statsData] = await Promise.all([
        getAdminLeads(),
        getAdminStats()
      ]);
      setLeads(leadsData);
      setStats(statsData);
      setError(null);
    } catch (err) {
      setError('Error al cargar datos. Verifique la conexión con el backend.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#111111] border border-[#282828] rounded-2xl p-8 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-[#22c55e]/10 rounded-xl flex items-center justify-center">
              <Lock className="text-[#22c55e]" size={24} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white text-center mb-2">Panel de Control</h1>
          <p className="text-gray-400 text-center mb-8 text-sm">Ingrese su clave de acceso para continuar</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="w-full bg-[#191919] border border-[#282828] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors"
                autoFocus
              />
            </div>
            {error && <p className="text-red-500 text-xs text-center">{error}</p>}
            <button
              type="submit"
              className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-[#22c55e]/20"
            >
              Acceder
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#22c55e] rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-[#22c55e]/20">G</div>
            <h1 className="text-xl font-bold tracking-tight">GenViaYA <span className="text-[#22c55e] text-sm ml-1 font-medium opacity-80">ADMIN</span></h1>
          </div>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
          >
            <LogOut size={16} /> Salir
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-[#111111] border border-[#282828] rounded-2xl p-6 relative overflow-hidden group hover:border-[#22c55e]/30 transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-[#22c55e]/10 rounded-xl flex items-center justify-center text-[#22c55e]">
                <Users size={20} />
              </div>
              <p className="text-gray-400 font-medium">Total Leads</p>
            </div>
            <p className="text-4xl font-bold mb-1">{stats?.total_leads ?? 0}</p>
            <p className="text-xs text-gray-500">personas interesadas</p>
          </div>

          <div className="bg-[#111111] border border-[#282828] rounded-2xl p-6 relative overflow-hidden group hover:border-[#06b6d4]/30 transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-[#06b6d4]/10 rounded-xl flex items-center justify-center text-[#06b6d4]">
                <TrendingUp size={20} />
              </div>
              <p className="text-gray-400 font-medium">Pedidos Demo</p>
            </div>
            <p className="text-4xl font-bold mb-1">{stats?.total_orders ?? 0}</p>
            <p className="text-xs text-gray-500">interacciones con el simulador</p>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-[#111111] border border-[#282828] rounded-2xl overflow-hidden shadow-xl">
          <div className="p-6 border-b border-[#282828] flex justify-between items-center bg-[#141414]">
            <h2 className="font-bold text-lg">Leads Capturados</h2>
            <button 
              onClick={fetchData} 
              disabled={isLoading}
              className="p-2 hover:bg-[#22c55e]/10 rounded-lg text-gray-400 hover:text-[#22c55e] transition-all disabled:opacity-50"
            >
              <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-500 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">Cliente / Negocio</th>
                  <th className="px-6 py-4 font-semibold">Contacto</th>
                  <th className="px-6 py-4 font-semibold">Fecha</th>
                  <th className="px-6 py-4 font-semibold text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#282828]">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-20 text-center text-gray-500">
                      <div className="flex flex-col items-center gap-3">
                        <span className="text-4xl opacity-20">📬</span>
                        <p className="text-sm">Aún no hay leads registrados.</p>
                        <p className="text-xs opacity-60">Comparte tu landing y los verás aparecer aquí.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-[#141414] transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-sm text-gray-200">{lead.name}</span>
                          <div className="flex items-center gap-1.5 mt-1">
                            <Store size={12} className="text-[#22c55e]/60" />
                            <span className="text-xs text-gray-500">{lead.restaurant_type || 'Restaurante'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-xs text-gray-400 group-hover:text-gray-300">
                            <Mail size={12} /> {lead.email}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-400 group-hover:text-gray-300">
                            <Phone size={12} /> {lead.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-gray-500">
                          {new Date(lead.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <a 
                          href={`https://api.whatsapp.com/send?phone=${lead.phone.replace(/\D/g, '')}&text=Hola%20${encodeURIComponent(lead.name)}!%20Soy%20de%20GenViaYA.%20Vi%20que%20solicitaste%20una%20demo%20para%20tu%20negocio.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-[#22c55e]/10 hover:bg-[#22c55e] text-[#22c55e] hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all border border-[#22c55e]/20"
                        >
                          Enviar demo →
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
