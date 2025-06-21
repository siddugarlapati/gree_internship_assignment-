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

globalThis.products = globalThis.products || [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const productId = parseInt(req.query.id as string, 10);
  const products = globalThis.products!;

  if (req.method === 'DELETE') {
    const index = products.findIndex((p) => p.id === productId);
    if (index === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }

    products.splice(index, 1); 
    return res.status(200).json({ message: `Deleted product ${productId}` });
  }

  res.setHeader('Allow', ['DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
