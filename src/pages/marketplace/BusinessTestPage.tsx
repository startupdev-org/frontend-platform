import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  BanknotesIcon,
  CalendarDaysIcon,
  ClipboardDocumentCheckIcon,
  CreditCardIcon,
  DocumentTextIcon,
  ClockIcon,
  EnvelopeIcon,
  LinkIcon,
  EyeIcon,
  MapPinIcon,
  PhoneIcon,
  ScissorsIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { FaShare } from 'react-icons/fa';
import { BiSolidPhoneCall } from 'react-icons/bi';
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
  {
    id: 'e4',
    business_id: mockBusiness.id,
    name: 'Elena Munteanu',
    photo_url: 'https://randomuser.me/api/portraits/women/44.jpg',
    position: 'Coafor',
    bio: 'Specialistă în vopsit și balayage.',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'e5',
    business_id: mockBusiness.id,
    name: 'Andrei Cojocaru',
    photo_url: 'https://randomuser.me/api/portraits/men/67.jpg',
    position: 'Barber',
    bio: 'Tunsori clasice și moderne pentru bărbați.',
    is_active: true,
    created_at: new Date().toISOString(),
  },
];

// Mock review counts for each employee
const employeeReviewCounts = {
  'e1': 45,
  'e2': 67,
  'e3': 38,
  'e4': 52,
  'e5': 29,
};

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

  const todayTimeSlots = (() => {
    const open = hoursToday?.open;
    const close = hoursToday?.close;
    if (!open || !close) return [];
    const [openH, openM] = open.split(':').map(Number);
    const [closeH, closeM] = close.split(':').map(Number);
    const openMinutes = openH * 60 + openM;
    const closeMinutes = closeH * 60 + closeM;
    const slots: string[] = [];
    for (let m = openMinutes; m < closeMinutes; m += 30) {
      const h = Math.floor(m / 60);
      const min = m % 60;
      slots.push(`${h.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`);
    }
    return slots;
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
            {/* Header - Terra Beauty style */}
            <section className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              {/* Mobile only: autosliding hero above title */}
              <div className="relative lg:hidden aspect-[4/3] w-full overflow-hidden bg-gray-100">
                <img
                  src={photos[selectedPhotoIdx]}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="eager"
                />
                {transitionPhotoIdx !== null && (
                  <img
                    src={photos[transitionPhotoIdx]}
                    alt=""
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
                    loading="eager"
                    aria-hidden="true"
                  />
                )}
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                  {photos.map((_, idx) => (
                    <span
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${idx === selectedPhotoIdx ? 'w-5 bg-white' : 'w-1.5 bg-white/50'}`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>

              <div className="px-5 sm:px-6 lg:px-8 pt-5 sm:pt-6">
                {/* Breadcrumbs */}
                <nav className="text-xs sm:text-sm text-gray-500 mb-4 overflow-x-auto" aria-label="Breadcrumb">
                  <div className="flex items-center min-w-0 whitespace-nowrap">
                    <Link to="/" className="hover:text-gray-700">Acasă</Link>
                    <span className="mx-1.5">›</span>
                    <span className="text-gray-400 truncate">{mockBusiness.category}</span>
                    <span className="mx-1.5 flex-shrink-0">›</span>
                    <span className="text-gray-400 truncate">{mockBusiness.city}</span>
                    <span className="mx-1.5 flex-shrink-0">›</span>
                    <span className="text-gray-900 font-medium truncate">{mockBusiness.name}</span>
                  </div>
                </nav>

                {/* Title row: name + action icons — stacked on mobile, row on desktop */}
                <div className="mt-4 flex flex-col gap-4 lg:mt-8 lg:flex-row lg:items-start lg:justify-between lg:gap-4">
                  <div className="min-w-0">
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-3 sm:text-4xl sm:mb-4 lg:text-5xl">
                      {mockBusiness.name}
                    </h1>
                    {/* Meta: stacked on mobile, single line on desktop */}
                    <div className="flex flex-col gap-1.5 text-sm text-gray-600 lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-2 lg:gap-y-1">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="font-semibold text-gray-900">{(mockBusiness.average_rating ?? 0).toFixed(1)}</span>
                        <RatingStars rating={mockBusiness.average_rating ?? 0} size="sm" />
                        <span className="text-gray-500">({mockBusiness.review_count})</span>
                      </span>
                      <span className="hidden lg:inline text-gray-300">•</span>
                      <span className={openStatus.tone === 'good' ? 'text-emerald-600 font-medium' : 'text-gray-600'}>
                        {openStatus.label}
                      </span>
                      <span className="hidden lg:inline text-gray-300">•</span>
                      <span className="text-gray-700">{mockBusiness.address}, {mockBusiness.city}</span>
                      <span className="hidden lg:inline text-gray-300">•</span>
                      <a
                        href={`tel:${mockBusiness.phone}`}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        {mockBusiness.phone}
                      </a>
                    </div>
                  </div>
                  {/* Circular action icons: share, social — same row on mobile, desktop unchanged */}
                  <div className="flex items-center gap-2 flex-shrink-0 flex-wrap pb-4 lg:pb-0 lg:flex-nowrap">
                    <button
                      type="button"
                      onClick={copyLink}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                      aria-label="Share"
                    >
                      <FaShare className="h-5 w-5" />
                    </button>
                    <a
                      href="https://tiktok.com/@luxebeauty.md"
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                      aria-label="TikTok"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16.656 1.029c1.637-0.025 3.262-0.012 4.886-0.025 0.054 2.031 0.878 3.859 2.189 5.213l-0.002-0.002c1.411 1.271 3.247 2.095 5.271 2.235l0.028 0.002v5.036c-1.912-0.048-3.71-0.489-5.331-1.247l0.082 0.034c-0.784-0.377-1.447-0.764-2.077-1.196l0.052 0.034c-0.012 3.649 0.012 7.298-0.025 10.934-0.103 1.853-0.719 3.543-1.707 4.954l0.020-0.031c-1.652 2.366-4.328 3.919-7.371 4.011l-0.014 0c-0.123 0.006-0.268 0.009-0.414 0.009-1.73 0-3.347-0.482-4.725-1.319l0.040 0.023c-2.508-1.509-4.238-4.091-4.558-7.094l-0.004-0.041c-0.025-0.625-0.037-1.25-0.012-1.862 0.49-4.779 4.494-8.476 9.361-8.476 0.547 0 1.083 0.047 1.604 0.136l-0.056-0.008c0.025 1.849-0.050 3.699-0.050 5.548-0.423-0.153-0.911-0.242-1.42-0.242-1.868 0-3.457 1.194-4.045 2.861l-0.009 0.030c-0.133 0.427-0.21 0.918-0.21 1.426 0 0.206 0.013 0.41 0.037 0.61l-0.002-0.024c0.332 2.046 2.086 3.59 4.201 3.59 0.061 0 0.121-0.001 0.181-0.004l-0.009 0c1.463-0.044 2.733-0.831 3.451-1.994l0.010-0.018c0.267-0.372 0.45-0.822 0.511-1.311l0.001-0.014c0.125-2.237 0.075-4.461 0.087-6.698 0.012-5.036-0.012-10.060 0.025-15.083z"/></svg>
                    </a>
                    <a
                      href="https://instagram.com/luxebeauty.md"
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                      aria-label="Instagram"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                    <a
                      href="https://facebook.com/luxebeauty.md"
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                      aria-label="Facebook"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Mobile only: Rezervă acum inside header */}
              <div className="lg:hidden px-5 sm:px-6 pt-2 pb-5 border-t border-gray-100">
                <p className="text-sm font-semibold text-gray-900">Rezervă acum</p>
                <p className="mt-1 text-sm text-gray-600">Alege o oră potrivită pentru tine.</p>
                <div className="mt-4 flex flex-col gap-2">
                  <a
                    href={`tel:${mockBusiness.phone}`}
                    className="inline-flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    <BiSolidPhoneCall className="h-5 w-5 mr-2" />
                    {mockBusiness.phone}
                  </a>
                  <Link
                    to={`/book/${mockBusiness.slug}`}
                    className="inline-flex w-full items-center justify-center rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                  >
                    <CalendarDaysIcon className="h-5 w-5 mr-2" />
                    Programează-te
                  </Link>
                </div>
                <p className="mt-4 text-xs font-medium text-gray-500">Liber astăzi</p>
                <div className="mt-1.5 flex flex-nowrap gap-2 overflow-x-auto pb-1">
                  {todayTimeSlots.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => scrollToSection('services')}
                      className="rounded-lg border border-gray-200 bg-white px-2 py-2 text-xs font-semibold text-gray-900 hover:bg-gray-50 flex-shrink-0"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gallery: one large + thumbnails — desktop only; mobile uses hero above */}
              <div className="mt-5 hidden lg:grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 px-5 sm:px-6 lg:px-8 pb-5 sm:pb-6">
                <div className="relative aspect-[4/3] lg:aspect-auto lg:col-span-2 lg:row-span-2 lg:min-h-[260px] rounded-xl overflow-hidden bg-gray-100 col-span-2">
                  <img
                    src={photos[selectedPhotoIdx]}
                    alt={`${mockBusiness.name}`}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="eager"
                  />
                  {transitionPhotoIdx !== null && (
                    <img
                      src={photos[transitionPhotoIdx]}
                      alt=""
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
                      loading="eager"
                      aria-hidden="true"
                    />
                  )}
                </div>
                {photos.slice(1).map((src, idx) => {
                  const i = idx + 1;
                  const isLast = i === photos.length - 1;
                  return isLast ? (
                    <button
                      key={src}
                      type="button"
                      onClick={() => scrollToSection('photos')}
                      className="relative aspect-[8/3] rounded-xl overflow-hidden bg-gray-100 group lg:col-span-2"
                    >
                      <img src={src} alt="" className="h-full w-full object-cover" />
                      <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm font-semibold group-hover:bg-black/50">
                        Vezi toate fotografiile
                      </span>
                    </button>
                  ) : (
                    <button
                      key={src}
                      type="button"
                      onClick={() => startPhotoTransition(i)}
                      className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100"
                    >
                      <img src={src} alt="" className="h-full w-full object-cover" />
                    </button>
                  );
                })}
              </div>

            </section>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Main */}
              <div className="lg:col-span-8 space-y-6">
                <section id="services" className="scroll-mt-28 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">Servicii</h2>
                        <p className="mt-1 text-sm text-gray-600">Alege un tratament și rezervă instant.</p>
                      </div>
                      <div className="text-sm text-gray-600 lg:block">
                        De la <span className="font-semibold text-gray-900">{minServicePrice != null ? `${minServicePrice} MDL` : '—'}</span>
                      </div>
                    </div>

                    {/* Category pills: horizontal scroll on mobile, wrap on desktop */}
                    <div className="mt-4 -mx-5 px-5 lg:mx-0 lg:mt-5 lg:px-0">
                      <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-wrap lg:overflow-visible lg:pb-0">
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
                              'flex-shrink-0 px-3 py-2 rounded-full text-sm font-semibold border',
                              activeServiceCategory === c.id
                                ? 'bg-gray-900 text-white border-gray-900'
                                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50',
                            ].join(' ')}
                          >
                            {c.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <ul className="mt-4 divide-y divide-gray-100 lg:mt-5">
                      {visibleServices.map((s) => {
                        const Icon =
                          /brow|microblading|sprâncene|stilizare/i.test(s.name)
                            ? EyeIcon
                            : /hair|tuns|coafat|păr/i.test(s.name)
                              ? ScissorsIcon
                              : SparklesIcon;
                        return (
                          <li key={s.id} className="py-4 first:pt-0 last:pb-0">
                            <div className="flex flex-col gap-3 lg:flex-row lg:gap-3 lg:items-center">
                              <div className="flex gap-3 min-w-0">
                                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                                  <Icon className="h-5 w-5" />
                                </span>
                                <div className="min-w-0 flex-1 flex flex-col gap-1">
                                  <span className="font-medium text-gray-900">{s.name}</span>
                                  {s.description ? (
                                    <p className="text-sm text-gray-500">{s.description}</p>
                                  ) : null}
                                  <span className="text-xs text-gray-400">{s.duration_minutes} min</span>
                                </div>
                              </div>
                              <div className="flex flex-shrink-0 items-center justify-between gap-3 pl-12 lg:ml-auto lg:pl-0 lg:justify-end">
                                <span className="text-sm font-semibold text-gray-900 tabular-nums">{s.price} MDL</span>
                                <Link
                                  to={`/book/${mockBusiness.slug}?service=${s.id}`}
                                  className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors lg:flex-shrink-0"
                                >
                                  Selectează
                                </Link>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
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

                    <div className="mt-6 -mx-5 sm:-mx-6 px-5 sm:px-6">
                      <div className="flex gap-6 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth">
                        {mockEmployees.map((e) => (
                          <div
                            key={e.id}
                            className="flex flex-shrink-0 flex-col items-center text-center snap-center min-w-[100px]"
                          >
                            <div
                              className="relative flex-shrink-0 rounded-full overflow-hidden border-2 border-gray-200"
                              style={{ width: 80, height: 80 }}
                            >
                              {e.photo_url ? (
                                <img
                                  src={e.photo_url}
                                  alt={e.name}
                                  className="block object-cover"
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                              ) : (
                                <div className="h-full w-full bg-gray-100 grid place-items-center font-semibold text-gray-900">
                                  {e.name.slice(0, 1).toUpperCase()}
                                </div>
                              )}
                            </div>
                            <div className="mt-3">
                              <p className="font-semibold text-gray-900 text-sm">{e.name}</p>
                              <div className="mt-1 flex items-center justify-center gap-0.5 text-yellow-400">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <StarSolidIcon key={i} className="h-3.5 w-3.5" />
                                ))}
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                {employeeReviewCounts[e.id as keyof typeof employeeReviewCounts]} recenzii
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
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
                    <p className="mt-3 text-gray-700 leading-relaxed max-w-2xl">
                      {mockBusiness.description}
                    </p>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-5">
                        <div className="flex items-center gap-2 text-gray-900 font-semibold">
                          <ClockIcon className="h-5 w-5 text-gray-500" />
                          Program
                        </div>
                        <dl className="mt-4 space-y-2.5">
                          {(
                            [
                              ['Luni', 'monday', mockBusiness.working_hours.monday],
                              ['Marți', 'tuesday', mockBusiness.working_hours.tuesday],
                              ['Miercuri', 'wednesday', mockBusiness.working_hours.wednesday],
                              ['Joi', 'thursday', mockBusiness.working_hours.thursday],
                              ['Vineri', 'friday', mockBusiness.working_hours.friday],
                              ['Sâmbătă', 'saturday', mockBusiness.working_hours.saturday],
                              ['Duminică', 'sunday', mockBusiness.working_hours.sunday],
                            ] as const
                          ).map(([label, key, h]) => {
                            const isToday = key === todayKey;
                            return (
                              <div
                                key={label}
                                className={`flex items-center justify-between gap-3 py-2 px-3 rounded-lg -mx-1 ${isToday ? 'bg-white border border-gray-200' : ''}`}
                              >
                                <dt className={`text-sm ${isToday ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                                  {label}
                                  {isToday && <span className="ml-1.5 text-xs font-normal text-gray-500">(astăzi)</span>}
                                </dt>
                                <dd className={`text-sm tabular-nums ${isToday ? 'font-semibold text-gray-900' : 'font-medium text-gray-900'}`}>
                                  {h.open && h.close ? `${h.open}–${h.close}` : 'Închis'}
                                </dd>
                              </div>
                            );
                          })}
                        </dl>
                      </div>

                      <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-5">
                        <p className="text-gray-900 font-semibold">Informații suplimentare</p>
                        <ul className="mt-4 space-y-3">
                          <li className="flex items-center gap-3 text-sm text-gray-700">
                            <ClipboardDocumentCheckIcon className="h-5 w-5 flex-shrink-0 text-gray-500" />
                            Confirmare instantă
                          </li>
                          <li className="flex items-center gap-3 text-sm text-gray-700">
                            <SparklesIcon className="h-5 w-5 flex-shrink-0 text-gray-500" />
                            Produse profesionale
                          </li>
                          <li className="flex items-center gap-3 text-sm text-gray-700">
                            <DocumentTextIcon className="h-5 w-5 flex-shrink-0 text-gray-500" />
                            Instrucțiuni de îngrijire incluse
                          </li>
                          <li className="flex items-center gap-3 text-sm text-gray-700">
                            <BanknotesIcon className="h-5 w-5 flex-shrink-0 text-gray-500" />
                            Plată numerar
                          </li>
                          <li className="flex items-center gap-3 text-sm text-gray-700">
                            <CreditCardIcon className="h-5 w-5 flex-shrink-0 text-gray-500" />
                            Plată cu cardul
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
                    className="hidden lg:flex flex-wrap gap-2 rounded-2xl bg-white border border-gray-200 shadow-sm p-2"
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
                          'rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200',
                          activeNavSection === t.id
                            ? 'bg-gray-900 text-white shadow-sm'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                        ].join(' ')}
                      >
                        {t.label}
                      </button>
                    ))}
                  </nav>

                  <div className="hidden lg:block bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
                    <p className="text-sm font-semibold text-gray-900">Rezervă acum</p>
                    <p className="mt-1 text-sm text-gray-600">Alege o oră potrivită pentru tine.</p>
                    <div className="mt-4 flex flex-col gap-2">
                      <a
                        href={`tel:${mockBusiness.phone}`}
                        className="inline-flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        <BiSolidPhoneCall className="h-5 w-5 mr-2" />
                        {mockBusiness.phone}
                      </a>
                      <Link
                        to={`/book/${mockBusiness.slug}`}
                        className="inline-flex w-full items-center justify-center rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                      >
                        <CalendarDaysIcon className="h-5 w-5 mr-2" />
                        Programează-te
                      </Link>
                    </div>
                    <p className="mt-4 text-xs font-medium text-gray-500">Liber astăzi</p>
                    <div className="mt-1.5 flex flex-nowrap gap-2 overflow-x-auto">
                      {todayTimeSlots.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => scrollToSection('services')}
                          className="rounded-lg border border-gray-200 bg-white px-2 py-2 text-xs font-semibold text-gray-900 hover:bg-gray-50 flex-shrink-0"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-5">
                      <h3 className="text-sm font-semibold text-gray-900">Locație</h3>
                      <p className="mt-1 text-xs text-gray-500">Adresa și harta.</p>
                    </div>
                    <div className="px-5 pb-5 space-y-4">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          `${mockBusiness.address}, ${mockBusiness.city}`,
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 hover:bg-gray-100 transition-colors"
                      >
                        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white border border-gray-200">
                          <MapPinIcon className="h-4 w-4 text-gray-600" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900">{mockBusiness.address}</p>
                          <p className="mt-0.5 text-sm text-gray-600">{mockBusiness.city}</p>
                        </div>
                      </a>
                      <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                        <iframe
                          title="Locația salonului"
                          src={`https://www.google.com/maps?q=${mockBusiness.latitude},${mockBusiness.longitude}&z=15&output=embed`}
                          width="100%"
                          height="200"
                          style={{ border: 0 }}
                          loading="lazy"
                        />
                      </div>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          `${mockBusiness.address}, ${mockBusiness.city}`,
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-900 px-4 py-3 text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
                      >
                        Direcții
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-5">
                      <h3 className="text-sm font-semibold text-gray-900">Contact</h3>
                      <p className="mt-1 text-xs text-gray-500">Sună, scrie sau partajează pagina.</p>
                    </div>
                    <div className="px-5 pb-5 space-y-2">
                      <a
                        href={`tel:${mockBusiness.phone}`}
                        className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors"
                      >
                        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white border border-gray-200">
                          <PhoneIcon className="h-4 w-4 text-gray-600" />
                        </span>
                        {mockBusiness.phone}
                      </a>
                      <a
                        href={`mailto:${mockBusiness.email}`}
                        className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors"
                      >
                        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white border border-gray-200">
                          <EnvelopeIcon className="h-4 w-4 text-gray-600" />
                        </span>
                        <span className="truncate">{mockBusiness.email}</span>
                      </a>
                      <button
                        type="button"
                        onClick={copyLink}
                        className="flex w-full items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors"
                      >
                        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white border border-gray-200">
                          <LinkIcon className="h-4 w-4 text-gray-600" />
                        </span>
                        {copied ? 'Link copiat ✓' : 'Copiază linkul'}
                      </button>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>

        <footer className="mt-16 border-t border-gray-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-sm text-gray-400">
              Developed with <span className="text-red-400">♥</span> by CodavaDev
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
