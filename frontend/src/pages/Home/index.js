import React, { useEffect, useState } from "react";
import Banner from "./components/Banner";
import { Scrollbar } from "swiper";
import Container from "../../components/Container";
import ProductCard from "../Menu/components/ProductCard";
import axiosClient from "../../api/axiosClient";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function Home() {
  const [products, setProducts] = useState([]);
  const {t} = useTranslation();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosClient.get("api/v1/product");
        setProducts(data);
      } catch (error) {}
    })();
  }, []);
  return (
    <div className="bg-gray-100">
      {/* <Banner /> */}

      <Container className=" flex flex-col p-2">
        <h3
          className="
            text-xl text-center text-secondary font-bold w-full "
        >
          {t('content.best-seller')}
        </h3>

        <Swiper
          modules={[Scrollbar]}
          scrollbar={{ draggable: true }}
          slidesPerView={5}
          className=" w-full mt-3 !px-2 !sm:px-0 !pb-5"
          breakpoints={{
            160: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
          }}
        >
          {products.map((item) => {
            return (
              <SwiperSlide key={item._id} className="!h-auto">
                <ProductCard product={item} className={"!h-full"} />
              </SwiperSlide>
            );
          })}
        </Swiper>

        <Link
          to="/menu"
          className="self-center text-center  w-auto my-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  focus:outline-none "
        >
          {t('content.view-menu')}
        </Link>
      </Container>
    </div>
  );
}
