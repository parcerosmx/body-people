# Pendientes — web nueva de Body People

Actualizado el 15-sep-2026, al cerrar la **entrega 4 de 4**. **La web nueva está publicada en https://gimnasiobodypeople.com** (Vercel).

## Plan de entregas

| # | Entrega | Estado |
| --- | --- | --- |
| 1 | Investigación y auditoría de la web actual → Artifact | ✅ 15-sep-2026 |
| 2 | Sistema visual, stack, hero y esqueleto en celular, imágenes optimizadas | ✅ 15-sep-2026 |
| 3 | Schema, og:image, robots y sitemap, Meta Pixel por intención, GA4 y Search Console listos, detalles | ✅ 15-sep-2026 |
| 4 | Verificación, antes y después, dominio y DNS en Vercel, merge | ✅ 15-sep-2026 (quedan 2 pasos que necesitan la cuenta andrestntx) |

## Entrega 2 — en qué quedó

- **Preview en Vercel:** https://gimnasio-body-people.vercel.app. Proyecto `gimnasio-body-people`, equipo
  Parceros.
  - Es público pero lleva `X-Robots-Tag: noindex` en todo `*.vercel.app` (`vercel.json`).
  - Se despliega con la CLI: `vercel deploy --prod --scope parceros`.
  - Aún **no** está conectado a GitHub. Para el auto-deploy, andrestntx instala la app de Vercel con acceso
    a `body-people`, desde su Chrome.
- **Rama `web-nueva-version` en GitHub:** Astro 7.3 estático. Se quitó la web vieja (que sigue en `main`,
  intacta).
- **Lighthouse en celular** (vista previa local, 15-sep):
  - rendimiento 100, accesibilidad 100, buenas prácticas 100, SEO 100;
  - LCP 1,7 s, CLS 0,001, peso 138 KB;
  - antes: 74, 78, 93 y 92, LCP 5,3 s, 3,99 MB.
- **Hecho:**
  - Tokens de marca en `global.css`:
    - rojo de botón `#d10f2a`, contraste AA;
    - degradado del logo `#740d03` → `#f20d28`;
    - amarillo de la cinta solo en la ficha.
  - Tipografía autoalojada: Instrument Sans variable (57 KB) y Big Shoulders 900 solo para precios (14 KB).
  - Hero dirección B: Mariano en primera persona, chip «5,0 en Google», estado «abierto ahora» con la hora de
    Bogotá y festivos, tarjeta del Reto 30 días y la valoración gratis como alternativa.
  - Barra fija de WhatsApp: se esconde mientras el botón del hero está en pantalla.
  - `negocio.yml` como fuente única, con validación que hace fallar el build.
  - 14 enlaces `wa.me/573174426332?text=` con mensaje por intención y `data-intencion` / `data-ubicacion`
    listos para medir.
  - Maps con el place_id de la **ficha nueva**, verificado en el navegador.
  - Esqueleto de objetivos, método, Mariano, reseñas, precios, galería, horario y ubicación, FAQ, cierre y pie,
    todo con datos verificados.
  - Fotos con `<Picture>` en AVIF/WebP; favicon y apple-touch-icon con la «B».

### Revisión de escritorio (15-sep-2026, pedida por Andrés: «en el computador no se ve bien»)

- **Hero:** foto 4:5 redondeada dentro del contenedor. Antes estaba estirada y solo se veía la cara.
- **Encabezado fijo** en escritorio con el botón rojo del reto; la barra flotante queda solo en celular.
- **Método, Mariano (con la tarjeta de reseñas), precios y preguntas:** título fijo a la izquierda y contenido a la
  derecha (`.partida` en `global.css`).
- **Galería:** cuadrícula de 4×2 en escritorio y carrusel en celular.
- **Revisado en:**
  - 1440×900: página completa;
  - 1280×800: el hero entra entero con el botón a la vista;
  - celular 390×844: el nombre del reto va como etiqueta sobre el precio.
