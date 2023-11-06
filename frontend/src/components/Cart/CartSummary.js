import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/string";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ImSpinner3 } from "react-icons/im";

export default function CartSummary({
  summary = {},
  shipping = 0,
  isCheckout = false,
  loading = false,
}) {
  const { t } = useTranslation();
  const { products = [] } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const handleClick = () => {
    if (products?.length) {
      navigate("/checkout");
    } else {
      toast.error(t("content.cart-empty"));
    }
  };
  return (
    <>
      <div className="space-y-2 font-bold text-base">
        <div className="flex">
          <div className="w-1/2">{t("content.subtotal")}:</div>
          <div className="w-1/2 text-right font-sans">
            {formatCurrency(summary.totalPrice)}
          </div>
        </div>
        <div className="flex">
          <div className="w-1/2">{t("content.discount")}:</div>
          <div className="w-1/2 text-right text-dark-red font-sans">
            {formatCurrency(summary.promotion)}
          </div>
        </div>
        <div className="flex">
          <div className="w-1/2">{t("content.shipping")}:</div>
          <div className="w-1/2 text-right text-dark-red font-sans">
            {formatCurrency(shipping)}
          </div>
        </div>
        <div className="flex">
          <div className="w-1/2">{t("content.total")}:</div>
          <div className="w-1/2 text-right text-dark-red font-sans">
            {formatCurrency(summary.totalPrice - summary.promotion + shipping)}
          </div>
        </div>
      </div>
      <button
        className="p-3 text-black uppercase font-bold text-sm w-full bg-light-green rounded-md flex justify-center"
        onClick={isCheckout ? null : handleClick}
        type={isCheckout ? "submit" : "button"}
        disabled={loading}
      >
        {loading ? (
            <ImSpinner3 size={24}  className="animate-spin"/>
        ) : isCheckout ? (
          t("content.order")
        ) : (
          t("content.payment")
        )}
      </button>
    </>
  );
}
