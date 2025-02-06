import React from 'react';
import Marquee from 'react-fast-marquee';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

function Partner() {
  const { t, i18n } = useTranslation();

  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';

  return (
    <div className="trusted-partner-section mb-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-2 text-center mt-100 wow fadeInUp mb-50" data-wow-delay="200ms">
              <h2>{t('our_trusted_financing_partners')}</h2>
              <p>{t('financing_partner_description')}</p>
              <div className="dash" />
            </div>
            <div className="partner-slider wow fadeInUp" data-wow-delay="300ms">
              <Marquee
                pauseOnHover={true}
                delay={0}
                speed={50}
                gradient={false}
                loop={0}
                direction={direction}
              >
                <h2 className="marquee_text2">
                  <Image src="/assets/img/mixcar/emkan-financing.png" alt="" width={100} height={50} />
                  <Image src="/assets/img/mixcar/raya-finaning.png" alt="" width={100} height={50} />
                  <Image src="/assets/img/mixcar/tamwel-financing.png" alt="" width={100} height={50} />
                  <Image src="/assets/img/mixcar/aljazira-financing.png" alt="" width={100} height={50} />
                  <Image src="/assets/img/mixcar/alinma-financing.png" alt="" width={100} height={50} />
                  <Image src="/assets/img/mixcar/snb-financing.png" alt="" width={100} height={50} />
                  <Image src="/assets/img/mixcar/tamkeen-financing.png" alt="" width={100} height={50} />
                  <Image src="/assets/img/mixcar/radhji-financing.png" alt="" width={100} height={50} />
                  <Image src="/assets/img/mixcar/riyad-financing.png" alt="" width={100} height={50} />
                  <Image src="/assets/img/mixcar/albilad-financing.png" alt="" width={100} height={50} />
                  <Image src="/assets/img/mixcar/ncb-financing.png" alt="" width={100} height={50} />
                  <Image src="/assets/img/mixcar/alj-financing.png" alt="" width={100} height={50} />
                </h2>
              </Marquee>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Partner;