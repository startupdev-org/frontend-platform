import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MarketingNavbar from '../../components/layout/MarketingNavbar';
import MarketingFooter from '../../components/layout/MarketingFooter';
import { MARKETING_FAQ_ITEMS } from '../../content/marketingFaq';
import { useUniCoreAccordion } from '../../hooks/useUniCoreAccordion';
import '../../styles/marketing-faq-accordion.css';

const INTEGRATIONS = [
  { name: 'Figma', icon: '/assets/images/tools/figma.svg' },
  { name: 'Asana', icon: '/assets/images/tools/asana.svg' },
  { name: 'Jira', icon: '/assets/images/tools/jira.svg' },
  { name: 'Mailchimp', icon: '/assets/images/tools/mailchimp.svg' },
  { name: 'Jira Ops', icon: '/assets/images/tools/jira_ops.svg' },
  { name: 'Zapier', icon: '/assets/images/tools/zapier.svg' },
  { name: 'Dropbox', icon: '/assets/images/tools/dropbox.svg' },
  { name: 'Gmail', icon: '/assets/images/tools/gmail.svg' },
  { name: 'Evernote', icon: '/assets/images/tools/evernote.svg' },
];

const TESTIMONIALS = [
  { name: 'Michael T.', avatar: '/assets/images/avatars/15.png' },
  { name: 'Idrissi A.', avatar: '/assets/images/avatars/16.png' },
  { name: 'Robert J.', avatar: '/assets/images/avatars/17.png' },
  { name: 'Zvedv G.', avatar: '/assets/images/avatars/01.png' },
];

