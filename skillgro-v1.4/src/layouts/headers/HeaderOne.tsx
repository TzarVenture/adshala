"use client";
import Link from "next/link";
import HeaderTopOne from "./menu/HeaderTopOne";
import Image from "next/image";
import NavMenu from "./menu/NavMenu";
import React, { useState } from "react";
import MobileSidebar from "./menu/MobileSidebar";
import InjectableSvg from "@/hooks/InjectableSvg";
import useSticky from "@/hooks/useSticky";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
const TotalCart = dynamic(() => import("@/components/common/TotalCart"), {
  ssr: false,
});
const TotalWishlist = dynamic(
  () => import("@/components/common/TotalWishlist"),
  { ssr: false },
);
const CustomSelect = dynamic(() => import("@/ui/CustomSelect"), { ssr: false });

import logo from "@/assets/img/logo/logo.svg";
import Adshalaa_logo21 from "@/assets/img/logo/Adshalaa_Logo21.svg";
// import Adshalaa_logo2 from "@/assets/img/logo/Adshalaa_Logo2.png"
import Adshalaa_logo from "@/assets/img/logo/Adshalaa_Logo.png";
import icon_1 from "@/assets/img/icons/user.svg";
import icon_2 from "@/assets/img/icons/cart.svg";
import icon_3 from "@/assets/img/icons/heart.svg";
import BrochurePopup from "@/components/common/BrochurePopup";
const HeaderOne = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [brochureOpen, setBrochureOpen] = useState(false);
  const handleSelectChange = (option: React.SetStateAction<null>) => {
    setSelectedOption(option);
  };

  const { sticky } = useSticky();
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <>
      <header>
        <HeaderTopOne />
        <div id="header-fixed-height"></div>
        <div
          id="sticky-header"
          className={`tg-header__area ${sticky ? "sticky-menu" : ""}`}
        >
          <div className="container custom-container">
            <div className="row">
              <div className="col-12">
                <div className="tgmenu__wrap">
                  <nav className="tgmenu__nav">
                    <div className="logo">
                      {/* <Link href="/"><Image src={logo} alt="Logo" /></Link> */}
                      <Link href="/">
                        <Image
                          src={Adshalaa_logo}
                          alt="Logo"
                          width={153}
                          height={40}
                        />
                      </Link>
                      {/* <Link href="/"><Image src={Adshalaa_logo21} alt="Logo" width={153} height={40}/></Link> */}
                      {/* <Link href="/"><Image src={Adshalaa_logo2} alt="Logo" /></Link> */}
                    </div>
                    <div className="tgmenu__navbar-wrap tgmenu__main-menu d-none d-xl-flex">
                      <NavMenu />
                    </div>
                    {/* <li className="header-btn"> */}
                    <div className="tgmenu__search d-none d-md-block">
                      <CustomSelect
                        value={selectedOption}
                        onChange={handleSelectChange}
                      />
                    </div>
                    <button
                      onClick={() => {
                        const form = document.getElementById("enquiry-form01");
                        if (form) {
                          form.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        } else {
                          router.push("/#enquiry-form01");
                        }
                      }}
                      className="btn d-none d-md-inline-block"
                      style={{ marginRight: "10px" }}
                    >
                      Enquire Now
                    </button>
                    <button
                      onClick={() => {
                        setBrochureOpen(true);
                      }}
                      className="btn"
                    >
                      Get Brochure
                    </button>
                    {/* </li> */}

                    {/* <div className="tgmenu__action">
                                 <ul className="list-wrap">
                                    <li className="wishlist-icon">
                                       <Link href="/wishlist" className="cart-count">
                                          <InjectableSvg src={icon_3.src} className="injectable" alt="img" />
                                          <TotalWishlist />
                                       </Link>
                                    </li>
                                    <li className="mini-cart-icon">
                                       <Link href="/cart" className="cart-count">
                                          <InjectableSvg src={icon_2.src} className="injectable" alt="img" />
                                          <TotalCart />
                                       </Link>
                                    </li>
                                    <li className="header-btn login-btn">
                                       <Link href="/login">Log in</Link>
                                    </li>
                                 </ul>
                              </div> */}
                    {/* <div className="mobile-login-btn">
                                 <Link href="/login"><InjectableSvg src={icon_1.src} alt="" className="injectable" /></Link>
                              </div> */}
                    <div
                      onClick={() => setIsActive(true)}
                      className="mobile-nav-toggler"
                    >
                      <i className="tg-flaticon-menu-1"></i>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <MobileSidebar isActive={isActive} setIsActive={setIsActive} />
      <BrochurePopup
        isOpen={brochureOpen}
        onClose={() => setBrochureOpen(false)}
      />
    </>
  );
};

export default HeaderOne;
