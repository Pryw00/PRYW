import type { Lang } from '../i18n/ui';

const shared = {
  name: 'Wilson Yépez',
  handle: '@Pryw00',
  location: 'Quito, Ecuador',
  contact: {
    email: 'pryw95@gmail.com',
    phone: '+593 97 883 3504',
    linkedin: 'https://linkedin.com/in/pryw00',
    github: 'https://github.com/Pryw00',
  },
  skills: [
    'Java', 'Unity 3D', 'PHP', 'WordPress', 'CSS', 'C#', 'HTML',
    'Godot', 'Podman/Docker', 'JavaScript', 'TypeScript', 'SQL',
    'Firebase', 'ScriptCase',
  ],
};

const localized = {
  es: {
    title: 'Ingeniero en Sistemas Computacionales · Magíster en Computación · Experto en Ciberseguridad',
    tagline: 'Tech Web Alchimist',
    bio: 'Desarrollador Web, Tech Alquimist y Gamer. Creo código para construir plataformas de impacto, innovadoras e intuitivas. He trabajado creando soluciones frescas y eficientes para instituciones de gobierno, corporaciones, políticos, galerías de arte, artistas, fundaciones, restaurantes.',
    education: [
      { degree: 'Maestría en Computación con mención en Ciberseguridad', institution: 'Universidad Técnica del Norte', period: '05/2022 – 05/2023' },
      { degree: 'Ingeniería en Sistemas Computacionales', institution: 'Universidad Técnica del Norte', period: '03/2014 – 06/2020' },
    ],
    training: [
      { title: 'The Game Design and AI Master Class: Beginner to Expert', hours: 85, platform: 'Udemy', year: 2025 },
      { title: 'UX Design: Conceptos básicos para principiantes', hours: 1, platform: 'Udemy', year: 2024 },
      { title: 'The Complete Cyber Security Course: Hackers Exposed!', hours: 12, platform: 'Udemy', year: 2024 },
      { title: 'Aprende TypeScript de 0 a 100', hours: 3.5, platform: 'Udemy', year: 2022 },
      { title: 'Angular 8 - Curso básico de introducción y primeros pasos', hours: 1, platform: 'Udemy', year: 2021 },
    ],
    experience: [
      { role: 'Coordinador de Soporte y Desarrollo Web', company: 'Shaman Portal' },
      { role: 'Especialista en Soporte Técnico y Web', company: 'Fundación Kiru' },
      { role: 'Web Master', company: 'Ediciones de la Línea Imaginaria' },
      { role: 'Analista de Sistemas', company: 'GAD San Miguel de Ibarra' },
      { role: 'Asesor Nivel 2', company: 'Asamblea Nacional del Ecuador' },
    ],
  },
  en: {
    title: 'Systems Engineer · M.Sc. in Computing · Cybersecurity Specialist',
    tagline: 'Tech Web Alchemist',
    bio: 'Web developer, tech alchemist and gamer. I write code to build high-impact, innovative and intuitive platforms. I have delivered fresh, efficient solutions for government institutions, corporations, politicians, art galleries, artists, foundations and restaurants.',
    education: [
      { degree: 'M.Sc. in Computing, Cybersecurity track', institution: 'Universidad Técnica del Norte', period: '05/2022 – 05/2023' },
      { degree: 'B.Eng. in Computer Systems Engineering', institution: 'Universidad Técnica del Norte', period: '03/2014 – 06/2020' },
    ],
    training: [
      { title: 'The Game Design and AI Master Class: Beginner to Expert', hours: 85, platform: 'Udemy', year: 2025 },
      { title: 'UX Design: Basics for Beginners', hours: 1, platform: 'Udemy', year: 2024 },
      { title: 'The Complete Cyber Security Course: Hackers Exposed!', hours: 12, platform: 'Udemy', year: 2024 },
      { title: 'TypeScript from 0 to 100', hours: 3.5, platform: 'Udemy', year: 2022 },
      { title: 'Angular 8 — Introduction and First Steps', hours: 1, platform: 'Udemy', year: 2021 },
    ],
    experience: [
      { role: 'Support & Web Development Coordinator', company: 'Shaman Portal' },
      { role: 'Technical Support & Web Specialist', company: 'Fundación Kiru' },
      { role: 'Webmaster', company: 'Ediciones de la Línea Imaginaria' },
      { role: 'Systems Analyst', company: 'Municipality of Ibarra (GAD)' },
      { role: 'Level 2 Advisor', company: 'National Assembly of Ecuador' },
    ],
  },
};

export const getProfile = (lang: Lang) => ({ ...shared, ...localized[lang] });
