// src/data/testimonials.ts

export interface Testimonial {
  name: string;
  role: string;
  restaurant: string;
  city: string;
  text: string;
  initials: string;
  accentColor: "green" | "cyan";
}

export const testimonials: Testimonial[] = [
  {
    name: "Gabriela Torres",
    role: "Propietaria",
    restaurant: "La Leña Parrilla",
    city: "Lima",
    text: "Antes perdíamos pedidos porque no dábamos abasto en el WhatsApp. Ahora el bot responde al instante y nosotros solo confirmamos. Las ventas por delivery subieron 40% el primer mes.",
    initials: "GT",
    accentColor: "green",
  },
  {
    name: "Marco Quispe",
    role: "Gerente de Operaciones",
    restaurant: "Cevichería Don Marcos",
    city: "Trujillo",
    text: "Lo que más me convenció fue el visor de chats. Puedo ver en tiempo real qué piden, quién los atiende y dónde está el repartidor. Todo en una sola pantalla.",
    initials: "MQ",
    accentColor: "cyan",
  },
  {
    name: "Sofía Ramírez",
    role: "Administradora",
    restaurant: "Bistró Sofía",
    city: "Arequipa",
    text: "El módulo de mesas me salvó los fines de semana. Los clientes reservan por WhatsApp y yo veo el mapa del local en tiempo real. Cero llamadas, cero confusiones.",
    initials: "SR",
    accentColor: "green",
  },
  {
    name: "Rodrigo Mendoza",
    role: "Fundador",
    restaurant: "Burger Lab",
    city: "Cusco",
    text: "Pensé que era complicado pero la configuración inicial tomó menos de un día. El equipo de FoodFlow estuvo con nosotros en todo momento. Ahora no imagino el restaurante sin esto.",
    initials: "RM",
    accentColor: "cyan",
  },
];
