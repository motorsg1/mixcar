import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import i18n from '@/src/i18n';

SwiperCore.use([Navigation, Pagination]);

const ProductMain = ({ product, acfData }) => {
  const { t } = i18n;

  const handlePrint = () => {
    window.print();
  };

  const handleClick = (type) => {
    let hrefValue = '';
    let newText = '';

    switch (type) {
      case 'phoneNumber':
        hrefValue = `tel:${'+966 8002440207'}`;
        newText = '+966 8002440207';
        break;
      case 'emailAdress':
        hrefValue = `mailto:${'info@mixcar.sa'}`;
        newText = 'info@mixcar.sa';
        break;
      case 'emailAdresss':
        hrefValue = '+966 8002440207'
          ? `https://api.whatsapp.com/send?phone=${'+966 8002440207'}&text=Hello this is the starting message`
          : '';
        newText = '+966 8002440207' || 'Whatsapp';
        break;
      default:
        break;
    }

    const element = document.getElementById(type);
    if (element) {
      const link = element.querySelector('a');
      link.setAttribute('href', hrefValue);
      link.textContent = `${newText}`;
    }
  };

  return (
    <div className="car-details-area mt-40" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="banner-product-list">
              <div className="banner-wrapper">
                <div className="container-fluid">
                  <ul className="breadcrumb-list">
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    <li style={{ textTransform: "capitalize" }}>{t('productInformation')}</li>
                  </ul>
                </div>
              </div>
            </div>
            {product.images && product.images.length > 0 && (
              <Swiper spaceBetween={10} navigation={true} className="mySwiper2">
                {product.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <Image src={image.src} alt={product.name} width={700} height={700} />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
          <div className="col-lg-6">
            <div className="row mt-50">
              <div className="col-xl-6 col-lg-7 d-flex align-items-center">
                <div className="banner-content">
                  <span className="sub-title">
                    {t('brand')}: {product.brands && product.brands.length > 0 ? product.brands[0].name : ''}
                  </span>
                  <h1>{product.name}</h1>
                  <h3 style={{ fontWeight: '400', fontSize: '25px' }}>{t('price')}: {product.price}</h3>
                  {acfData && acfData.drive && (
                    <p style={{ fontSize: '20px', fontWeight: '600', marginTop: '10px' }}>
                      {t('drive')}: {acfData.drive}
                    </p>
                  )}
                  {acfData && acfData.engine && (
                    <p style={{ fontSize: '20px', fontWeight: '600', marginTop: '10px' }}>
                      {t('engine')}: {acfData.engine}
                    </p>
                  )}
                  {acfData && acfData.gasoline && (
                    <p style={{ fontSize: '20px', fontWeight: '600', marginTop: '10px' }}>
                      {t('gasoline')}: {acfData.gasoline}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-lg-12">
                <button style={{ marginBottom: '30px', marginTop: '40' }} className="btn btn-dark">
                  {t('buyNow')}
                </button>
              </div>
              <div className="row mt-20">
                <div className="inquiry-form mb-20">
                  <div className="title">
                    <h4>{t('inquiryForm')}</h4>
                    <p>{t('inquiryFormDescription')}</p>
                  </div>
                </div>
              </div>
              <div className="contact-info">
                <div className="single-contact" id="phoneNumber">
                  <a onClick={() => handleClick('phoneNumber')}>
                    <i className="bx bx-phone-call" style={{ fontSize: '24px' }} /> {t('phoneNumber')}
                  </a>
                </div>
                <div className="single-contact" id="emailAdress">
                  <a onClick={() => handleClick('emailAdress')}>
                    <i className="bx bx-at" style={{ fontSize: '24px' }} /> {t('emailAddress')}
                  </a>
                </div>
                <div className="single-contact" id="emailAdresss">
                  <a onClick={() => handleClick('emailAdresss')}>
                    <i className="bx bxl-whatsapp" style={{ fontSize: '24px' }} /> {t('whatsapp')}
                  </a>
                </div>
                <button style={{ marginBottom: '30px', marginTop: '30', marginRight: '10px' }} className="btn btn-dark" onClick={handlePrint}>
                  <i className="bx bx-printer" style={{ fontSize: '24px' }} />
                </button>
                <button style={{ marginBottom: '30px', marginTop: '30' }} className="btn btn-dark">
                  <i className="bx bx-refresh" style={{ fontSize: '24px' }} /> {t('compare')}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-40">
          <div className="product-description">
            <h3>{t('productInformation')}</h3>
            <p dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductMain;