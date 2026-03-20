import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import BusinessCard from '../../components/business/BusinessCard';
import MarketingNavbar from '../../components/layout/MarketingNavbar';
import PagePreloader from '../../components/ui/PagePreloader';
import { useBusinesses } from '../../hooks/useBusiness';
import type { WorkingHours } from '../../types/business';
import './MarketplacePage.css';

const WEEKDAY_KEYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;
const PAGE = 0;
const PAGE_SIZE = 24;

function isOpenToday(workingHours: WorkingHours | undefined, date: Date) {
  if (!workingHours) return false;
  const todayKey = WEEKDAY_KEYS[date.getDay() as number];
  const hoursToday = workingHours[todayKey];
  return Boolean(hoursToday?.open && hoursToday?.close);
}

export default function MarketplacePage() {
  const routerLocation = useLocation();
  const navigate = useNavigate();

  const { businesses: serverBusinesses, isLoading, error } = useBusinesses({
    page: PAGE,
    size: PAGE_SIZE,
    minPrice: 1,
    maxPrice: 4,
    minRating: undefined,
  });

  const [niche, setNiche] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [timeFilter, setTimeFilter] = useState<'any' | 'open_today'>('any');
  const [autoSelectDefaults, setAutoSelectDefaults] = useState(true);

  const urlParams = useMemo(() => new URLSearchParams(routerLocation.search), [routerLocation.search]);
  const categoryFromUrl = urlParams.get('category') ?? '';
  const hasUrlFilters = Array.from(urlParams.keys()).length > 0;

  const nicheOptions = useMemo(() => {
    const opts = new Set(serverBusinesses.map((b) => b.category).filter(Boolean));
    return Array.from(opts).sort();
  }, [serverBusinesses]);

  const locationOptions = useMemo(() => {
    const opts = new Set(serverBusinesses.map((b) => b.city).filter(Boolean));
    return Array.from(opts).sort() as string[];
  }, [serverBusinesses]);

  useEffect(() => {
    if (!autoSelectDefaults) return;
    if (!categoryFromUrl && !niche && nicheOptions.length) setNiche(nicheOptions[0]);
  }, [autoSelectDefaults, categoryFromUrl, niche, nicheOptions]);

  useEffect(() => {
    if (!categoryFromUrl) return;
    setNiche(categoryFromUrl);
    setAutoSelectDefaults(false);
  }, [categoryFromUrl]);

  useEffect(() => {
    if (!autoSelectDefaults) return;
    if (!location && locationOptions.length) setLocation(locationOptions[0]);
  }, [autoSelectDefaults, location, locationOptions]);

  const businesses = useMemo(() => {
    const now = new Date();
    let list = serverBusinesses;

    if (niche) list = list.filter((b) => (b.category ?? '').toLowerCase() === niche.toLowerCase());
    if (location) list = list.filter((b) => (b.city ?? '').toLowerCase() === location.toLowerCase());
    if (timeFilter === 'open_today') list = list.filter((b) => isOpenToday(b.working_hours, now));

    return list;
  }, [serverBusinesses, niche, location, timeFilter]);

  return (
    <>
      <Helmet>
        <title>Marketplace - Business Platform</title>
        <meta
          name="description"
          content="Descoperă business-uri locale listate în Business Platform și găsește rapid salonul sau serviciul potrivit pentru tine."
        />
        <meta name="theme-color" content="#178d72" />
        <link rel="stylesheet" href="/assets/js/uni-core/css/uni-core.min.css" />
        <link rel="stylesheet" href="/assets/css/fonts.css" />
        <link rel="stylesheet" href="/assets/css/unicons.min.css" />
        <link rel="stylesheet" href="/assets/css/main.css" />
        <link rel="stylesheet" href="/assets/css/theme-eleven.css" />
      </Helmet>

      <div className="uni-body panel bg-white text-tertiary-900 dark:bg-gray-900 dark:text-gray-200 overflow-x-hidden marketplace-page-root">
        <MarketingNavbar />

        <div id="wrapper" className="wrap">
          <div id="marketplace_header" className="hero-header section panel">
            <div className="section-outer panel pt-8 lg:pt-9 xl:pt-10 w-100 position-relative z-1">
              <div
                className="position-absolute top-0 start-0 end-0 h-full dark:blend-soft-light z-0"
                style={{ backgroundImage: 'url(/assets/images/hero-11-bg.jpg)', backgroundSize: 'cover' }}
              />
              <div className="position-absolute top-0 start-0 end-0 h-full bg-indigo blend-soft-light d-none dark:d-block z-0" />
              <div className="position-absolute top-0 start-0 end-0 h-full bg-gradient-to-b from-white via-transparent to-white dark:from-gray-900 dark:to-gray-900 z-0" />

              <div className="container max-w-lg position-relative z-1">
                <div className="section-inner panel max-w-750px xl:max-w-900px mx-auto text-center">
                  <div className="panel vstack items-center gap-2 xl:gap-3 mb-5 sm:mb-7 xl:mb-8">
                    <h1 className="h2 sm:h1 md:display-6 lg:display-5 xl:display-3 m-0">
                      Găsește business-ul potrivit
                    </h1>
                    <p className="fs-6 lg:fs-5 xl:fs-4 sm:mt-1 max-w-550px mx-auto">
                      Caută și descoperă saloane, servicii și profesioniști listați în Business Platform, gata să preia noi clienți.
                    </p>

                    <div className="vstack sm:hstack gap-1 sm:gap-0 bg-white rounded-3 sm:rounded shadow-lg p-1 mx-auto w-100 max-w-650px lg:max-w-750px marketplace-hero-filters mb-1 ltr:sm:ms-2 rtl:sm:me-2 mt-2">
                      <span className="d-inline-flex justify-center items-center w-28px h-28px opacity-60 mb-0.5 sm:mb-0 sm:mr-1 rtl:sm:ml-1">
                        <FaSearch className="h-5.5 w-5.5 ml-5 text-gray-500" />
                      </span>
                      <div className="flex-1 vstack sm:hstack gap-1 sm:gap-0 min-w-0">
                        <div className="marketplace-hero-filter-item">
                          <select
                            aria-label="Servicii"
                            value={niche}
                            onChange={(e) => {
                              setNiche((e.target as HTMLSelectElement).value);
                              setAutoSelectDefaults(false);
                            }}
                            className="custom-dropdown-select border-0 bg-transparent px-3 py-2 fs-6 w-full marketplace-hero-filter-select"
                          >
                            <option value="">{isLoading && nicheOptions.length === 0 ? 'Loading...' : 'Servicii'}</option>
                            {nicheOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="marketplace-hero-filter-item">
                          <select
                            aria-label="Locație"
                            value={location}
                            onChange={(e) => {
                              setLocation((e.target as HTMLSelectElement).value);
                              setAutoSelectDefaults(false);
                            }}
                            className="custom-dropdown-select border-0 bg-transparent px-3 py-2 fs-6 w-full marketplace-hero-filter-select"
                          >
                            <option value="">{isLoading && locationOptions.length === 0 ? 'Loading...' : 'Locație'}</option>
                            {locationOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="marketplace-hero-filter-item">
                          <select
                            aria-label="Oricând"
                            value={timeFilter}
                            onChange={(e) => {
                              setTimeFilter((e.target as HTMLSelectElement).value as 'any' | 'open_today');
                              setAutoSelectDefaults(false);
                            }}
                            className="custom-dropdown-select border-0 bg-transparent px-3 py-2 fs-6 w-full marketplace-hero-filter-select"
                          >
                            <option value="any">Oricând</option>
                            <option value="open_today">Deschis astăzi</option>
                          </select>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="btn btn-md lg:btn-lg btn-dark rounded-2 sm:rounded px-3 py-2 ltr:sm:ms-2 rtl:sm:me-2 lg:min-w-200px"
                        onClick={() => {
                          if (hasUrlFilters) {
                            setAutoSelectDefaults(false);
                            setNiche('');
                            setLocation('');
                            setTimeFilter('any');
                            navigate('/', { replace: true });
                          }
                          document.getElementById('marketplace_results')?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                          });
                        }}
                      >
                        {hasUrlFilters ? 'Resetează filtre' : 'Caută'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="section panel overflow-hidden marketplace-cards-section">
            <div className="section-outer panel py-6 sm:py-8 xl:py-9 mx-1 lg:mx-2 mt-n6 rounded-2 xl:rounded-3 marketplace-cards-shell">
              <div className="container lg:max-w-7xl">
                <div className="section-inner panel">
                  <main className="lg:col-12">
                    <div id="marketplace_results" className="panel vstack gap-4 lg:gap-5 marketplace-cards-area">
                      {error ? (
                        <div className="panel py-10 text-center marketplace-cards-empty">
                          <h3 className="h5 mb-1">Eroare</h3>
                          <p className="fs-6 text-gray-600 dark:text-gray-300">{error}</p>
                        </div>
                      ) : isLoading ? (
                        <div className="panel py-10 text-center marketplace-cards-empty">
                          <PagePreloader active={true} />
                        </div>
                      ) : businesses.length === 0 ? (
                        <div className="panel py-10 text-center marketplace-cards-empty">
                          <h3 className="h5 mb-1">Nu am găsit niciun business</h3>
                          <p className="fs-6 text-gray-600 dark:text-gray-300">Încearcă altă căutare.</p>
                        </div>
                      ) : (
                        <div className="row child-cols-12 md:child-cols-6 xl:child-cols-4 g-3 xl:g-4">
                          {businesses.map((business) => (
                            <div key={business.id}>
                              <BusinessCard business={business} />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </main>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
