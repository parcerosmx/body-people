// @ts-check
import { defineConfig } from "astro/config";

// Sitio estático: Vercel publica la carpeta dist/ tal cual.
export default defineConfig({
  site: "https://gimnasiobodypeople.com",
  trailingSlash: "ignore",
  // CSS en línea: es poco y así no bloquea el primer pintado en el celular.
  build: { format: "file", inlineStylesheets: "always" },
});
