import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import i18n from '../.../../../../i18n';

function WhyChooseUs() {
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useTranslation();

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="pt-50 pb-50 mb-100 text-center">
      <div className="container">
        <div className="row g-lg-12 gy-5 justify-content-center">
          <div className="col-lg-12 flex-auto align-items-center">
            <div className="mixcar-content mx-auto">
              <div className="section-title-2 mb-60 wow fadeInUp" data-wow-delay="200ms">
                <h2>{t('whyMixcar')}</h2>
                <p>{t('discoverMixcarAdvantage')}</p>
              </div>
              <div className="mixcar-featute">
                <ul
                  className="list-unstyled"
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row", // Switch between vertical and horizontal
                    justifyContent: "center",
                    alignItems: isMobile ? "center" : "flex-start",
                    padding: 0,
                  }}
                >
                  <li
                    className="single-feature wow fadeInUp"
                    data-wow-delay="300ms"
                    style={{ marginBottom: isMobile ? "30px" : "15px", textAlign: "center" }}
                  >
                    <div className="feature-icon mx-auto" style={{ marginBottom: "20px" }}>
                      <img
                        src="assets/img/mixcar/icon/safe.svg"
                        alt="icon"
                        style={{ width: "60px", height: "60px" }}
                      />
                    </div>
                    <div className="feature-content mx-auto">
                      <h5>{t('safeAndReliablePurchases')}</h5>
                      <p>{t('safetyAndSatisfaction')}</p>
                    </div>
                  </li>
                  <li
                    className="single-feature wow fadeInUp"
                    data-wow-delay="400ms"
                    style={{ marginBottom: isMobile ? "30px" : "15px", textAlign: "center" }}
                  >
                    <div className="feature-icon mx-auto" style={{ marginBottom: "20px" }}>
                      <img
                        src="assets/img/mixcar/icon/warranty.svg"
                        alt="icon"
                        style={{ width: "60px", height: "60px" }}
                      />
                    </div>
                    <div className="feature-content mx-auto">
                      <h5>{t('comprehensiveWarranty')}</h5>
                      <p>{t('shopWithConfidence')}</p>
                    </div>
                  </li>
                  <li
                    className="single-feature wow fadeInUp"
                    data-wow-delay="500ms"
                    style={{ marginBottom: isMobile ? "30px" : "15px", textAlign: "center" }}
                  >
                    <div className="feature-icon mx-auto" style={{ marginBottom: "20px" }}>
                      <img
                        src="assets/img/mixcar/icon/hassle.svg"
                        alt="icon"
                        style={{ width: "60px", height: "60px" }}
                      />
                    </div>
                    <div className="feature-content mx-auto">
                      <h5>{t('effortlessAndHassleFreeExperience')}</h5>
                      <p>{t('enjoyStreamlinedExperience')}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyChooseUs;