import React from "react";
import BaicTab from "../../../utils/BaicTabs";
import MaxusTab from "../../../utils/MaxusTabs";
import ToyotaTab from "../../../utils/ToyotaTabs";
import LexusTab from "../../../utils/LexusTabs";
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n';

const BrandTab = () => {
  const { t } = useTranslation();

  return (
    <div className="most-search-area pt-90 pb-90 mb-100">
      <div className="container">
        <div className="row mb-60 wow fadeInUp" data-wow-delay="200ms">
          <div className="col-lg-12 d-flex align-items-end justify-content-between flex-wrap gap-4">
            <div className="section-title1">
              <span>{t('weDeliverToYourDoor')}</span>
              <h2>{t('bestBrandToBuy')}</h2>
            </div>
            <ul className="nav nav-tabs" id="myTab5" role="tablist">
              <li className="nav-item" role="presentation">
                <button className="nav-link active" id="baic-tab" data-bs-toggle="tab" data-bs-target="#baic" type="button" role="tab" aria-controls="baic" aria-selected="true">
                  {t('baic')}
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id="maxus-tab" data-bs-toggle="tab" data-bs-target="#maxus" type="button" role="tab" aria-controls="maxus" aria-selected="false">
                  {t('maxus')}
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id="toyota-tab" data-bs-toggle="tab" data-bs-target="#toyota" type="button" role="tab" aria-controls="toyota" aria-selected="false">
                  {t('toyota')}
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id="lexus-tab" data-bs-toggle="tab" data-bs-target="#lexus" type="button" role="tab" aria-controls="lexus" aria-selected="false">
                  {t('lexus')}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row wow fadeInUp" data-wow-delay="300ms">
          <div className="col-lg-12 position-relative">    
            <div className="tab-content" id="myTabContent5">
              {/* BAIC Tab */}
              <div className="tab-pane fade show active" id="baic" role="tabpanel" aria-labelledby="baic-tab">
                <BaicTab />
              </div>

              {/* MAXUS Tab */}
              <div className="tab-pane fade" id="maxus" role="tabpanel" aria-labelledby="maxus-tab">
                <MaxusTab />
              </div>

              {/* TOYOTA Tab */}
              <div className="tab-pane fade" id="toyota" role="tabpanel" aria-labelledby="toyota-tab">
                <ToyotaTab />
              </div>
                
              {/* LEXUS Tab */}
              <div className="tab-pane fade" id="lexus" role="tabpanel" aria-labelledby="lexus-tab">
                <LexusTab />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandTab;