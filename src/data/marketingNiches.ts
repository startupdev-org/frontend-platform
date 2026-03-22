export type MarketingNiche = {
  icon: string;
  title: string;
  category: string;
  desc: string;
};

/** Category slugs aligned with navbar + backend `category` filter */
export const MARKETING_NICHES: MarketingNiche[] = [
  { icon: '/assets/images/custom-icons/icon-01.svg', title: 'Frizerii', category: 'barbershop', desc: 'Tunsori, bărbierit și îngrijire pentru bărbați.' },
  { icon: '/assets/images/custom-icons/icon-02.svg', title: 'Saloane de înfrumusețare', category: 'salon', desc: 'Coafor, machiaj și tratamente de înfrumusețare.' },
  { icon: '/assets/images/custom-icons/icon-03.svg', title: 'Spa & wellness', category: 'spa', desc: 'Relaxare, masaje și tratamente corporale.' },
  { icon: '/assets/images/custom-icons/icon-05.svg', title: 'Saloane de unghii', category: 'nails', desc: 'Manichiură, pedichiură și nail art.' },
];
