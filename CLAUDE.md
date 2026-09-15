# body-people — web del Gimnasio Body People

Índice corto. El estado y lo que sigue están en [docs/pendientes.md](docs/pendientes.md): leerlo primero.

## Qué es

- gimnasiobodypeople.com: gimnasio de barrio en el sector Amarilo (Villavicencio), atendido por su dueño y
  entrenador, Mariano Pinzón.
- **Objetivo de la web:** que la persona escriba por WhatsApp. Mientras el reto está activo, pide un cupo del
  **Reto 30 días**; si no, agenda la **valoración de ingreso gratis**.
- **Stack:** Astro 7 estático → Vercel (equipo Parceros, plan Pro). Dominio en GoDaddy.
- **Publicada el 15-sep-2026** en https://gimnasiobodypeople.com: DNS de GoDaddy → Vercel; `main` = producción.
- ⛔ **Publicar sigue siendo decisión de Andrés:** cambios en ramas con PR. Hasta conectar Vercel con GitHub,
  producción se despliega a mano desde `main` con `vercel deploy --prod --scope parceros`.

## Reglas transversales

- **Datos del negocio:**
  - viven **solo** en [src/datos/negocio.yml](src/datos/negocio.yml);
  - salen de `~/src/claude-ia/bodypeople-maps/ficha-google-maps.md`;
  - dirección y horario, idénticos a Google;
  - `src/lib/negocio.ts` los valida y hace fallar el build si están mal escritos.
- ⛔ **No inventar** testimonios, cifras, transformaciones, certificaciones ni precios. Lo que falta va como
  `PENDIENTE` en un comentario, y se pregunta.
- ⛔ **Gimnasio Body People 2** (Calle 3D #13-20, Hotel Hacaritama) es OTRO negocio: nada suyo.
- ⛔ **No es Parceros:** no se usan activos, colores ni skills de Parceros.
- **Ofertas:** una sola principal a la vez. `reto.activo` en `negocio.yml` decide cuál: el reto no tiene fecha de
  fin.
- ⛔ **Escasez:** nunca un cupo total inventado; solo grupos de 25 con conteo real.
- **Reglas de Meta para textos del reto:** no prometer kilos, nada de antes y después, no aludir al cuerpo.
- **Celular primero.** Meta de Lighthouse en celular: ≥ 90 en rendimiento, SEO y accesibilidad.
- **Nada depende de una animación para verse.** Hero sin video; fotos con `<Picture>` (AVIF/WebP).

## Comandos

```bash
npm install
npm run dev
npm run build
```

- `npm run dev` levanta el servidor en `localhost:4321`.
- `npm run build` genera `dist/` y es lo que corre Vercel.

## Dónde está cada cosa

| Tema | Archivo |
| --- | --- |
| Estado, decisiones y siguiente entrega | [docs/pendientes.md](docs/pendientes.md) |
| Datos editables (precios, horario, reto, festivos) | [src/datos/negocio.yml](src/datos/negocio.yml) |
| Validación, formato de precios, enlaces de WhatsApp y Maps | [src/lib/negocio.ts](src/lib/negocio.ts) |
| Sistema visual (tokens, tipografía, botones) | [src/styles/global.css](src/styles/global.css) |
| Hero, oferta y estado «abierto ahora» | `src/components/Hero.astro`, `EstadoAbierto.astro` |
| Resto de secciones (esqueleto de la entrega 2) | `src/components/Secciones.astro` |
| Investigación de la entrega 1, con capturas | `~/src/claude-ia/bodypeople-maps/docs/web-investigacion/` (fuera del repo, que es público) |
| Artifact de la investigación | https://claude.ai/artifact/XEyxPdj4JU94zUehDKSbYD |
| Guion y condiciones del Reto 30 días | `~/src/claude-ia/bodypeople-maps/video-reto-30-dias.md` |
| Fotos originales | `~/src/claude-ia/bodypeople-maps/fotos/` |
