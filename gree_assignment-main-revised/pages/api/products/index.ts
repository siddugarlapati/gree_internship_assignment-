import type { NextApiRequest, NextApiResponse } from 'next';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

declare global {
  var products: Product[] | undefined;
}

globalThis.products = globalThis.products || [
  {
    id: 1,
    name: 'Sample Product 1',
    price: 1999,
    imageUrl: '/next.svg',
  },
  {
    id: 2,
    name: 'Sample Product 2',
    price: 2999,
    imageUrl: '/vercel.svg',
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const products = globalThis.products!;

  if (req.method === 'GET') {
    res.status(200).json(products);
  } else if (req.method === 'POST') {
    const { name, price, imageUrl } = req.body;
    if (!name || !price || !imageUrl) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newProduct: Product = {
      id: Date.now(),
      name,
      price,
      imageUrl,
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
