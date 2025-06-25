'use client';

import { useEffect, useState, useRef } from 'react';
import { FaTrash, FaUpload } from 'react-icons/fa';

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
  const [localImage, setLocalImage] = useState<File | null>(null);
  const [localImageUrl, setLocalImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

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
    await res.json();
    fetchProducts();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !imageUrl) return;

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
    setLocalImage(null);
    setLocalImageUrl(null);
    fetchProducts();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file.');
        return;
      }
      setLocalImage(file);
      setLocalImageUrl(URL.createObjectURL(file));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLocalImage(file);
      setLocalImageUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleRemoveImage = () => {
    setLocalImage(null);
    setLocalImageUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#faf9f6] font-sans">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight inline-block relative">
            Product Showcase
            <span className="block w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mx-auto mt-2"></span>
          </h1>
          <p className="mt-4 text-lg text-gray-500 font-light">
            Discover and manage your products with elegance.
          </p>
        </header>

        <div className="bg-white p-8 rounded-3xl shadow-xl mb-12 max-w-3xl mx-auto border border-yellow-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4 border-yellow-100">
            Add a New Product
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Product Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="e.g., Solitaire Ring"
                value={name}
                onInput={(e) => setName(e.currentTarget.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition bg-[#faf9f6] text-gray-900"
                required
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Price (₹)
              </label>
              <input
                id="price"
                type="number"
                placeholder="e.g., 29999"
                value={price}
                onInput={(e) => setPrice(e.currentTarget.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition bg-[#faf9f6] text-gray-900"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Image URL or Upload
              </label>
              <input
                id="imageUrl"
                type="text"
                placeholder="Paste image URL here..."
                value={imageUrl}
                onInput={(e) => setImageUrl(e.currentTarget.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition bg-[#faf9f6] mb-2 text-gray-900"
                disabled={!!localImage}
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <div
                className={`w-full flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 cursor-pointer transition bg-[#f8fafc] ${localImage ? 'border-yellow-400' : dragOver ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200'} hover:border-yellow-400 hover:bg-yellow-50`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
              >
                <FaUpload className="text-yellow-400 mb-2" size={28} />
                <span className="text-gray-500 text-sm mb-1">
                  Drag & drop an image here, or <span className="text-yellow-600 underline">click to select</span>
                </span>
                {localImage && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="mt-2 inline-flex items-center px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-semibold shadow-sm hover:bg-red-200 transition"
                  >
                    <FaTrash className="mr-1" size={12} /> Remove image
                  </button>
                )}
              </div>
              {(localImageUrl || imageUrl) && (
                <div className="mt-4 flex justify-center animate-fade-in">
                  <img
                    src={localImageUrl || imageUrl}
                    alt="Image Preview"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/next.svg';
                      e.currentTarget.style.background = '#f3f4f6';
                    }}
                    className="w-32 h-32 object-cover rounded-2xl border-2 border-yellow-200 shadow-lg transition-opacity duration-500 bg-white"
                  />
                </div>
              )}
            </div>
            <button
              type="submit"
              className="w-full md:col-span-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-bold py-3 px-4 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-md text-lg tracking-wide"
            >
              Add Product
            </button>
          </form>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-yellow-400"></div>
          </div>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl shadow-xl overflow-hidden group border border-yellow-100 relative transition-transform hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/next.svg';
                      e.currentTarget.style.background = '#f3f4f6';
                    }}
                    className="w-full h-72 object-cover bg-white border-b border-yellow-100"
                  />
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white rounded-full p-3 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300 z-10"
                    title="Delete Product"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
                <div className="p-6 text-center">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 truncate">
                    {product.name}
                  </h2>
                  <p className="text-xl font-semibold text-yellow-600">
                    ₹{product.price.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
