import { Link } from 'react-router-dom';

export default function MarketingFooter() {
  return (
    <footer id="uc-footer" className="uc-footer panel overflow-hidden ft-tertiary" data-anime="onview: -100; translateY: [24, 0]; opacity: [0, 1]; easing: easeOutExpo; duration: 750; delay: 250;">
      <div className="footer-outer py-6 lg:py-8 xl:py-9 lg:mx-2 rounded-2 xl:rounded-3 text-gray-900 dark:text-white bg-gradient-to-b from-secondary to-transparent dark:from-gray-700 dark:to-transparent">
        <div className="uc-footer-cta">
          <div className="container">
            <div className="section-inner panel vstack gap-4 lg:gap-6 xl:gap-8">
              <div className="panel">
                <div className="row child-cols-12 justify-between items-center g-3 sm:g-4 text-center lg:text-start">
                  <div className="lg:col-7 xl:col-6">
                    <div className="vstack gap-1 sm:gap-2">
                      <h2 className="h4 sm:h2 xl:h1 m-0">
                        Automatizează task-urile, <br /> colaborează fără efort
                      </h2>
                    </div>
                  </div>
                  <div className="lg:col-auto">
                    <div className="vstack gap-2 items-center">
                      <Link
                        to="/admin/login"
                        className="btn btn-md xl:btn-lg text-white bg-gradient-to-r from-primary to-tertiary gradient-hover hover:bg-opacity-70 dark:hover:bg-opacity-80 border-0 shadow-sm rounded-2 sm:rounded px-3 py-2 lg:min-w-200px"
                      >
                        Începe perioada de probă
                      </Link>
                      <span className="fs-7 text-gray-700 dark:text-gray-300">Fără card necesar!</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <hr className="w-100 my-4 lg:my-6 xl:my-9" />
        </div>
        <div className="uc-footer-content">
          <div className="container">
            <div className="uc-footer-inner vstack gap-4 lg:gap-6 xl:gap-8">
              <div className="uc-footer-widgets panel">
                <div className="row child-cols-6 sm:child-cols col-match g-4">
                  <div className="col-12 sm:col-6">
                    <div className="panel vstack items-start gap-3 xl:gap-4 xl:w-350px">
                      <Link to="/business" style={{ width: 140 }}>
                        <img className="text-primary dark:text-white" src="/assets/images/common/logo-12-light.svg" alt="Business Platform" />
                      </Link>
                    </div>
                  </div>
                  <div>
                    <ul className="nav-y gap-2 fs-6 xl:fs-5">
                      <li>
                        <a href="/business#integrations">Produse</a>
                      </li>
                      <li>
                        <a href="/business#key_features">Funcționalități</a>
                      </li>
                      <li>
                        <a href="/business#pricing">Prețuri</a>
                      </li>
                      <li>
                        <a href="/business#faq">Despre</a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="nav-y gap-2 fs-6 xl:fs-5">
                      <li>
                        <a href="/business#contact">Blog</a>
                      </li>
                      <li>
                        <a href="/business#contact">Resurse</a>
                      </li>
                      <li>
                        <Link to="/contact">Suport</Link>
                      </li>
                      <li>
                        <Link to="/admin/login">Portal client</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-12 lg:col-auto">
                    <div className="panel">
                      <ul className="social-icons nav-x gap-0">
                        <li>
                          <a
                            className="w-40px h-40px d-inline-flex justify-center items-center transition-all duration-200 ease-in hover:scale-110"
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                          >
                            <i className="unicon-logo-instagram icon-3" />
                          </a>
                        </li>
                        <li>
                          <a
                            className="w-40px h-40px d-inline-flex justify-center items-center transition-all duration-200 ease-in hover:scale-110"
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                          >
                            <i className="unicon-logo-facebook icon-3" />
                          </a>
                        </li>
                        <li>
                          <a
                            className="w-40px h-40px d-inline-flex justify-center items-center transition-all duration-200 ease-in hover:scale-110"
                            href="https://x.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="X"
                          >
                            <i className="unicon-logo-x-filled icon-3" />
                          </a>
                        </li>
                        <li>
                          <a
                            className="w-40px h-40px d-inline-flex justify-center items-center transition-all duration-200 ease-in hover:scale-110"
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                          >
                            <i className="unicon-logo-linkedin icon-3" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="uc-footer-bottom panel vstack sm:hstack gap-2 justify-between items-center text-center pt-4 border-top text-gray-700 dark:text-gray-200">
                <p className="m-0">Business Platform © 2025. Toate drepturile rezervate.</p>
                <ul className="nav-x gap-1 m-0">
                  <li>
                    <a href="#privacy">Politica de confidențialitate</a>
                  </li>
                  <li className="mx-2 lg:mx-3">
                    <a href="#terms">Termeni și condiții</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
