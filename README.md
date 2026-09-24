# PRYW — Portafolio de Wilson Yépez

Sitio estático en **Astro 7** + **Tailwind CSS v4**, bilingüe (ES en `/`, EN en `/en/`), con animaciones GSAP + Lenis. Se despliega con Docker (nginx) en Dokploy.

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
status: "archived"   # ya no está en línea; se muestra como histórico
images: ["/images/projects/shields/01.jpg"]   # galería del proyecto (en public/)
```

- **Destacados:** el inicio muestra solo los proyectos y clientes con `featured`, ordenados por ese número. En proyectos basta ponerlo en el archivo de un idioma. Sin ninguno marcado, se muestran todos los proyectos y los 6 primeros sitios en línea con captura.
- **Proyecto archivado:** sigue abriendo su página; no muestra enlace al sitio en vivo.
- **Cliente archivado:** si tiene captura, al hacer clic se abre en un visor; si no, no es clicable.

## Imágenes

Todo lo que esté en `public/` se publica. Las imágenes deben estar en git: Dokploy reconstruye el contenedor desde el repositorio en cada despliegue. Si reemplazas una imagen, cámbiale el nombre; nginx la guarda 30 días en caché.
