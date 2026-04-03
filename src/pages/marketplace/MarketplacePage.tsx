import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaSearch } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import BusinessCard from '../../components/business/BusinessCard';
import MarketingFooter from '../../components/layout/MarketingFooter';
import MarketingNavbar from '../../components/layout/MarketingNavbar';
import { MARKETING_NICHES } from '../../data/marketingNiches';
import { useBusinesses } from '../../hooks/useBusiness';
import type { BusinessFilters, WorkingHours } from '../../types/business';
import './MarketplacePage.css';

const WEEKDAY_KEYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;
const PAGE_SIZE = 6;
const FETCH_PAGE: Pick<BusinessFilters, 'page' | 'size'> = { page: 0, size: 6 };
const FACET_FILTERS: BusinessFilters = { ...FETCH_PAGE };

function resolveCategoryOrNameQuery(raw: string): { category: string | null; q: string | null } {
  const t = raw.trim();
  if (!t) return { category: null, q: null };
  const niche = MARKETING_NICHES.find(
    (n) =>
      n.category.toLowerCase() === t.toLowerCase() || n.title.toLowerCase() === t.toLowerCase(),
  );
  if (niche) return { category: niche.category, q: null };
  return { category: null, q: t };
}

function displayCategoryOrSearchFromUrl(categoryParam: string, qParam: string): string {
  if (categoryParam) {
    const niche = MARKETING_NICHES.find((n) => n.category === categoryParam);
    return niche ? niche.title : categoryParam;
  }
  return qParam;
}

function filtersDraftMatchesUrl(
  categoryOrNameDraft: string,
  cityDraft: string,
  timeDraft: 'any' | 'open_today',
  categoryParam: string,
  qParam: string,
  cityParam: string,
  openTodayParam: boolean,
): boolean {
  const { category, q } = resolveCategoryOrNameQuery(categoryOrNameDraft);
  if ((category ?? '') !== categoryParam || (q ?? '') !== qParam) return false;
  if ((cityDraft || '') !== (cityParam || '')) return false;
  if ((timeDraft === 'open_today') !== openTodayParam) return false;
  return true;
}

function isOpenToday(workingHours: WorkingHours | undefined, date: Date) {
  if (!workingHours) return false;
  const todayKey = WEEKDAY_KEYS[date.getDay() as number];
  const hoursToday = workingHours[todayKey];
  return Boolean(hoursToday?.open && hoursToday?.close);
}

