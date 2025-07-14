export const defaultMeta = {
  title: 'UnderAchievers',
  description: 'Underachievers is a space for forgotten ideas to evolve — share old sketches, drafts, or writings and let others bring them to life.',
  openGraph: {
    title: 'UnderAchievers',
    description: 'Not every project needs to be perfect. Underachievers is where early ideas are shared, reused, and reimagined',
    type: 'website',
    url: 'https://underachievers.vercel.app/',
    images: [
      {
        url: 'https://underachievers.com/DSbg.webp',
        width: 1200,
        height: 630,
        alt: 'UnderAchievers Open Graph Image',
      },
    ],
  },
};

export function generateMeta(overrides: Partial<typeof defaultMeta> = {}) {
  return {
    ...defaultMeta,
    ...overrides,
  };
}