import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  CalendarDaysIcon,
  ClockIcon,
  LinkIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import ReviewList from '../../components/business/ReviewList';
import RatingStars from '../../components/business/RatingStars';
import { Business } from '../../types/business';
import { Service } from '../../types/service';
import { Employee } from '../../types/employee';
import { Review, RatingBreakdown } from '../../types/review';

const LUXE_PHOTOS = [
  'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1600&q=80',
] as const;

const mockBusiness: Business = {
  id: 'luxe-001',
  name: 'Luxe Beauty Studio',
  slug: 'luxe-beauty-studio',
  subdomain: null,
  description:
    'Luxe Beauty Studio este un salon premium situat în centrul Chișinăului, specializat în sprâncene, tratamente faciale și coafare profesională. Punem pe primul loc igiena, tehnicile moderne și grija personalizată.',
  logo_url: 'https://images.squarespace-cdn.com/content/v1/54390f2ee4b0a3191f9d5ab8/1574985068143-Y4C7Y4E9X2W1D7EA923S/Eyebrow-Tattoo.jpg?format=2500w',
  phone: '+373 (22) 555-019',
  email: 'hello@luxebeauty.md',
  address: 'Strada 31 August 1989 80',
  city: 'Chișinău, Moldova',
  latitude: 47.0105,
  longitude: 28.8638,
  category: 'Salon de înfrumusețare',
  price_range: 3,
  working_hours: {
    monday: { open: '09:00', close: '18:00' },
    tuesday: { open: '09:00', close: '18:00' },
    wednesday: { open: '09:00', close: '18:00' },
    thursday: { open: '10:00', close: '20:00' },
    friday: { open: '10:00', close: '20:00' },
    saturday: { open: '09:00', close: '16:00' },
    sunday: { open: null, close: null },
  },
  is_active: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  average_rating: 4.8,
  review_count: 124,
};

const mockServices: Service[] = [
  {
    id: 's1',
    business_id: mockBusiness.id,
    name: 'Tratament facial Signature',
    description: 'Curățare profundă și îngrijire adaptată tipului tău de ten',
    price: 85,
    duration_minutes: 60,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 's2',
    business_id: mockBusiness.id,
    name: 'Microblading (inițial)',
    description: 'Microblading semipermanent pentru sprâncene — ședința inițială',
    price: 350,
    duration_minutes: 150,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 's3',
    business_id: mockBusiness.id,
    name: 'Stilizare sprâncene',
    description: 'Pensat și conturare pentru un aspect definit',
    price: 40,
    duration_minutes: 30,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 's4',
    business_id: mockBusiness.id,
    name: 'Tuns & coafat',
    description: 'Tuns precis și coafare profesională',
    price: 65,
    duration_minutes: 60,
    is_active: true,
    created_at: new Date().toISOString(),
  },
];

const minServicePrice: number | null = (() => {
  const prices = mockServices.map((s) => s.price).filter((n) => typeof n === 'number' && Number.isFinite(n));
  if (prices.length === 0) return null;
  return Math.min(...prices);
})();

const servicesByCategory: Record<'featured' | 'brows' | 'facials' | 'hair', Service[]> = {
  featured: mockServices,
  brows: mockServices.filter((s) => /brow|microblading/i.test(s.name)),
  facials: mockServices.filter((s) => /facial/i.test(s.name)),
  hair: mockServices.filter((s) => /hair|cut|style/i.test(s.name)),
};

const mockEmployees: Employee[] = [
  {
    id: 'e1',
    business_id: mockBusiness.id,
    name: 'Maria Popa',
    photo_url: 'https://randomuser.me/api/portraits/women/68.jpg',
    position: 'Estetician senior',
    bio: 'Specialistă în microblading și corecție de sprâncene, cu 8 ani experiență în Chișinău.',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'e2',
    business_id: mockBusiness.id,
    name: 'Ion Drăgan',
    photo_url: 'https://randomuser.me/api/portraits/men/32.jpg',
    position: 'Stilist principal',
    bio: 'Stilist cu experiență, orientat spre tunsori precise și tehnici moderne de culoare.',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'e3',
    business_id: mockBusiness.id,
    name: 'Ana Rusu',
    photo_url: 'https://randomuser.me/api/portraits/women/65.jpg',
    position: 'Estetician',
    bio: 'Oferă tratamente faciale de regenerare și planuri de întreținere a tenului.',
    is_active: true,
    created_at: new Date().toISOString(),
  },
];

