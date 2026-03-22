import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { FaComments, FaEnvelope, FaPhone, FaTelegram } from 'react-icons/fa6';
import type { IconType } from 'react-icons';
import MarketingNavbar from '../../components/layout/MarketingNavbar';
import PagePreloader from '../../components/ui/PagePreloader';
import MarketingFooter from '../../components/layout/MarketingFooter';
import {
  CONTACT_CHATBOT_HREF,
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
  CONTACT_TELEGRAM_URL,
} from '../../content/contactChannels';
import { MARKETING_FAQ_ITEMS } from '../../content/marketingFaq';
import { useUniCoreAccordion } from '../../hooks/useUniCoreAccordion';
import '../../styles/marketing-faq-accordion.css';

const fieldBase =
  'form-control w-full rounded-2 border !py-3 leading-normal text-dark dark:bg-gray-800 dark:border-gray-600 dark:text-white';
const contactInputClass = `${fieldBase} min-h-[52px]`;
const contactSelectClass = `${contactInputClass} cursor-pointer appearance-none bg-white !pe-11`;
const contactTextareaClass = `${fieldBase} min-h-150px`;

type ContactChannel = {
  title: string;
  description: string;
  href: string;
  cta: string;
  external?: boolean;
  Icon: IconType;
  iconRem?: number;
};

const CONTACT_CHANNELS: ContactChannel[] = [
  {
    title: 'Telegram',
    description: 'Canal oficial — mesaje și anunțuri',
    href: CONTACT_TELEGRAM_URL,
    cta: 'Deschide Telegram',
    external: true,
    Icon: FaTelegram,
  },
  {
    title: 'Telefon',
    description: CONTACT_PHONE_DISPLAY + ' · Lun–Vin, 9–18',
    href: CONTACT_PHONE_TEL,
    cta: 'Apelează',
    Icon: FaPhone,
    iconRem: 1.5,
  },
  {
    title: 'Email',
    description: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    cta: 'Trimite email',
    Icon: FaEnvelope,
    iconRem: 1.5,
  },
  {
    title: 'Chatbot',
    description: 'Asistent automat — răspunsuri rapide',
    href: CONTACT_CHATBOT_HREF,
    cta: 'Deschide chat',
    Icon: FaComments,
  },
];

const CONTACT_SUBJECT_GROUPS = [
  {
    label: 'Asistență și cont',
    options: [
      {
        value: 'technical_support',
        label: 'Suport tehnic — utilizare, erori și funcționalități',
      },
      {
        value: 'billing_account',
        label: 'Facturare, plăți și administrare cont',
      },
    ],
  },
  {
    label: 'Relații comerciale',
    options: [
      {
        value: 'services_pricing',
        label: 'Informații despre servicii, pachete și oferte',
      },
      {
        value: 'partnership',
        label: 'Parteneriate și oportunități de colaborare',
      },
    ],
  },
  {
    label: 'Feedback și alte solicitări',
    options: [
      {
        value: 'product_feedback',
        label: 'Sugestii și îmbunătățiri ale platformei',
      },
      {
        value: 'other',
        label: 'Alt subiect (detaliat în mesajul de mai jos)',
      },
    ],
  },
] as const;

