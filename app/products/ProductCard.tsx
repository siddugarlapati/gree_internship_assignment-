import React from "react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category?: string;
  description?: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <Link href={`/products/${product.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-contain bg-gray-100 p-4"
        />
        <div className="p-4 flex-1 flex flex-col justify-between">
          <h2 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h2>
          <div className="mt-auto">
            <span className="text-xl font-bold text-blue-600">${product.price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard; 