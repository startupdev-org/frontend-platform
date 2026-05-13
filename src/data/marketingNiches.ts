export type MarketingNiche = {
  icon: string;
  title: string;
  category: string;
  desc: string;
};

export const MARKETING_NICHES: MarketingNiche[] = [
  { icon: '/assets/images/custom-icons/icon-01.svg', title: 'Frizerii', category: 'barbershop', desc: 'Tunsori, bărbierit și îngrijire pentru bărbați.' },
  { icon: '/assets/images/custom-icons/icon-02.svg', title: 'Saloane de înfrumusețare', category: 'salon', desc: 'Coafor, machiaj și tratamente de înfrumusețare.' },
  { icon: '/assets/images/custom-icons/icon-03.svg', title: 'Spa & wellness', category: 'spa', desc: 'Relaxare, masaje și tratamente corporale.' },
  { icon: '/assets/images/custom-icons/icon-05.svg', title: 'Saloane de unghii', category: 'nails', desc: 'Manichiură, pedichiură și nail art.' },
];

export function businessCategoryRaw(business: unknown): string {
  if (business == null || typeof business !== 'object') return '';
  const o = business as Record<string, unknown>;
  const a = o.category;
  const b = o.businessCategory;
  const c = o.business_category;
  return (
    (typeof a === 'string' && a.trim()) ||
    (typeof b === 'string' && String(b).trim()) ||
    (typeof c === 'string' && String(c).trim()) ||
    ''
  );
}

export function resolveMarketplaceCategorySlug(raw: string | null | undefined): string | null {
  if (raw == null) return null;
  const t = String(raw).trim();
  if (!t) return null;

  const upper = t.toUpperCase().replace(/\s+/g, '_');
  const enumToSlug: Record<string, string> = {
    BARBERSHOP: 'barbershop',
    NAILS: 'nails',
    SPA: 'spa',
    BEAUTY: 'salon',
    SALON: 'salon',
  };
  if (enumToSlug[upper]) return enumToSlug[upper];

  const lower = t.toLowerCase();
  if (MARKETING_NICHES.some((n) => n.category === lower)) return lower;

  const byTitle = MARKETING_NICHES.find((n) => n.title.toLowerCase() === lower);
  if (byTitle) return byTitle.category;

  return null;
}

export function marketingNicheTitleFromSlug(slug: string | null | undefined): string | null {
  if (!slug) return null;
  return MARKETING_NICHES.find((n) => n.category === slug.toLowerCase())?.title ?? null;
}

export function breadcrumbCategoryDisplay(
  rawApi: string | null | undefined,
  urlCategory: string | null | undefined,
): string | null {
  const slug =
    resolveMarketplaceCategorySlug(rawApi) ?? resolveMarketplaceCategorySlug(urlCategory ?? undefined);
  if (!slug) return null;
  return marketingNicheTitleFromSlug(slug);
}
