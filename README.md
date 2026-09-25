# PRYW — Portafolio de Wilson Yépez

Sitio estático en **Astro 7** + **Tailwind CSS v4**, bilingüe (ES en `/`, EN en `/en/`), con animaciones GSAP + Lenis. Se despliega con Docker (nginx) en Dokploy.

Sitio en producción: <https://pryw00.dev>

## Características

- Bilingüe español/inglés con i18n nativo de Astro (español sin prefijo, inglés en `/en/`) y sitemap por idioma.
- Proyectos en MDX y clientes en Markdown mediante content collections (destacados, archivados, galerías con visor).
- Animaciones con GSAP y desplazamiento suave con Lenis; cursor personalizado.
- Script con Playwright para capturar automáticamente los sitios de los clientes.
- Imagen Docker multi-etapa (build con Node 22 + servido con nginx, gzip, caché y cabeceras de seguridad).

## Stack

| Área        | Tecnología                                              |
| :---------- | :------------------------------------------------------ |
| Framework   | Astro 7 (estático) + `@astrojs/mdx` + `@astrojs/sitemap` |
| Estilos     | Tailwind CSS v4 (`@tailwindcss/vite`)                   |
| Animación   | GSAP, Lenis                                             |
| Tipografías | Fontsource (Archivo, Inter, JetBrains Mono) + 403 DOSHI |
| Utilidades  | Playwright (capturas de clientes)                       |
| Despliegue  | Docker + nginx, Dokploy                                 |

## Estructura

```
.
├── public/               # favicon, fuentes e imágenes (proyectos y clientes)
├── scripts/              # capture-screenshots.mjs (Playwright)
├── src/
│   ├── components/       # Header, Hero, WorkGrid, ClientGrid, Lightbox, Cursor…
│   ├── content/          # projects/{es,en}/*.mdx y clients/*.md
│   ├── data/             # profile, palette, work, gallery
│   ├── i18n/             # ui.ts (textos de la interfaz)
│   ├── layouts/          # BaseLayout.astro
│   ├── pages/            # rutas ES (/) y EN (/en/)
│   ├── scripts/          # motion.ts, filters.ts
│   ├── styles/           # global.css (tokens @theme de Tailwind v4)
│   └── views/            # vistas compartidas entre idiomas
├── Dockerfile
├── docker-compose.yml
└── nginx.conf
```

## Requisitos

- Node.js >= 22.12.0
- npm
- Docker (opcional, para probar la imagen de producción)

## Comandos

| Comando               | Acción                                                          |
| :-------------------- | :-------------------------------------------------------------- |
| `npm install`         | Instala dependencias                                            |
| `npm run dev`         | Servidor local en `localhost:4321`                              |
| `npm run build`       | Genera el sitio en `./dist/`                                    |
| `npm run preview`     | Sirve `./dist/` localmente                                      |
| `npm run screenshots` | Captura los sitios de clientes en `public/images/clients/`      |

## Estilos (Tailwind v4)

- Los **tokens** (colores, fuentes, tamaños, animaciones) viven en `@theme` dentro de `src/styles/global.css`. No hay `tailwind.config.js`.
  - Colores: `bg-bg`, `text-fg`, `text-soft`, `border-line`, `bg-accent`, `bg-block-lime`…
  - Color del bloque actual: añade `data-color="lime"` (ver `src/data/palette.ts`) y usa `bg-c` / `text-ink`.
  - Tipografía: `font-art` (403 DOSHI), `font-display` (Archivo ancho), `font-mono`.
  - Tamaños: `text-giant`, `text-hero`, `text-lead`… Si combinas un tamaño con `heading-*`, usa `text-(length:--text-h1)` para no pisar el `line-height`.
- **Patrones reutilizables** como `@utility`: `wrap`, `btn`, `btn-solid`, `chip`, `chips`, `eyebrow`, `mono`, `heading-display`, `heading-art`, `section-head`, `section-title`, `text-outline`, `rail`, `prose-dark`.
- Los componentes usan utilidades en el markup; no hay bloques `<style>`.
- Las clases de estado que cambia el JS (`.is-open`, `.is-inview`, `.reveal`, cursor, etc.) están en `global.css` **fuera de capas**, a propósito, para que ganen sobre las utilidades.

## Contenido

- Proyectos: `src/content/projects/es/*.mdx` y `src/content/projects/en/*.mdx` (mismo nombre de archivo en ambos idiomas).
- Clientes: `src/content/clients/*.md`.
- Textos de la interfaz: `src/i18n/ui.ts`. Perfil y CV: `src/data/profile.ts`.

Campos útiles en el frontmatter:

```yaml
featured: 1         # destacado en el inicio, en esa posición (1, 2, 3…)
liveUrl: "https://…" # proyecto en línea: botón "Ver sitio en vivo" (hero + ficha)
links:               # enlaces extra con su propio nombre
  - label: "Demo"
    url: "https://…"
  - label: "Google Play"
    url: "https://…"
status: "archived"   # ya no está en línea; se muestra como histórico
images:              # proyectos: galería (mosaico + visor)
  - "/images/projects/shields/01.jpg"
  - src: "/images/projects/shields/02.jpg"
    caption: "Pantalla de incidente"   # pie de foto opcional
gallery:             # clientes archivados: fotos extra que se ven junto a la captura
  - "/images/clients/niels-olsen/01.jpg"
```

- **En proyectos, `featured`, `liveUrl` y `links` basta con escribirlos en un idioma**: el otro los hereda si los deja vacíos. Escribe `links` en ambos si quieres traducir sus nombres.
- **Destacados:** el inicio muestra solo los proyectos y clientes con `featured`, ordenados por ese número. En proyectos basta ponerlo en el archivo de un idioma. Sin ninguno marcado, se muestran todos los proyectos y los 6 primeros sitios en línea con captura.
- **Proyecto archivado:** sigue abriendo su página; no muestra enlace al sitio en vivo.
- **Cliente archivado:** al hacer clic se abre el visor con la captura y las fotos de `gallery`. Sin captura ni galería, no es clicable.
- **Galerías:** guarda las fotos en `public/images/projects/<proyecto>/` o `public/images/clients/<cliente>/`. En proyectos, `images` basta con escribirlo en un idioma (escríbelo en ambos si quieres traducir los pies de foto). El visor admite flechas, teclado (← →) y deslizar en móvil.

## Imágenes

Todo lo que esté en `public/` se publica. Las imágenes deben estar en git: Dokploy reconstruye el contenedor desde el repositorio en cada despliegue. Si reemplazas una imagen, cámbiale el nombre; nginx la guarda 30 días en caché.

## Build y despliegue

```bash
npm run build            # genera ./dist/
docker compose up --build  # sirve la imagen de producción en http://localhost
```

El `Dockerfile` compila el sitio con Node 22 y lo sirve con nginx (`nginx.conf`). En Dokploy la aplicación se construye desde el repositorio con ese `Dockerfile` en cada despliegue.

## Estado

Activo — en producción en <https://pryw00.dev> y en actualización continua.

## Repositorio

<https://github.com/Pryw00/pryw-portfolio>

## Autor

Wilson Yépez (PRYW)
