'use client';

import Link from 'next/link';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/cartContext';
import { ShoppingCart, Star } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group flex flex-col overflow-hidden">
      {/* Image placeholder */}
      <Link href={`/products/${product.id}`} className="block">
        <div className="bg-gradient-to-br from-blue-50 to-sky-100 h-44 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-200">
          {product.image}
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        {/* Category badge */}
        <span className="text-xs text-[#00a3e0] font-medium mb-1">{product.category}</span>

        {/* Name */}
        <Link href={`/products/${product.id}`} className="font-semibold text-gray-900 hover:text-[#003d7a] transition-colors leading-snug mb-1">
          {product.name}
        </Link>

        {/* Description */}
        <p className="text-xs text-gray-500 line-clamp-2 mb-2 flex-1">{product.description}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[1,2,3,4,5].map((s) => (
              <Star
                key={s}
                className={`w-3 h-3 ${s <= Math.round(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400">({product.reviewCount})</span>
        </div>

        {/* Price row */}
        <div className="flex items-end justify-between gap-2 mt-auto">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-gray-900">£{product.price.toFixed(2)}</span>
              {product.comparePrice && (
                <span className="text-sm text-gray-400 line-through">£{product.comparePrice.toFixed(2)}</span>
              )}
            </div>
            <div className="text-xs text-gray-400">{product.size}</div>
          </div>

          {product.inStock ? (
            <button
              onClick={() => addItem(product)}
              className="flex items-center gap-1.5 bg-[#003d7a] text-white text-xs font-semibold px-3 py-2 rounded-xl hover:bg-[#00a3e0] transition-colors shrink-0"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              Add
            </button>
          ) : (
            <span className="text-xs text-red-500 font-medium">Out of stock</span>
          )}
        </div>
      </div>
    </div>
  );
}
