/* ============================================================
   i18n — Spanish (default, no prefix) + English (/en/…)
   ============================================================ */

export const languages = { es: 'Español', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'es';

/** Route slugs per language. Keys are stable page ids. */
export const routes = {
  home:     { es: '/',          en: '/en' },
  projects: { es: '/proyectos', en: '/en/projects' },
  clients:  { es: '/clientes',  en: '/en/clients' },
  about:    { es: '/about',     en: '/en/about' },
} as const;
export type RouteKey = keyof typeof routes;

export const path = (key: RouteKey, lang: Lang) => routes[key][lang];
export const projectPath = (slug: string, lang: Lang) => `${routes.projects[lang]}/${slug}`;

export function getLangFromUrl(url: URL): Lang {
  return url.pathname.split('/')[1] === 'en' ? 'en' : 'es';
}

/** Same page in the other language (keeps project slugs). */
export function alternatePath(url: URL, target: Lang): string {
  const from = getLangFromUrl(url);
  const clean = url.pathname.replace(/\/$/, '') || '/';
  for (const key of Object.keys(routes) as RouteKey[]) {
    const base = routes[key][from];
    if (clean === base) return routes[key][target];
    if (key !== 'home' && clean.startsWith(base + '/')) return routes[key][target] + clean.slice(base.length);
  }
  return routes.home[target];
}

export const ui = {
  es: {
    'meta.title': 'Wilson Yépez — Tech Web Alchimist',
    'meta.description': 'Desarrollador Web, Tech Alquimist y Gamer. Creando plataformas de impacto desde Quito, Ecuador.',
    'skip': 'Saltar al contenido',

    'nav.home': 'Inicio',
    'nav.projects': 'Proyectos',
    'nav.clients': 'Clientes',
    'nav.about': 'Sobre mí',
    'nav.main': 'Navegación principal',
    'nav.mobile': 'Navegación móvil',
    'nav.footer': 'Navegación del pie',
    'header.status': 'Disponible · Quito',
    'header.menu': 'Menú',
    'header.close': 'Cerrar',
    'header.lang': 'Cambiar idioma',

    'hero.eyebrow': 'Portafolio',
    'hero.tags': ['Web', 'Videojuegos', 'AR / Apps', 'Ciberseguridad'],
    'hero.suffix': 'diseño + código',
    'hero.cta': 'Ver trabajo ↓',
    'hero.talk': 'Hablemos',

    'home.manifesto': '(01) Manifiesto',
    'home.manifestoText':
      'Soy Wilson — ingeniero en sistemas, magíster en computación, experto en ciberseguridad y gamer. Mezclo código, diseño y juego para construir plataformas de impacto para gobiernos, galerías, artistas, fundaciones y marcas.',
    'home.stat.projects': 'Desarrollos propios',
    'home.stat.clients': 'Sitios para clientes',
    'home.stat.skills': 'Tecnologías',
    'home.work': '(02) Trabajo seleccionado',
    'home.stack': '(03) Stack & herramientas',
    'home.clients': '(04) Clientes',
    'home.liveSites': 'sitios',
    'home.liveSitesOutline': 'en vivo',
    'common.seeAll': 'Ver todos →',

    'kind.web': 'Web',
    'kind.game': 'Videojuego',
    'kind.app': 'App',
    'kind.client': 'Sitio de cliente',

    'work.eyebrow': 'Trabajo',
    'work.title': 'Proyectos',
    'work.lead':
      'Todo mi trabajo en un solo lugar: plataformas para instituciones y ciudadanía, videojuegos serios, apps con realidad aumentada y sitios a medida para artistas, galerías y marcas.',
    'work.all': 'Todos',
    'work.filter': 'Filtrar proyectos por tipo',
    'work.clientsLink': 'Directorio de clientes →',

    'project.back': '← Proyectos',
    'project.type': 'Tipo',
    'project.year': 'Año',
    'project.role': 'Rol',
    'project.stack': 'Stack',
    'project.live': 'Ver sitio en vivo ↗',
    'project.next': 'Siguiente proyecto →',
    'project.shot': 'captura',

    'clients.eyebrow': 'Sitios en vivo · Nueva York ↔ Ecuador',
    'clients.title': 'Clientes',
    'clients.lead':
      'Galerías, artistas, fotógrafos, restaurantes, fundaciones y figuras públicas. Diseño visual, desarrollo front-end y soporte técnico continuo.',
    'clients.all': 'Todos',
    'clients.filter': 'Filtrar clientes por categoría',
    'clients.shotAlt': 'Captura del sitio de',
    'cat.Arte y Galerías': 'Arte y Galerías',
    'cat.Personal / Político': 'Personal / Político',
    'cat.Gobierno': 'Instituciones',
    'cat.Restaurantes y Pequeños Negocios': 'Restaurantes y Negocios',

    'about.eyebrow': 'Sobre mí',
    'about.line1': 'Tech web',
    'about.line2': 'alquimista',
    'about.experience': 'Experiencia',
    'about.education': 'Formación',
    'about.cmdEdu': 'cat educacion.txt',
    'about.cmdTraining': 'ls capacitaciones/ --sort=year',
    'about.logFile': '~/pryw00/formacion.log',
    'about.skills': 'Tecnologías',

    'footer.eyebrow': '¿Tienes un proyecto en mente?',
    'footer.cta': 'Hablemos',
    'footer.email': 'Email',
    'footer.copy': 'Copiar',
    'footer.copied': '¡Copiado!',
    'footer.social': 'Redes',
    'footer.map': 'Mapa',
    'footer.made': 'Hecho a mano con Astro + GSAP',

    'status.archived': 'Histórico · fuera de línea',
    'status.filter': 'Histórico',
    'status.wayback': 'Ver archivo ↗',
    'status.note': 'Este proyecto ya no está en línea; se conserva como registro histórico.',

    'cursor.view': 'Ver',
    'cursor.visit': 'Visitar',
    'cursor.next': 'Siguiente',
    'cursor.archive': 'Archivo',
    'cursor.shot': 'Captura',
    'status.viewShot': 'Ver captura',
    'lightbox.close': 'Cerrar',
    'cursor.write': 'Escribir',
  },
  en: {
    'meta.title': 'Wilson Yépez — Tech Web Alchemist',
    'meta.description': 'Web developer, tech alchemist and gamer. Building high-impact platforms from Quito, Ecuador, for clients in the US and Latin America.',
    'skip': 'Skip to content',

    'nav.home': 'Home',
    'nav.projects': 'Work',
    'nav.clients': 'Clients',
    'nav.about': 'About',
    'nav.main': 'Main navigation',
    'nav.mobile': 'Mobile navigation',
    'nav.footer': 'Footer navigation',
    'header.status': 'Available · Quito',
    'header.menu': 'Menu',
    'header.close': 'Close',
    'header.lang': 'Change language',

    'hero.eyebrow': 'Portfolio',
    'hero.tags': ['Web', 'Games', 'AR / Apps', 'Cybersecurity'],
    'hero.suffix': 'design + code',
    'hero.cta': 'See work ↓',
    'hero.talk': "Let's talk",

    'home.manifesto': '(01) Manifesto',
    'home.manifestoText':
      "I'm Wilson — systems engineer, M.Sc. in computing, cybersecurity specialist and gamer. I blend code, design and play to build high-impact platforms for governments, galleries, artists, foundations and brands.",
    'home.stat.projects': 'In-house builds',
    'home.stat.clients': 'Client websites',
    'home.stat.skills': 'Technologies',
    'home.work': '(02) Selected work',
    'home.stack': '(03) Stack & tools',
    'home.clients': '(04) Clients',
    'home.liveSites': 'sites',
    'home.liveSitesOutline': 'live',
    'common.seeAll': 'See all →',

    'kind.web': 'Web',
    'kind.game': 'Game',
    'kind.app': 'App',
    'kind.client': 'Client site',

    'work.eyebrow': 'Work',
    'work.title': 'Projects',
    'work.lead':
      'All my work in one place: platforms for institutions and citizens, serious games, augmented-reality apps and custom websites for artists, galleries and brands.',
    'work.all': 'All',
    'work.filter': 'Filter projects by type',
    'work.clientsLink': 'Client directory →',

    'project.back': '← Work',
    'project.type': 'Type',
    'project.year': 'Year',
    'project.role': 'Role',
    'project.stack': 'Stack',
    'project.live': 'Visit live site ↗',
    'project.next': 'Next project →',
    'project.shot': 'screenshot',

    'clients.eyebrow': 'Live sites · New York ↔ Ecuador',
    'clients.title': 'Clients',
    'clients.lead':
      'Galleries, artists, photographers, restaurants, foundations and public figures. Visual design, front-end development and ongoing technical support.',
    'clients.all': 'All',
    'clients.filter': 'Filter clients by category',
    'clients.shotAlt': 'Screenshot of the website for',
    'cat.Arte y Galerías': 'Art & Galleries',
    'cat.Personal / Político': 'Personal / Public figures',
    'cat.Gobierno': 'Institutions',
    'cat.Restaurantes y Pequeños Negocios': 'Restaurants & Business',

    'about.eyebrow': 'About',
    'about.line1': 'Tech web',
    'about.line2': 'alchemist',
    'about.experience': 'Experience',
    'about.education': 'Education',
    'about.cmdEdu': 'cat education.txt',
    'about.cmdTraining': 'ls training/ --sort=year',
    'about.logFile': '~/pryw00/education.log',
    'about.skills': 'Technologies',

    'footer.eyebrow': 'Got a project in mind?',
    'footer.cta': "Let's talk",
    'footer.email': 'Email',
    'footer.copy': 'Copy',
    'footer.copied': 'Copied!',
    'footer.social': 'Social',
    'footer.map': 'Sitemap',
    'footer.made': 'Handmade with Astro + GSAP',

    'status.archived': 'Archive · offline',
    'status.filter': 'Archive',
    'status.wayback': 'View archive ↗',
    'status.note': 'This project is no longer online; it is kept here as a historical record.',

    'cursor.view': 'View',
    'cursor.visit': 'Visit',
    'cursor.next': 'Next',
    'cursor.archive': 'Archive',
    'cursor.shot': 'Screenshot',
    'status.viewShot': 'View screenshot',
    'lightbox.close': 'Close',
    'cursor.write': 'Write',
  },
} as const;

type Dict = (typeof ui)['es'];

export function useTranslations(lang: Lang) {
  return function t<K extends keyof Dict>(key: K): Dict[K] {
    return (ui[lang] as unknown as Dict)[key] ?? ui[defaultLang][key];
  };
}
