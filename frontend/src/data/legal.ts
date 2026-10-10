// src/data/legal.ts
export interface LegalClause {
  id: string;
  title: string;
  body: string;
}

export interface LegalSection {
  id: string;
  number: string;
  title: string;
  clauses: LegalClause[];
}

export const legalSections: LegalSection[] = [
  {
    id: "privacidad",
    number: "1",
    title: "Políticas de Privacidad",
    clauses: [
      {
        id: "1.1",
        title: "Identidad y Alcance",
        body: "GenViaYa opera como una plataforma SaaS integral enfocada en la gestión de pedidos, publicación de catálogo digital y validación de pagos vía WhatsApp para el rubro gastronómico. Iniciando operaciones estratégicas en Tingo María, Pucallpa y Huánuco (Perú), esta política regula el manejo de datos de nuestros clientes (restaurantes) y usuarios finales, en cumplimiento con la Ley de Protección de Datos Personales del Perú (Ley N° 29733).",
      },
      {
        id: "1.2",
        title: "Recopilación de Datos y Prevención de Fraudes",
        body: "La plataforma centraliza los mensajes de WhatsApp para evitar la pérdida de pedidos. Recopilamos información transaccional y comprobantes de pago de los usuarios. El uso de esta información tiene como fin exclusivo el uso de tecnología automatizada para prevenir fraudes, verificar transferencias y evitar errores manuales en horas de alta demanda.",
      },
      {
        id: "1.3",
        title: "Confidencialidad y Tratamiento de Datos de Consumidores Finales",
        body: "GenViaYa actúa estrictamente como proveedor tecnológico e infraestructura. La información personal de los consumidores finales (nombres, números de teléfono, direcciones de entrega y preferencias de consumo) pertenece de manera exclusiva al restaurante afiliado. GenViaYa garantiza que, en ninguna circunstancia, compartirá, venderá, cederá o distribuirá esta información a terceros. Asimismo, los datos de los comensales no serán utilizados para el envío de publicidad, promociones cruzadas ni comunicaciones ajenas a la operación directa del restaurante donde realizaron el pedido.",
      },
      {
        id: "1.4",
        title: "Seguridad y Protección de Datos del Restaurante",
        body: "Toda la información ingresada por el restaurante afiliado (métricas de ventas, catálogos, configuraciones operativas e información de facturación) se encuentra alojada en servidores seguros. GenViaYa garantiza la absoluta confidencialidad de esta información. Bajo ningún concepto compartimos, vendemos ni exponemos los datos operativos o comerciales de su negocio a terceros, competidores u otras entidades. Su información está protegida mediante estrictos protocolos de seguridad y cifrado para asegurar que solo usted, a través de su cuenta, tenga acceso a su Dashboard Web.",
      },
    ],
  },
  {
    id: "terminos",
    number: "2",
    title: "Términos y Condiciones Globales",
    clauses: [
      {
        id: "2.1",
        title: "Naturaleza del Servicio",
        body: "GenViaYa provee infraestructura tecnológica (Software) para que los negocios de comida modernicen su atención mediante un agente de IA. Nuestra estructura principal de cobro se basa en suscripciones fijas por volumen de uso; los cobros por comisión o porcentaje por transacción aplicarán única y exclusivamente en los acuerdos de planes personalizados estipulados previamente con el cliente. Toda la responsabilidad operativa (preparación, calidad alimentaria y entrega logística de los paquetes) recae exclusivamente sobre el restaurante.",
      },
      {
        id: "2.2",
        title: "Uso del Catálogo y Dashboard",
        body: "El cliente utilizará el Dashboard Web SaaS para gestionar su inventario y monitorear el rendimiento comercial en tiempo real. El cliente garantiza que los productos mostrados en el catálogo interactivo conectado a WhatsApp Business reflejan su disponibilidad y precios reales, evitando así el uso de menús en PDF desactualizados.",
      },
      {
        id: "2.3",
        title: "Exención de Responsabilidad por Logística y Entregas",
        body: "GenViaYa actúa exclusivamente como un proveedor de herramientas tecnológicas (SaaS). No prestamos servicios de logística, transporte, mensajería ni reparto de ningún tipo. Por consiguiente, GenViaYa NO SE HACE RESPONSABLE en ninguna circunstancia si los pedidos no son entregados al consumidor final, si sufren retrasos, o si llegan en mal estado. Cualquier reclamo, queja, exigencia de reembolso, daño o disputa legal relacionada con la entrega física del producto deberá ser resuelta directa y exclusivamente entre el consumidor final y el restaurante (El Cliente afiliado). El restaurante asume la total responsabilidad frente a sus comensales.",
      },
      {
        id: "2.4",
        title: "Dependencia de Plataformas de Terceros (WhatsApp y Meta)",
        body: "El servicio de GenViaYa se integra con la API de WhatsApp Business (propiedad de Meta Platforms, Inc.). GenViaYa no se hace responsable por caídas mundiales o regionales de los servidores de Meta, cambios en sus políticas de uso, o bloqueos de números telefónicos del restaurante originados por reportes de spam o violaciones a los términos de Meta. Cualquier interrupción derivada de terceros escapa a la responsabilidad técnica de GenViaYa y no será motivo de reembolso.",
      },
      {
        id: "2.5",
        title: "Pagos, Renovaciones y Reembolsos",
        body: "Los planes de suscripción se facturan de manera anticipada. Una vez iniciado el ciclo de facturación mensual o anual, no se realizarán reembolsos totales ni parciales por falta de uso de la plataforma o cancelaciones anticipadas. Asimismo, GenViaYa no asume la responsabilidad fiscal de la emisión de comprobantes de pago electrónicos o integraciones con módulos tributarios (como el SIRE de SUNAT) hacia los consumidores finales; dichas obligaciones son responsabilidad exclusiva del comercio afiliado.",
      },
      {
        id: "2.6",
        title: "Propiedad Intelectual",
        body: "Todo el código fuente, diseño de interfaces, algoritmos del agente de IA, arquitectura de la base de datos y marca registrada de GenViaYa son propiedad exclusiva de la empresa. El cliente conserva los derechos de autor únicamente sobre su propio contenido (fotografías de sus platos, logotipos de su restaurante y textos descriptivos de su menú).",
      },
      {
        id: "2.7",
        title: "Suspensión, Cancelación de Cuenta y Eliminación de Datos",
        body: "GenViaYa se reserva el derecho de suspender o cancelar el acceso a la plataforma sin previo aviso si el cliente incurre en impago, comercializa bienes ilícitos o realiza fraude electrónico. En caso de cancelación definitiva de un plan de pago (sea por decisión voluntaria del restaurante o por impago continuo), la cuenta será desactivada. La información comercial y operativa del restaurante se mantendrá respaldada de forma inactiva por un periodo máximo de noventa (90) días calendario. Concluido este plazo sin reactivación del servicio, todos los datos, catálogos y métricas serán eliminados permanentemente de nuestros servidores por políticas de seguridad, sin posibilidad de recuperación.",
      },
      {
        id: "2.8",
        title: "Disponibilidad del Servicio (SLA)",
        body: "GenViaYa se esfuerza por mantener una disponibilidad de la plataforma del 99.5% mensual. Sin embargo, el servicio se proporciona \"tal cual\". GenViaYa no será responsable por la pérdida de datos, ingresos, ventas o daños indirectos derivados de interrupciones causadas por mantenimientos programados, fallas de proveedores de hosting externos o problemas de conectividad a internet del propio restaurante.",
      },
      {
        id: "2.9",
        title: "Autorización y Responsabilidad de la Cuenta",
        body: "La persona que registra la cuenta declara poseer la autorización legal para actuar en nombre de la entidad comercial (restaurante). El usuario es el único responsable de la confidencialidad de sus credenciales de acceso. GenViaYa no se hace responsable por accesos no autorizados, robos de información o configuraciones erróneas debidas a la negligencia del usuario o a la compartición de claves con personal no autorizado.",
      },
      {
        id: "2.10",
        title: "Conducta Prohibida y Uso Aceptable",
        body: "El usuario se compromete a no utilizar la plataforma para fines ilegales. Queda estrictamente prohibido realizar ingeniería inversa del software, intentar vulnerar la seguridad del sistema, revender o sublicenciar el acceso a la plataforma sin autorización expresa, y subir contenido falso, difamatorio u ofensivo al catálogo.",
      },
      {
        id: "2.11",
        title: "Legislación Aplicable y Jurisdicción",
        body: "Los presentes términos y condiciones se rigen por las leyes de la República del Perú. Para cualquier controversia que pudiera derivarse de la prestación del servicio, ambas partes renuncian expresamente a cualquier otro fuero y se someten a la jurisdicción de los jueces y tribunales de la ciudad de Huánuco.",
      },
    ],
  },
];
