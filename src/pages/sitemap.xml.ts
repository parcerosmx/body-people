import type { APIRoute } from "astro";

// Una sola página. Si se agregan páginas, sumarlas aquí.
const paginas = ["/"];

export const GET: APIRoute = ({ site }) => {
  const hoy = new Date().toISOString().slice(0, 10);
  const urls = paginas
    .map((p) => `  <url><loc>${new URL(p, site).href}</loc><lastmod>${hoy}</lastmod></url>`)
    .join("\n");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
};
