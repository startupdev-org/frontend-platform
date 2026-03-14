import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import './MarketingNavbar.css';

const NAVBAR_HEIGHT = 80;

const PRODUCTS = [
  { icon: '/assets/images/custom-icons/icon-01.svg', title: 'Constructor șabloane email', desc: 'Creează emailuri personalizate care convertesc' },
  { icon: '/assets/images/custom-icons/icon-02.svg', title: 'Creator pagini de destinație', desc: 'Livrează mesajul potrivit utilizatorului potrivit' },
  { icon: '/assets/images/custom-icons/icon-03.svg', title: 'Rapoarte și analitică', desc: 'Urmărește vânzările și performanța campaniilor' },
  { icon: '/assets/images/custom-icons/icon-07.svg', title: 'Chatboturi, gratuit pentru totdeauna', desc: 'Urmărește vânzările și performanța campaniilor' },
];

const SOLUTIONS = [
  { icon: '/assets/images/custom-icons/icon-04.svg', title: 'Instrumente bazate pe AI', desc: 'Asistentul tău AI pentru creștere' },
  { icon: '/assets/images/custom-icons/icon-05.svg', title: 'E-commerce și retail', desc: 'Amplifică conversația pe toate canalele' },
  { icon: '/assets/images/custom-icons/icon-06.svg', title: 'Comunitate mare', desc: 'Oferta noastră de servicii' },
  { icon: '/assets/images/custom-icons/icon-08.svg', title: 'Automatizare bazată pe AI', desc: 'Oferta noastră de servicii' },
];

const RESOURCES = [
  { icon: 'unicon-checkmark', title: 'Listă de taskuri', desc: 'Gestionează mai multe softuri și instrumente pentru taskuri diferite.' },
  { icon: 'unicon-chart-pie', title: 'Rapoarte', desc: 'Cele mai recente rapoarte, actualizări și informații din industrie.' },
  { icon: 'unicon-increase-level', title: 'Foi de calcul', desc: 'Suite de instrumente care acoperă toate aspectele business-ului tău.' },
  { icon: 'unicon-chart-venn-diagram', title: 'Colaborare', desc: 'Atribuie taskuri, partajează fișiere și comunică cu echipa ta.' },
];

type MarketingNavbarProps = {
  solidBackground?: boolean;
};

