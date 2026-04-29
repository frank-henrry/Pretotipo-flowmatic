import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8010';

const api = axios.create({
  baseURL: API_URL,
});

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: (orderData: any) => api.post('/orders', orderData),
  });
};

export const useCreateLead = () => {
  return useMutation({
    mutationFn: (leadData: { contact: string }) => api.post('/leads', leadData),
  });
};
