'use client';

import { useEffect, useState } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
  const res = await fetch(`/api/products/${id}`, {
    method: 'DELETE',
  });
  const result = await res.json();
  console.log('Deleted:', result);
  fetchProducts();
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        price: Number(price),
        imageUrl,
      }),
    });
    setName('');
    setPrice('');
    setImageUrl('');
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛍️ Product List</h1>

      <form
        onSubmit={handleSubmit}
        className="mb-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3"
      >
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded py-2 px-4 sm:col-span-3 hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded shadow flex flex-col items-center"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                onError={(e) => (e.currentTarget.src = '/next.svg')}
                className="w-32 h-32 object-cover mb-2"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-600">₹{product.price}</p>
              <button
                onClick={() => handleDelete(product.id)}
                className="mt-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