const mockReviews: Review[] = [
  {
    id: 'r1',
    business_id: mockBusiness.id,
    booking_id: null,
    customer_name: 'Mihai C.',
    rating_overall: 5,
    rating_cleanliness: 5,
    rating_service: 5,
    rating_price: 4,
    comment: 'Echipă foarte profesionistă și rezultate excelente la microblading — recomand cu încredere.',
    reply: 'Mulțumim, Mihai! Ne bucurăm că sunteți mulțumit.',
    is_verified: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'r2',
    business_id: mockBusiness.id,
    booking_id: null,
    customer_name: 'Ana P.',
    rating_overall: 5,
    rating_cleanliness: 5,
    rating_service: 5,
    rating_price: 5,
    comment: 'Tuns și coafat excelent — părul arată impecabil.',
    reply: null,
    is_verified: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'r3',
    business_id: mockBusiness.id,
    booking_id: null,
    customer_name: 'Victor B.',
    rating_overall: 4,
    rating_cleanliness: 4,
    rating_service: 4,
    rating_price: 4,
    comment: 'Tratament facial relaxant — îmbunătățire vizibilă după prima ședință.',
    reply: null,
    is_verified: true,
    created_at: new Date().toISOString(),
  },
];

const mockRatingBreakdown: RatingBreakdown = {
  overall: 4.8,
  cleanliness: 4.9,
  service: 4.8,
  price: 4.4,
};

