import ContentLoader from 'react-content-loader';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SwiperCore, { EffectFade, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from 'next/image';
import wooCommerceApi from '../../../../woocommerce';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n';
import { useRouter } from 'next/router';

const FeaturedCar = () => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [categories, setCategories] = useState([]);
  const [acfData, setAcfData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const router = useRouter();

  const fetchData = async (endpoint) => {
    try {
      const response = await wooCommerceApi.get(endpoint);
      return response.data;
    } catch (error) {
      // Handle error
    }
  };

  const fetchAcfData = async () => {
    const response = await fetchData(`wc/v3/products?acf_format=standard${router.locale === 'ar' ? '&wpml_language=ar' : ''}`);
    setAcfData(response);
  };

  useEffect(() => {
    fetchAcfData();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetchData(`wc/v3/products${router.locale === 'ar' ? '?wpml_language=ar' : ''}`);
      setProducts(response);
      setLoading(false);
    };

    const fetchBrands = async () => {
      const response = await fetchData(`wc/v3/products/categories${router.locale === 'ar' ? '?wpml_language=ar' : ''}`);
      if (response && response.length > 0) {
        const brands = response.filter((category) => category.parent === 0);
        setBrands(brands);
      } else {
        console.error('Error fetching brands:', response);
      }
    };

    const fetchCategories = async () => {
      const response = await fetchData(`wc/v3/products/categories${router.locale === 'ar' ? '?wpml_language=ar' : ''}`);
      setCategories(response);
    };

    fetchProducts();
    fetchBrands();
    fetchCategories();
  }, []);

  SwiperCore.use([EffectFade, Navigation]);

  const sliderSettings = {
    speed: 1500,
    spaceBetween: 25,
    slidesPerView: 4,
    navigation: {
      nextEl: ".next-51",
      prevEl: ".prev-51",
    },
    breakpoints: {
      280: {
        slidesPerView: 1,
      },
      386: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 24,
      },
      1400: {
        slidesPerView: 4,
      },
    },
  };

  return (
    <div className="home5-featured-cars-section pt-10 mb-10">
      <div className="container">
        <div className="row mb-50 wow fadeInUp" data-wow-delay="200ms">
          <div className="col-lg-12 d-flex align-items-end justify-content-between gap-3 flex-wrap">
            <div className="section-title-2">
              <h2>{t('featuredCars')}</h2>
              <p>{t('getAccurateInfo')}</p>
            </div>
            <div className="slider-btn-group2 d-flex align-items-center justify-content-between">
              <div className="slider-btn prev-51">
                <svg width={9} height={15} viewBox="0 0 8 13" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 6.50008L8 0L2.90909 6.50008L8 13L0 6.50008Z" />
                </svg>
              </div>
              <div className="slider-btn next-51">
                <svg width={9} height={15} viewBox="0 0 8 13" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 6.50008L0 0L5.09091 6.50008L0 13L8 6.50008Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="row wow fadeInUp" data-wow-delay="300ms">
          <div className="col-lg-12">
            <Swiper {...sliderSettings} className="swiper home5-fetured-slider">
              <div className="swiper-wrapper">
                {loading ? (
                  // ContentLoader for products while loading data
                  Array(10).fill(0).map((_, index) => (
                    <SwiperSlide key={index}>
                     <ContentLoader
                      height={300}
                      width={300}
                      speed={2}
                      style={{ backgroundColor: '#f3f3f3' }}
                    >
                      <rect x="0" y="0" rx="10" ry="10" width="300" height="200" />
                      <rect x="0" y="220" rx="10" ry="10" width="300" height="20" />
                      <rect x="0" y="250" rx="10" ry="10" width="250" height="20" />
                      <rect x="0" y="280" rx="10" ry="10" width="250" height="20" />
                    </ContentLoader>
                    </SwiperSlide>
                  ))
                ) : (
                  // Once data is loaded, render the products
                  products && products.length > 0 ? (
                    products.slice(0, 10).map((product) => (
                      <SwiperSlide key={product.id} className="swiper-slide">
                        <div className="product-card5">
                          <div className="product-img">
                            <Image src={product.images && product.images.length > 0 ? product.images[0].src : '/path/to/placeholder-image.jpg'} alt={product.name} width={300} height={300} />
                          </div>
                          <div className="product-info">
                            <p style={{ fontSize: '20px', fontWeight: '600', marginTop: '10px' }}>{product.name}</p>
                            <p style={{ fontSize: '18px', fontWeight: '400', marginTop: '0px' }}>{product.price} {t('currency')}</p>
                            <p style={{ fontSize: '16px', fontWeight: '400', marginTop: '0px' }}>
                              {t('category')}: {product.categories && product.categories.length > 0 ? product.categories[0].name : ''}
                            </p>
                            <p style={{ fontSize: '20px', fontWeight: '600', marginTop: '0px' }}>
                              {t('brand')}: {product.brands && product.brands.length > 0 ? product.brands[0].name : ''}
                            </p>
                            {acfData && acfData.length > 0 && (
                              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', marginRight: '3px' }}>
                                  <div className="icon">
                                    <Image src="/assets/img/inner-page/icon/mileage.svg" alt="" width={18} height={18} />
                                  </div>
                                  {acfData.find((item) => item.id === product.id)?.acf.drive}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', marginRight: '3px' }}>
                                  <div className="icon">
                                    <Image src="/assets/img/inner-page/icon/engine.svg" alt="" width={18} height={18} />
                                  </div>
                                  {acfData.find((item) => item.id === product.id)?.acf.engine}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  <div className="icon">
                                    <Image src="/assets/img/inner-page/icon/fuel.svg" alt="" width={18} height={18} />
                                  </div>
                                  {acfData.find((item) => item.id === product.id)?.acf.gasoline}
                                </div>
                              </div>
                            )}
                            <div className="btn btn-dark">
                            <Link href={`/car-details/${product.id}`} locale={router.locale} className="view-details-link">{t('viewDetails')}</Link>                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))
                  ) : (
                    <p>{t('noProductsFound')}</p>
                  )
                )}
              </div>
            </Swiper>
          </div>
        </div>
        <div className="row wow fadeInUp" data-wow-delay="300ms">
          <div className="explore-more-btn">
          <Link href="/brand-category" style={{ justifyContent: 'flex-end', marginTop: '15px', marginBottom: '20px' }}>{t('exploreMore')}<i className="bi bi-arrow-right" /></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCar;