import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';

// SIEMPRE usar /api como base URL (relativa).
// - En Docker: el Nginx del contenedor proxea /api/* → backend:8000
// - En npm run dev: el proxy de vite.config.ts proxea /api/* → localhost:8010
const api = axios.create({ baseURL: '/api' });
const adminApi = axios.create({
  baseURL: '/api',
  headers: { 'x-admin-secret': 'flowmatic-admin-2026' },
});

export interface LeadData {
  name: string;
  email: string;
  phone: string;
  restaurant_type?: string;
}

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: (orderData: Record<string, unknown>) => api.post('/orders', orderData),
  });
};

export const useCreateLead = () => {
  return useMutation({
    mutationFn: (leadData: LeadData) => api.post('/leads', leadData),
  });
};

// ── Admin ──────────────────────────────────────────────────────────────────
export const useAdminLeads = () => {
  return useQuery({
    queryKey: ['admin-leads'],
    queryFn: (): Promise<AdminLead[]> =>
      adminApi.get<AdminLead[]>('/admin/leads').then(r => r.data),
    refetchInterval: 30_000,
  });
};

export const useAdminStats = () => {
  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: (): Promise<AdminStats> =>
      adminApi.get<AdminStats>('/admin/stats').then(r => r.data),
  });
};

export interface AdminLead {
  id: number;
  name: string;
  email: string;
  phone: string;
  restaurant_type: string;
  created_at: string;
}

export interface AdminStats {
  total_leads: number;
  total_orders: number;
}
