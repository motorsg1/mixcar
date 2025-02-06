import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const Offers = () => {
  const { t } = useTranslation();

  return (
    <div className="news-section five mb-60">
      <div className="container">
        <div className="row mb-60 wow fadeInUp" data-wow-delay="200ms">
          <div className="col-lg-12 d-flex align-items-end justify-content-between flex-wrap gap-4">
            <div className="section-title-2">
              <h2>{t('financing_offers')}</h2>
              <p>{t('featured_cars_description')}</p>
            </div>
          </div>
        </div>
        <div className="row g-4 justify-content-center">
          <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="200ms">
            <div className="news-card style-2">
              <div className="news-img">
                <Link href="/blog-details">
                  <img src="assets/img/home1/news-01.png" alt="" />
                </Link>
                <div className="date">
                  <Link href="/blog-standard">
                    {t('financing_offer')}
                  </Link>
                </div>
              </div>
              <div className="content">
                <h6>
                  <Link href="/blog-details">
                  {t('model_offer')}
                  </Link>
                </h6>
                <div className="news-btm d-flex align-items-center justify-content-between">
                  <div className="author-area">
                    <div className="author-img">
                      <img src="assets/img/home1/author-01.png" alt="" />
                    </div>
                    <div className="author-content">
                      <h6>{t('view_more')}</h6>
                      <Link href="/blog-standard">
                        {t('exclusive_offer_this_month')}
                      </Link>
                    </div>
                  </div>
                  <div className="social-area">
                    <ul className="social-icons">
                      <li>
                        <Link href="https://www.facebook.com/">
                          <i className="bx bxl-facebook" />
                        </Link>
                      </li>
                      <li>
                        <Link href="https://twitter.com/">
                          <i className="bx bxl-twitter" />
                        </Link>
                      </li>
                      <li>
                        <Link href="https://www.pinterest.com/">
                          <i className="bx bxl-pinterest-alt" />
                        </Link>
                      </li>
                      <li>
                        <Link href="https://www.instagram.com/">
                          <i className="bx bxl-instagram" />
                        </Link>
                      </li>
                    </ul>
                    <div className="share-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width={12} height={13} viewBox="0 0 12 13">
                        <path />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Repeat similar structure for other offers */}
        </div>
      </div>
    </div>
  );
};

export default Offers;