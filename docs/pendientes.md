# Pendientes — web nueva de Body People

Actualizado el 15-sep-2026, al cerrar la **entrega 2 de 4** (sistema visual, hero y esqueleto).

## Plan de entregas

| # | Entrega | Estado |
| --- | --- | --- |
| 1 | Investigación y auditoría de la web actual → Artifact | ✅ 15-sep-2026 |
| 2 | Sistema visual, stack, hero y esqueleto en celular, imágenes optimizadas | ✅ 15-sep-2026 |
| 3 | Diseño fino de todas las secciones, reseñas, Pixel y eventos por intención, schema y SEO completo | ⏭️ siguiente |
| 4 | Verificación (Lighthouse, Rich Results, enlaces), antes y después, dominio y DNS en Vercel, merge con aprobación | — |

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

## ▶️ Entrega 3 — qué sigue

1. Diseño fino de las secciones del esqueleto (hoy funcionales pero sobrias) y revisión en escritorio.
2. **Reseñas reales** de Google, copiadas tal cual con nombre y fecha, si Andrés da permiso.
3. **Schema `ExerciseGym`** completo:
   - NAP idéntico a Google, `geo`, `openingHoursSpecification` con el descanso de 2 a 4 y festivos;
   - `priceRange`;
   - `sameAs` con Instagram, Facebook y la ficha;
   - `hasMap` con el CID.
4. `og:image` de 1200×630 para compartir por WhatsApp, `robots.txt` y `sitemap`.
5. **Meta Pixel** `989182581694959`:
   - `PageView`;
   - `Contact` o `Lead` por clic de WhatsApp o llamada, con `intencion` y `ubicacion` (los atributos ya están);
   - quitar los valores viejos 80k, 250k y 420k.
6. Proponer GA4 (`generate_lead`) y Search Console, que conecta Andrés.
7. Detalles:
   - el pie quedó dentro de `<main>` (sacarlo);
   - la FAQ «nunca he ido» tiene intención `desde_cero`, pero todavía sin botón;
   - revisar el copy del title y la description.

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

- [ ] `https://www.` da error de certificado, y el canonical, `og:url`, el schema y el sitemap apuntan ahí.
  Hay que usar el apex sin www y arreglar el CNAME de www.
- [ ] El mapa y el enlace llevan a la ficha VIEJA (CID `0x59a774c1888efa27`). Se cambian por la nueva:
  place_id `ChIJNcEnRtEvPo4RUXIANDDOJVQ`, CID `0x5425ce3034007251`.
- [ ] El JSON-LD es inválido porque tiene comentarios `//`. Se reemplaza por `ExerciseGym` completo.
- [ ] Hay 7 H1 y texto oculto a 1-2 px. Tiene que quedar un solo H1 y nada oculto.
- [ ] `robots.txt` bloquea `*.xml`, así que bloquea el sitemap. El sitemap solo tiene `/tel:+57…`.
- [ ] La imagen OG da 404 y la página tiene `lang="en"`.
- [ ] Precios y planes viejos. El Pixel manda `Lead` con valores 80.000, 250.000 y 420.000.
- [ ] Hay un contador de 2022 que tira un error cada segundo. jQuery y Montserrat bloquean el render.
- [ ] HTTPS forzado está apagado.

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
