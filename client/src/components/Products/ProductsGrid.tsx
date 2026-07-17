import type { FC } from "react";
import type { Product } from "../../types";
import ProductCard from "../ProductCard";

interface Props {
  products: Product[];
}

const ProductsGrid: FC<Props> = ({ products }) => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductsGrid;
