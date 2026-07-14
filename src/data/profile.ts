export const profile = {
  name: 'Wilson Yépez',
  handle: '@Pryw00',
  title: 'Ingeniero en Sistemas Computacionales · Magíster en Computación · Experto en Ciberseguridad',
  tagline: 'Tech Web Alchimist',
  location: 'Ibarra, Ecuador',
  bio: 'Desarrollador Web, Tech Alquimist y Gamer. Creo código para construir plataformas de impacto, innovadoras e intuitivas. He trabajado creando soluciones frescas y eficientes para instituciones de gobierno, corporaciones, políticos, galerías de arte, artistas, fundaciones, restaurantes.',
  contact: {
    email: 'pryw95@gmail.com',
    phone: '+593 97 883 3504',
    linkedin: 'https://linkedin.com/in/pryw00',
    github: 'https://github.com/Pryw00',
  },
  education: [
    {
      degree: 'Maestría en Computación con mención en Ciberseguridad',
      institution: 'Universidad Técnica del Norte',
      period: '05/2022 – 05/2023',
    },
    {
      degree: 'Ingeniería en Sistemas Computacionales',
      institution: 'Universidad Técnica del Norte',
      period: '03/2014 – 06/2020',
    },
  ],
  training: [
    { title: 'The Game Design and AI Master Class: Beginner to Expert', hours: 85, platform: 'Udemy', year: 2025 },
    { title: 'UX Design: Conceptos básicos para principiantes', hours: 1, platform: 'Udemy', year: 2024 },
    { title: 'The Complete Cyber Security Course: Hackers Exposed!', hours: 12, platform: 'Udemy', year: 2024 },
    { title: 'Aprende TypeScript de 0 a 100', hours: 3.5, platform: 'Udemy', year: 2022 },
    { title: 'Angular 8 - Curso básico de introducción y primeros pasos', hours: 1, platform: 'Udemy', year: 2021 },
  ],
  experience: [
    { role: 'Coordinador de Soporte y Desarrollo Web', company: '' },
    { role: 'Especialista en Soporte Técnico y Web', company: 'Shaman Portal / Fundación Kiru' },
    { role: 'Web Master', company: 'Ediciones de la Línea Imaginaria' },
    { role: 'Analista de Sistemas', company: 'Gobierno Autónomo Descentralizado San Miguel de Ibarra' },
    { role: 'Administrador de Sistemas y Web / Asesor Nivel 2', company: 'Easy Español' },
    { role: 'Asesor', company: 'Asamblea Nacional (Ecuador)' },
  ],
  skills: [
    'Java', 'Unity 3D', 'PHP', 'WordPress', 'CSS', 'C#', 'HTML',
    'Godot', 'Podman/Docker', 'JavaScript', 'TypeScript', 'SQL',
    'Firebase', 'ScriptCase',
  ],
} as const;
