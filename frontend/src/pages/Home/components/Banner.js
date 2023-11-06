import React, { useRef } from "react";
// import Swiper core and required modules
import { Navigation, Pagination,Autoplay  } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
export default function Banner() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination,Autoplay ]}
        className="md:h-[32rem] lg:h-[40rem] xl:h-[48rem] sm:h-[24rem] xs:h-56 relative"
        slidesPerView={1}
        shortSwipes={true}

        loop={true}
        autoplay={{
            delay: 3000,
            disableOnInteraction: false
        }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          {" "}
          <div className="w-full h-full" data-carousel-item>
            <img
              src="/images/banner1.png"
              className=" w-full h-full"
              alt="..."
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="w-full h-full" data-carousel-item>
            <img
              src="/images/banner2.png"
              className=" w-full h-full"
              alt="..."
            />
          </div>
        </SwiperSlide>
        <button
          ref={prevRef}
          type="button"
          className="hidden sm:flex absolute top-0 left-0 z-30  items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          ref={nextRef}
          type="button"
          className="hidden sm:flex absolute top-0 right-0 z-30  items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </Swiper>
    </>
  );
}
