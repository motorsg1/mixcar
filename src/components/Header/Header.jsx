import React, { useEffect, useReducer, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import localFont from 'next/font/local'

const initialState = {
  activeMenu: "",
  activeSubMenu: "",
  isSidebarOpen: false,
  isLeftSidebarOpen: false,
  language: "en",
  isDropdownOpen: false
};

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_MENU":
      return {
        ...state,
        activeMenu: state.activeMenu === action.menu ? "" : action.menu,
        activeSubMenu:
          state.activeMenu === action.menu ? state.activeSubMenu : "",
      };
    case "TOGGLE_SUB_MENU":
      return {
        ...state,
        activeSubMenu:
          state.activeSubMenu === action.subMenu ? "" : action.subMenu,
      };
    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };
    case "setScrollY":
      return { ...state, scrollY: action.payload };
    case "TOGGLE_LEFT_SIDEBAR":
      return {
        ...state,
        isLeftSidebarOpen: !state.isLeftSidebarOpen,
      };
    case "SWITCH_LANGUAGE":
      return {
        ...state,
        language: action.language
      };
    case "TOGGLE_DROPDOWN":
      return {
        ...state,
        isDropdownOpen: !state.isDropdownOpen
      };
    default:
      return state;
  }
}

function Header() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const headerRef = useRef(null);
  const handleScroll = () => {
    const { scrollY } = window;
    dispatch({ type: "setScrollY", payload: scrollY });
  };
  const currentRoute = useRouter().pathname;
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const locale = router.locale; // get the current locale

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      switchLanguage(storedLanguage);
    }
  }, []);

  useEffect(() => {
    i18n.init({ lng: state.language });
  }, [state.language]);

  const toggleMenu = (menu) => {
    dispatch({ type: "TOGGLE_MENU", menu });
  };

  const toggleSubMenu = (subMenu) => {
    dispatch({ type: "TOGGLE_SUB_MENU", subMenu });
  };

  const toggleSidebar = () => {
    dispatch({ type: "TOGGLE_MENU", menu: "" });
    dispatch({ type: "TOGGLE_SUB_MENU", subMenu: "" });
    dispatch({ type: "TOGGLE_SIDEBAR" });
  };

  const switchLanguage = (language) => {
    dispatch({ type: "SWITCH_LANGUAGE", language });
    i18n.changeLanguage(language);
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    localStorage.setItem("language", language);
    router.push(router.asPath, undefined, { locale: language });
    i18n.init({ lng: language });
  };

  const toggleDropdown = () => {
    dispatch({ type: "TOGGLE_DROPDOWN" });
    document.addEventListener("click", (e) => {
      if (!e.target.classList.contains("lang-btn") && !e.target.classList.contains("dropdown-item")) {
        dispatch({ type: "TOGGLE_DROPDOWN" });
      }
    });
  };

  return (
    <header ref={headerRef} className={state.scrollY > 10 ? "header-area style-1 sticky" : "header-area style-1"} dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="header-logo d-none d-lg-flex">
        <Link href="/">
          <Image alt="image" className="img-fluid" src="/assets/img/logo.svg" width={200} height={200} />
        </Link>
      </div>
      <div className="header-logo d-lg-none d-flex">
        <Link href="/">
          <Image alt="image" className="img-fluid" src="/assets/img/logo.svg" width={200} height={200} />
        </Link>
      </div>
      <div className={`main-menu ${state.isSidebarOpen ? "show-menu" : ""}`}>
        <div className="mobile-logo-area d-lg-none d-flex justify-content-between align-items-center">
          <div className="mobile-logo-wrap">
            <Link href="/">
              <Image alt="image" className="img-fluid" src="/assets/img/logo.svg" width={200} height={200} />
            </Link>
          </div>
        </div>
        <ul className="menu-list">
          <li className="position-inherit">
            <a href="#" className="drop-down">{t('cars')}</a>
            <i onClick={() => toggleMenu("new-car")} className={`bi bi-${state.activeMenu === "new-car" ? "dash" : "plus"} dropdown-icon`} />
            <div className={`mega-menu ${state.activeMenu === "new-car" ? "d-block" : ""}`}>
              <ul className="menu-row">
                <li className="menu-single-item">
                  <h6>{t('browse_by_brand')}</h6>
                  <ul>
                    <li><Link legacyBehavior href="/baic-brand-category">{t('baic')}</Link></li>
                    <li><Link legacyBehavior href="/maxus-brand-category">{t('maxus')}</Link></li>
                    <li><Link legacyBehavior href="/toyota-brand-category">{t('toyota')}</Link></li>
                    <li><Link legacyBehavior href="/lexus-brand-category">{t('lexus')}</Link></li>
                    <div className="explore-more-btn">
                      <Link legacyBehavior href="/brand-category"><a>{t('explore_more')} <i className="bi bi-arrow-right" /></a></Link>
                    </div>
                  </ul>
                </li>
                <li className="menu-single-item">
                  <h6>{t('visit_our_location')}</h6>
                  <ul>
                    <li><Link legacyBehavior href="#">{t('jeddah')}</Link></li>
                    <li><Link legacyBehavior href="#">{t('riyadh')}</Link></li>
                    <li><Link legacyBehavior href="#">{t('dammam')}</Link></li>
                    <li><Link legacyBehavior href="#">{t('jazan')}</Link></li>
                  </ul>
                </li>
              </ul>
            </div>
          </li>
          <li className="menu-item-has-children">
            <a href="#" className="drop-down">{t('offers')}</a><i onClick={() => toggleMenu("pages")} className={`bi bi-${state.activeMenu === "pages" ? "dash" : "plus"} dropdown-icon`} />
            <ul className={`sub-menu ${state.activeMenu === "pages" ? "d-block" : ""}`}>
              <li><Link legacyBehavior href="/about"><a>{t('about_us')}</a></Link></li>
              <li><Link legacyBehavior href="/brand-category"><a>{t('brand_category')}</a></Link></li>
              <li><Link legacyBehavior href="/single-brand-category"><a>{t('single_brand_category')}</a></Link></li>
            </ul>
          </li>
          <li>
            <Link legacyBehavior href="/contact"><a className="drop-down">{t('service')}</a></Link>
          </li>
          <li>
            <Link legacyBehavior href="/contact"><a className="drop-down">{t('purchase_order')}</a></Link>
          </li>
          <li className="menu-item-has-children">
            <a href="#" className="drop-down">{t('why_mixcar')}</a><i onClick={() => toggleMenu("pages")} className={`bi bi-${state.activeMenu === "pages" ? "dash" : "plus"} dropdown-icon`} />
            <ul className={`sub-menu ${state.activeMenu === "pages" ? "d-block" : ""}`}>
              <li><Link legacyBehavior href="/about"><a>{t('about_us')}</a></Link></li>
              <li><Link legacyBehavior href="/brand-category"><a>{t('brand_category')}</a></Link></li>
              <li><Link legacyBehavior href="/single-brand-category"><a>{t('single_brand_category')}</a></Link></li>
            </ul>
          </li>
        </ul>
        <div className="hotline-area d-lg-none d-flex">
          <div className="icon">
            <Image src="/assets/img/mixcar/icon/hotline-icon.svg" alt="Hotline Icon" width={32} height={32} />
          </div>
          <div className="content">
            <span>{t('to_more_inquiry')}</span>
            <h6><a href="tel:8002440207">8002440207</a></h6>
          </div>
        </div>
      </div>
      <div className="nav-right d-flex jsutify-content-end align-items-center">
        {/* div trigger modal */}
        <div className="hotline-area d-xl-flex d-none">
        <div className="icon">
            <Image src="/assets/img/mixcar/icon/hotline-icon.svg" alt="Hotline Icon" width={32} height={32} />
          </div>
          <div className="content">
            <span>{t('to_more_inquiry')}</span>
            <h6><a href="tel:8002440207">8002440207</a></h6>
          </div>
        </div>
        <div className="language-switcher">
          <div className="lang" onClick={toggleDropdown}>
            <Image
              src={state.language === "en" ? "/assets/img/mixcar/icon/us.svg" : "/assets/img/mixcar/icon/sa.svg"}
              alt="Language Icon"
              width={15}
              height={15}
              className="language-icon"
            />
            {state.language === "en" ? "EN" : "AR"}
          </div>
          {state.isDropdownOpen && (
            <div className="dropdown-menu" style={{ display: state.isDropdownOpen ? "block" : "none" }}>
              <div className="dropdown-item" onClick={() => switchLanguage("en")}>
                <Image
                  src="/assets/img/mixcar/icon/us.svg"
                  alt="English Icon"
                  width={15}
                  height={15}
                  className="dropdown-icon"
                />
                English
              </div>
              <div className="dropdown-item" onClick={() => switchLanguage("ar")}>
                <Image
                  src="/assets/img/mixcar/icon/sa.svg"
                  alt="Arabic Icon"
                  width={20}
                  height={20}
                  className="dropdown-icon"
                />
                عربي
              </div>
            </div>
          )}
        </div>
        <div className={`sidebar-div mobile-menu-btn ${state.isSidebarOpen ? "active" : ""}`} onClick={toggleSidebar}>
          <span />
        </div>
      </div>
    </header>
  );
}

export default Header;