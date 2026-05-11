// src/data/faq.ts

export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: "¿Necesito instalar algo o contratar un número de WhatsApp?",
    answer:
      "No. GenViaYA se conecta a tu número de WhatsApp Business existente a través de la API oficial de Meta. El proceso de vinculación toma menos de 10 minutos y no requiere cambiar tu número actual.",
  },
  {
    question: "¿Funciona si ya tengo muchos clientes por WhatsApp?",
    answer:
      "Precisamente para eso fue diseñado. GenViaYA está pensado para restaurantes ya posicionados con una base de clientes activa. El sistema aprende de tus pedidos históricos y adapta las respuestas automáticas a tu estilo de comunicación.",
  },
  {
    question: "¿Qué pasa si un cliente tiene una pregunta que el bot no sabe responder?",
    answer:
      "El sistema detecta consultas fuera de su alcance y transfiere la conversación a un agente humano en tiempo real, con el historial completo visible. Puedes retomar el control en cualquier momento desde el panel.",
  },
  {
    question: "¿Mis clientes sabrán que están hablando con un bot?",
    answer:
      "El flujo está diseñado para sentirse natural y conversacional. Puedes personalizar el nombre, tono y estilo de respuestas. La mayoría de usuarios completan pedidos sin preguntarse si hay un humano detrás.",
  },
  {
    question: "¿Puedo integrar GenViaYA con mi sistema de caja o POS actual?",
    answer:
      "Sí. Contamos con integraciones nativas con los principales sistemas POS del mercado latinoamericano, y una API abierta para conectar con cualquier plataforma personalizada.",
  },
  {
    question: "¿Qué pasa durante los primeros 14 días de demo?",
    answer:
      "Acceso completo a todas las funcionalidades sin restricciones. Un especialista de onboarding te acompañará en la configuración inicial y estará disponible durante todo el periodo de prueba.",
  },
];
