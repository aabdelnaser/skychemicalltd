import { notFound } from 'next/navigation';
import { products, getProductById } from '@/lib/products';
import ProductDetail from '@/components/ProductDetail';

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  return <ProductDetail product={product} />;
}
