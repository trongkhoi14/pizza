import CartHeading from "../../components/Cart/CartHeading";

import CartDetailsPage from "../../components/Cart/CartDetailsPage";
import CartSummary from "../../components/Cart/CartSummary";
import { useSelector } from "react-redux";
import { selectCartSummary } from "../../redux/slice/cartSlice";
import { useEffect } from "react";

export default function Cart() {
  const { products } = useSelector((state) => state.cart);
  const summary = useSelector(selectCartSummary);
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  },[])
  return (
    <>
     
    <div className="2xl:container 2xl:mx-auto h-[calc(100vh-80px)] lg:h-auto bg-gray-100">
      <div className="flex flex-col h-full lg:px-20 md:px-6 px-4 py-6">
        <div className="text-xl md:text-xl text-left">
          <CartHeading amount={products.length} />
        </div>
        <CartDetailsPage data={products} />
        <div className="flex justify-end sticky md:static pt-4 bottom-0 bg-gray-100">
          <div className="lg:max-w-md w-full space-y-2 text-base md:text-lg">
            <CartSummary summary={summary} />
          </div>
        </div>
      </div>
    </div>
    
    </>
  );
}