export default function BusinessTestPage() {
  const [activeServiceCategory, setActiveServiceCategory] = useState<'featured' | 'brows' | 'facials' | 'hair'>(
    'featured',
  );
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState(0);
  const [transitionPhotoIdx, setTransitionPhotoIdx] = useState<number | null>(null);
  const [fadeIn, setFadeIn] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeNavSection, setActiveNavSection] = useState('services');

  const photos = LUXE_PHOTOS;
  const visibleServices = servicesByCategory[activeServiceCategory];

  const startPhotoTransition = (nextIdx: number) => {
    if (nextIdx === selectedPhotoIdx) return;
    // If we're mid-transition, ignore additional triggers.
    if (transitionPhotoIdx !== null) return;
    setTransitionPhotoIdx(nextIdx);
    setFadeIn(false);
  };

  // Preload images to avoid flicker.
  useEffect(() => {
    photos.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [photos]);

  // Cross-fade when a new photo is queued.
  useEffect(() => {
    if (transitionPhotoIdx === null) return;

    const raf = window.requestAnimationFrame(() => setFadeIn(true));
    const t = window.setTimeout(() => {
      setSelectedPhotoIdx(transitionPhotoIdx);
      setTransitionPhotoIdx(null);
      setFadeIn(false);
    }, 650);

    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
  }, [transitionPhotoIdx]);

  useEffect(() => {
    if (photos.length <= 1) return;

    const interval = window.setInterval(() => {
      const next = (selectedPhotoIdx + 1) % photos.length;
      startPhotoTransition(next);
    }, 4500);

    return () => window.clearInterval(interval);
  }, [photos.length, selectedPhotoIdx, transitionPhotoIdx]);

  const dayKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;
  const todayKey = dayKeys[new Date().getDay()];
  const hoursToday = mockBusiness.working_hours?.[todayKey];
  const openStatus = (() => {
    const open = hoursToday?.open;
    const close = hoursToday?.close;
    if (!open || !close) return { label: 'Închis astăzi', sublabel: 'Vezi programul', tone: 'muted' as const };
    return { label: `Deschis până la ${close}`, sublabel: `Astăzi ${open}–${close}`, tone: 'good' as const };
  })();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    setActiveNavSection(id);
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const copyLink = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // no-op: clipboard may be unavailable
    }
  };

  return (
    <>
      <Helmet>
        <title>{mockBusiness.name} - BookBeauty</title>
        <meta name="description" content={mockBusiness.description || `Programează-te la ${mockBusiness.name}`} />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gray-50">
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Header */}
            <section className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              {/* Banner full width */}
              <div className="relative aspect-[16/10] lg:aspect-[4/1] bg-gray-100">
                <img
                  src={photos[selectedPhotoIdx]}
                  alt={`${mockBusiness.name} photo ${selectedPhotoIdx + 1}`}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="eager"
                />
                {transitionPhotoIdx !== null ? (
                  <img
                    src={photos[transitionPhotoIdx]}
                    alt=""
                    className={[
                      'absolute inset-0 h-full w-full object-cover',
                      'transition-opacity duration-700 ease-out',
                      fadeIn ? 'opacity-100' : 'opacity-0',
                    ].join(' ')}
                    loading="eager"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {photos.map((_, idx) => (
                        <span
                          key={idx}
                          className={[
                            'h-1.5 w-1.5 rounded-full transition',
                            idx === (transitionPhotoIdx ?? selectedPhotoIdx) ? 'bg-white' : 'bg-white/50',
                          ].join(' ')}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-white/90 bg-black/35 backdrop-blur px-2 py-1 rounded-md">
                      {(transitionPhotoIdx ?? selectedPhotoIdx) + 1}/{photos.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content under banner */}
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-5 sm:pt-6">
                <div className="lg:flex lg:items-start lg:justify-between lg:gap-8">
                  {/* Left: title, meta, about */}
                  <div className="min-w-0 flex-1">
                    <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 truncate">
                      {mockBusiness.name}
                    </h1>
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-700">
                      <span className="inline-flex items-center gap-2">
                        <RatingStars rating={mockBusiness.average_rating ?? 0} size="sm" />
                        <span className="font-semibold text-gray-900">
                          {(mockBusiness.average_rating ?? 0).toFixed(1)}
                        </span>
                        <span className="text-gray-500">({mockBusiness.review_count})</span>
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className={openStatus.tone === 'good' ? 'text-emerald-700 font-medium' : 'text-gray-600'}>
                        {openStatus.label}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="inline-flex items-center gap-1">
                        <MapPinIcon className="h-4 w-4 text-gray-500" />
                        {mockBusiness.city}
                      </span>
                    </div>

                    <div className="mt-3 text-sm text-gray-600">
                      <p className="truncate">{mockBusiness.category}</p>
                    </div>

                    <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4">
                      <p className="text-sm font-semibold text-gray-900">Despre</p>
                      <p className="mt-2 text-sm text-gray-700 leading-relaxed">{mockBusiness.description}</p>
                    </div>
                  </div>

                  {/* Right: primary actions */}
                  <div className="mt-5 lg:mt-0 w-full lg:max-w-xs flex-shrink-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                      <Link
                        to={`/book/${mockBusiness.slug}`}
                        className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                      >
                        <CalendarDaysIcon className="h-5 w-5 mr-2" />
                        Programează-te
                      </Link>
                      <a
                        href={`tel:${mockBusiness.phone}`}
                        className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        <PhoneIcon className="h-5 w-5 mr-2" />
                        Sună
                      </a>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs text-gray-600">
                      <span className="inline-flex items-center gap-1">
                        <ClockIcon className="h-4 w-4" />
                        {openStatus.sublabel}
                      </span>
                      <button
                        type="button"
                        onClick={copyLink}
                        className="inline-flex items-center gap-1 rounded-md px-2 py-1 font-semibold text-gray-700 hover:bg-gray-100"
                      >
                        <LinkIcon className="h-4 w-4" />
                        {copied ? 'Copiat' : 'Copiază linkul'}
                      </button>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <a href="https://tiktok.com/@luxebeauty.md" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gray-900" aria-label="TikTok">
                        <svg className="h-5 w-5" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16.656 1.029c1.637-0.025 3.262-0.012 4.886-0.025 0.054 2.031 0.878 3.859 2.189 5.213l-0.002-0.002c1.411 1.271 3.247 2.095 5.271 2.235l0.028 0.002v5.036c-1.912-0.048-3.71-0.489-5.331-1.247l0.082 0.034c-0.784-0.377-1.447-0.764-2.077-1.196l0.052 0.034c-0.012 3.649 0.012 7.298-0.025 10.934-0.103 1.853-0.719 3.543-1.707 4.954l0.020-0.031c-1.652 2.366-4.328 3.919-7.371 4.011l-0.014 0c-0.123 0.006-0.268 0.009-0.414 0.009-1.73 0-3.347-0.482-4.725-1.319l0.040 0.023c-2.508-1.509-4.238-4.091-4.558-7.094l-0.004-0.041c-0.025-0.625-0.037-1.25-0.012-1.862 0.49-4.779 4.494-8.476 9.361-8.476 0.547 0 1.083 0.047 1.604 0.136l-0.056-0.008c0.025 1.849-0.050 3.699-0.050 5.548-0.423-0.153-0.911-0.242-1.42-0.242-1.868 0-3.457 1.194-4.045 2.861l-0.009 0.030c-0.133 0.427-0.21 0.918-0.21 1.426 0 0.206 0.013 0.41 0.037 0.61l-0.002-0.024c0.332 2.046 2.086 3.59 4.201 3.59 0.061 0 0.121-0.001 0.181-0.004l-0.009 0c1.463-0.044 2.733-0.831 3.451-1.994l0.010-0.018c0.267-0.372 0.45-0.822 0.511-1.311l0.001-0.014c0.125-2.237 0.075-4.461 0.087-6.698 0.012-5.036-0.012-10.060 0.025-15.083z"/></svg>
                      </a>
                      <a href="https://instagram.com/luxebeauty.md" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gray-900" aria-label="Instagram">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                      </a>
                      <a href="https://facebook.com/luxebeauty.md" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gray-900" aria-label="Facebook">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Main */}
              <div className="lg:col-span-8 space-y-6">
                <section id="services" className="scroll-mt-28 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">Servicii</h2>
                        <p className="mt-1 text-sm text-gray-600">Alege un tratament și rezervă instant.</p>
                      </div>
                      <div className="text-sm text-gray-600">
                        De la <span className="font-semibold text-gray-900">{minServicePrice != null ? `${minServicePrice} MDL` : '—'}</span>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {(
                        [
                          { id: 'featured', label: 'Recomandate' },
                          { id: 'brows', label: 'Sprâncene' },
                          { id: 'facials', label: 'Tratamente faciale' },
                          { id: 'hair', label: 'Păr' },
                        ] as const
                      ).map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setActiveServiceCategory(c.id)}
                          className={[
                            'px-3 py-2 rounded-full text-sm font-semibold border',
                            activeServiceCategory === c.id
                              ? 'bg-gray-900 text-white border-gray-900'
                              : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50',
                          ].join(' ')}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>

                    <div className="mt-5 space-y-3">
                      {visibleServices.map((s) => (
                        <div
                          key={s.id}
                          className="rounded-xl border border-gray-200 bg-white p-4 hover:border-gray-300 transition-colors"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                            <div className="min-w-0">
                              <p className="text-base font-semibold text-gray-900">{s.name}</p>
                              {s.description ? (
                                <p className="mt-1 text-sm text-gray-600">{s.description}</p>
                              ) : null}
                              <div className="mt-2 text-sm text-gray-600 inline-flex items-center gap-2">
                                <ClockIcon className="h-4 w-4" />
                                <span>{s.duration_minutes} min</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-4">
                              <p className="text-lg font-semibold text-gray-900">{s.price} MDL</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <section id="photos" className="scroll-mt-28 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="p-5 sm:p-6">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">Fotografii</h2>
                        <p className="mt-1 text-sm text-gray-600">O privire rapidă în studio.</p>
                      </div>
                      <span className="text-sm text-gray-600">{photos.length} fotografii</span>
                    </div>
                    <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-3">
                      {photos.map((p, idx) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => startPhotoTransition(idx)}
                          className="relative overflow-hidden rounded-xl border border-gray-200 hover:border-gray-300"
                          aria-label={`Deschide fotografia ${idx + 1}`}
                        >
                          <img src={p} alt="" className="h-32 w-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </section>

                <section id="team" className="scroll-mt-28 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="p-5 sm:p-6">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">Echipă</h2>
                        <p className="mt-1 text-sm text-gray-600">Cunoaște specialiștii.</p>
                      </div>
                      <span className="text-sm text-gray-600">{mockEmployees.length} persoane</span>
                    </div>

                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {mockEmployees.map((e) => (
                        <div key={e.id} className="rounded-xl border border-gray-200 p-4">
                          <div className="flex items-start gap-3">
                            {e.photo_url ? (
                              <img src={e.photo_url} alt={e.name} className="h-12 w-12 rounded-xl object-cover" />
                            ) : (
                              <div className="h-12 w-12 rounded-xl bg-gray-100 grid place-items-center font-semibold text-gray-900">
                                {e.name.slice(0, 1).toUpperCase()}
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold text-gray-900 truncate">{e.name}</p>
                              {e.position ? <p className="text-sm text-gray-600">{e.position}</p> : null}
                              {e.bio ? <p className="mt-2 text-sm text-gray-700 line-clamp-3">{e.bio}</p> : null}
                              <div className="mt-2 flex items-center gap-2 text-sm text-gray-700">
                                <StarIcon className="h-4 w-4 text-yellow-500" />
                                <span className="font-medium">Foarte apreciat</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <section id="reviews" className="scroll-mt-28 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">Recenzii</h2>
                        <p className="mt-1 text-sm text-gray-600">Feedback verificat de la clienți.</p>
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm">
                        <RatingStars rating={mockRatingBreakdown.overall} size="sm" />
                        <span className="font-semibold text-gray-900">{mockRatingBreakdown.overall.toFixed(1)}</span>
                        <span className="text-gray-600">({mockBusiness.review_count})</span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <ReviewList
                        reviews={mockReviews}
                        businessName={mockBusiness.name}
                        businessAvatar={mockBusiness.logo_url}
                      />
                    </div>
                  </div>
                </section>

                <section id="about" className="scroll-mt-28 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="p-5 sm:p-6">
                    <h2 className="text-xl font-semibold text-gray-900">Despre</h2>
                    <p className="mt-3 text-sm text-gray-700 leading-relaxed">{mockBusiness.description}</p>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="rounded-xl border border-gray-200 p-4">
                        <p className="text-sm font-semibold text-gray-900">Program</p>
                        <div className="mt-3 space-y-2 text-sm text-gray-700">
                          {(
                            [
                              ['Luni', mockBusiness.working_hours.monday],
                              ['Marți', mockBusiness.working_hours.tuesday],
                              ['Miercuri', mockBusiness.working_hours.wednesday],
                              ['Joi', mockBusiness.working_hours.thursday],
                              ['Vineri', mockBusiness.working_hours.friday],
                              ['Sâmbătă', mockBusiness.working_hours.saturday],
                              ['Duminică', mockBusiness.working_hours.sunday],
                            ] as const
                          ).map(([label, h]) => (
                            <div key={label} className="flex items-center justify-between gap-3">
                              <span className="text-gray-600">{label}</span>
                              <span className="font-medium text-gray-900">
                                {h.open && h.close ? `${h.open}–${h.close}` : 'Închis'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-xl border border-gray-200 p-4">
                        <p className="text-sm font-semibold text-gray-900">Informații suplimentare</p>
                        <ul className="mt-3 space-y-2 text-sm text-gray-700">
                          <li className="flex items-start gap-2">
                            <span className="mt-0.5 text-emerald-700">●</span>
                            Confirmare instantă
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="mt-0.5 text-emerald-700">●</span>
                            Produse profesionale
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="mt-0.5 text-emerald-700">●</span>
                            Instrucțiuni de îngrijire incluse
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-4 space-y-6">
                <div className="sticky top-6 space-y-6">
                  <nav
                    className="flex flex-wrap gap-2 rounded-2xl bg-white border border-gray-200 shadow-sm p-2"
                    aria-label="Secțiuni pagină"
                  >
                    {[
                      { id: 'services', label: 'Servicii' },
                      { id: 'team', label: 'Echipă' },
                      { id: 'reviews', label: 'Recenzii' },
                      { id: 'about', label: 'Despre' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => scrollToSection(t.id)}
                        className={[
                          'rounded-full px-3 py-2 text-sm font-medium transition-all duration-200',
                          activeNavSection === t.id
                            ? 'bg-gray-900 text-white shadow-sm'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                        ].join(' ')}
                      >
                        {t.label}
                      </button>
                    ))}
                  </nav>

                  <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
                    <p className="text-sm font-semibold text-gray-900">Rezervă acum</p>
                    <p className="mt-1 text-sm text-gray-600">Alege o oră potrivită pentru tine.</p>
                    <Link
                      to={`/book/${mockBusiness.slug}`}
                      className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                    >
                      <CalendarDaysIcon className="h-5 w-5 mr-2" />
                      Programează-te
                    </Link>
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {['10:00', '12:30', '17:00'].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => scrollToSection('services')}
                          className="rounded-lg border border-gray-200 bg-white px-2 py-2 text-xs font-semibold text-gray-900 hover:bg-gray-50"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-5">
                      <p className="text-sm font-semibold text-gray-900">Locație</p>
                      <p className="mt-2 text-sm text-gray-700">{mockBusiness.address}</p>
                      <p className="text-sm text-gray-600">{mockBusiness.city}</p>
                    </div>
                    <div className="px-5 pb-5">
                      <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                        <iframe
                          title="Locația salonului"
                          src={`https://www.google.com/maps?q=${mockBusiness.latitude},${mockBusiness.longitude}&z=15&output=embed`}
                          width="100%"
                          height="220"
                          style={{ border: 0 }}
                          loading="lazy"
                        />
                      </div>
                      <a
                        className="mt-3 inline-flex items-center text-sm font-semibold text-gray-900 hover:underline"
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          `${mockBusiness.address}, ${mockBusiness.city}`,
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Direcții →
                      </a>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
                    <p className="text-sm font-semibold text-gray-900">Contact</p>
                    <div className="mt-3 space-y-3 text-sm text-gray-700">
                      <a className="flex items-center gap-2 hover:underline" href={`tel:${mockBusiness.phone}`}>
                        <PhoneIcon className="h-4 w-4 text-gray-500" />
                        {mockBusiness.phone}
                      </a>
                      <a className="flex items-center gap-2 hover:underline" href={`mailto:${mockBusiness.email}`}>
                        <EnvelopeIcon className="h-4 w-4 text-gray-500" />
                        {mockBusiness.email}
                      </a>
                      <button
                        type="button"
                        onClick={copyLink}
                        className="flex items-center gap-2 text-left hover:underline"
                      >
                        <LinkIcon className="h-4 w-4 text-gray-500" />
                        {copied ? 'Link copiat' : 'Copiază linkul'}
                      </button>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>

        <footer className="mt-16 border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">BookBeauty</h3>
                <p className="text-sm text-gray-600">
                  Platforma ta de încredere pentru programări la servicii de beauty și barber.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Linkuri rapide</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Piață
                    </a>
                  </li>
                  <li>
                    <a href="/admin/login" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Autentificare business
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact</h3>
                <p className="text-sm text-gray-600">Email: info@bookbeauty.md</p>
                <p className="text-sm text-gray-600">Telefon: +373 69 000 000</p>
              </div>
            </div>
            <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-500">
              <p>&copy; {new Date().getFullYear()} BookBeauty. Toate drepturile rezervate.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
