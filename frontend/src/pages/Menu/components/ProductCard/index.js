import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputCounter from "../../../../components/FormFields/InputCounter";
import Select from "../../../../components/FormFields/Select";
import { formatCurrency } from "../../../../utils/string";

import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Modal from "../../../../components/Modal";
import cartSlice from "../../../../redux/slice/cartSlice";
import { calculateSalePrice } from "../../../../utils/Utils";
import BtnCancel from "../../../../components/FormFields/BtnCancel";
import { BASE_URL } from "../../../../utils/constant";

export default function ProductCard({ product, className }) {
  const { t } = useTranslation();
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [isClamped, setClamped] = useState(false);
  const contentRef = useRef(null);
  const {
    user: { info },
    cart: { products },
  } = useSelector((state) => state);
  const [productOptions, setProductOptions] = useState({
    indexOption: 0,
    quantity: 1,
  });

  const dispatch = useDispatch();

  const handleOptionsSelectChange = (option) => (newValue) => {
    setProductOptions({ ...productOptions, indexOption: newValue });
  };

  const handleQuantityChange = (value) => {
    setProductOptions({ ...productOptions, quantity: value });
  };

  const handleSelectProduct = () => {
    const productDetail = {
      ...product,
      price: optionSizeList.length
        ? optionSizeList[productOptions.indexOption].price
        : product.price,
      size: optionSizeList[productOptions.indexOption],
      quantity: productOptions.quantity,
    };

    delete productDetail.sizes;

    dispatch(cartSlice.actions.addToCart(productDetail));
    setProductOptions({ ...productOptions, quantity: 1 });
    toast.success(t("content.add-to-cart"));
  };

  useEffect(() => {
    function handleResize() {
      if (contentRef && contentRef.current) {
        setClamped(
          contentRef.current.scrollHeight > contentRef.current.clientHeight ||
            contentRef.current.scrollWidth > contentRef.current.clientWidth
        );
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const optionSizeList = useMemo(() => {
    if (!product.sizes.length) {
      return [];
    }
    return [
      ...product.sizes.map((s) => {
        return {
          salePercent: product.salePercent,
          price: s.price,
          ...s.size,
          priceDiscount: product.salePercent
            ? calculateSalePrice(s.price, product.salePercent)
            : null,
        };
      }),
    ];
  }, [product]);

  const price = !optionSizeList.length
    ? product.price * productOptions.quantity
    : optionSizeList[productOptions.indexOption].price *
      productOptions.quantity;

  const priceDiscount = !optionSizeList.length
    ? product.salePercent !== 0
      ? calculateSalePrice(product.price, product.salePercent) *
        productOptions.quantity
      : null
    : optionSizeList[productOptions.indexOption].priceDiscount *
        productOptions.quantity || null;
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <div className={"shadow-md rounded-xl  bg-white w-full flex flex-col "+className}>
        <div className="rounded-t-xl overflow-hidden group sm:h-52 h-36 w-full">
          <img
            src={BASE_URL + product.image}
            alt={product.title}
            className="rounded-t-md group-hover:scale-125 duration-500 object-cover object-center 	 w-full h-full"
          />
        </div>
        <div className="flex flex-col grow p-3 rounded-b-xl overflow-hidden">
          <div className="mb-3">
            <h3 className="text-base leading-snug font-bold capitalize line-clamp-2">
              {product.title}
            </h3>
          </div>
          {product.description ? (
            <div
              className="h-10 text-sm text-gray-500 line-clamp-2 mb-3"
              ref={contentRef}
            >
              <p>{product.description}</p>
              {isClamped ? (
                <span
                  className="sticky left-full bottom-0 bg-white pl-1 text-blue-500 cursor-pointer font-bold text-xs"
                  onClick={() => setShowDescriptionModal(true)}
                >
                  ... {t("content.show-more")}
                </span>
              ) : null}
            </div>
          ) : null}

          <div className="flex flex-col mt-auto space-y-2">
            {optionSizeList.length > 0 ? (
              <Select
                name={"size"}
                value={productOptions.size}
                label={t("content.size")}
                options={optionSizeList}
                onChange={handleOptionsSelectChange("size")}
              />
            ) : null}
            <InputCounter
              name={"quantity"}
              min={1}
              onChange={handleQuantityChange}
              value={productOptions.quantity}
            />

            <div className="flex items-center text-base mt-2">
              <p className="hidden sm:flex flex-1 flex-col text-lg font-bold">
                {priceDiscount && (
                  <span className="text-xs line-through text-gray-400">
                    {formatCurrency(price)}
                  </span>
                )}
                <span className="text-base">
                  {formatCurrency(priceDiscount ? priceDiscount : price)}
                </span>
              </p>
              <button
                onClick={handleSelectProduct}
                className="min-w-full sm:min-w-[8rem] rounded-full bg-light-green text-black font-semibold p-3 text-sm hover:opacity-80 transition"
              >
                <span className="hidden sm:inline-block">
                  {t("content.select")}
                </span>
                <div className="flex items-center sm:hidden">
                  {priceDiscount && (
                    <span className="text-xs font-semibold text-gray-500 line-through mr-auto">
                      {formatCurrency(price)}
                    </span>
                  )}
                  <span className="text-xs font-bold grow">
                    {formatCurrency(priceDiscount ? priceDiscount : price)}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        visible={showDescriptionModal}
        onClose={() => {
          setShowDescriptionModal(false);
        }}
      >
        <div className="divide-y-2 px-3">
          <div className="py-2 text-lg capitalize font-semibold">
            {product.title}
          </div>
          <div className="py-2 text-base">{product.description}</div>
        </div>
        <BtnCancel
          onClick={() => {
            setShowDescriptionModal(false);
          }}
        >
          {t("content.close")}
        </BtnCancel>
      </Modal>
    </>
  );
}
