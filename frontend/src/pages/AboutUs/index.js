import React from "react";
import { useTranslation } from "react-i18next";
import { CiPizza } from "react-icons/ci";
import { BiLocationPlus } from "react-icons/bi";
import { WiTime8 } from "react-icons/wi";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { GiCardPickup } from "react-icons/gi";

const About = () => {
  const { t } = useTranslation();
  return (
    <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 bg-gray-100">
      <p className="font-normal text-sm leading-3 text-indigo-700 hover:text-indigo-800 cursor-pointer pb-2">
        {t("content.about")}
      </p>
      <div className="flex lg:flex-row flex-col lg:gap-8 sm:gap-10 gap-12">
        <div className="w-full lg:w-6/12">
          <h1 className="w-full font-bold lg:text-3xl text-2xl lg:leading-10 leading-9">
            {t("content.about-h1")}
          </h1>
          <p className="font-normal text-base leading-6 text-gray-600 mt-6">
            {t("content.about-h1-p")}
          </p>
        </div>
        <div className="w-full lg:w-6/12">
          <img
            className="lg:block hidden w-full"
            src="/images/static/about-1.jpg"
            alt="people discussing on board"
          />
        </div>
      </div>

      <div className="relative mt-24 sm:block hidden">
        <div className="grid sm:grid-cols-3 grid-cols-2 sm:gap-8 gap-4">
          <div className="z-20 w-12 h-12 bg-gray-800 rounded-full flex justify-center items-center">
            <CiPizza className="text-3xl text-white" />
          </div>

          <div className="z-20 w-12 h-12 bg-gray-800 rounded-full flex justify-center items-center">
            <BiLocationPlus className="text-3xl text-white" />
          </div>
          <div className="z-20 w-12 h-12 bg-gray-800 rounded-full flex justify-center items-center">
            <WiTime8 className="text-3xl text-white" />
          </div>
        </div>
        <hr className="z-10 absolute top-2/4 w-full bg-gray-200" />
      </div>
      <div className="relative sm:block hidden">
        <div className="grid sm:grid-cols-3 grid-cols-2 sm:gap-8 gap-4">
          <div>
            <p className="font-semibold lg:text-xl text-base lg:leading-6 leading-5 text-gray-800 mt-6">
              {t("content.pizza-count")}
            </p>
            <p className="font-normal text-base leading-6 text-gray-600 mt-6"></p>
          </div>
          <div>
            <p className="font-semibold lg:text-xl text-base lg:leading-6 leading-5 text-gray-800 mt-6">
              {t("content.address")}
            </p>
            <p className="font-normal text-base leading-6 text-gray-600 mt-6">
              {t("content.address-1")}
            </p>
          </div>
          <div className="sm:block hidden">
            <p className="font-semibold lg:text-xl text-base lg:leading-6 leading-5 text-gray-800 mt-6">
              {t("content.service-hours")}
            </p>
            <p className="font-normal text-base leading-6 text-gray-600 mt-6">
              10 AM - 10 PM
            </p>
          </div>
        </div>
      </div>

      <div className="flex lg:flex-row flex-col md:gap-14 gap-16 justify-between lg:mt-20 mt-16">
        <div className="w-full lg:w-6/12">
          <h2 className="font-bold lg:text-3xl text-2xl lg:leading-9 leading-7 text-gray-800">
            {t("content.about-h2")}
          </h2>
          <p className="font-normal text-base leading-6 text-gray-600 mt-6 w-full lg:w-10/12 xl:w-9/12">
            {t("content.about-h2-p-1")}
          </p>
          <p className="font-normal text-base leading-6 text-gray-600 w-full lg:w-10/12 xl:w-9/12 mt-10">
            {t("content.about-h2-p-2")}
          </p>
        </div>
        <div className="w-full lg:w-6/12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 lg:gap-12 gap-10">
            <div className="flex p-4 shadow-md">
              <div className="mr-6">
                <MdOutlineDeliveryDining className="text-3xl text-black" />
              </div>
              <div className="">
                <p className="font-semibold lg:text-xl text-base lg:leading-6 leading-5 text-gray-800">
                  {t("content.home-delivery")}
                </p>
                <p className="mt-2 font-normal text-base leading-6 text-gray-600">
                  From 10 AM to 8 PM
                </p>
              </div>
            </div>

            {/* <!-- Press Card --> */}
            <div className="flex p-4 shadow-md">
              <div className="mr-6">
                <GiCardPickup className="text-3xl text-black" />
              </div>
              <div className="">
                <p className="font-semibold lg:text-xl text-base lg:leading-6 leading-5 text-gray-800">
                  {t("content.takeaway")}
                </p>
                <p className="mt-2 font-normal text-base leading-6 text-gray-600">
                  From 10 AM to 10 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
