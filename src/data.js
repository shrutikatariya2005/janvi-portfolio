// ─────────────────────────────────────────────────────────────
//  All portfolio content lives here. Edit this file to update the site.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'JANVI MOVALIYA',
  role: 'Frontend Developer',
  secondaryRole: 'UI/UX Designer',
  tagline: 'Building Interfaces. Creating Experiences.',
  status: 'Available for opportunities',
  locationLabel: 'Surat, India (UTC+5:30)',
  email: 'janvimovaliya07@gmail.com',
  phone: '+91 73597 05184',
  location: 'Surat, India',
  github: 'https://github.com/janvimovaliya04-max',
  githubLabel: 'github.com/janvimovaliya04-max',
  coords: '21.1702° N, 72.8311° E',
  // Optional: your own hero background image, e.g. '/hero.jpg' (put the file in /public). Leave '' for the animated aurora.
  heroImage: '',
  about:
    'Designing and building responsive, high-performance web applications using React.js, Next.js and modern JavaScript. Skilled in translating design wireframes into clean, scalable code, integrating RESTful APIs, and optimizing user interfaces for seamless interaction. Skilled at building micro-interactions and responsive layouts that make web applications feel fluid and alive.',
}

export const philosophy = [
  'Design → Code',
  'Responsive by default',
  'Clean, scalable components',
  'API-driven UIs',
  'Performance first',
]

export const project = {
  title: 'Next Hire',
  subtitle: 'Interview Management & Recruitment Platform',
  period: '06/2026',
  objective:
    'Centralized interview management platform that simplifies recruitment workflows for HR managers and empowers candidates to apply for jobs and track real-time application status.',
  stack: ['React.js', 'Tailwind CSS', 'MUI Components', 'Dummy JSON', 'Local Storage', 'RESTful APIs'],
  // Replace '' with your deployed URL when ready, e.g. 'https://next-hire.vercel.app'
  demoUrl: '',
  repoUrl: 'https://github.com/janvimovaliya04-max',
}

export const concepts = []

