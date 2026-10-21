/** All site copy and image paths live here. Swap photos in public/images/. */

const img = (file: string) => `/images/${file}`;

/* ─────────────────────────── Navigation ─────────────────────────── */

export const NAV_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Our Mission', href: '#mission' },
  { label: 'Get Involved', href: '#impact' },
  { label: 'Programs', href: '#programs' },
];

export const MORE_LINKS = [
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const FOOTER_LINKS = [...NAV_LINKS, ...MORE_LINKS];

/* ───────────────────────────── Images ───────────────────────────── */

export const IMAGES = {
  hero: img('hero-collage.png'),
  heroPortrait: img('hero.png'),
  contactGroup: img('friends-sky.jpg'),
  mission: img('tree-planting.jpg'),
  video: img('volunteers-planting.jpg'),
  community: img('friends-sky.jpg'),
  dog: img('dog-volunteer.jpg'),
  kids: img('kids-waving.jpg'),
};

/* ───────────────────────────── Stats ────────────────────────────── */

export const STATS = [
  { value: 250, suffix: 'K', decimals: 0, label: 'Meals served' },
  { value: 12, suffix: '', decimals: 0, label: 'Partnerships' },
  { value: 2.2, suffix: 'M', decimals: 1, label: 'Trees planted' },
];

/* ──────────────────────────── Impact cards ───────────────────────── */

export const IMPACT_CARDS = [
  {
    icon: '💚',
    bg: '#d8f3d3',
    title: 'Humanitarian Impact',
    text: 'Built 200+ clean water systems in crisis zones—designed by our engineers',
  },
  {
    icon: '💜',
    bg: '#f2d3f1',
    title: 'Clinic pioneers',
    text: 'Pioneered mobile clinics serving remote areas—100% funded and managed by us',
  },
  {
    icon: '📞',
    bg: '#d3e8f8',
    title: 'Fast Response',
    text: '48h average deployment time for emergency teams',
  },
  {
    icon: '🎓',
    bg: '#fbe4c7',
    title: 'Education that transforms',
    text: 'Our schools empower 50K+ children annually with locally tailored curricula',
  },
];

/* ───────────────────────────── Programs ──────────────────────────── */

export const PROGRAMS = [
  {
    icon: '🐾',
    title: 'Animal rescue',
    text: 'Shelter, care and adoption support for abandoned animals in our communities.',
    image: img('dog-volunteer.jpg'),
    alt: 'Volunteer petting a rescued dog',
  },
  {
    icon: '🌱',
    title: 'Environmental initiative',
    text: 'Direct funding for reforestation and wildlife protection in critical ecosystems.',
    image: img('volunteers-planting.jpg'),
    alt: 'Volunteers planting a sapling',
  },
  {
    icon: '🎒',
    title: 'School supplies fund',
    text: 'Providing scholarships, school supplies, and learning programs that give children the opportunity to dream bigger and achieve more.',
    image: img('kids-waving.jpg'),
    alt: 'Smiling children waving',
  },
  {
    icon: '🍛',
    title: 'Community kitchens',
    text: 'Creating safe, nourishing meal spaces that help children focus on learning.',
    image: img('school-meals.jpg'),
    alt: 'Children sharing a school meal',
  },
  {
    icon: '🤝',
    title: 'Youth leadership',
    text: 'Creating support networks and skills training for the next generation of leaders.',
    image: img('friends-sky.jpg'),
    alt: 'Young volunteers smiling at the sky',
  },
];

/* ─────────────────────────── Testimonials ────────────────────────── */

export const TESTIMONIALS = [
  {
    quote:
      'This organization transformed my life and the lives of many others. Their dedication to the community is truly inspiring!',
    author: 'Diana Rose',
  },
  {
    quote:
      "I joined as a volunteer for one weekend. Two years later, I'm still planting trees with the same team.",
    author: 'Arjun Mehta',
  },
  {
    quote:
      'The school meal program means my children arrive ready to learn. We are so grateful.',
    author: 'Meera Patel',
  },
];

/* ───────────────────────────── Projects ──────────────────────────── */

export const PROJECTS = [
  {
    title: 'Wildlife corridors',
    text: 'Creating safe passageways between fragmented habitats to protect endangered species like jaguars and macaws',
    image: img('jaguar.jpg'),
    alt: 'Jaguar in the forest',
    featured: true,
  },
  {
    title: 'Green Village',
    text: '20,000 trees planted and 15 villages supported in building eco-friendly communities.',
    image: img('tree-planting.jpg'),
    alt: 'Hands planting a young tree',
  },
  {
    title: 'School Meal Program',
    text: 'Providing daily nutritious meals to children so they can focus on learning, not hunger.',
    image: img('school-meals.jpg'),
    alt: 'Children eating a nutritious meal',
  },
];