export default function PlatformHomePage() {
  const { ref: faqAccordionRef } = useUniCoreAccordion();

  useEffect(() => {
    document.body.classList.add('disable-cursor');
    return () => document.body.classList.remove('disable-cursor');
  }, []);

  return (
    <>
      <Helmet>
        <title>Business Platform</title>
        <meta
          name="description"
          content="Business Platform te ajută să îți publici business-ul online, cu profil complet, servicii și program de lucru, astfel încât clienții să te poată găsi și rezerva ușor."
        />
        <meta name="keywords" content="business, platformă business, programări online, listare business, marketing online, saloane, servicii locale" />
        <meta name="theme-color" content="#1565c0" />
        <link rel="stylesheet" href="/assets/js/uni-core/css/uni-core.min.css" />
        <link rel="stylesheet" href="/assets/css/fonts.css" />
        <link rel="stylesheet" href="/assets/css/unicons.min.css" />
        <link rel="stylesheet" href="/assets/css/swiper-bundle.min.css" />
        <link rel="stylesheet" href="/assets/css/prettify.min.css" />
        <link rel="stylesheet" href="/assets/css/magic-cursor.min.css" />
        <link rel="stylesheet" href="/assets/css/main.css" />
        <link rel="stylesheet" href="/assets/css/theme-eleven.css" />
        <script src="/assets/js/uni-core/js/uni-core-bundle.min.js" />
        <script src="/assets/js/libs/jquery.min.js" />
        <script src="/assets/js/libs/anime.min.js" />
        <script src="/assets/js/helpers/data-attr-helper.js" />
        <script src="/assets/js/helpers/anime-helper.js" />
      </Helmet>

      <div className="uni-body panel bg-white text-tertiary-900 dark:bg-gray-900 dark:text-gray-200 overflow-x-hidden">
        <MarketingNavbar />

        <div id="wrapper" className="wrap">
          <div id="hero_header" className="hero-header section panel overflow-hidden">
            <div
              className="position-absolute top-0 start-0 end-0 h-screen dark:blend-soft-light"
              style={{ backgroundImage: 'url(/assets/images/hero-11-bg.jpg)', backgroundSize: 'cover' }}
            />
            <div className="position-absolute top-0 start-0 end-0 h-screen bg-indigo blend-soft-light d-none dark:d-block" />
            <div className="position-absolute top-0 start-0 end-0 h-screen bg-gradient-to-b from-white via-transparent to-white dark:from-gray-900 dark:to-gray-900" />
            <div className="section-outer panel pt-8 lg:pt-9 xl:pt-10 w-100 position-relative z-1">
              <div className="container">
                <div className="row child-cols-12 justify-center items-center g-8">
                  <div className="lg:col-10">
                    <div className="panel vstack gap-4 sm:gap-8 xl:gap-9">
                      <div className="panel vstack justify-center items-center gap-2 text-center mx-auto max-w-650px lg:max-w-900px">
                        <h1 className="h2 sm:h1 md:display-6 lg:display-5 xl:display-3 ltr:-ls-2 ltr:sm:-ls-4 rtl:lh-md m-0" data-anime="translateY: [-5, 0]; opacity: [0, 1]; easing: easeOutExpo; duration: 750; delay: 250;">
                          Publică-ți business-ul online în câteva minute.
                        </h1>
                        <p className="fs-6 lg:fs-5 xl:fs-4 sm:mt-1 max-w-550px" data-anime="translateY: [5, 0]; opacity: [0, 1]; easing: easeOutExpo; duration: 750; delay: 550;">
                          Creează un profil complet pentru salonul sau serviciile tale, adaugă poze, servicii și programul de lucru și fii descoperit de clienți noi direct online.
                        </p>
                        <div className="vstack sm:hstack gap-1 sm:gap-0 bg-white rounded-3 sm:rounded shadow-lg p-1 mx-auto mt-2 sm:mt-3 xl:mt-4 w-100 max-w-450px lg:max-w-550px" data-anime="translateY: [16, 0]; opacity: [0, 1]; easing: easeOutExpo; duration: 750; delay: 1250;">
                          <input
                            type="email"
                            className="form-control text-dark border-0 bg-transparent rounded-2 sm:rounded px-3 py-2 fs-6 flex-1"
                            placeholder="nume-business@exemplu.md"
                          />
                          <button type="button" className="btn btn-md lg:btn-lg btn-dark rounded-2 sm:rounded px-3 py-2 ltr:sm:ms-2 rtl:sm:me-2 lg:min-w-200px">
                            Începe listarea gratuită
                          </button>
                        </div>
                        <div className="mt-3 sm:mt-6 xl:mt-8" data-anime="translateY: [16, 0]; opacity: [0, 1]; easing: easeOutExpo; duration: 750; delay: 1500;">
                          <span className="fs-6 fw-semibold text-dark dark:text-white opacity-80">De încredere pentru branduri cunoscute</span>
                          <div className="panel mt-3">
                            <div className="row child-cols-4 sm:child-cols justify-center items-center gx-2 gy-3 sm:g-8 text-dark dark:text-white">
                              {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i}>
                                  <img src={`/assets/images/companies/company-logo-${i}.svg`} alt={`Companie ${i}`} className="h-40px sm:h-48px w-auto" />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="panel rounded-2 mx-auto max-w-1000px mb-3 sm:mb-4 md:mb-5 xl:mb-7 overflow-hidden border rounded-2 shadow-md lg:shadow-xl" data-anime="onview: -100; translateY: [16, 0]; scale: [1.1, 1]; opacity: [0, 1]; easing: easeOutExpo; duration: 750; delay: 250;">
                        <img src="/assets/images/template/dashboard-11-home.png" alt="Panou Business Platform" className="w-100" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="key_features" className="key-features section panel overflow-hidden">
            <div className="section-outer panel py-6 sm:py-8 xl:py-9">
              <div className="container max-w-lg">
                <div className="section-inner panel max-w-750px xl:max-w-900px mx-auto">
                  <div className="section-heading panel vstack items-center gap-2 xl:gap-3 mb-6 sm:mb-8 xl:mb-9 max-w-500px xl:max-w-600px mx-auto text-center" data-anime="onview: -100; targets: >*; translateY: [48, 0]; opacity: [0, 1]; easing: easeOutCubic; duration: 500; delay: anime.stagger(100, {start: 200});">
                    <span className="ft-serif fs-7 fw-semibold py-narrow px-2 border rounded text-uppercase text-gradient">Funcționalități cheie</span>
                    <h2 className="h3 sm:h2 xl:h1 m-0">Automatizează repetitivul, concentrează-te pe esențial</h2>
                  </div>
                  <div className="section-content panel">
                    <div className="row child-cols-12 col-match g-2 sm:g-3" data-anime="onview: -200; targets: >*; translateY: [48, 0]; opacity: [0, 1]; easing: easeOutCubic; duration: 500; delay: anime.stagger(100, {start: 200});">
                      <div>
                        <div className="feature-item panel overflow-hidden rounded-2 sm:rounded-3 xl:rounded-4 border border-1 dark:text-white position-relative">
                          <div className="row child-cols-12 sm:child-cols-6 g-2 col-match">
                            <div>
                              <div className="feature-item-content panel vstack gap-3 justify-between px-2 py-3 sm:p-3 xl:p-4 z-2">
                                <div className="vstack gap-1 sm:gap-2">
                                  <h4 className="h4 xl:h3 m-0 text-gray-900 dark:text-white">Șabloane personalizabile</h4>
                                  <p className="fs-7 xl:fs-6 text-gray-700 dark:text-gray-200">
                                    Alege din peste 300 de șabloane gata făcute sau creează propriile pentru procesele tale.
                                  </p>
                                </div>
                                <a href="#features" className="uc-link fs-7 fw-bold hstack gap-1">
                                  <span className="text-gradient">Vezi șabloanele</span>
                                  <i className="icon unicon-arrow-right fw-bold" />
                                </a>
                              </div>
                            </div>
                            <div>
                              <div className="feature-item-image panel">
                                <figure className="panel ratio ratio-1x1 overflow-hidden h-100">
                                  <img className="image media-cover" src="/assets/images/features/home-11-feature-01.png" alt="Șabloane" />
                                </figure>
                              </div>
                            </div>
                          </div>
                          <div className="position-absolute top-0 start-0 w-1/2 h-100 bg-gradient-to-r from-secondary to-transparent dark:from-gray-800 dark:to-transparent z-1 d-none sm:d-block" />
                        </div>
                      </div>
                      <div className="sm:col-6">
                        <div className="feature-item panel overflow-hidden rounded-2 sm:rounded-3 xl:rounded-4 border border-1 dark:text-white position-relative">
                          <div className="row child-cols-12 g-2 col-match">
                            <div className="order-2 sm:order-1">
                              <div className="feature-item-image panel h-450px">
                                <figure className="panel ratio ratio-1x1 overflow-hidden h-100">
                                  <img className="image media-cover" src="/assets/images/features/home-11-feature-02.png" alt="Automatizare" />
                                </figure>
                              </div>
                            </div>
                            <div className="order-1 sm:order-2">
                              <div className="feature-item-content panel vstack gap-3 justify-between px-2 py-3 sm:p-3 xl:p-4 z-2">
                                <div className="vstack gap-1 sm:gap-2">
                                  <h4 className="h4 xl:h3 m-0 text-gray-900 dark:text-white">Automatizare inteligentă</h4>
                                  <p className="fs-7 xl:fs-6 text-gray-700 dark:text-gray-200">
                                    Creează fluxuri de lucru complexe fără programare, conectând oameni, date și sisteme.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="position-absolute bottom-0 end-0 w-100 h-1/2 bg-gradient-to-t from-secondary to-transparent dark:from-gray-800 dark:to-transparent z-1 d-none sm:d-block" />
                        </div>
                      </div>
                      <div className="sm:col-6">
                        <div className="feature-item panel overflow-hidden rounded-2 sm:rounded-3 xl:rounded-4 border border-1 dark:text-white position-relative">
                          <div className="row child-cols-12 g-2 col-match">
                            <div>
                              <div className="feature-item-content panel vstack gap-3 justify-between px-2 py-3 sm:p-3 xl:p-4 z-2">
                                <div className="vstack gap-1 sm:gap-2">
                                  <h4 className="h4 xl:h3 m-0 text-gray-900 dark:text-white">Colaborare în echipă</h4>
                                  <p className="fs-7 xl:fs-6 text-gray-700 dark:text-gray-200">
                                    Comunicare și coordonare fără efort între departamente și proiecte.
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="feature-item-image panel h-450px">
                                <figure className="panel ratio ratio-1x1 overflow-hidden h-100">
                                  <img className="image media-cover" src="/assets/images/features/home-11-feature-03.png" alt="Colaborare" />
                                </figure>
                              </div>
                            </div>
                          </div>
                          <div className="position-absolute top-0 start-0 w-100 h-1/2 bg-gradient-to-b from-secondary to-transparent dark:from-gray-800 dark:to-transparent z-1" />
                        </div>
                      </div>
                      <div>
                        <div className="feature-item panel overflow-hidden rounded-2 sm:rounded-3 xl:rounded-4 border border-1 dark:text-white position-relative">
                          <div className="row child-cols-12 sm:child-cols-6 g-2 col-match">
                            <div className="order-2 sm:order-1">
                              <div className="feature-item-image panel">
                                <figure className="panel ratio ratio-1x1 overflow-hidden h-100">
                                  <img className="image media-cover" src="/assets/images/features/home-11-feature-04.png" alt="Analize" />
                                </figure>
                              </div>
                            </div>
                            <div className="order-1 sm:order-2">
                              <div className="feature-item-content panel vstack gap-3 justify-between px-2 py-3 sm:p-3 xl:p-4 z-2">
                                <div className="vstack gap-1 sm:gap-2">
                                  <h4 className="h4 xl:h3 m-0 text-gray-900 dark:text-white">Analiză avansată</h4>
                                  <p className="fs-7 xl:fs-6 text-gray-700 dark:text-gray-200">
                                    Rapoarte detaliate pentru a lua decizii informate.
                                  </p>
                                </div>
                                <a href="#features" className="uc-link fs-7 fw-bold hstack gap-1">
                                  <span className="text-gradient">Vezi analizele în acțiune</span>
                                  <i className="icon unicon-arrow-right fw-bold" />
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="position-absolute top-0 end-0 w-3/4 h-100 bg-gradient-to-l from-secondary to-transparent dark:from-gray-800 dark:to-transparent z-1 d-none sm:d-block" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="section-footer panel vstack gap-2 items-center mt-6 sm:mt-8 xl:mt-9" data-anime="translateY: [24, 0]; opacity: [0, 1]; easing: easeOutExpo; duration: 750; delay: 750;">
                    <a href="#features" className="btn btn-md lg:btn-lg btn-dark rounded-2 sm:rounded px-3 py-2 lg:min-w-200px">
                      <span>Explorează toate funcționalitățile</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="integrations" className="integrations section panel overflow-hidden">
            <div className="section-outer panel py-6 sm:py-8 xl:py-9 mx-1 lg:mx-2 mt-2 rounded-2 xl:rounded-3 bg-gray-800">
              <div className="container">
                <div className="section-inner panel">
                  <div className="section-heading panel vstack items-center gap-2 xl:gap-3 mb-6 sm:mb-8 xl:mb-9 max-w-500px xl:max-w-600px mx-auto text-center" data-anime="onview: -100; targets: >*; translateY: [48, 0]; opacity: [0, 1]; easing: easeOutCubic; duration: 500; delay: anime.stagger(100, {start: 200});">
                    <span className="ft-serif fs-7 fw-semibold py-narrow px-2 border rounded text-uppercase text-gray-200">Integrări și instrumente</span>
                    <h2 className="h3 sm:h2 xl:h1 m-0 text-white">Funcționează perfect cu instrumentele tale preferate</h2>
                  </div>
                  <div className="section-content panel">
                    <div className="row child-cols-12 sm:child-cols-6 lg:child-cols-4 justify-center col-match g-2 xl:g-4" data-anime="onview: -200; targets: >*; translateY: [48, 0]; opacity: [0, 1]; easing: easeOutCubic; duration: 500; delay: anime.stagger(100, {start: 200});">
                      {INTEGRATIONS.map((item) => (
                        <div key={item.name}>
                          <div className="integrations-item hstack items-start gap-2 xl:gap-3 p-3 xl:p-4 rounded-2 bg-white bg-opacity-5">
                            <div className="icon-box min-w-56px min-h-56px xl:min-w-80px xl:min-h-80px">
                              <img src={item.icon} alt={item.name} />
                            </div>
                            <div className="panel">
                              <div className="vstack gap-1">
                                <h3 className="title h5 xl:h4 m-0 text-white">{item.name}</h3>
                                <p className="desc fs-7 xl:fs-6 text-gray-200">
                                  Automatizează sarcini și fluxuri cu builderul nostru intuitiv drag-and-drop.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="section-footer panel vstack gap-2 items-center mt-6 sm:mt-8 xl:mt-9" data-anime="translateY: [24, 0]; opacity: [0, 1]; easing: easeOutExpo; duration: 750; delay: 750;">
                    <a href="#integrations" className="btn btn-md lg:btn-lg text-white bg-gradient-to-r from-primary to-tertiary gradient-hover hover:bg-opacity-90 dark:hover:bg-opacity-80 border-0 rounded-2 sm:rounded px-3 py-2 lg:min-w-200px">
                      <span>Vezi integrările</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="pricing" className="pricing section panel overflow-hidden">
            <div className="section-outer panel py-6 sm:py-8 xl:py-9">
              <div className="container max-w-lg">
                <div className="section-inner panel">
                  <div className="section-heading panel vstack items-center gap-2 xl:gap-3 mb-6 sm:mb-8 xl:mb-9 max-w-500px xl:max-w-600px mx-auto text-center" data-anime="onview: -100; targets: >*; translateY: [48, 0]; opacity: [0, 1]; easing: easeOutCubic; duration: 500; delay: anime.stagger(100, {start: 200});">
                    <span className="ft-serif fs-7 fw-semibold py-narrow px-2 border rounded text-uppercase text-gradient">Prețuri accesibile</span>
                    <h2 className="h3 sm:h2 xl:h1 m-0">Alege planul potrivit nevoilor tale</h2>
                  </div>
                  <div className="section-content panel">
                    <div className="row child-cols-12 col-match g-3 xl:g-4" data-anime="onview: -200; targets: >*; translateY: [48, 0]; opacity: [0, 1]; easing: easeOutCubic; duration: 500; delay: anime.stagger(100, {start: 200});">
                      <div>
                        <div className="pricing-item panel overflow-hidden px-4 py-5 lg:px-8 lg:py-6 xl:p-6 rounded-2 dark:text-white bg-gradient-to-b from-secondary to-transparent dark:from-gray-700 dark:to-transparent">
                          <div className="row child-cols-12 sm:child-cols-4 items-start g-4 xl:g-6 col-match">
                            <div>
                              <div className="pricing-box-title">
                                <h4 className="h4 sm:h3 mb-narrow sm:mb-2">Începător</h4>
                                <span className="fs-7 sm:fs-6 text-gray-400 dark:text-gray-200">19€/utilizator/lună</span>
                              </div>
                            </div>
                            <div>
                              <ul className="nav-y gap-2 fs-7 xl:fs-6 text-gray-400 dark:text-gray-200">
                                <li className="row child-cols items-start g-1">
                                  <div className="col-auto">
                                    <img src="/assets/images/vectors/check-06.svg" alt="" style={{ paddingTop: 2 }} />
                                  </div>
                                  <div>Până la 10 utilizatori</div>
                                </li>
                                <li className="row child-cols items-start g-1">
                                  <div className="col-auto">
                                    <img src="/assets/images/vectors/check-06.svg" alt="" style={{ paddingTop: 2 }} />
                                  </div>
                                  <div>50 credite de automatizare</div>
                                </li>
                                <li className="row child-cols items-start g-1">
                                  <div className="col-auto">
                                    <img src="/assets/images/vectors/check-06.svg" alt="" style={{ paddingTop: 2 }} />
                                  </div>
                                  <div>5 șabloane de flux</div>
                                </li>
                                <li className="row child-cols items-start g-1">
                                  <div className="col-auto">
                                    <img src="/assets/images/vectors/check-06.svg" alt="" style={{ paddingTop: 2 }} />
                                  </div>
                                  <div>Analiză de bază</div>
                                </li>
                                <li className="row child-cols items-start g-1">
                                  <div className="col-auto">
                                    <img src="/assets/images/vectors/check-06.svg" alt="" style={{ paddingTop: 2 }} />
                                  </div>
                                  <div>Suport prin email</div>
                                </li>
                              </ul>
                            </div>
                            <div>
                              <div className="pricing-box-cta vstack gap-2 justify-center text-center">
                                <Link to="/admin/login" className="btn btn-md xl:btn-lg btn-outline-dark border bg-white hover:bg-dark shadow-sm rounded-2 sm:rounded px-3 py-2 lg:min-w-200px">
                                  Alege
                                </Link>
                                <span className="fs-7 text-gray-700 dark:text-gray-300">Fără card necesar!</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="pricing-item panel overflow-hidden rounded-2">
                          <div className="pricing-item-badge w-100 py-1 text-center text-white fw-bold bg-gradient-to-r from-primary to-tertiary">
                            <span className="fs-7">Cea mai bună ofertă</span>
                          </div>
                          <div className="pricing-item-content px-4 py-5 lg:px-8 lg:py-6 xl:p-6 dark:text-white bg-gradient-to-b from-secondary to-transparent dark:from-gray-700 dark:to-transparent">
                            <div className="row child-cols-12 sm:child-cols-4 items-start g-4 xl:g-6 col-match">
                              <div>
                                <div className="pricing-box-title">
                                  <h4 className="h4 sm:h3 mb-narrow sm:mb-2">Profesional</h4>
                                  <span className="fs-7 sm:fs-6 text-gray-400 dark:text-gray-200">49€/utilizator/lună</span>
                                </div>
                              </div>
                              <div>
                                <ul className="nav-y gap-2 fs-7 xl:fs-6 text-gray-400 dark:text-gray-200">
                                  <li className="row child-cols items-start g-1">
                                    <div className="col-auto">
                                      <img src="/assets/images/vectors/check-06.svg" alt="" style={{ paddingTop: 2 }} />
                                    </div>
                                    <div>Utilizatori nelimitați</div>
                                  </li>
                                  <li className="row child-cols items-start g-1">
                                    <div className="col-auto">
                                      <img src="/assets/images/vectors/check-06.svg" alt="" style={{ paddingTop: 2 }} />
                                    </div>
                                    <div>200 credite de automatizare</div>
                                  </li>
                                  <li className="row child-cols items-start g-1">
                                    <div className="col-auto">
                                      <img src="/assets/images/vectors/check-06.svg" alt="" style={{ paddingTop: 2 }} />
                                    </div>
                                    <div>50 șabloane de flux</div>
                                  </li>
                                  <li className="row child-cols items-start g-1">
                                    <div className="col-auto">
                                      <img src="/assets/images/vectors/check-06.svg" alt="" style={{ paddingTop: 2 }} />
                                    </div>
                                    <div>Analiză avansată</div>
                                  </li>
                                  <li className="row child-cols items-start g-1">
                                    <div className="col-auto">
                                      <img src="/assets/images/vectors/check-06.svg" alt="" style={{ paddingTop: 2 }} />
                                    </div>
                                    <div>Suport prioritar</div>
                                  </li>
                                </ul>
                              </div>
                              <div>
                                <div className="pricing-box-cta vstack gap-2 justify-center text-center">
                                  <Link to="/admin/login" className="btn btn-md xl:btn-lg fw-medium text-white bg-gradient-to-r from-primary to-tertiary gradient-hover hover:bg-opacity-70 dark:hover:bg-opacity-80 border-0 shadow-sm rounded-2 sm:rounded px-3 py-2 lg:min-w-200px">
                                    Alege
                                  </Link>
                                  <span className="fs-7 text-gray-700 dark:text-gray-300">Fără card necesar!</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="pricing-item panel overflow-hidden px-4 py-5 lg:px-8 lg:py-6 xl:p-6 pb-0 rounded-2 dark:text-white bg-gradient-to-b from-secondary to-transparent dark:from-gray-700 dark:to-transparent">
                          <div className="row child-cols-12 sm:child-cols-4 items-start g-4 xl:g-6 col-match">
                            <div>
                              <div className="pricing-box-title">
                                <h4 className="h4 sm:h3 mb-narrow sm:mb-2">Enterprise</h4>
                                <span className="fs-7 sm:fs-6 text-gray-400 dark:text-gray-200">Preț la cerere</span>
                              </div>
                            </div>
                            <div>
                              <ul className="nav-y gap-2 fs-7 xl:fs-6 text-gray-400 dark:text-gray-200">
                                <li className="row child-cols items-start g-1">
                                  <div className="col-auto">
                                    <img src="/assets/images/vectors/check-06.svg" alt="" style={{ paddingTop: 2 }} />
                                  </div>
                                  <div>Tot nelimitat</div>
                                </li>
                                <li className="row child-cols items-start g-1">
                                  <div className="col-auto">
                                    <img src="/assets/images/vectors/check-06.svg" alt="" style={{ paddingTop: 2 }} />
                                  </div>
                                  <div>Fluxuri personalizate</div>
                                </li>
                                <li className="row child-cols items-start g-1">
                                  <div className="col-auto">
                                    <img src="/assets/images/vectors/check-06.svg" alt="" style={{ paddingTop: 2 }} />
                                  </div>
                                  <div>Manager de cont dedicat</div>
                                </li>
                                <li className="row child-cols items-start g-1">
                                  <div className="col-auto">
                                    <img src="/assets/images/vectors/check-06.svg" alt="" style={{ paddingTop: 2 }} />
                                  </div>
                                  <div>Securitate avansată</div>
                                </li>
                                <li className="row child-cols items-start g-1">
                                  <div className="col-auto">
                                    <img src="/assets/images/vectors/check-06.svg" alt="" style={{ paddingTop: 2 }} />
                                  </div>
                                  <div>Suport premium 24/7</div>
                                </li>
                              </ul>
                            </div>
                            <div>
                              <div className="pricing-box-cta vstack gap-2 justify-center text-center">
                                <Link to="/admin/login" className="btn btn-md xl:btn-lg btn-outline-dark border bg-white hover:bg-dark shadow-sm rounded-2 sm:rounded px-3 py-2 lg:min-w-200px">
                                  Alege
                                </Link>
                                <span className="fs-7 dark:text-white opacity-70">Îl adaptăm nevoilor tale!</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="section-footer panel vstack gap-2 items-center text-center mt-6 sm:mt-8 xl:mt-9" data-anime="translateY: [24, 0]; opacity: [0, 1]; easing: easeOutExpo; duration: 750; delay: 750;">
                    <p className="fs-6 text-gray-400 dark:text-gray-200">Contactează-ne pentru preț la cerere pentru organizații cu nevoi specifice</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="clients_feedback" className="clients-feedback section panel overflow-hidden">
            <div className="section-outer panel py-6 sm:py-8 xl:py-9 mx-1 lg:mx-2 mt-2 rounded-2 xl:rounded-3 bg-secondary dark:bg-gray-800">
              <div className="container">
                <div className="section-inner panel">
                  <div className="section-heading panel vstack items-center gap-2 xl:gap-3 mb-6 sm:mb-8 xl:mb-9 max-w-500px xl:max-w-600px mx-auto text-center" data-anime="onview: -100; targets: >*; translateY: [48, 0]; opacity: [0, 1]; easing: easeOutCubic; duration: 500; delay: anime.stagger(100, {start: 200});">
                    <span className="ft-serif fs-7 fw-semibold py-narrow px-2 border rounded text-uppercase text-gradient">Feedback clienți</span>
                    <h2 className="h3 sm:h2 xl:h1 m-0">Îndrăgită de echipe din toată lumea</h2>
                  </div>
                  <div className="section-content panel">
                    <div className="row child-cols-12 lg:child-cols-6 justify-center col-match g-3 xl:g-4" data-anime="onview: -200; targets: >*; translateY: [48, 0]; opacity: [0, 1]; easing: easeOutCubic; duration: 500; delay: anime.stagger(100, {start: 200});">
                      {TESTIMONIALS.map((t) => (
                        <div key={t.name}>
                          <div className="clients-feedback-item panel vstack justify-between gap-6 xl:gap-8 p-3 lg:p-4 xl:p-6 shadow-sm bg-white dark:bg-opacity-5 rounded-2 h-100">
                            <div className="panel">
                              <p className="desc fs-5 xl:fs-4 text-gray-400 dark:text-gray-200">
                                &ldquo;Ca antreprenor, am nevoie de servicii de încredere. Echipa lor e mereu punctuală, profesională și temeinică. Recomand cu căldură!&rdquo;
                              </p>
                            </div>
                            <div className="vstack sm:hstack gap-2 justify-between">
                              <div className="author panel hstack gap-2">
                                <img className="w-40px sm:w-48px md:w-56px lg:w-64px rounded-circle" src={t.avatar} alt={t.name} />
                                <div className="panel vstack justify-center gap-0">
                                  <h6 className="h6 m-0">{t.name}</h6>
                                </div>
                              </div>
                              <div className="rating d-flex gap-0">
                                {[1, 2, 3, 4, 5].map((i) => (
                                  <img key={i} className="icon icon-1 w-20px text-yellow" src="/assets/images/star.svg" alt="stea" />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="section-footer panel vstack gap-2 items-center mt-6 sm:mt-8 xl:mt-9" data-anime="translateY: [24, 0]; opacity: [0, 1]; easing: easeOutExpo; duration: 750; delay: 750;">
                    <Link to="/admin/login" className="btn btn-md xl:btn-lg text-white bg-gradient-to-r from-primary to-tertiary gradient-hover hover:bg-opacity-70 dark:hover:bg-opacity-80 border-0 shadow-sm rounded-2 sm:rounded px-3 py-2 lg:min-w-200px">
                      Începe perioada de probă
                    </Link>
                    <span className="fs-6 text-gray-700 dark:text-gray-300">Fără card necesar</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="faq" className="faq section panel">
            <div className="section-outer panel py-6 sm:py-8 xl:py-10">
              <div className="container lg:max-w-lg">
                <div className="section-inner panel">
                  <div className="section-heading panel vstack items-center gap-2 xl:gap-3 mb-6 sm:mb-8 xl:mb-9 max-w-500px xl:max-w-700px mx-auto text-center" data-anime="onview: -100; targets: >*; translateY: [48, 0]; opacity: [0, 1]; easing: easeOutCubic; duration: 500; delay: anime.stagger(100, {start: 200});">
                    <h2 className="h3 sm:h2 xl:h1 m-0">Întrebări frecvente</h2>
                  </div>
                  <div className="section-content panel" data-anime="onview: -200; targets: > ul > li; translateY: [48, 0]; opacity: [0, 1]; easing: easeOutCubic; duration: 500; delay: anime.stagger(100, {start: 200});">
                    <ul
                      ref={faqAccordionRef}
                      className="uc-accordion gap-1 max-w-md xl:max-w-lg mx-auto vstack gap-0 m-0 p-0 list-unstyled marketing-faq-accordion"
                      data-uc-accordion="targets: > li;"
                    >
                      {MARKETING_FAQ_ITEMS.map((item, index) => (
                        <li
                          key={item.question}
                          className={`panel p-2 md:p-3 lg:p-4 bg-secondary dark:bg-gray-800 rounded-2 ${index === 0 ? 'uc-open' : ''}`}
                        >
                          <a
                            className="uc-accordion-title h6 md:h5 lg:h5 fw-bold mb-0 pb-0 ltr:pe-4 rtl:ps-4"
                            href="#"
                            onClick={(e) => e.preventDefault()}
                          >
                            {item.question}
                          </a>
                          <div className="uc-accordion-content lg:fs-5 text-gray-800 dark:text-gray-200">
                            <p className="m-0">{item.answer}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="section-footer panel vstack gap-2 items-center mt-6 sm:mt-8 xl:mt-9" data-anime="translateY: [24, 0]; opacity: [0, 1]; easing: easeOutExpo; duration: 750; delay: 750;">
                    <Link to="/contact" className="btn btn-md lg:btn-lg btn-outline-dark dark:text-white dark:hover:text-dark dark:hover:bg-white border shadow-sm rounded-2 sm:rounded px-3 py-2 lg:min-w-200px">
                      Ai încă o întrebare?
                    </Link>
                  </div>
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
