import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8010';
const ADMIN_SECRET = import.meta.env.VITE_ADMIN_SECRET || 'flowmatic-admin-2026';

export interface LeadData {
  name: string;
  email: string;
  phone: string;
  restaurant_type?: string;
}

const api = axios.create({
  baseURL: API_URL,
});

const adminApi = axios.create({
  baseURL: API_URL,
  headers: { 'x-admin-secret': ADMIN_SECRET },
});

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
    queryFn: () => adminApi.get('/admin/leads').then(r => r.data),
    refetchInterval: 30000, // refresh every 30s
  });
};

export const useAdminStats = () => {
  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => adminApi.get('/admin/stats').then(r => r.data),
  });
};