function MarketplaceResultsInlineLoader() {
  return (
    <div
      className="marketplace-results-inline-loader"
      role="status"
      aria-live="polite"
      aria-label="Se încarcă rezultatele"
    >
      <div className="loading">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}

export default function MarketplacePage() {
  const routerLocation = useLocation();
  const navigate = useNavigate();

  const urlParams = useMemo(() => new URLSearchParams(routerLocation.search), [routerLocation.search]);
  const categoryParam = urlParams.get('category') ?? '';
  const cityParam = urlParams.get('city') ?? '';
  const qParam = urlParams.get('q') ?? '';
  const openTodayParam = urlParams.get('open') === '1';

  const pageOneBased = useMemo(() => {
    const n = parseInt(urlParams.get('page') ?? '1', 10);
    return Number.isFinite(n) && n >= 1 ? n : 1;
  }, [urlParams]);

  const listFilters = useMemo(
    (): BusinessFilters => ({
      ...FETCH_PAGE,
      category: categoryParam || undefined,
      city: cityParam || undefined,
      search: qParam || undefined,
    }),
    [categoryParam, cityParam, qParam],
  );

  const { businesses: serverBusinesses, isLoading, error } = useBusinesses(listFilters);
  const { businesses: facetBusinesses, isLoading: citiesLoading } = useBusinesses(FACET_FILTERS);

  const displayFromUrl = useMemo(
    () => displayCategoryOrSearchFromUrl(categoryParam, qParam),
    [categoryParam, qParam],
  );
  const [categoryOrNameDraft, setCategoryOrNameDraft] = useState(displayFromUrl);
  const [cityDraft, setCityDraft] = useState(cityParam);
  const [timeDraft, setTimeDraft] = useState<'any' | 'open_today'>(openTodayParam ? 'open_today' : 'any');

  useEffect(() => {
    setCategoryOrNameDraft(displayFromUrl);
  }, [displayFromUrl]);

  useEffect(() => {
    setCityDraft(cityParam);
  }, [cityParam]);

  useEffect(() => {
    setTimeDraft(openTodayParam ? 'open_today' : 'any');
  }, [openTodayParam]);

  const cityOptions = useMemo(() => {
    const opts = new Set(facetBusinesses.map((b) => b.city).filter(Boolean) as string[]);
    return Array.from(opts).sort((a, b) => a.localeCompare(b, 'ro'));
  }, [facetBusinesses]);

  const hasUrlFilters = urlParams.toString().length > 0;

  const draftMatchesAppliedUrl = filtersDraftMatchesUrl(
    categoryOrNameDraft,
    cityDraft,
    timeDraft,
    categoryParam,
    qParam,
    cityParam,
    openTodayParam,
  );

  const scrollToResults = useCallback(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById('marketplace_results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }, []);

  const navigateSearch = useCallback(
    (edit: (p: URLSearchParams) => void, replace = false) => {
      const p = new URLSearchParams(routerLocation.search);
      edit(p);
      const s = p.toString();
      navigate({ pathname: routerLocation.pathname, search: s ? `?${s}` : '' }, { replace });
    },
    [navigate, routerLocation.pathname, routerLocation.search],
  );

  const applyAllFilters = () => {
    const { category, q } = resolveCategoryOrNameQuery(categoryOrNameDraft);
    const p = new URLSearchParams();
    if (category) p.set('category', category);
    if (q) p.set('q', q);
    if (cityDraft) p.set('city', cityDraft);
    if (timeDraft === 'open_today') p.set('open', '1');
    const s = p.toString();
    navigate({ pathname: routerLocation.pathname, search: s ? `?${s}` : '' }, { replace: true });
  };

  const goToResultsPage = (nextPage: number) => {
    navigateSearch((p) => {
      if (nextPage <= 1) p.delete('page');
      else p.set('page', String(nextPage));
    });
  };

  const prevPageForScrollRef = useRef<number | null>(null);

  useEffect(() => {
    if (prevPageForScrollRef.current === null) {
      prevPageForScrollRef.current = pageOneBased;
      return;
    }
    if (prevPageForScrollRef.current === pageOneBased) return;
    prevPageForScrollRef.current = pageOneBased;
    scrollToResults();
  }, [pageOneBased, scrollToResults]);

  const openFiltered = useMemo(() => {
    if (!openTodayParam) return serverBusinesses;
    const now = new Date();
    return serverBusinesses.filter((b) => isOpenToday(b.working_hours, now));
  }, [serverBusinesses, openTodayParam]);

  const listPageCount = useMemo(
    () => Math.max(1, Math.ceil(openFiltered.length / PAGE_SIZE)),
    [openFiltered],
  );

  const businesses = useMemo(() => {
    const start = (pageOneBased - 1) * PAGE_SIZE;
    return openFiltered.slice(start, start + PAGE_SIZE);
  }, [openFiltered, pageOneBased]);

  useEffect(() => {
    if (isLoading || error) return;
    if (openFiltered.length === 0) {
      if (pageOneBased > 1) navigateSearch((p) => p.delete('page'), true);
      return;
    }
    if (pageOneBased > listPageCount) {
      navigateSearch((p) => {
        if (listPageCount <= 1) p.delete('page');
        else p.set('page', String(listPageCount));
      }, true);
    }
  }, [isLoading, error, openFiltered.length, listPageCount, pageOneBased, navigateSearch]);

  const isResetMode = hasUrlFilters && draftMatchesAppliedUrl;

  return (
    <>
      <Helmet>
        <title>Marketplace - Business Platform</title>
        <meta
          name="description"
          content="Categorie, oraș sau program — rezervă online în Business Platform."
        />
        <meta name="theme-color" content="#1565c0" />
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
                      Descoperă saloane și servicii locale
                    </h1>
                    <p className="fs-6 lg:fs-5 xl:fs-4 sm:mt-1 max-w-550px mx-auto">
                      Filtrează după categorie, oraș sau program — programează-te online.
                    </p>

                    <div className="vstack sm:hstack gap-1 sm:gap-0 bg-white rounded-3 sm:rounded shadow-lg p-1 mx-auto w-100 max-w-650px lg:max-w-750px marketplace-hero-filters mb-1 ltr:sm:ms-2 rtl:sm:me-2 mt-2">
                      <datalist id="marketplace-category-name-hints">
                        {MARKETING_NICHES.map((n) => (
                          <option key={n.category} value={n.title} />
                        ))}
                      </datalist>
                      <span className="d-inline-flex justify-center items-center w-28px h-28px opacity-60 mb-0.5 sm:mb-0 sm:mr-1 rtl:sm:ml-1">
                        <FaSearch className="h-5.5 w-5.5 ml-5 text-gray-500" />
                      </span>

                      <div className="flex-1 vstack sm:hstack gap-1 sm:gap-0 min-w-0">
                        <div className="marketplace-hero-filter-item">
                          <input
                            type="text"
                            list="marketplace-category-name-hints"
                            value={categoryOrNameDraft}
                            onChange={(e) => setCategoryOrNameDraft(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                applyAllFilters();
                                scrollToResults();
                              }
                            }}
                            className="form-control marketplace-hero-search-input text-dark border-0 bg-transparent px-3 py-2 fs-6 w-full"
                            placeholder="Categorie"
                            aria-label="Categorie sau nume business"
                            autoComplete="off"
                          />
                        </div>

                        <div className="marketplace-hero-filter-item">
                          <select
                            aria-label="Locație"
                            value={cityDraft}
                            onChange={(e) => setCityDraft((e.target as HTMLSelectElement).value)}
                            className="form-control custom-dropdown-select text-dark border-0 bg-transparent px-3 py-2 fs-6 w-full marketplace-hero-filter-select"
                          >
                            <option value="">
                              {citiesLoading && cityOptions.length === 0 ? 'Se încarcă…' : 'Toate orașele'}
                            </option>
                            {cityOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="marketplace-hero-filter-item">
                          <select
                            aria-label="Program"
                            value={timeDraft}
                            onChange={(e) =>
                              setTimeDraft((e.target as HTMLSelectElement).value as 'any' | 'open_today')
                            }
                            className="form-control custom-dropdown-select text-dark border-0 bg-transparent px-3 py-2 fs-6 w-full marketplace-hero-filter-select"
                          >
                            <option value="any">Oricând</option>
                            <option value="open_today">Deschis astăzi</option>
                          </select>
                        </div>
                      </div>

                      <div className="marketplace-hero-actions">
                        <button
                          type="button"
                          className={
                            isResetMode
                              ? 'btn btn-md rounded-2 sm:rounded px-3 py-2 marketplace-hero-search-submit marketplace-hero-reset-btn'
                              : 'btn btn-md btn-dark rounded-2 sm:rounded px-3 py-2 marketplace-hero-search-submit'
                          }
                          onClick={() => {
                            if (isResetMode) {
                              setCategoryOrNameDraft('');
                              setCityDraft('');
                              setTimeDraft('any');
                              navigate({ pathname: routerLocation.pathname, search: '' }, { replace: true });
                              scrollToResults();
                              return;
                            }
                            applyAllFilters();
                            scrollToResults();
                          }}
                        >
                          {isResetMode ? 'Resetează filtrele' : 'Caută'}
                        </button>
                      </div>
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
                        <div className="panel py-10 text-center marketplace-cards-empty marketplace-results-message-fade">
                          <h3 className="h5 mb-1">Eroare</h3>
                          <p className="fs-6 text-gray-600 dark:text-gray-300">{error}</p>
                        </div>
                      ) : isLoading ? (
                        <MarketplaceResultsInlineLoader />
                      ) : openFiltered.length === 0 ? (
                        <div className="panel py-10 text-center marketplace-cards-empty marketplace-results-message-fade">
                          <h3 className="h5 mb-1">Nu am găsit niciun business</h3>
                          <p className="fs-6 text-gray-600 dark:text-gray-300">Încearcă altă căutare.</p>
                        </div>
                      ) : (
                        <>
                          <div className="row child-cols-12 md:child-cols-6 xl:child-cols-4 g-3 xl:g-4">
                            {businesses.map((business, index) => (
                              <div
                                key={business.id}
                                className="marketplace-card-fade-item"
                                style={{ animationDelay: `${Math.min(index, 18) * 0.04}s` }}
                              >
                                <BusinessCard business={business} />
                              </div>
                            ))}
                          </div>
                          {listPageCount > 1 && (
                            <nav
                              className="panel hstack flex-wrap justify-center items-center gap-2 sm:gap-3 mt-2 pt-4 border-top border-gray-200 dark:border-gray-700"
                              aria-label="Paginare rezultate"
                            >
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-dark dark:border-gray-500 dark:text-gray-100 rounded-2 px-3"
                                disabled={pageOneBased <= 1}
                                onClick={() => goToResultsPage(pageOneBased - 1)}
                              >
                                Înapoi
                              </button>
                              <span className="fs-7 sm:fs-6 text-gray-600 dark:text-gray-300 tabular-nums">
                                Pagina {pageOneBased} din {listPageCount}
                              </span>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-dark dark:border-gray-500 dark:text-gray-100 rounded-2 px-3"
                                disabled={pageOneBased >= listPageCount}
                                onClick={() => goToResultsPage(pageOneBased + 1)}
                              >
                                Înainte
                              </button>
                            </nav>
                          )}
                        </>
                      )}
                    </div>
                  </main>
                </div>
              </div>
            </div>
          </div>
        </div>

        <MarketingFooter />
      </div>
    </>
  );
}
