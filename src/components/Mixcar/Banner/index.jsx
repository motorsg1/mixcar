import React, { useState, useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import Link from "next/link";
SwiperCore.use([Pagination, Autoplay, EffectFade, Navigation]);

function Index() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const slideSettings = useMemo(() => {
    return {
      slidesPerView: 1,
      speed: 1500,
      spaceBetween: 25,
      loop: true,
      effect: "fade",
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".next-4",
        prevEl: ".prev-4",
      },
      pagination: {
        el: ".paginations111",
        clickable: true,
      },
    };
  }, []);

  return (
    <div className="home5-banner-area">
      <div className="paginations111" />
      <Swiper {...slideSettings} className="swiper home5-banner-slider">
        <div className="swiper-wrapper">
          <SwiperSlide
            className="swiper-slide"
            style={{
              width: "100%",
              height: "600px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              className="banner-bg"
              style={{
                backgroundImage: isMobile
                  ? "url(/assets/img/mixcar/BAIC-BJ60-mobile.jpg)"
                  : "url(/assets/img/mixcar/BAIC-BJ60.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "100%",
                height: "600px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </SwiperSlide>
          <SwiperSlide
            className="swiper-slide"
            style={{
              width: "100%",
              height: "600px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              className="banner-bg"
              style={{
                backgroundImage: isMobile
                  ? "url(/assets/img/mixcar/MAXUS-D90-MAX-mobile.jpg)"
                  : "url(/assets/img/mixcar/MAXUS-D90-MAX.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "100%",
                height: "600px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </SwiperSlide>
          <SwiperSlide
            className="swiper-slide"
            style={{
              width: "100%",
              height: "600px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              className="banner-bg"
              style={{
                backgroundImage: isMobile
                  ? "url(/assets/img/mixcar/MAXUS-TORNADO90-mobile.jpg)"
                  : "url(/assets/img/mixcar/MAXUS-TORNADO90.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "100%",
                height: "600px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </SwiperSlide>
        </div>
      </Swiper>
    </div>
  );
}

export default Index;