export default function ContactPage() {
  const { ref: faqAccordionRef } = useUniCoreAccordion();
  const [pageEntered, setPageEntered] = useState(false);

  useEffect(() => {
    document.body.classList.add('disable-cursor');
    return () => document.body.classList.remove('disable-cursor');
  }, []);

  useEffect(() => {
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setPageEntered(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      if (inner) cancelAnimationFrame(inner);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Contact - Business Platform</title>
        <meta
          name="description"
          content="Scrie-ne pe Business Platform — întrebări, feedback sau suport. Îți răspundem cât putem de repede."
        />
        <meta name="keywords" content="contact, suport, Business Platform, programări, business local" />
        <meta name="theme-color" content="#178d72" />
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

      <PagePreloader active={!pageEntered} />

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
            <div className="section-outer panel pt-8 lg:pt-9 xl:pt-10 pb-6 sm:pb-8 xl:pb-10 w-100 position-relative z-1">
              <div className="container">
                <div className="row child-cols-12 justify-center items-center g-8">
                  <div className="lg:col-10">
                    <div className="panel vstack gap-4 sm:gap-8 xl:gap-9">
                      <div
                        className="panel vstack justify-center items-center gap-2 sm:gap-3 text-center mx-auto max-w-650px lg:max-w-800px"
                        data-anime="onview: -100; targets: >*; translateY: [48, 0]; opacity: [0, 1]; easing: easeOutCubic; duration: 500; delay: anime.stagger(100, {start: 200});"
                      >
                        <h1 className="h2 sm:h1 md:display-6 lg:display-5 xl:display-4 m-0 ltr:-ls-1">
                          Scrie-ne — suntem aici să te ajutăm
                        </h1>
                        <p className="fs-6 lg:fs-5 text-gray-700 dark:text-gray-300 max-w-550px m-0">
                          Ai o întrebare despre platformă, vrei să ne lași feedback sau ai nevoie de suport? Completează formularul și revenim la tine cât de curând.
                        </p>
                      </div>

                      <div
                        id="contact"
                        className="panel max-w-750px mx-auto w-100"
                        data-anime="onview: -100; translateY: [24, 0]; opacity: [0, 1]; easing: easeOutExpo; duration: 750; delay: 300;"
                      >
                        <form
                          className="vstack gap-2 sm:gap-3 p-3 sm:p-6 xl:p-8 rounded-2 sm:rounded-3 border border-gray-200 dark:border-gray-600 shadow-md bg-white dark:bg-gray-900"
                          onSubmit={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <p className="fs-6 text-gray-700 dark:text-gray-300 m-0 mb-1">
                            Completează câmpurile de mai jos și îți răspundem pe email.
                          </p>
                          <div className="row child-cols-12 md:child-cols-6 g-2">
                            <div>
                              <label className="form-label fs-7 mb-1" htmlFor="contact-name">
                                Nume complet
                              </label>
                              <input
                                id="contact-name"
                                className={contactInputClass}
                                type="text"
                                placeholder="Nume și prenume"
                                required
                              />
                            </div>
                            <div>
                              <label className="form-label fs-7 mb-1" htmlFor="contact-email">
                                Email
                              </label>
                              <input
                                id="contact-email"
                                className={contactInputClass}
                                type="email"
                                placeholder="exemplu@email.com"
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <label className="form-label fs-7 mb-1" htmlFor="contact-subject">
                              Subiect
                            </label>
                            <div className="relative">
                              <select
                                id="contact-subject"
                                name="subject"
                                className={contactSelectClass}
                                required
                                defaultValue=""
                              >
                                <option value="" disabled>
                                  Alegeți tipul de solicitare
                                </option>
                                {CONTACT_SUBJECT_GROUPS.map((group) => (
                                  <optgroup key={group.label} label={group.label}>
                                    {group.options.map((opt) => (
                                      <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                      </option>
                                    ))}
                                  </optgroup>
                                ))}
                              </select>
                              <span
                                className="pointer-events-none absolute end-3 top-1/2 z-[1] -translate-y-1/2 text-gray-500 dark:text-gray-400"
                                aria-hidden
                              >
                                <ChevronDownIcon className="h-5 w-5" />
                              </span>
                            </div>
                          </div>
                          <div>
                            <label className="form-label fs-7 mb-1" htmlFor="contact-message">
                              Mesaj
                            </label>
                            <textarea
                              id="contact-message"
                              className={contactTextareaClass}
                              placeholder="Descrieți solicitarea: context, întrebări sau detalii relevante pentru echipă."
                              required
                            />
                          </div>
                          <button
                            className="btn btn-md lg:btn-lg text-white bg-gradient-to-r from-primary to-tertiary gradient-hover hover:bg-opacity-90 border-0 shadow-sm rounded-2 mt-1"
                            type="submit"
                          >
                            Trimite mesajul
                          </button>
                          <p className="text-center fs-7 text-gray-600 dark:text-gray-400 m-0">
                            Sau scrie-ne direct la{' '}
                            <a className="uc-link fw-medium" href={`mailto:${CONTACT_EMAIL}`}>
                              {CONTACT_EMAIL}
                            </a>
                            .
                          </p>
                        </form>
                      </div>

                      <div
                        className="vstack items-center gap-2 text-center"
                        data-anime="onview: -100; translateY: [16, 0]; opacity: [0, 1]; easing: easeOutExpo; duration: 750; delay: 400;"
                      >
                        <span className="fs-6 fw-semibold text-dark dark:text-white opacity-80">De încredere pentru branduri cunoscute</span>
                        <div className="panel mt-2">
                          <div className="row child-cols-4 sm:child-cols justify-center items-center gx-2 gy-3 sm:g-8 text-dark dark:text-white">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <div key={i}>
                                <img
                                  src={`/assets/images/companies/company-logo-${i}.svg`}
                                  alt=""
                                  className="h-40px sm:h-48px w-auto opacity-90"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="helpful-links" className="section panel overflow-hidden">
            <div className="section-outer panel py-6 sm:py-8 xl:py-9">
              <div className="container max-w-lg">
                <div className="section-inner panel">
                  <div className="section-heading panel vstack items-center gap-2 xl:gap-3 mb-6 sm:mb-8 xl:mb-9 max-w-500px xl:max-w-700px mx-auto text-center" data-anime="onview: -100; targets: >*; translateY: [48, 0]; opacity: [0, 1]; easing: easeOutCubic; duration: 500; delay: anime.stagger(100, {start: 200});">
                    <span className="ft-serif fs-7 fw-semibold py-narrow px-2 border rounded text-uppercase text-gradient">Contacte</span>
                    <h2 className="h3 sm:h2 xl:h1 m-0">Unde ne găsești</h2>
                  </div>
                  <div
                    className="section-content panel"
                    data-anime="onview: -200; targets: > * > *; translateY: [48, 0]; opacity: [0, 1]; easing: easeOutCubic; duration: 500; delay: anime.stagger(100, {start: 200});"
                  >
                    <div className="row child-cols-12 sm:child-cols-6 g-2 lg:g-4 justify-between col-match">
                      {CONTACT_CHANNELS.map(({ title, description, href, cta, external, Icon, iconRem = 2.25 }) => (
                        <div
                          key={title}
                          className="feature-item panel overflow-hidden rounded-2 sm:rounded-3 border border-1 dark:border-gray-600 hstack items-start gap-2 lg:gap-3 px-3 py-4 lg:p-4 bg-secondary dark:bg-gray-800 hover:shadow-sm transition-all"
                        >
                          <div className="cstack w-80px h-80px rounded lg:rounded-2 bg-white dark:bg-gray-900 flex-shrink-0">
                            <Icon
                              className="text-primary"
                              style={{ width: `${iconRem}rem`, height: `${iconRem}rem` }}
                              aria-hidden
                            />
                          </div>
                          <div className="vstack justify-center flex-grow-1 min-w-0 gap-2">
                            <h3 className="h6 lg:h5 m-0 text-gray-900 dark:text-white">{title}</h3>
                            <p className="fs-7 lg:fs-6 text-gray-700 dark:text-gray-300 m-0">{description}</p>
                            <a
                              href={href}
                              className="uc-link fw-bold hstack gap-narrow self-start"
                              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            >
                              <span>{cta}</span>
                              <i className="position-relative icon icon-1 unicon-arrow-right rtl:rotate-180 translate-y-px" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
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
                    <Link
                      to="/business"
                      className="btn btn-md lg:btn-lg btn-outline-dark dark:text-white dark:hover:text-dark dark:hover:bg-white border shadow-sm rounded-2 sm:rounded px-3 py-2 lg:min-w-200px"
                    >
                      Înapoi la pagina principală
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