- ⏳ **Esperando el visto bueno de Andrés** sobre el preview antes de seguir.

## Entrega 3 — en qué quedó

- **Schema `ExerciseGym`** (`src/lib/schema.ts`, sale de `negocio.yml`):
  - NAP igual a Google, `geo` y `hasMap` con el CID de la ficha nueva;
  - horario agrupado con el descanso de 2 a 4, más los 7 festivos como `validFrom` / `validThrough`;
  - `priceRange`, `makesOffer` (valoración, mensualidad, primer mes y reto si está activo);
  - `amenityFeature`, `employee` (Mariano) y `sameAs` (Instagram, Facebook, Maps);
  - **sin `aggregateRating`**.
- **Compartir por WhatsApp:**
  - `og:image` de 1200×630 (`public/og-body-people.jpg`, 94 KB), sin precios para que no quede vieja;
  - se regenera con `/usr/bin/python3 scripts/og/generar.py`.
- **Archivos para buscadores:**
  - `robots.txt` y `sitemap.xml` generados;
  - canonical `https://gimnasiobodypeople.com/` (se corrigió un `/index.html`);
  - un solo H1 y `lang="es-CO"`.
- **Meta Pixel** `989182581694959` (`src/components/Medicion.astro`):
  - **carga después de la página**;
  - `PageView`, más un evento por clic en todo enlace con `data-intencion`: WhatsApp y llamada → **`Contact`**,
    «Cómo llegar» → **`FindLocation`**;
  - parámetros: `content_name` = intención y `content_category` = ubicación;
  - según Meta, `Lead` significa «registro completado», así que ya no se usa. Tampoco los valores viejos.
  - **Verificado en el navegador:** los 12 botones llaman al Pixel con el evento y los parámetros correctos, y
    el Pixel los cuenta. El teléfono del pie quedó medido.
  - ⚠️ La librería de Meta no envía nada desde navegadores automatizados (tampoco la web actual). **La
    recepción real se confirma en la entrega 4** en «Probar eventos» del Administrador de eventos.
- **GA4 y Search Console listos para conectar** (ver propuesta abajo). Se activan solos al llenar
  `medicion.ga4` y `medicion.search_console` en `negocio.yml`.
- **Detalles:**
  - el pie quedó fuera de `<main>`;
  - la FAQ «Nunca he ido» tiene su botón de WhatsApp;
  - los enlaces externos abren en pestaña nueva, así en el computador no se pierde la web;
  - la meta description tiene 138 caracteres y el title 60.
- **Lighthouse en celular con el Pixel:** 100 en rendimiento, accesibilidad, buenas prácticas y SEO. LCP 1,8 s,
  TBT 30 ms, 253 KB.

### Propuesta: GA4 y Search Console (los conecta Andrés)

1. **Search Console:** crear una propiedad de **dominio** `gimnasiobodypeople.com` y verificarla con el
   registro TXT en GoDaddy. Cubre apex, www, http y https.
   - Si prefiere la etiqueta meta, pegar el `content` en `medicion.search_console`.
   - Después de publicar, enviar `https://gimnasiobodypeople.com/sitemap.xml`.
2. **GA4:**
   - crear la propiedad «Gimnasio Body People» (zona horaria Bogotá, moneda COP) con un flujo web;
   - pegar el ID `G-…` en `medicion.ga4`;
   - marcar **`generate_lead`** como evento clave;
   - registrar `intencion`, `ubicacion` y `canal` como dimensiones personalizadas de evento.
3. **Enlazar Search Console con GA4** para ver búsquedas y conversiones juntas.

## ▶️ Lo que queda (en orden)

