# Clientes — guía de configuración

Un archivo `.md` por cliente, **uno solo para ambos idiomas** (los clientes no se traducen):

```
src/content/clients/mark-reay.md
```

El nombre del archivo es interno y se usa para la captura (`mark-reay` → `/images/clients/mark-reay.jpg`): en minúsculas, sin espacios ni tildes.

Los clientes aparecen en:
- **Clientes:** `/clientes`, con filtros por categoría.
- **Proyectos:** mezclados en el mosaico junto a tus desarrollos.
- **Inicio:** vista previa.

Este README no se publica (está excluido en `src/content.config.ts`).

---

## Plantilla completa

```yaml
---
# ── Obligatorios ─────────────────────────────────────────────
name: "Mark Reay"
url: "https://markheadshots.com"
category: "Personal / Político"

# ── Imagen y color ───────────────────────────────────────────
thumbnail: "/images/clients/mark-reay.jpg"
color: "pink"

# ── Inicio ───────────────────────────────────────────────────
featured: 1

# ── Sitios fuera de línea ────────────────────────────────────
status: "archived"
gallery:
  - "/images/clients/mark-reay/01.jpg"
  - src: "/images/clients/mark-reay/02.jpg"
    caption: "Portafolio"
---
```

(Los clientes no llevan texto debajo del frontmatter.)

---

## Campos

### Obligatorios

| Campo | Tipo | Qué hace |
| :-- | :-- | :-- |
| `name` | texto | Nombre del cliente o del sitio. |
| `url` | URL | Dirección del sitio. En los sitios en línea, la tarjeta enlaza aquí (se abre en otra pestaña). El dominio sale bajo el nombre. |
| `category` | ver tabla | Categoría para los filtros de `/clientes`. Escríbela **exactamente** como en la tabla. |

Categorías permitidas (el nombre visible se traduce solo, en `src/i18n/ui.ts`):

| Valor en el archivo | Se muestra (ES) | Se muestra (EN) |
| :-- | :-- | :-- |
| `Arte y Galerías` | Arte y Galerías | Art & Galleries |
| `Personal / Político` | Personal / Político | Personal / Public figures |
| `Gobierno` | Instituciones | Institutions |
| `Restaurantes y Pequeños Negocios` | Restaurantes y Negocios | Restaurants & Business |

### Imagen y color

| Campo | Valores | Por defecto | Qué hace |
| :-- | :-- | :-- | :-- |
| `thumbnail` | ruta | — | Captura del sitio. Sin captura, la tarjeta muestra el nombre sobre un bloque de color. |
| `color` | `orange` `lime` `blue` `yellow` `pink` `purple` `cyan` `red` `cream` | automático | Color del bloque y del efecto al pasar el mouse. Si no lo pones, se asigna uno rotando la paleta. |

**Capturas automáticas:** `npm run screenshots` visita cada `url`, guarda la imagen en `public/images/clients/<archivo>.jpg` y escribe `thumbnail` en el `.md`.
- Solo captura los clientes que aún no tienen `thumbnail`. Usa `npm run screenshots -- --force` para rehacerlas todas.
- Salta los `archived` (su sitio ya no carga).
- Si un sitio muestra un aviso anti-bots (Cloudflare), la captura se descarta. En ese caso pon tu propia imagen a mano.

### Inicio

| Campo | Valores | Qué hace |
| :-- | :-- | :-- |
| `featured` | 1, 2, 3… | Destacado en el **inicio**, en esa posición. Si ningún cliente lo tiene, el inicio muestra los 6 primeros sitios en línea con captura. La vista previa tiene 3 columnas en escritorio: 3 o 6 destacados llenan filas completas. |

### Sitios fuera de línea

| Campo | Valores | Por defecto | Qué hace |
| :-- | :-- | :-- | :-- |
| `status` | `live` · `archived` | `live` | `archived` = el sitio ya no está en línea. Se conserva como histórico: etiqueta "Histórico · fuera de línea", imagen en gris, dominio sin enlace y filtro "Histórico". **Nunca enlaza a la `url`.** |
| `gallery` | lista | `[]` | Fotos extra del sitio archivado. Al hacer clic en la tarjeta se abre el visor con la captura primero y luego estas fotos. La tarjeta dice "Ver galería · N". |

Qué pasa al hacer clic en un cliente archivado:

| Tiene `thumbnail` | Tiene `gallery` | Resultado |
| :-: | :-: | :-- |
| ✓ | ✗ | Se abre la captura en el visor ("Ver captura"). |
| ✓ | ✓ | Visor con la captura + la galería ("Ver galería · N"). |
| ✗ | ✓ | Visor solo con la galería. |
| ✗ | ✗ | No se puede hacer clic; el dominio sale tachado. |

Cada foto de `gallery` puede ser solo la ruta o ruta + pie de foto:

```yaml
gallery:
  - "/images/clients/niels-olsen/01.jpg"
  - src: "/images/clients/niels-olsen/02.jpg"
    caption: "Página de libros"
```

Guarda las fotos en `public/images/clients/<cliente>/`. No repitas la captura (`thumbnail`) dentro de `gallery`: se agrega sola como primera foto.

## Checklist para un cliente nuevo

1. Crea `<nombre>.md` con `name`, `url` y `category`.
2. Ejecuta `npm run screenshots` para obtener la captura (o pon `thumbnail` a mano).
3. Opcional: `color`, `featured`.
4. Si el sitio se cae más adelante: `status: "archived"` y, si quieres, una `gallery`.
5. Revisa en `/clientes` y en `/proyectos` con `npm run dev`.
