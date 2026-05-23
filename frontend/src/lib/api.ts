import axios from 'axios';

// En producción (Docker), Nginx proxea /api/* -> backend:8000
const API_URL = '/api';

const api = axios.create({ baseURL: API_URL });

const adminApi = axios.create({
  baseURL: API_URL,
  headers: {
    'x-admin-secret': process.env.NEXT_PUBLIC_ADMIN_SECRET ?? '',
  },
});

export interface LeadData {
  name: string;
  email: string;
  phone: string;
  restaurant_type?: string;
}

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

export const createLead = async (leadData: LeadData) => {
  return api.post('/leads', leadData);
};

export const getAdminLeads = async (): Promise<AdminLead[]> => {
  return adminApi.get('/admin/leads').then(r => r.data);
};

export const getAdminStats = async (): Promise<AdminStats> => {
  return adminApi.get('/admin/stats').then(r => r.data);
};
