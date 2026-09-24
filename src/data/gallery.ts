// Gallery helpers shared by project pages, client tiles and the lightbox.

export type GalleryInput = string | { src: string; caption?: string };
export type GalleryItem = { src: string; caption?: string };

/** Accepts plain paths or { src, caption } and fills missing captions with `fallback`. */
export function toGallery(items: GalleryInput[], fallback?: string): GalleryItem[] {
  return items.map((it) => (typeof it === 'string' ? { src: it, caption: fallback } : { ...it, caption: it.caption ?? fallback }));
}

/** Serialised value for a `data-lightbox` attribute (see components/Lightbox.astro). */
export const lightboxData = (items: GalleryItem[]) => JSON.stringify(items);