export const skills = [
  {
    id: 'core',
    title: 'Core Technologies',
    items: [
      { name: 'HTML5', level: 92 },
      { name: 'CSS3', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'TypeScript', level: 70 },
    ],
  },
  {
    id: 'frameworks',
    title: 'Frameworks & Libraries',
    items: [
      { name: 'React.js', level: 88 },
      { name: 'Next.js', level: 75 },
      { name: 'Context API', level: 80 },
    ],
  },
  {
    id: 'ui',
    title: 'UI & Styling',
    items: [
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Material-UI (MUI)', level: 85 },
      { name: 'Bootstrap', level: 85 },
      { name: 'SASS/SCSS', level: 78 },
      { name: 'Styled Components', level: 75 },
    ],
  },
  {
    id: 'apis',
    title: 'APIs & Testing',
    items: [
      { name: 'RESTful APIs', level: 82 },
      { name: 'GraphQL', level: 60 },
      { name: 'Postman', level: 80 },
      { name: 'React Testing Library', level: 65 },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Version Control',
    items: [
      { name: 'Git', level: 85 },
      { name: 'GitHub', level: 85 },
      { name: 'VS Code', level: 92 },
      { name: 'Vite', level: 82 },
      { name: 'Chrome DevTools', level: 85 },
    ],
  },
]

export const timeline = [
  {
    kind: 'Education',
    title: 'B.Tech — Information Technology & Engineering',
    org: 'P P Savani University',
    place: 'Kosamba, Surat',
    period: '2023 – 2027',
  },
  {
    kind: 'Internship',
    title: 'UI/UX Design Intern',
    org: 'PRODEV',
    place: '',
    period: '4 months',
  },
  {
    kind: 'Education',
    title: '11th – 12th Science (PCM)',
    org: 'P P Savani Vidhyalay',
    place: 'Surat',
    period: '2021 – 2023',
  },
]

export const courses = [
  { title: 'Computer Networks & Internet Protocol', org: 'NPTEL - SWAYAM', year: '2026' },
  { title: 'Software Engineering', org: 'NPTEL - SWAYAM', year: '2025' },
  { title: 'Engineering Maintainable Android Apps', org: 'Coursera', year: '2025' },
]

// ─────────────────────────────────────────────────────────────
//  FIGMA DESIGNS — folder-based gallery
//  Each entry = one project folder shown in the Design Lab.
//  `images` = list of PNGs inside that folder (public/Figma/Figma/...)
// ─────────────────────────────────────────────────────────────
export const designs = [
  {
    id: 'landing',
    title: 'Landing Page',
    tag: 'Web Design',
    note: 'Full-page landing screen designed in Figma.',
    cover: '/Figma/Figma/Landing_Page.png',
    images: [
      { src: '/Figma/Figma/Landing_Page.png', label: 'Landing Page' },
    ],
  },
  {
    id: 'cars',
    title: 'Cars UI',
    tag: 'Web Design',
    note: 'Automotive-themed interface concept.',
    cover: '/Figma/Figma/Cars.png',
    images: [
      { src: '/Figma/Figma/Cars.png', label: 'Cars UI' },
    ],
  },
  {
    id: 'dessert',
    title: 'Dessert App',
    tag: 'Mobile Design',
    note: 'Food & dessert ordering app screens.',
    cover: '/Figma/Figma/Dessert.png',
    images: [
      { src: '/Figma/Figma/Dessert.png', label: 'Dessert App' },
    ],
  },
  {
    id: 'pet-app',
    title: 'Pet App',
    tag: 'Mobile Design',
    note: 'Pet care and adoption mobile app UI.',
    cover: '/Figma/Figma/Pet App.png',
    images: [
      { src: '/Figma/Figma/Pet App.png', label: 'Pet App' },
    ],
  },
  {
    id: 'expense-tracker',
    title: 'Expense Tracker',
    tag: 'Multi-screen',
    note: 'Personal finance tracker — 3 screens.',
    cover: '/Figma/Figma/Expense_tracker/Page 1.png',
    images: [
      { src: '/Figma/Figma/Expense_tracker/Page 1.png', label: 'Page 1' },
      { src: '/Figma/Figma/Expense_tracker/Page 2.png', label: 'Page 2' },
      { src: '/Figma/Figma/Expense_tracker/Page 3.png', label: 'Page 3' },
    ],
  },
  {
    id: 'book-app',
    title: 'Book App Redesign',
    tag: 'Redesign',
    note: 'Mobile reading app — redesigned with reference comparison.',
    cover: '/Figma/Figma/Redesigns/Book App/Home.png',
    images: [
      { src: '/Figma/Figma/Redesigns/Book App/Home.png', label: 'Home' },
      { src: '/Figma/Figma/Redesigns/Book App/Home_Reference.png', label: 'Home — Reference' },
      { src: '/Figma/Figma/Redesigns/Book App/Catalog.png', label: 'Catalog' },
      { src: '/Figma/Figma/Redesigns/Book App/Catalog_Reference.png', label: 'Catalog — Reference' },
      { src: '/Figma/Figma/Redesigns/Book App/Library.png', label: 'Library' },
      { src: '/Figma/Figma/Redesigns/Book App/Library_Reference.png', label: 'Library — Reference' },
      { src: '/Figma/Figma/Redesigns/Book App/Search.png', label: 'Search' },
      { src: '/Figma/Figma/Redesigns/Book App/Search_Reference.png', label: 'Search — Reference' },
      { src: '/Figma/Figma/Redesigns/Book App/Book-Info.png', label: 'Book Info' },
      { src: '/Figma/Figma/Redesigns/Book App/Book.Info_Reference.png', label: 'Book Info — Reference' },
    ],
  },
  {
    id: 'clothing',
    title: 'Clothing App Redesign',
    tag: 'Redesign',
    note: 'Fashion e-commerce redesign with reference screen.',
    cover: '/Figma/Figma/Redesigns/Clothing/Redesign.png',
    images: [
      { src: '/Figma/Figma/Redesigns/Clothing/Redesign.png', label: 'Redesign' },
      { src: '/Figma/Figma/Redesigns/Clothing/Reference.png', label: 'Reference' },
    ],
  },
  {
    id: 'hotel',
    title: 'Hotel Booking Redesign',
    tag: 'Redesign',
    note: 'Hotel booking flow — 3 UI variations + reference.',
    cover: '/Figma/Figma/Redesigns/Hotel_booking/V-1.png',
    images: [
      { src: '/Figma/Figma/Redesigns/Hotel_booking/V-1.png', label: 'Version 1' },
      { src: '/Figma/Figma/Redesigns/Hotel_booking/V-2.png', label: 'Version 2' },
      { src: '/Figma/Figma/Redesigns/Hotel_booking/V-3.png', label: 'Version 3' },
      { src: '/Figma/Figma/Redesigns/Hotel_booking/Reference.png', label: 'Reference' },
    ],
  },
]
