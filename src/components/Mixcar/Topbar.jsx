import React from 'react'
import Link from 'next/link'
function Topbar() {
  return (
    <div className="top-bar style-5">
      <div className="logo-and-menu">
        <div className="company-logo">
          <Link legacyBehavior href="/"><a><img src="assets/img/green-logo.svg" alt="" /></a></Link>
        </div>
        <div className="menu">
          <ul>
            <li><a href="#">Newly Listed Car</a></li>
            <li><a href="#">Lowest Mileage</a></li>
            <li><a href="#">Offer</a></li>
          </ul>
        </div>
      </div>
      <div className="topbar-right">
        <ul>
          <li>
            <div className="hotline-area d-xl-flex d-none">
              <div className="icon">
                <img src="assets/img/home1/icon/hotline-icon.svg" alt="" />
              </div>
              <div className="content">
                <span>To More Inquiry</span>
                <h6><a href="tel:+990737621432">+990-737 621 432</a></h6>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

  )
}

export default Topbar