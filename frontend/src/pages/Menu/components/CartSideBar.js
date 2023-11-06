import { useSelector } from "react-redux";
import CartDetailsSidebar from "../../../components/Cart/CartDetailsSidebar";
import CartHeading from "../../../components/Cart/CartHeading";
import CartSummary from "../../../components/Cart/CartSummary";
import { selectCartSummary } from "../../../redux/slice/cartSlice";
export default function CartSideBar() {
  const { products = [] } = useSelector((state) => state.cart);
  const summary = useSelector(selectCartSummary);

  return (
    <>
     
          <div className="text-center">
            <CartHeading amount={products.length} />
          </div>
          <CartDetailsSidebar data={products} />
          <div className="p-3 space-y-3 sticky bottom-0 bg-white">
            <CartSummary summary={summary} />
          </div>
        
    </>
  );
}
