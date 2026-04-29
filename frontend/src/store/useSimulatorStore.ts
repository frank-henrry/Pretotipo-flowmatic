import { create } from 'zustand';

interface OrderItem {
  id: string;
  name: string;
  desc: string;
  price: number;
  customizable: boolean;
}

interface Customization {
  guarnicion: string;
  cremas: string[];
}

interface SimulatorState {
  isFlowOpen: boolean;
  flowStep: number;
  chatMessages: any[];
  formData: {
    selectedItems: string[];
    customizations: Record<string, Customization>;
    name: string;
    address: string;
    reference: string;
    paymentMethod: string;
    deliveryMethod: string;
  };
  
  // Actions
  setIsFlowOpen: (open: boolean) => void;
  setFlowStep: (step: number) => void;
  addChatMessage: (msg: any) => void;
  toggleItem: (itemId: string, item: OrderItem) => void;
  updateCustomization: (itemId: string, updates: Partial<Customization>) => void;
  updateFormData: (updates: Partial<SimulatorState['formData']>) => void;
  resetForm: () => void;
}

export const useSimulatorStore = create<SimulatorState>((set) => ({
  isFlowOpen: false,
  flowStep: 1,
  chatMessages: [
    { id: 1, sender: 'business', time: '18:30', text: '¡Hola! Bienvenido a *FoodFlow* 🍽️✨.\n¿Te gustaría ver nuestra carta de hoy?' },
    { id: 2, sender: 'customer', time: '18:31', text: 'Hola, sí por favor. Tengo hambre 🤤' },
    { id: 3, sender: 'business', time: '18:31', text: '¡Excelente elección! Toca el botón de abajo para ver nuestro menú interactivo y armar tu pedido.', hasFlowButton: true }
  ],
  formData: {
    selectedItems: [],
    customizations: {},
    name: '',
    address: '',
    reference: '',
    paymentMethod: 'efectivo',
    deliveryMethod: 'delivery'
  },

  setIsFlowOpen: (open) => set({ isFlowOpen: open }),
  setFlowStep: (step) => set({ flowStep: step }),
  addChatMessage: (msg) => set((state) => ({ chatMessages: [...state.chatMessages, msg] })),
  
  toggleItem: (itemId, item) => set((state) => {
    const isSelected = state.formData.selectedItems.includes(itemId);
    let newSelected = isSelected 
      ? state.formData.selectedItems.filter(id => id !== itemId) 
      : [...state.formData.selectedItems, itemId];
    
    let newCustomizations = { ...state.formData.customizations };
    if (isSelected) {
      delete newCustomizations[itemId];
    } else if (item.customizable) {
      newCustomizations[itemId] = { guarnicion: 'Papas Fritas', cremas: [] };
    }
    
    return {
      formData: { ...state.formData, selectedItems: newSelected, customizations: newCustomizations }
    };
  }),

  updateCustomization: (itemId, updates) => set((state) => ({
    formData: {
      ...state.formData,
      customizations: {
        ...state.formData.customizations,
        [itemId]: { ...state.formData.customizations[itemId], ...updates }
      }
    }
  })),

  updateFormData: (updates) => set((state) => ({
    formData: { ...state.formData, ...updates }
  })),

  resetForm: () => set({
    formData: {
      selectedItems: [],
      customizations: {},
      name: '',
      address: '',
      reference: '',
      paymentMethod: 'efectivo',
      deliveryMethod: 'delivery'
    }
  })
}));