1. ✅ **GitHub Pages apagado** (15-sep-2026). La rama de origen quedó en «None» y `andrestntx.github.io/body-people` da 404.
2. ✅ **Vercel conectado con GitHub** (15-sep-2026):
   - el repo se **transfirió a `parcerosmx/body-people`** (decisión de Andrés), como `parceros-web` y `parceros-turnos`;
   - `vercel git connect` quedó listo, con `main` como rama de producción: **todo push a `main` publica solo** y cada
     rama o PR genera un preview protegido;
   - limpieza opcional: desinstalar la app de Vercel de la cuenta `andrestntx` en github.com/settings/installations,
     porque ya no tiene repos.
3. **Meta:** en el Administrador de eventos → Pixel `989182581694959` → «Probar eventos»:
   - abrir gimnasiobodypeople.com desde el celular;
   - tocar WhatsApp y «Cómo llegar»;
   - confirmar que llegan `PageView`, `Contact` y `FindLocation` con `content_name` y `content_category`.
4. **Search Console:** el DNS ya tiene un TXT `google-site-verification=ULA3_…`, así que puede que la propiedad de
   dominio ya exista en alguna cuenta. Revisar, enviar `https://gimnasiobodypeople.com/sitemap.xml` y enlazar con
   GA4.
5. **GA4:** crear la propiedad y pegar el ID en `medicion.ga4` (ver propuesta arriba).
6. ✅ **Rendimiento resuelto** (15-sep-2026, PR #2 y #3):
   - el Meta Pixel carga con `requestIdleCallback` (a más tardar 3,5 s) → la espera de pintado del hero bajó;
   - `decoding="sync"` en la foto del hero **empeoraba** (92–94, LCP 2,9–3,1 s), así que se quitó (PR #3);
   - **medido sobre gimnasiobodypeople.com, 3 corridas en celular: 100 / 100 / 100 / 100, LCP 1,6–1,8 s,
     TBT 20–40 ms.**
7. Contenido pendiente:
   - permiso para las reseñas;
   - duración de la valoración;
   - si Mariano responde el WhatsApp;
   - la garantía, **publicada tal cual por decisión de Andrés**; conviene definir las medidas.

## Entrega 4 — en qué quedó

- **Verificación del schema:**
  - validator.schema.org: `ExerciseGym` con **0 errores y 0 advertencias**;
  - Rich Results Test de Google: **Empresas locales** y **Organización** válidas. Único aviso: falta `postalCode`,
    que es opcional y no se inventa.
- **Antes y después** (celular y escritorio): `~/src/claude-ia/bodypeople-maps/docs/web-investigacion/antes-despues/`.
- **Publicación (aprobada por Andrés):**
  1. **Vercel:** `gimnasiobodypeople.com` y `www.gimnasiobodypeople.com` agregados al proyecto `gimnasio-body-people`;
     `www` redirige con 308 al apex.
  2. **GoDaddy** (hecho en su Chrome), cambios:
     - A `@`: `216.150.1.1` y `216.150.16.1`, que reemplazan las 4 IP de GitHub;
     - CNAME `www`: `90e0ec60cc179dc9.vercel-dns-016.com.`
     - Sin tocar: NS, SOA, `_domainconnect`, TXT de Google y TXT `_github-pages-challenge-andrestntx`.
  3. **HTTPS:**
     - Let's Encrypt emitido en 30 s (vence 14-dic-2026, Vercel lo renueva);
     - `http` y `www` → 308 a `https://gimnasiobodypeople.com/`, con HSTS;
     - `bodypeople.com.co` sigue redirigiendo;
     - en el dominio real no hay `noindex`.
  4. **Merge:** PR https://github.com/andrestntx/body-people/pull/1 mergeado en `main` (513a1ee).
  5. **GitHub Pages:** ✅ apagado. El repo se transfirió a `parcerosmx` y quedó conectado a Vercel.
- **Lighthouse en celular sobre el dominio publicado** (3 corridas):
  - al publicar: 95–96 / 100 / 100 / 100, LCP 2,7–2,8 s;
  - **tras PR #2 y #3: 100 / 100 / 100 / 100, LCP 1,6–1,8 s, TBT 20–40 ms**;
  - antes: 74, 78, 93 y 92, LCP 5,3 s, 3,99 MB.
- **Meta Pixel:** no se pudo ver el envío real. Los navegadores automatizados no envían, y en el Chrome de Andrés
  la librería no cargó (bloqueador). Queda el paso 3 de arriba.

## Entrega 1 — en qué quedó

- **Artifact:** https://claude.ai/artifact/XEyxPdj4JU94zUehDKSbYD
- **Detalle y capturas:** `~/src/claude-ia/bodypeople-maps/docs/web-investigacion/`. Contiene
  `auditoria-actual.md`, `competencia-local.md`, `referentes-globales.md`, `tendencias-conversion.md`,
  `shots/` y `lh/actual.json`.
- **Lighthouse en celular de la web actual:** rendimiento 74, accesibilidad 78, buenas prácticas 93, SEO 92.
  LCP 5,3 s, peso 3,99 MB.
- **Recomendación de diseño:** dirección **B, «El entrenador del barrio»**. Se le suma el bloque de precio de
  la A y la ficha de valoración con horario en vivo de la C.
- **Stack recomendado entonces:** Astro en GitHub Pages. Andrés eligió Vercel.

## ✅ Decidido por Andrés (15-sep-2026)

1. **Dirección de diseño:** **B «El entrenador del barrio»** como base, con el bloque de precio de la A y la
   ficha de valoración con horario en vivo de la C.
2. **Planes:** solo la **mensualidad** ($105.000; primer mes $120.000 con inscripción). No hay trimestral ni
   pareja. La suscripción de Mercado Pago de $95.000 **no** se mantiene en la web.
   - **Nueva oferta: Reto Body People 30 días a $69.900**, promoción de 4 semanas. Quien sigue queda con la
     mensualidad **congelada**. Detalle en `~/src/claude-ia/bodypeople-maps/video-reto-30-dias.md`:
     - incluye valoración con medidas, plan de entreno y alimentación, revisión a mitad de mes y medición final;
     - sin permanencia;
     - garantía: 12 sesiones sin cambio de medidas = segundo mes gratis;
     - grupos de 25 con inscripciones abiertas 7 días. **Nunca un cupo total inventado.**
3. **Stack y hosting:** **Vercel**, que Andrés ya usa. El equipo **Parceros** está en plan **Pro**
   (verificado): el plan Hobby prohíbe uso comercial y este sitio lo es.
   - Dominio en **GoDaddy**.
   - Generador: Astro con `negocio.yml` (propuesta; confirmar al arrancar la entrega 2).
4. ✅ **Acceso a GitHub (15-sep-2026):** parcerosmx fue invitado desde el Chrome «Andresmaopinzon personal»,
   que tiene la sesión de andrestntx, y aceptó con `gh`. Quedó con permiso de **escritura**
   (`push: true`, `admin: false`).
   - En un repo de cuenta personal GitHub no da rol de administrador a colaboradores.
   - Con hosting en Vercel no hace falta administrador: la configuración de Pages y el apagado de GitHub Pages
     los hace andrestntx desde ese Chrome, con aprobación.

## ❓ Falta decidir o conseguir

1. ✅ **Continuidad del reto: $99.900/mes congelada**, igual que el guion.
2. ✅ **Durante el reto abre el Reto 30 días.** El hero y el botón fijo lo venden y la valoración gratis queda en
   una línea. Al terminar, la web vuelve sola a la valoración gratis.
3. ✅ **El reto no tiene fecha de caducidad** (Andrés, 15-sep): puede seguir. En `negocio.yml` va un interruptor
   `reto.activo: true/false`, sin fecha de fin y sin cuenta regresiva.
   - Siguen pendientes del guion: qué día arranca cada grupo y qué medidas cuentan para la garantía.
4. ✅ **Logo:** Andrés dice que cualquiera de los dos sirve. En la web va el **vectorial**
   `assets/images/svg/logo_nuevo.svg` (nítido en cualquier tamaño), y la «B» sobre rojo para favicon e ícono.
   Ya no hace falta pedir el original.
5. **Vercel ↔ GitHub:** el repo es de la cuenta personal `andrestntx`. Vercel necesita verlo: o se instala la
   app de Vercel en esa cuenta con acceso a `body-people`, o se despliega con la CLI desde parcerosmx.
6. **DNS en GoDaddy:** al publicar (entrega 4), apex y `www` pasan a Vercel con redirección de www al apex.
   **Se hace solo con aprobación en ese momento**, y después se apaga GitHub Pages.
7. **Contenido:**
   - duración de la valoración;
   - si Mariano responde el WhatsApp él mismo;
   - horas con menos gente y una referencia para llegar;
   - permiso para mostrar las 2 reseñas de Google y fotos de socios.

## Hallazgos que la web nueva tiene que corregir, sí o sí

- [x] `https://www.` da error de certificado, y el canonical, `og:url`, el schema y el sitemap apuntan ahí. **Resuelto: www con certificado y 308 al apex.**
- [x] El mapa y el enlace llevan a la ficha VIEJA (CID `0x59a774c1888efa27`). Se cambian por la nueva:
  place_id `ChIJNcEnRtEvPo4RUXIANDDOJVQ`, CID `0x5425ce3034007251`.
- [x] El JSON-LD es inválido porque tiene comentarios `//`. Se reemplaza por `ExerciseGym` completo.
- [x] Hay 7 H1 y texto oculto a 1-2 px. Tiene que quedar un solo H1 y nada oculto.
- [x] `robots.txt` bloquea `*.xml`, así que bloquea el sitemap. El sitemap solo tiene `/tel:+57…`.
- [x] La imagen OG da 404 y la página tiene `lang="en"`.
- [x] Precios y planes viejos. El Pixel manda `Lead` con valores 80.000, 250.000 y 420.000.
- [x] Hay un contador de 2022 que tira un error cada segundo. jQuery y Montserrat bloquean el render.
- [x] HTTPS forzado está apagado. **Resuelto: Vercel redirige http → https con HSTS.**

## Datos útiles de la competencia (15-sep-2026)

- IRON GYM Rosablanca, a ~0,6 km: $160.000/mes, sin permanencia.
- WFL, a ~0,6 km: grupal $140.000.
- Las cadenas van de $93.000 a $149.900; Smart Fit engancha con $19.900 los 2 primeros meses y amarra 12.
- La prueba gratis es la norma (Iron, HYL, WFL). Nadie junta en una pantalla precio, horario, mapa, fotos
  reales y reseñas.

## Notas técnicas

- Con Astro en Vercel solo se publica `dist/`, así que `docs/` y `CLAUDE.md` no quedan públicos.
- El reto se prende y se apaga editando `reto.activo` en `negocio.yml`. Con la integración de GitHub eso
  dispara un deploy; mientras no esté, se despliega con la CLI. Cuando está apagado, la web abre con la
  valoración gratis.
- ⚠️ **No hacer merge a `main` antes de mover el DNS:** GitHub Pages serviría el código fuente sin compilar.
  Orden de la entrega 4:
  1. dominio en Vercel;
  2. DNS en GoDaddy, con aprobación;
  3. verificar;
  4. merge;
  5. apagar Pages.
- Astro 7:
  - `@fontsource/big-shoulders-display` se importa como `/900`, sin `.css`;
  - js-yaml 5 no tiene export por defecto: `import { load }`.
- ⚠️ **Antes de ir a producción, definir qué medidas cuentan para la garantía del reto.** Si no se define,
  dejar `garantia: ""` y la web no la muestra.
- **Reglas de Meta para los textos del reto:** no prometer kilos, nada de antes y después, no aludir al cuerpo
  de la persona.
