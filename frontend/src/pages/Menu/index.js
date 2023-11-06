import { useEffect, useRef, useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import CartSideBar from "./components/CartSideBar";
import MenuDetails from "./components/MenuDetails";
import MenuTabs from "./components/MenuTab";

export default function Menu() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef();
  const [visibleBtn, setVisibleBtn] = useState(false);
  const toggleVisible = () => {
    const scrolled = ref.current.scrollTop;
    const scrolled2 = document.documentElement.scrollTop;
    if (
      scrolled >= ref.current.scrollHeight / 4 ||
      scrolled2 >= document.documentElement.scrollHeight / 4
    ) {
      setVisibleBtn(true);
    } else {
      setVisibleBtn(false);
    }
  };

  const scrollToTop = () => {
    ref.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axiosClient.get("api/v1/product-category");
        setCategoryList(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();
    if (!category) {
      navigate("/menu/pizza", { replace: true });
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (category) {
          setLoading(true);
          const { data } = await axiosClient.get(
            `api/v1/product/category?category=${category}`
          );
          setProductList(data);
          setLoading(false);
        }
      } catch (error) {
        navigate("/not-found", { replace: true });
        setLoading(false);
      }
    })();
  }, [categoryList, category]);

  useEffect(() => {
    ref.current.addEventListener("scroll", toggleVisible);
    window.addEventListener("scroll", toggleVisible);
    scrollToTop();

    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, [ref.current]);
  return (
    <>
      <div className="flex lg:h-[calc(100vh-80px)] ">
        <div className="w-full xl:w-9/12 bg-gray-100 relative">
          <div className="overflow-auto h-full" ref={ref}>
            <MenuTabs
              loading={loading}
              categories={categoryList}
              categorySelected={category}
            />
            <MenuDetails loading={loading} products={productList} />
          </div>
          {visibleBtn && (
            <button
              className="w-12 h-12 rounded-full bg-white text-sky-500 drop-shadow  absolute  animate-bounce right-0 mr-3 mb-3 bottom-0 flex items-center justify-center"
              onClick={scrollToTop}
            >
              <AiOutlineArrowUp size={24} />
            </button>
          )}
        </div>
        <div className="hidden xl:flex flex-col bg-white xl:w-3/12 shrink-[0]">
          <CartSideBar />
        </div>
      </div>
    </>
  );
}
