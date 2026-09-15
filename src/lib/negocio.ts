import { load } from "js-yaml";
import crudo from "../datos/negocio.yml?raw";

type Franja = [string, string];
type Dia = "lunes" | "martes" | "miercoles" | "jueves" | "viernes" | "sabado" | "domingo" | "festivo";

export interface Negocio {
  nombre: string;
  entrenador: { nombre: string; titulo: string; trayectoria: string };
  contacto: { telefono: string; whatsapp: string; instagram: string; facebook: string };
  direccion: {
    calle: string; sector: string; ciudad: string; departamento: string; pais: string;
    referencia: string; lat: number; lng: number;
  };
  google: { place_id: string; cid: string; enlace_resenas: string; calificacion: string };
  horario: Record<Dia, Franja[]>;
  festivos: string[];
  precios: { mensualidad: number; primer_mes: number; valoracion_gratis: boolean };
  reto: {
    activo: boolean; nombre: string; lema: string; precio: number; incluye_inscripcion: boolean;
    sin_permanencia: boolean; personas_por_grupo: number; incluye: string[]; comparacion: string; garantia: string;
  };
  programas: { id: string; nombre: string; corto: string; detalle: string; imagen: string; imagen_ia: boolean }[];
  servicios: string[];
  no_ofrece: string[];
  comodidades: string[];
  medicion: { pixel_meta: string; ga4: string; search_console: string };
}

export const DIAS: Dia[] = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];

/** Falla el build con un mensaje claro si negocio.yml quedó mal escrito: así nunca se publica una web rota. */
function validar(d: any): Negocio {
  const errores: string[] = [];
  const exigir = (cond: unknown, msg: string) => { if (!cond) errores.push(msg); };
  const esHora = (h: unknown) => typeof h === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(h);

  exigir(typeof d?.nombre === "string", "falta «nombre»");
  exigir(/^57\d{10}$/.test(String(d?.contacto?.whatsapp ?? "")), "«contacto.whatsapp» debe ser 57 + 10 dígitos, sin + ni espacios");
  for (const dia of [...DIAS, "festivo"] as Dia[]) {
    const franjas = d?.horario?.[dia];
    exigir(Array.isArray(franjas), `falta el horario de «${dia}»`);
    for (const f of franjas ?? []) exigir(Array.isArray(f) && f.length === 2 && esHora(f[0]) && esHora(f[1]) && f[0] < f[1], `franja inválida en «${dia}»: ${JSON.stringify(f)} (usa ["05:00", "14:00"])`);
  }
  for (const f of d?.festivos ?? []) exigir(typeof f === "string" && /^\d{4}-\d{2}-\d{2}$/.test(f), `festivo inválido: ${f} (usa "2026-12-25" entre comillas)`);
  for (const k of ["mensualidad", "primer_mes"]) exigir(Number.isInteger(d?.precios?.[k]) && d.precios[k] > 0, `«precios.${k}» debe ser un número sin puntos, como 105000`);
  exigir(typeof d?.reto?.activo === "boolean", "«reto.activo» debe ser true o false");
  if (d?.reto?.activo) {
    for (const k of ["precio", "personas_por_grupo"]) exigir(Number.isInteger(d?.reto?.[k]) && d.reto[k] > 0, `«reto.${k}» debe ser un número sin puntos`);
    exigir(Array.isArray(d?.reto?.incluye) && d.reto.incluye.length > 0, "«reto.incluye» necesita al menos un ítem");
  }

  const m = d?.medicion ?? {};
  exigir(m.pixel_meta === "" || /^\d{10,20}$/.test(String(m.pixel_meta ?? "")), "«medicion.pixel_meta» debe ser solo números, entre comillas, o \"\"");
  exigir(m.ga4 === "" || /^G-[A-Z0-9]{4,}$/.test(String(m.ga4 ?? "")), "«medicion.ga4» debe verse como \"G-XXXXXXXXXX\" o quedar \"\"");
  exigir(typeof m.search_console === "string", "«medicion.search_console» debe ir entre comillas (puede ser \"\")");

  if (errores.length) throw new Error(`negocio.yml tiene errores:\n - ${errores.join("\n - ")}`);
  return d as Negocio;
}

export const negocio = validar(load(crudo));

/** 105000 → "$105.000" */
export const pesos = (n: number) => "$" + n.toLocaleString("es-CO", { maximumFractionDigits: 0 }).replace(/,/g, ".");

/** "16:00" → "4:00 p.m." */
export function hora12(h: string) {
  const [hh, mm] = h.split(":").map(Number);
  const sufijo = hh < 12 ? "a.m." : "p.m.";
  const h12 = hh % 12 === 0 ? 12 : hh % 12;
  return `${h12}:${String(mm).padStart(2, "0")} ${sufijo}`;
}

export const franjasTexto = (franjas: Franja[]) => franjas.map(([a, c]) => `${hora12(a)} – ${hora12(c)}`).join(" · ");

export const direccionCompleta = () => {
  const d = negocio.direccion;
  return `${d.calle}, ${d.sector}, ${d.ciudad}, ${d.departamento}`;
};

/* ---------- Enlaces ---------- */

/**
 * Cada botón abre WhatsApp con un mensaje distinto, para saber en el chat de dónde vino.
 * La clave es la «intención» que se mide como evento (entrega 3).
 */
export const MENSAJES = {
  reto: `Hola Mariano, quiero un cupo en el ${negocio.reto.nombre} de Body People. ¡Acepto el reto!`,
  valoracion: "Hola Mariano, quiero agendar mi valoración gratis en Body People.",
  precios: "Hola, vi los precios en la web y quiero agendar mi valoración gratis.",
  horario: "Hola, ¿qué horario me recomiendas para ir a la valoración?",
  desde_cero: "Hola, nunca he ido a un gimnasio y quiero empezar. ¿Cuándo puedo ir a la valoración?",
  mariano: "Hola Mariano, quiero hablar contigo sobre mi plan de entrenamiento.",
} as const;

export type Intencion = keyof typeof MENSAJES | `objetivo:${string}`;

export function mensajeObjetivo(programa: { nombre: string }) {
  const base = negocio.reto.activo ? MENSAJES.reto : MENSAJES.valoracion;
  return `${base} Mi objetivo es: ${programa.nombre.toLowerCase()}.`;
}

export const whatsapp = (texto: string) =>
  `https://wa.me/${negocio.contacto.whatsapp}?text=${encodeURIComponent(texto)}`;

export const telefonoHref = () => `tel:+${negocio.contacto.whatsapp}`;

const nombreUrl = encodeURIComponent(negocio.nombre);
/** Ficha nueva de Google Maps (place_id), sin clave de API. */
export const mapaFicha = () =>
  `https://www.google.com/maps/search/?api=1&query=${nombreUrl}&query_place_id=${negocio.google.place_id}`;
/** Ruta hasta el gimnasio: en el celular abre la app de Maps. */
export const comoLlegar = () =>
  `https://www.google.com/maps/dir/?api=1&destination=${nombreUrl}&destination_place_id=${negocio.google.place_id}`;
