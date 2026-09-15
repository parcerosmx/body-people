/**
 * Datos estructurados ExerciseGym para Google, armados desde negocio.yml.
 * Sin aggregateRating: Google no muestra estrellas cuando el negocio controla sus propias reseñas.
 */
import { negocio, pesos } from "./negocio";

const DIA_SCHEMA = {
  lunes: "Monday", martes: "Tuesday", miercoles: "Wednesday", jueves: "Thursday",
  viernes: "Friday", sabado: "Saturday", domingo: "Sunday",
} as const;

export function schemaGimnasio(site: URL) {
  const n = negocio;
  const url = new URL("/", site).href;
  const mapa = `https://maps.google.com/?cid=${n.google.cid}`;

  // Agrupa los días con las mismas franjas: Lunes a viernes 05:00-14:00 y 16:00-22:00, etc.
  const horario = (Object.keys(DIA_SCHEMA) as (keyof typeof DIA_SCHEMA)[]).flatMap((dia) =>
    n.horario[dia].map(([opens, closes]) => ({ dia: DIA_SCHEMA[dia], opens, closes })),
  );
  const grupos = new Map<string, string[]>();
  for (const h of horario) {
    const clave = `${h.opens}-${h.closes}`;
    grupos.set(clave, [...(grupos.get(clave) ?? []), h.dia]);
  }
  const openingHoursSpecification = [...grupos].map(([clave, dias]) => {
    const [opens, closes] = clave.split("-");
    return { "@type": "OpeningHoursSpecification", dayOfWeek: dias, opens, closes };
  });

  const festivos = n.festivos.flatMap((fecha) =>
    n.horario.festivo.map(([opens, closes]) => ({
      "@type": "OpeningHoursSpecification", opens, closes, validFrom: fecha, validThrough: fecha,
    })),
  );

  const precios = [n.precios.mensualidad, n.precios.primer_mes, ...(n.reto.activo ? [n.reto.precio] : [])];
  const ofertas = [
    { "@type": "Offer", name: "Valoración de ingreso", price: 0, priceCurrency: "COP" },
    { "@type": "Offer", name: "Mensualidad", price: n.precios.mensualidad, priceCurrency: "COP" },
    { "@type": "Offer", name: "Primer mes con inscripción", price: n.precios.primer_mes, priceCurrency: "COP" },
    ...(n.reto.activo ? [{ "@type": "Offer", name: n.reto.nombre, price: n.reto.precio, priceCurrency: "COP" }] : []),
  ];

  return {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    "@id": `${url}#gimnasio`,
    name: n.nombre,
    url,
    telephone: n.contacto.telefono,
    image: [new URL("/og-body-people.jpg", site).href],
    logo: new URL("/apple-touch-icon.png", site).href,
    description: `Gimnasio en el ${n.direccion.sector} de ${n.direccion.ciudad}. ${n.entrenador.nombre}, ${n.entrenador.titulo.toLowerCase()}, arma tu plan de entrenamiento y nutricional y controla tu progreso cada mes.`,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${n.direccion.calle}, ${n.direccion.sector}`,
      addressLocality: n.direccion.ciudad,
      addressRegion: n.direccion.departamento,
      addressCountry: n.direccion.pais,
    },
    geo: { "@type": "GeoCoordinates", latitude: n.direccion.lat, longitude: n.direccion.lng },
    hasMap: mapa,
    openingHoursSpecification: [...openingHoursSpecification, ...festivos],
    priceRange: `${pesos(Math.min(...precios))} – ${pesos(Math.max(...precios))}`,
    currenciesAccepted: "COP",
    paymentAccepted: "Tarjeta débito, tarjeta de crédito",
    amenityFeature: n.comodidades
      .filter((c) => !/pago/i.test(c))
      .map((c) => ({ "@type": "LocationFeatureSpecification", name: c, value: true })),
    makesOffer: ofertas,
    employee: { "@type": "Person", name: n.entrenador.nombre, jobTitle: n.entrenador.titulo },
    sameAs: [n.contacto.instagram, n.contacto.facebook, mapa],
    areaServed: { "@type": "City", name: n.direccion.ciudad },
  };
}