export default function MarketingNavbar({ solidBackground = false }: MarketingNavbarProps) {
  const [openPlatforma, setOpenPlatforma] = useState(false);
  const [openResources, setOpenResources] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [navAnimated, setNavAnimated] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [dropdownAnimate, setDropdownAnimate] = useState<'platforma' | 'resources' | null>(null);
  const platformaTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resourcesTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollY = useRef(0);

  const clearPlatformaTimeout = () => {
    if (platformaTimeout.current) {
      clearTimeout(platformaTimeout.current);
      platformaTimeout.current = null;
    }
  };
  const clearResourcesTimeout = () => {
    if (resourcesTimeout.current) {
      clearTimeout(resourcesTimeout.current);
      resourcesTimeout.current = null;
    }
  };

  const handlePlatformaEnter = () => {
    clearPlatformaTimeout();
    setOpenPlatforma(true);
  };
  const handlePlatformaLeave = () => {
    platformaTimeout.current = setTimeout(() => setOpenPlatforma(false), 120);
  };
  const handleResourcesEnter = () => {
    clearResourcesTimeout();
    setOpenResources(true);
  };
  const handleResourcesLeave = () => {
    resourcesTimeout.current = setTimeout(() => setOpenResources(false), 120);
  };

  useEffect(() => {
    return () => {
      clearPlatformaTimeout();
      clearResourcesTimeout();
    };
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setNavAnimated(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const prev = lastScrollY.current;
      lastScrollY.current = y;
      const threshold = typeof window !== 'undefined' ? window.innerHeight : 800;
      if (y <= 0) {
        setSticky(false);
        return;
      }
      if (y > threshold && y < prev) setSticky(true);
      else if (y <= threshold || y >= prev) setSticky(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (openPlatforma) setDropdownAnimate('platforma');
    else if (openResources) setDropdownAnimate('resources');
    else setDropdownAnimate(null);
  }, [openPlatforma, openResources]);

  useEffect(() => {
    if (!searchOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [searchOpen]);

  return (
    <>
      <header
        className={`uc-header header-eleven uc-navbar-sticky-wrap z-999 ${solidBackground ? 'uc-navbar-solid' : sticky ? 'uc-navbar-sticky' : 'uc-navbar-transparent'}`}
        data-uc-sticky="start: 100vh; show-on-up: true; animation: uc-animation-slide-top; sel-target: .uc-navbar-container; cls-active: uc-navbar-sticky; cls-inactive: uc-navbar-transparent; end: !*;"
        onClickCapture={(e) => {
          const target = e.target as HTMLElement;
          if (target.closest('[data-search-trigger]')) {
            e.preventDefault();
            e.stopPropagation();
            setSearchOpen(true);
          }
        }}
      >
        <nav
          className={`uc-navbar-container border-bottom ft-tertiary z-1 ${navAnimated ? 'navbar-animate-in' : ''}`}
          data-anime="translateY: [-40, 0]; opacity: [0, 1]; easing: easeOutExpo; duration: 750; delay: 0;"
        >
          <div className="uc-navbar-main" style={{ ['--uc-nav-height' as string]: '80px' }}>
            <div className="container">
              <div className="uc-navbar min-h-64px lg:min-h-80px text-dark dark:text-white">
                <div className="uc-navbar-left gap-6 flex items-center">
                  <div className="uc-logo ltr:ms-1 rtl:me-1">
                    <Link to="/" className="panel text-none">
                      <img className="dark:d-none" src="/assets/images/common/logo-11.svg" alt="Business Platform" />
                      <img className="d-none dark:d-block" src="/assets/images/common/logo-11-dark.svg" alt="Business Platform" />
                    </Link>
                  </div>
                  <ul className="uc-navbar-nav fw-medium gap-3 xl:gap-5 d-none lg:d-flex items-center" style={{ ['--uc-nav-height' as string]: '80px' }}>
                    <li
                      className="position-relative flex items-center"
                      onMouseEnter={handlePlatformaEnter}
                      onMouseLeave={handlePlatformaLeave}
                    >
                      <button type="button" className="gap-1 border-0 bg-transparent p-0 text-inherit fw-medium inline-flex items-center h-full min-h-[var(--uc-nav-height,80px)]">
                        Platformă <span data-uc-navbar-parent-icon />
                      </button>
                      {openPlatforma && createPortal(
                        <div
                          className={`uc-dropbar-wrapper ${dropdownAnimate === 'platforma' ? 'dropdown-animate-in' : ''}`}
                          style={{ position: 'fixed', top: NAVBAR_HEIGHT, left: 0, right: 0, zIndex: 1000 }}
                          onMouseEnter={handlePlatformaEnter}
                          onMouseLeave={handlePlatformaLeave}
                        >
                          <div className="uc-dropbar uc-dropbar-top p-0 ft-primary text-unset fs-6 fw-normal hide-scrollbar border-top rounded-0 overflow-hidden shadow-xl bg-white dark:bg-gray-900">
                          <div className="uc-dropbar-content">
                            <div className="container">
                              <div className="uc-dropbar-inner after-bg">
                                <div className="row gx-5 col-match justify-between">
                                  <div className="col-8">
                                    <div className="panel vstack gap-4 py-4">
                                      <div className="vstack gap-narrow">
                                        <h5 className="h5 xl:h4 m-0">Automatizare AI Business Platform</h5>
                                        <p className="fs-7 text-gray-300">Automatizare bazată pe AI în peste 500 de aplicații</p>
                                      </div>
                                      <div className="row child-cols-6 gx-6">
                                        <div className="vstack gap-3">
                                          <h6 className="h6 m-0">
                                            <i className="fs-7 unicon-cube fw-bold ltr:me-narrow rtl:ms-narrow" /> Produse
                                          </h6>
                                          {PRODUCTS.map((p) => (
                                            <Link key={p.title} to="/businesses" className="hstack items-start gap-2 text-none text-dark dark:text-white hover:text-primary dark:hover:text-tertiary">
                                              <span className="icon rounded dark:bg-white">
                                                <img className="w-32px" src={p.icon} alt="" />
                                              </span>
                                              <div className="panel">
                                                <span className="fs-7 fw-medium mb-narrow text-inherit">{p.title}</span>
                                                <p className="fs-8 text-muted">{p.desc}</p>
                                              </div>
                                            </Link>
                                          ))}
                                          <Link to="/businesses" className="ltr:ms-6 rtl:me-6 text-none fs-8 text-dark dark:text-white hover:text-primary dark:hover:text-tertiary">
                                            <span className="border-bottom hover:border-primary duration-150">Vezi toate produsele</span>
                                            <i className="d-inline-flex fs-8 unicon-arrow-up-right fw-bold rtl:rotate-y-180" />
                                          </Link>
                                        </div>
                                        <div className="vstack gap-3">
                                          <h6 className="h6 m-0">
                                            <i className="fs-7 unicon-gamification fw-bold ltr:me-narrow rtl:ms-narrow" /> Soluții profesionale
                                          </h6>
                                          {SOLUTIONS.map((s) => (
                                            <Link key={s.title} to="/businesses" className="hstack items-start gap-2 text-none text-dark dark:text-white hover:text-primary dark:hover:text-tertiary">
                                              <span className="icon rounded dark:bg-white">
                                                <img className="w-32px" src={s.icon} alt="" />
                                              </span>
                                              <div className="panel">
                                                <span className="fs-7 fw-medium mb-narrow">{s.title}</span>
                                                <p className="fs-8 text-muted">{s.desc}</p>
                                              </div>
                                            </Link>
                                          ))}
                                          <Link to="/businesses" className="ltr:ms-6 rtl:me-6 text-none fs-8 text-dark dark:text-white hover:text-primary dark:hover:text-tertiary">
                                            <span className="border-bottom hover:border-primary duration-150">Vezi toate soluțiile</span>
                                            <i className="d-inline-flex fs-8 unicon-arrow-up-right fw-bold rtl:rotate-y-180" />
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-4">
                                    <div className="panel vstack gap-4 p-5 bg-gray-25 dark:bg-gray-800 border-start">
                                      <div className="panel category-section">
                                        <h5 className="h6">Începutul e simplu!</h5>
                                        <ul className="uc-nav uc-navbar-dropdown-nav fs-7 fw-normal row child-cols-12 vstack gap-2">
                                          <li><a href="#contact">Angajează un expert</a></li>
                                          <li><a href="#clients_feedback">Povești clienți</a></li>
                                          <li><a href="#integrations">Resurse</a></li>
                                          <li><a href="#faq">Blog</a></li>
                                          <li><a href="#contact">Centru de ajutor</a></li>
                                        </ul>
                                      </div>
                                      <div className="panel category-section">
                                        <h5 className="h6">Termeni și confidențialitate</h5>
                                        <ul className="uc-nav uc-navbar-dropdown-nav fs-7 fw-normal row child-cols-12 vstack gap-2">
                                          <li><a href="#terms">Termeni și condiții</a></li>
                                          <li><a href="#privacy">Politica de confidențialitate</a></li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="uc-dropbar-footer py-2 xl:py-3 border-top bg-white text-dark dark:bg-gray-900 dark:text-white">
                            <div className="container">
                              <ul className="nav-x gap-4 fs-8 fw-medium">
                                <li><a href="#integrations" className="text-dark dark:text-white hover:text-primary dark:hover:text-tertiary"><i className="fs-8 unicon-api fw-bold" /><span className="border-bottom hover:border-primary duration-150">Explorează aplicațiile</span></a></li>
                                <li><a href="#key_features" className="text-dark dark:text-white hover:text-primary dark:hover:text-tertiary"><i className="fs-8 unicon-airplay fw-bold" /><span className="border-bottom hover:border-primary duration-150">Soluții AI</span></a></li>
                                <li><a href="/admin/login" className="text-dark dark:text-white hover:text-primary dark:hover:text-tertiary"><i className="fs-8 unicon-cloud-lightning fw-bold" /><span className="border-bottom hover:border-primary duration-150">Acces timpuriu Business Platform</span></a></li>
                              </ul>
                            </div>
                          </div>
                          </div>
                        </div>,
                        document.body
                      )}
                    </li>
                    <li className="flex items-center">
                      <a href="#key_features" className="inline-flex items-center min-h-[var(--uc-nav-height,80px)]">Soluții</a>
                    </li>
                    <li
                      className="position-relative flex items-center"
                      onMouseEnter={handleResourcesEnter}
                      onMouseLeave={handleResourcesLeave}
                    >
                      <button type="button" className="gap-1 border-0 bg-transparent p-0 text-inherit fw-medium inline-flex items-center h-full min-h-[var(--uc-nav-height,80px)]">
                        Resurse <span data-uc-navbar-parent-icon />
                      </button>
                      {openResources && createPortal(
                        <div
                          style={{ position: 'fixed', top: NAVBAR_HEIGHT, left: '50%', transform: 'translateX(-50%)', width: 600, maxWidth: '100vw', zIndex: 1000 }}
                          onMouseEnter={handleResourcesEnter}
                          onMouseLeave={handleResourcesLeave}
                        >
                          <div className={`uc-navbar-dropdown w-600px ft-primary text-unset fs-6 fw-normal p-0 hide-scrollbar rounded-2 overflow-hidden shadow-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 ${dropdownAnimate === 'resources' ? 'dropdown-animate-in' : ''}`}>
                          <div className="row child-cols-6 g-0 col-match">
                            <div>
                              <ul className="uc-nav uc-navbar-dropdown-nav p-2">
                                {RESOURCES.map((r) => (
                                  <li key={r.title}>
                                    <a className="hstack items-start gap-2 p-2 hover:bg-gray-600 hover:bg-opacity-5 dark:hover:bg-white duration-150 rounded-1-5" href="#key_features">
                                      <i className={`icon-1 ${r.icon} fw-bold text-primary dark:text-secondary`} />
                                      <span className="vstack gap-narrow mt-nnarrow">
                                        <b className="fw-bold dark:text-white">{r.title}</b>
                                        <span className="fw-normal">{r.desc}</span>
                                      </span>
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <div className="vstack gap-2 p-3 h-100 bg-gray-25 dark:bg-gray-300 dark:bg-opacity-5">
                                <div className="featured-image panel">
                                  <figure className="featured-image m-0 rounded ratio ratio-3x2 rounded-1-5 overflow-hidden">
                                    <img className="media-cover image" src="/assets/images/template/login.webp" alt="Demo" />
                                  </figure>
                                </div>
                                <div className="vstack gap-1">
                                  <h5 className="h6 m-0">Tot ce ai nevoie la un click distanță</h5>
                                  <p className="fs-7 opacity-70">Scapă de bătaia de cap a gestionării mai multor softuri și instrumente.</p>
                                </div>
                                <Link to="/admin/login" className="btn btn-sm btn-primary">Începe perioada de probă</Link>
                              </div>
                            </div>
                          </div>
                          </div>
                        </div>,
                        document.body
                      )}
                    </li>
                    <li className="flex items-center">
                      <a href="#faq" className="inline-flex items-center min-h-[var(--uc-nav-height,80px)]">Despre</a>
                    </li>
                  </ul>
                </div>
                <div className="uc-navbar-right gap-2 lg:gap-4 flex items-center" style={{ position: 'relative', zIndex: 100 }}>
                  <button
                    type="button"
                    role="button"
                    tabIndex={0}
                    data-search-trigger
                    className="btn btn-md dark:text-white border-0 p-0 h-48px min-w-48px inline-flex items-center justify-center"
                    style={{ cursor: 'pointer', background: 'transparent' }}
                    onClick={() => setSearchOpen(true)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSearchOpen(true);
                      }
                    }}
                    aria-label="Căutare"
                  >
                    <i className="icon icon-2 fw-bold unicon-search" aria-hidden />
                  </button>
                  <Link to="/admin/login" className="uc-link fs-5 text-dark dark:text-white d-none lg:d-flex">
                    Autentificare
                  </Link>
                  <a href="#contact" className="btn btn-md fs-6 lg:px-3 rounded text-white bg-gradient-to-r from-primary to-tertiary gradient-hover hover:bg-opacity-90 dark:hover:bg-opacity-80 border-0 d-none lg:d-flex">
                    <span>Contactează-ne</span>
                  </a>
                  <button
                    type="button"
                    className="uc-menu-trigger btn btn-md border-0 bg-dark text-white dark:bg-white dark:text-dark w-40px h-40px rounded-circle p-0 d-inline-flex lg:d-none"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Meniu"
                    aria-expanded={mobileMenuOpen}
                  />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {mobileMenuOpen && (
        <>
          <div
            className="position-fixed position-cover bg-dark bg-opacity-50 z-998 lg:d-none"
            aria-hidden
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="uc-offcanvas-bar position-fixed top-0 end-0 h-100 w-280px max-w-90vw bg-white dark:bg-gray-800 dark:text-white shadow-xl z-999 overflow-auto lg:d-none">
            <div className="p-4 vstack gap-4">
              <div className="hstack justify-between items-center">
                <Link to="/" className="h5 text-none text-gray-900 dark:text-white" onClick={() => setMobileMenuOpen(false)}>
                  <img className="w-32px dark:d-none" src="/assets/images/common/logo-11.svg" alt="Business Platform" />
                  <img className="w-32px d-none dark:d-block" src="/assets/images/common/logo-11-dark.svg" alt="Business Platform" />
                </Link>
                <button type="button" className="btn border-0 p-0 icon-3" onClick={() => setMobileMenuOpen(false)} aria-label="Închide">
                  <i className="unicon-close" />
                </button>
              </div>
              <ul className="nav-y gap-2 fs-6">
                <li><Link to="/businesses" onClick={() => setMobileMenuOpen(false)}>Platformă</Link></li>
                <li><a href="#key_features" onClick={() => setMobileMenuOpen(false)}>Soluții</a></li>
                <li><a href="#integrations" onClick={() => setMobileMenuOpen(false)}>Resurse</a></li>
                <li><a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Prețuri</a></li>
                <li><a href="#faq" onClick={() => setMobileMenuOpen(false)}>Despre</a></li>
                <li><Link to="/admin/login" onClick={() => setMobileMenuOpen(false)}>Autentificare</Link></li>
                <li>
                  <a href="#contact" className="btn btn-sm btn-primary text-white w-100" onClick={() => setMobileMenuOpen(false)}>Contactează-ne</a>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}

      {searchOpen &&
        createPortal(
          <div
            id="uc-search-modal"
            className="uc-modal-full uc-modal uc-open"
            data-uc-modal="overlay: true"
            role="dialog"
            aria-modal="true"
            aria-label="Căutare"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              display: 'flex',
              opacity: 1,
              justifyContent: 'center',
              alignItems: 'flex-start',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
          >
            <div
              role="presentation"
              style={{ position: 'absolute', inset: 0, zIndex: 0 }}
              onClick={() => setSearchOpen(false)}
            />
            <div
              className="uc-modal-dialog d-flex justify-center bg-white text-dark dark:bg-gray-900 dark:text-white"
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%) translateY(0)',
                zIndex: 1,
                width: '100%',
                maxWidth: 500,
                margin: 0,
                padding: 0,
                opacity: 1,
              }}
            >
              <div
                className="uc-modal-close-full m-1 p-0 vstack gap-narrow text-center"
                style={{ position: 'absolute', top: 0, right: 0 }}
              >
                <button
                  type="button"
                  className="icon-3 btn btn-md btn-dark dark:bg-white dark:text-dark w-24px sm:w-32px h-24px sm:h-32px rounded-circle flex-1"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Închide"
                >
                  <i className="unicon-close" />
                </button>
                <span className="ft-tertiary fs-7">ESC</span>
              </div>
              <div className="panel w-100 sm:w-500px px-2 py-10">
                <h3 className="h4 sm:h2 text-center">Căutare</h3>
                <form
                  className="hstack gap-1 mt-4 border-bottom p-narrow dark:border-gray-700"
                  action="?"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <span className="d-inline-flex justify-center items-center w-24px sm:w-40 h-24px sm:h-40px opacity-50">
                    <i className="unicon-search icon-3" />
                  </span>
                  <input
                    type="search"
                    name="q"
                    className="form-control-plaintext ltr:ms-1 rtl:me-1 fs-6 sm:fs-5 w-full dark:text-white"
                    placeholder="Introdu un cuvânt cheie..."
                    aria-label="Căutare"
                    autoFocus
                  />
                </form>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
