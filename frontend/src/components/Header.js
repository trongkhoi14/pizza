import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";
import Auth from "../pages/Auth";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [openModalAuth,setOpenModalAuth] = useState(false);
  const [show, setShow] = useState(null);
  const {
    user: { info },
    cart: { products = [] },
  } = useSelector((state) => state);
  const handleChangeLanguage = () => {
    if (i18n.resolvedLanguage === "en") {
      i18n.changeLanguage("vi");
    } else {
      i18n.changeLanguage("en");
    }
  };

  const handleOpenModal = () => {
    setOpenModalAuth(true);
  }
  const handleCloseModal = () => {
    setOpenModalAuth(false);
  }

  return (
    <header className="sticky bg-s-light-blue top-0 inset-x-0 z-50 text-white shadow-xl">
      <div className="flex min-h-[75px] sm:min-h-[75px] items-center w-full mx-auto md:px-6 px-6 ">
        <div className="flex items-center flex-1">
          <Link to="/">
            <img
              src="/images/main-logo-white.png"
              alt="Kin Pizza Logo"
              className="sm:w-[70px] h-[60px] w-[70px] cursor-pointer"
            />
          </Link>
        </div>
        <div className="flex items-center xl:space-x-12 lg:space-x-10 space-x-7 font-medium lg:text-base text-sm">
          <div className="relative cursor-pointer hidden md:block">
            <Link to="/tracking">
              <span className="link">{t("content.order_tracking")}</span>
            </Link>
          </div>
          <div className="relative cursor-pointer hidden md:block">
            <Link to="/menu">
              <span className="link">{t("content.view-menu")}</span>
            </Link>
          </div>
          <div className="relative cursor-pointer hidden md:block">
            <Link to="/about-us">
              <span className="link">{t("content.about")}</span>
            </Link>
          </div>
          {Object.keys(info).length ? (
            <div className="relative cursor-pointer ">
              <UserMenu />
            </div>
          ) : (
            <div className="relative cursor-pointer hidden md:block"
              onClick={handleOpenModal}
            >
                <span className="link">{t("content.login")}</span>
            </div>
          )}
          <div
            onClick={handleChangeLanguage}
            className="relative cursor-pointer bg-green-400 h-8 w-8 hover:bg-green-200 rounded-full flex justify-center items-center"
          >
            {i18n.resolvedLanguage === "en" ? "VI" : "EN"}
          </div>
          <div className="relative cursor-pointer">
            <Link to="/cart">
              <AiOutlineShoppingCart className="md:text-4xl text-3xl" />
              {/* {!!products.length && ( */}
                <div className="absolute -top-2 -right-1 rounded-full text-white bg-red-400 p-1 flex items-center justify-center text-xs font-extrabold">
                  {products.length < 5 ? products.length : "5+"}
                </div>
              {/* )} */}
            </Link>
          </div>
          <div
            onClick={() => setShow(true)}
            className="relative cursor-pointer md:hidden block"
          >
            <RxHamburgerMenu className="text-2xl" />
          </div>
        </div>
      </div>
      <div
        onClick={() => setShow(false)}
        className={`fixed inset-0  z-50
					dark:bg-opacity-50 bg-opacity-50 bg-black 
					backdrop-blur-sm md:hidden ${show ? "visible" : "invisible"}`}
      >
        <aside
          id="default-sidebar"
          className={`fixed bg-white top-0 left-0 z-[60] w-64 h-screen transition-transform  duration-300 ease-in-out ${
            show ? "sm:translate-x-0" : "-translate-x-full"
          }`}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto ">
            <ul className="space-y-4 font-medium">
              <li className="flex justify-between items-center">
                <Link to="/">
                  <img
                    src="/images/main-logo-black.png"
                    alt="Kin Pizza Logo"
                    className="sm:w-[70px] h-[60px] w-[70px] cursor-pointer"
                  />
                </Link>
                <div>
                  <AiOutlineClose
                    className="cursor-pointer "
                    size={24}
                    onClick={() => setShow(false)}
                  />
                </div>
              </li>
              {!Object.keys(info).length && (
                <li className="w-full">
                  <div className="font-medium text-gray-900 ml-3 whitespace-nowrap text-sm"
                    onClick={handleOpenModal}
                  >
                      <span className="link">{t("content.login")}</span>
                  </div>
                </li>
              )}
              <li className="w-full">
                <Link
                  className="font-medium text-gray-900 ml-3 whitespace-nowrap text-center text-sm"
                  to="/about-us"
                >
                  {t("content.about")}
                </Link>
              </li>
              <li className="w-full">
                <Link
                  className="font-medium text-gray-900 ml-3 whitespace-nowrap text-center text-sm"
                  to="/menu"
                >
                  {t("content.view-menu")}
                </Link>
              </li>
              <li className="w-full ">
                <Link
                  className="font-medium text-gray-900 ml-3 whitespace-nowrap text-center text-sm"
                  to="/tracking"
                >
                  {t("content.order_tracking")}
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
      <Auth onClose={handleCloseModal} visible={openModalAuth}/>
    </header>
  );
}
