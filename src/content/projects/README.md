# Proyectos — guía de configuración

Cada proyecto tiene **dos archivos con el mismo nombre**, uno por idioma:

```
src/content/projects/es/shields.mdx   → /proyectos/shields
src/content/projects/en/shields.mdx   → /en/projects/shields
```

El nombre del archivo es la URL (`shields` → `/proyectos/shields`): en minúsculas, sin espacios ni tildes. Si falta el archivo `en/`, el proyecto no aparece en inglés.

Este README no se publica (está excluido en `src/content.config.ts`).

---

## Plantilla completa

```yaml
---
# ── Obligatorios ─────────────────────────────────────────────
title: "GAD Ibarra — Name Checker"
description: "Resumen de 1–3 frases. Aparece como entradilla y en Google."
role: "Desarrollo full-stack, diseño UI/UX"
order: 5
year: "2024"
kind: "web"

# ── Aspecto en el mosaico ────────────────────────────────────
color: "red"
art: "dots"
size: "wide"
stack: [PHP, ScriptCase, SQL, JavaScript]

# ── Enlaces ──────────────────────────────────────────────────
liveUrl: "https://…"
links:
  - label: "Demo"
    url: "https://…"
  - label: "Google Play"
    url: "https://…"

# ── Galería ──────────────────────────────────────────────────
images:
  - "/images/projects/gad-ibarra/01.jpg"
  - src: "/images/projects/gad-ibarra/02.jpg"
    caption: "Mapa de sectores"

# ── Estado e inicio ──────────────────────────────────────────
featured: 1
status: "archived"
archiveUrl: "https://web.archive.org/web/2024/https://…"

# ── Otros ────────────────────────────────────────────────────
credit: "Diseño y desarrollo web por Wilson Yépez / @Pryw00"
---

Texto largo del proyecto (Markdown). Puedes usar **negritas**, listas,
enlaces y subtítulos con `## Título`.
```

---

## Campos

### Obligatorios

| Campo | Tipo | Qué hace |
| :-- | :-- | :-- |
| `title` | texto | Título. Si lleva ` — ` (raya con espacios), la parte izquierda sale grande en el mosaico y la derecha como subtítulo pequeño: `"Dashboard — Asamblea Nacional"`. |
| `description` | texto | Entradilla de la página del proyecto y descripción para buscadores y redes sociales. |
| `role` | texto | Tu rol. Sale en la ficha lateral y al pasar el mouse por la tarjeta del mosaico. |
| `order` | número | Orden en la página Proyectos (1 primero). Define también cuál es el "Siguiente proyecto". |
| `year` | texto | Año que se muestra, entre comillas: `"2024"` o `"2023–2024"`. |
| `kind` | `web` · `game` · `app` | Tipo de proyecto. Alimenta los filtros de la página Proyectos y se traduce solo ("Videojuego" / "Game"). |

### Aspecto

| Campo | Valores | Por defecto | Qué hace |
| :-- | :-- | :-- | :-- |
| `color` | `orange` `lime` `blue` `yellow` `pink` `purple` `cyan` `red` `cream` | `purple` | Color del bloque en el mosaico y del hero del proyecto. |
| `art` | `pixel` `bars` `shield` `waves` `dots` | `dots` | Ilustración animada del bloque: invasor retro, barras comparativas, escudo, ondas topográficas o mapa de puntos. |
| `size` | `sm` `tall` `wide` | `sm` | Tamaño en el mosaico (escritorio): `sm` = 1 celda, `tall` = doble de alto, `wide` = doble de ancho. En móvil todos ocupan el ancho completo. |
| `stack` | lista de textos | `[]` | Tecnologías. Salen como etiquetas en la ficha: `[Unity 3D, C#, SQL]`. |

Colores de referencia:

| `orange` | `lime` | `blue` | `yellow` | `pink` | `purple` | `cyan` | `red` | `cream` |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| #FF4D00 | #1FE25C | #1F4BFF | #FFD400 | #FF5FA2 | #7C5CFC | #4FD8E0 | #F2261D | #F4EBDD |

### Enlaces

| Campo | Tipo | Qué hace |
| :-- | :-- | :-- |
| `liveUrl` | URL | Enlace principal. Muestra **"Ver sitio en vivo ↗"** arriba en el hero (con punto verde) y en la ficha lateral. Déjalo vacío (`""`) o quítalo si no hay. |
| `links` | lista de `{ label, url }` | Botones extra con tu propio texto (demo, video, tienda, repositorio…). Salen en la ficha, junto al principal. |

### Galería

| Campo | Tipo | Qué hace |
| :-- | :-- | :-- |
| `images` | lista | Galería de fotos. Mosaico a todo el ancho bajo el texto; al hacer clic se abre el visor (flechas, teclado ← →, deslizar en móvil). |

Cada foto puede ser:

```yaml
images:
  - "/images/projects/shields/01.jpg"          # solo la ruta
  - src: "/images/projects/shields/02.jpg"     # ruta + pie de foto
    caption: "Pantalla de incidente"
```

- Guarda las fotos en `public/images/projects/<proyecto>/`. En el frontmatter la ruta empieza en `/images/…`, sin `public`.
- Con 3 fotos o más, la primera sale grande. La última se estira para no dejar huecos.
- Recomendado: JPG o WebP, máx. ~1920 px de ancho y menos de ~300 KB.

### Estado e inicio

| Campo | Valores | Por defecto | Qué hace |
| :-- | :-- | :-- | :-- |
| `featured` | 1, 2, 3… | — | Destacado en el **inicio**, en esa posición. Si ningún proyecto lo tiene, el inicio muestra todos. |
| `status` | `live` · `archived` | `live` | `archived` = ya no está en línea. Etiqueta "Histórico · fuera de línea", bloque desaturado y filtro "Histórico". La página sigue abriéndose, pero sin "Ver sitio en vivo" (los `links` sí se muestran). |
| `archiveUrl` | URL | — | Solo para archivados: botón "Ver archivo ↗" en la ficha (por ejemplo, una copia en web.archive.org). |

### Otros

| Campo | Por defecto | Qué hace |
| :-- | :-- | :-- |
| `credit` | `Diseño y desarrollo web por Wilson Yépez / @Pryw00` | Línea de crédito al final del texto. Cámbiala en el archivo `en/` para inglés. |

---

## Qué va en cada idioma

| Traducir en ambos archivos | Basta con escribirlo en uno (el otro lo hereda si lo deja vacío) | Mantener igual en ambos |
| :-- | :-- | :-- |
| `title`, `description`, `role`, `credit`, texto largo | `featured`, `liveUrl`, `links`, `images` | `order`, `year`, `kind`, `color`, `art`, `size`, `stack`, `status` |

Escribe `links` o `images` en ambos archivos solo si quieres traducir sus textos (`label`, `caption`).

## Checklist para un proyecto nuevo

1. Crea `es/<nombre>.mdx` y `en/<nombre>.mdx` con la plantilla.
2. Pon un `order` (define la posición en Proyectos y el "Siguiente proyecto").
3. Elige `color`, `art` y `size`.
4. Si tiene fotos, guárdalas en `public/images/projects/<nombre>/` y lístalas en `images`.
5. Opcional: `featured` para el inicio, `liveUrl` / `links` para enlaces.
6. Revisa con `npm run dev` en `/proyectos/<nombre>` y `/en/projects/<nombre>`.
