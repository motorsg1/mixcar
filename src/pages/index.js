import React from "react";
import { useRouter } from "next/router";
import Header from "../components/Header/Header";
import Banner from "../components/Mixcar/Banner/index";
import CarFeature from "../components/Mixcar/FeaturedCar/index";
import BrandCategory from "../components/Mixcar/Brand/index";
import RecentCar from "../components/Mixcar/RecentCar/index";
import WhyMixcar from "../components/Mixcar/WhyMixCar/WhyChooseUs";
import Partner from "../components/Mixcar/Partner/Partner";
import BrandTabs from "../components/Mixcar/BrandTab/Brandtab";

import Offers from "../components/Mixcar/Offers/Offers";
import Footer from "../components/Footer/Footer";

function MixCar() {
  const router = useRouter();
  const currentRoute = router.pathname;
  const locale = router.locale; // get the current locale

  if (typeof window !== "undefined") {
    if (currentRoute === "/index") {
      document.body.classList.add("MixCar");
    } else {
      document.body.classList.remove("MixCar");
    }
  }

  // use the locale to determine which language to display
  const lang = locale === "ar" ? "ar" : "en";

  return (
    <>
      <Header lang={lang} />
      <Banner lang={lang} />
      <WhyMixcar lang={lang} />
      <BrandTabs lang={lang} />
      <BrandCategory lang={lang} />
      <CarFeature lang={lang} />
      <RecentCar lang={lang} />
      <Partner lang={lang} />
      <Offers lang={lang} />
      <Footer lang={lang} />
    </>
  );
}

export default MixCar;