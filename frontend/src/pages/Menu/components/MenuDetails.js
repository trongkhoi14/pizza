import CardSkeleton from "../../../components/CardSkeleton";
import ProductCard from "./ProductCard";

export default function MenuDetails({ products, loading = false }) {
  return (
    <div className="p-3 ">
      <div className="flex flex-wrap">
        {loading
          ? new Array(9).fill(0).map((_,i) => {
              return (
                <div key={i} className="p-1.5 w-1/2 md:w-1/3 lg:w-1/4">
                  <CardSkeleton />
                </div>
              );
            })
          : products.map((item) => (
              <div className="p-1.5 xxs:w-1/2 md:w-1/3 lg:w-1/4 3xs:w-full  flex" key={item._id}>
                <ProductCard product={item} />
              </div>
            ))}
      </div>
    </div>
  );
}
