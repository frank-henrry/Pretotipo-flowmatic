// src/data/features.ts

export interface Feature {
  id: string;
  icon: string; // nombre de ícono Lucide
  badge?: string;
  title: string;
  description: string;
  highlights: string[];
  accent: "green" | "cyan";
  size: "large" | "small"; // para el bento grid
}

export const features: Feature[] = [
  {
    id: "whatsapp-orders",
    icon: "MessageCircle",
    badge: "Core",
    title: "Pedidos por WhatsApp",
    description:
      "Menú interactivo nativo en el chat. El cliente personaliza, confirma y paga sin salir de WhatsApp.",
    highlights: [
      "Menú con fotos y categorías",
      "Personalización de platos",
      "Confirmación automática",
    ],
    accent: "green",
    size: "large",
  },
  {
    id: "crm-chats",
    icon: "Users",
    badge: "CRM",
    title: "Panel y Visor de Chats",
    description:
      "Historial completo de cada cliente y transcripción exacta de conversaciones automatizadas.",
    highlights: ["Perfil por cliente", "Historial de compras", "Segmentación"],
    accent: "cyan",
    size: "small",
  },
  {
    id: "logistics",
    icon: "Truck",
    badge: "Logística",
    title: "Despacho Inteligente",
    description:
      "Asigna repartidores, cambia estados de pedido y controla entregas en tiempo real desde un dashboard.",
    highlights: [
      "Asignación automática",
      "Estados en tiempo real",
      "Tracking de entrega",
    ],
    accent: "green",
    size: "small",
  },
  {
    id: "reservations",
    icon: "CalendarCheck",
    badge: "Local",
    title: "Mesas y Reservas",
    description:
      "Administra la capacidad de tu local y reservas desde un panel centralizado. Sin llamadas, sin confusiones.",
    highlights: [
      "Mapa de mesas en vivo",
      "Reservas por WhatsApp",
      "Alertas de capacidad",
    ],
    accent: "cyan",
    size: "large",
  },
];
