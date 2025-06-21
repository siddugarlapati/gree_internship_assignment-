import React from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category?: string;
  description?: string;
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/products`);
    if (!res.ok) return null;
    const products: Product[] = await res.json();
    return products.find((p) => p.id === Number(id)) || null;
  } catch {
    return null;
  }
}

const ProductDetailPage = async ({ params }: { params: { id: string } }) => {
  const product = await getProduct(params.id);

  if (!product) {
    return <div className="p-8 text-center text-red-500">Product not found.</div>;
  }

  return (
    <main className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-64 h-64 object-contain bg-gray-100 mb-6"
        />
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <div className="text-xl text-blue-600 font-semibold mb-2">${product.price}</div>
        {product.category && <div className="mb-2 text-gray-500">Category: {product.category}</div>}
        {product.description && <div className="mb-2 text-gray-700">{product.description}</div>}
      </div>
    </main>
  );
};

export default ProductDetailPage; 