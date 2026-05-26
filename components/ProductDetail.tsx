'use client';

import Link from 'next/link';
import { Product } from '@/lib/types';
import { getProductsByCategory } from '@/lib/products';
import { useCart } from '@/lib/cartContext';
import ProductCard from '@/components/ProductCard';
import { ShoppingCart, Star, CheckCircle, ArrowLeft, Package, Truck, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';
import { trackViewItem } from '@/lib/analytics';

export default function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // GA4 view_item
  useEffect(() => {
    trackViewItem({ id: product.id, name: product.name, category: product.category, price: product.price, sku: product.sku });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  const related = getProductsByCategory(product.categorySlug)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleAdd = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const savings = product.comparePrice ? product.comparePrice - product.price : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-700">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-gray-700">Products</Link>
        <span>/</span>
        <Link href={`/products?category=${product.categorySlug}`} className="hover:text-gray-700">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Image */}
        <div className="bg-gradient-to-br from-blue-50 to-sky-100 rounded-3xl flex items-center justify-center h-72 lg:h-96 text-9xl">
          {product.image}
        </div>

        {/* Info */}
        <div>
          <div className="text-sm font-medium text-[#00a3e0] mb-1">{product.category}</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

          {/* SKU */}
          <div className="text-xs text-gray-400 mb-3">SKU: {product.sku} · Size: {product.size}</div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`} />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-700">{product.rating}</span>
            <span className="text-sm text-gray-400">({product.reviewCount} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-end gap-3 mb-1">
            <span className="text-4xl font-extrabold text-gray-900">£{product.price.toFixed(2)}</span>
            {product.comparePrice && (
              <span className="text-xl text-gray-400 line-through mb-1">£{product.comparePrice.toFixed(2)}</span>
            )}
          </div>
          {savings && (
            <div className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full mb-4">
              Save £{savings.toFixed(2)} ({Math.round((savings / product.comparePrice!) * 100)}% off)
            </div>
          )}

          {/* Description */}
          <p className="text-gray-600 mb-6 leading-relaxed">{product.longDescription}</p>

          {/* Certifications */}
          {product.certifications && (
            <div className="flex flex-wrap gap-2 mb-6">
              {product.certifications.map((cert) => (
                <span key={cert} className="bg-blue-50 text-[#003d7a] text-xs font-semibold px-2.5 py-1 rounded-lg border border-blue-100">
                  ✓ {cert}
                </span>
              ))}
            </div>
          )}

          {/* Stock */}
          <div className="flex items-center gap-2 mb-6">
            {product.inStock ? (
              <>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-700 font-medium">
                  In stock — {product.stockCount} available
                </span>
              </>
            ) : (
              <span className="text-sm text-red-600 font-medium">⚠ Out of stock</span>
            )}
          </div>

          {/* Qty + Add to cart */}
          {product.inStock && (
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2.5 text-gray-600 hover:bg-gray-50 transition-colors font-semibold"
                >
                  −
                </button>
                <span className="px-4 py-2.5 font-semibold text-gray-900 border-x border-gray-200">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2.5 text-gray-600 hover:bg-gray-50 transition-colors font-semibold"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAdd}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                  added
                    ? 'bg-green-500 text-white'
                    : 'bg-[#003d7a] text-white hover:bg-[#00a3e0]'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                {added ? '✓ Added to Cart!' : `Add ${quantity > 1 ? `${quantity}x ` : ''}to Cart`}
              </button>
            </div>
          )}

          {/* Perks */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100 mt-4">
            {[
              { icon: <Truck className="w-4 h-4 text-[#00a3e0]" />, label: 'Free over £75' },
              { icon: <Shield className="w-4 h-4 text-[#00a3e0]" />, label: 'EN certified' },
              { icon: <Package className="w-4 h-4 text-[#00a3e0]" />, label: 'UK manufactured' },
            ].map((perk, i) => (
              <div key={i} className="text-center">
                <div className="flex justify-center mb-1">{perk.icon}</div>
                <div className="text-xs text-gray-500">{perk.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="mb-12">
        <h3 className="text-sm font-semibold text-gray-500 mb-2">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-5">More in {product.category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Back link */}
      <div className="mt-10">
        <Link href="/products" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
          <ArrowLeft className="w-4 h-4" />
          Back to all products
        </Link>
      </div>
    </div>
  );
}
