
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import cartSlice from "../../redux/slice/cartSlice";
import { formatCurrency } from "../../utils/string";
import InputCounter from "../FormFields/InputCounter";
import { calculateSalePrice } from "../../utils/Utils";
import { BASE_URL } from "../../utils/constant";

export default function CartDetailsPage({ data }) {
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.user);
  const { t } = useTranslation();
  const handleQuantityChange = (product, index) => (value) => {
    const productDetail = {
      ...product,
      quantity: value,
    };
    dispatch(cartSlice.actions.updateFromCart({index,item: productDetail}));
  };
  const handleRemoveFromCartClick = (product, index) => {
    dispatch(cartSlice.actions.removeFromCart(index));
  };
  return (
    <div className="flex-1 h-full overflow-y-auto divide-y-2 border-t-2 border-b-2">
      {data.map((item, index) => (
        <div className="py-4 px-4" key={index}>
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-7/12 flex">
              <div className="max-w-[6rem] md:max-w-[8rem] lg:max-w-[10rem] rounded-xl mr-4 md:mr-6 shrink-0">
                <div className="w-full h-auto rounded-xl overflow-hidden flex items-center justify-center">
                  <img src={BASE_URL + item.image} alt={item.title} />
                </div>
              </div>
              <div className="flex-1 space-y-2.5">
                <div className="flex text-sm font-semibold">
                  <div className="flex-1 mr-3 text-base  capitalize">
                    {item.title}
                  </div>
                </div>

                {item.size?.title && (
                  <div className="pace-y-0.5 text-sm text-gray-400">
                    <div>
                      <span className="font-semibold mr-2 ">Size:</span>
                      <span className="capitalize">{item.size.title}</span>
                    </div>
                  </div>
                )}

                <div className="flex text-sm md:text-base cursor-pointer text-red-600 font-semibold items-center">
                  <span onClick={() => handleRemoveFromCartClick(item, index)}>
                    {t("content.remove")}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full mt-4 lg:mt-0 lg:w-5/12 flex items-center">
              <div className="">
                <InputCounter
                  value={item.quantity}
                  onChange={handleQuantityChange(item, index)}
                />
              </div>
              <div className="text-base md:text-md lg:text-xl ml-auto font-bold text-black font-sans space-x-3 ">
                {!!item.salePercent && (
                  <span className="text-xs line-through text-gray-500">
                    {formatCurrency(item.price)}
                  </span>
                )}
                <span className="text-base font-semibold">
                  {formatCurrency(
                    item.salePercent
                      ? calculateSalePrice(item.price, item.salePercent)
                      : item.price
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
