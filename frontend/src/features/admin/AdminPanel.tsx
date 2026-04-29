import React, { useState } from 'react';
import { Users, TrendingUp, Mail, Phone, Store, RefreshCw, Lock, LogOut } from 'lucide-react';
import { useAdminLeads, useAdminStats } from '../../services/api';

interface AdminPanelProps {
  onLogout: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout }) => {
  const { data: leads, isLoading, refetch } = useAdminLeads();
  const { data: stats } = useAdminStats();

  return (
    <div className="min-h-screen bg-[#080c14] text-white">
      {/* Admin Navbar */}
      <nav className="h-14 bg-slate-900/80 backdrop-blur border-b border-white/5 flex items-center px-6 justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-slate-900 font-black text-sm">F</div>
          <span className="font-black tracking-tight">FoodFlow <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest ml-1">Admin</span></span>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors"
        >
          <LogOut size={16} /> Salir
        </button>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-emerald-500/10 rounded-xl">
                <Users size={18} className="text-emerald-400" />
              </div>
              <span className="text-slate-400 text-sm font-medium">Total Leads</span>
            </div>
            <div className="text-4xl font-black text-white">{stats?.total_leads ?? '—'}</div>
            <p className="text-xs text-slate-500 mt-1">personas interesadas</p>
          </div>
          <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-violet-500/10 rounded-xl">
                <TrendingUp size={18} className="text-violet-400" />
              </div>
              <span className="text-slate-400 text-sm font-medium">Pedidos Demo</span>
            </div>
            <div className="text-4xl font-black text-white">{stats?.total_orders ?? '—'}</div>
            <p className="text-xs text-slate-500 mt-1">interacciones con el simulador</p>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-slate-900/60 border border-white/5 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-white/5 flex items-center justify-between">
            <h2 className="font-black text-lg">Leads Capturados</h2>
            <button
              onClick={() => refetch()}
              className="flex items-center gap-2 text-slate-400 hover:text-white text-xs transition-colors bg-slate-800 px-3 py-2 rounded-xl"
            >
              <RefreshCw size={13} /> Actualizar
            </button>
          </div>

          {isLoading ? (
            <div className="p-12 text-center text-slate-500">Cargando leads...</div>
          ) : !leads || leads.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-4xl mb-3">📭</div>
              <p className="text-slate-400 font-medium">Aún no hay leads registrados.</p>
              <p className="text-slate-600 text-sm mt-1">Comparte tu landing y los verás aparecer aquí.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-slate-500 text-xs uppercase tracking-wider">
                    <th className="text-left px-5 py-3">#</th>
                    <th className="text-left px-5 py-3">Nombre</th>
                    <th className="text-left px-5 py-3">Email</th>
                    <th className="text-left px-5 py-3">Teléfono</th>
                    <th className="text-left px-5 py-3">Negocio</th>
                    <th className="text-left px-5 py-3">Fecha</th>
                    <th className="text-left px-5 py-3">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead: {
                    id: number;
                    name: string;
                    email: string;
                    phone: string;
                    restaurant_type: string;
                    created_at: string;
                  }) => (
                    <tr key={lead.id} className="border-b border-white/3 hover:bg-white/2 transition-colors">
                      <td className="px-5 py-4 text-slate-500">{lead.id}</td>
                      <td className="px-5 py-4 font-semibold text-white">{lead.name}</td>
                      <td className="px-5 py-4">
                        <a href={`mailto:${lead.email}`} className="text-emerald-400 hover:underline flex items-center gap-1.5">
                          <Mail size={13} /> {lead.email}
                        </a>
                      </td>
                      <td className="px-5 py-4">
                        <a href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="text-sky-400 hover:underline flex items-center gap-1.5">
                          <Phone size={13} /> {lead.phone}
                        </a>
                      </td>
                      <td className="px-5 py-4">
                        <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium flex items-center gap-1 w-fit">
                          <Store size={11} /> {lead.restaurant_type || '—'}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-500 text-xs">
                        {new Date(lead.created_at).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="px-5 py-4">
                        <a
                          href={`https://wa.me/${lead.phone.replace(/\D/g, '')}?text=Hola%20${encodeURIComponent(lead.name)}%2C%20te%20contactamos%20de%20FoodFlow%20para%20coordinar%20tu%20demo%20gratuita.`}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                        >
                          Enviar demo →
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Login screen for admin ────────────────────────────────────────────────
interface AdminLoginProps {
  onLogin: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === 'flowmatic-admin-2026') {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-white flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-3xl p-8 w-full max-w-sm border border-white/10">
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-slate-900 font-black text-2xl">F</div>
        </div>
        <h1 className="text-xl font-black text-center mb-1">Panel Administrador</h1>
        <p className="text-slate-500 text-sm text-center mb-6">FoodFlow · Acceso restringido</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Contraseña de administrador"
              className={`w-full bg-slate-800 border rounded-xl pl-9 pr-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-emerald-500 transition-all ${error ? 'border-red-500 animate-pulse' : 'border-slate-700'}`}
            />
          </div>
          {error && <p className="text-red-400 text-xs text-center">Contraseña incorrecta</p>}
          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black py-3 rounded-xl transition-all text-sm"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};
