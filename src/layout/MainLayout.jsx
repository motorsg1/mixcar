import React from "react";
import Header from "../components/Header/Header";
import Footer1 from "../components/Footer/Footer";

function MainLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer1 />
    </>
  );
}

export default MainLayout;
