import Link from "next/link";
import React, { useMemo } from "react";
import SwiperCore, { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n';

SwiperCore.use([Pagination, Autoplay, EffectFade, Navigation]);
function index() {
    const { t } = useTranslation();
    const slideSettings = useMemo(()=>{
        return {
            speed: 1500,
            spaceBetween: 25,
            autoplay: {
              delay: 2500, // Autoplay duration in milliseconds
              disableOnInteraction: false,
            },
            navigation: {
              nextEl: ".next-52",
              prevEl: ".prev-52",
            },

            breakpoints: {
              280: {
                slidesPerView: 1,
              },
              420: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              576: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              992: {
                slidesPerView: 4,
                spaceBetween: 15,
              },
              1200: {
                slidesPerView: 5,
                spaceBetween: 24,
              },
              1400: {
                slidesPerView: 6
              },
            }
        }
    })


  return (
    <div className="home5-brand-category-area mb-100">
      <div className="container">
        <div className="row mb-50 wow fadeInUp" data-wow-delay="200ms">
          <div className="col-lg-12 d-flex align-items-end justify-content-between gap-3 flex-wrap">
            <div className="section-title-2">
              <h2>{t('authorizedDistributor')}</h2>
              <p>{t('getAccurateInfo')}</p>
            </div>
            <div className="filter-and-slider-btn">
              <div className="slider-btn-group2 d-flex align-items-center justify-content-between">
                <div className="slider-btn prev-52">
                  <svg width={9} height={15} viewBox="0 0 8 13" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 6.50008L8 0L2.90909 6.50008L8 13L0 6.50008Z" />
                  </svg>
                </div>
                <div className="slider-btn next-52">
                  <svg width={9} height={15} viewBox="0 0 8 13" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 6.50008L0 0L5.09091 6.50008L0 13L8 6.50008Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row wow fadeInUp" data-wow-delay="300ms">
          <div className="col-lg-12">
            <Swiper {...slideSettings} className="swiper home5-brand-category-slider">
              <div className="swiper-wrapper">
                <SwiperSlide className="swiper-slide">
                  <div className="single-category5">
                    <div className="category-icon">
                      <img src="assets/img/mixcar/icon/baic.svg" alt="icon" />
                    </div>
                    <div className="category-content">
                      <h5><Link href="/baic-brand-category">{t('baic')}</Link></h5>
                    </div>
                    <div className="explore-btn5">
                      <Link href="/baic-brand-category"><span>{t('explore')}</span> <i className="bi bi-arrow-right-short" /></Link>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="single-category5">
                    <div className="category-icon">
                      <img src="assets/img/mixcar/icon/maxus.svg" alt="icon" />
                    </div>
                    <div className="category-content">
                      <h5><Link href="/maxus-brand-category">{t('maxus')}</Link></h5>
                    </div>
                    <div className="explore-btn5">
                      <Link href="/maxus-brand-category"><span>{t('explore')}</span> <i className="bi bi-arrow-right-short" /></Link>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="single-category5">
                    <div className="category-icon">
                      <img src="assets/img/mixcar/icon/toyota.svg" alt="icon" />
                    </div>
                    <div className="category-content">
                      <h5><Link href="/toyota-brand-category">{t('toyota')}</Link></h5>
                    </div>
                    <div className="explore-btn5">
                      <Link href="/toyota-brand-category"><span>{t('explore')}</span> <i className="bi bi-arrow-right-short" /></Link>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="single-category5">
                    <div className="category-icon">
                      <img src="assets/img/mixcar/icon/lexus.svg" alt="icon" />
                    </div>
                    <div className="category-content">
                      <h5><Link href="/lexus-brand-category">{t('lexus')}</Link></h5>
                    </div>
                    <div className="explore-btn5">
                      <Link href="/lexus-brand-category"><span>{t('explore')}</span> <i className="bi bi-arrow-right-short" /></Link>
                    </div>
                  </div>
                </SwiperSlide>
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index;