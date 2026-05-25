'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/authContext';
import { products as allProducts, categories } from '@/lib/products';
import { Product } from '@/lib/types';
import { Search, ArrowLeft, Star, CheckCircle, XCircle, Edit2 } from 'lucide-react';

export default function AdminProductsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [localProducts, setLocalProducts] = useState<Product[]>(allProducts);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) router.push('/account/login');
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== 'admin') return null;

  const filtered = localProducts.filter((p) => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCat = !category || p.categorySlug === category;
    return matchSearch && matchCat;
  });

  const handleSave = () => {
    if (!editProduct) return;
    setLocalProducts((prev) => prev.map((p) => (p.id === editProduct.id ? editProduct : p)));
    setEditProduct(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Link href="/admin" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6">
        <ArrowLeft className="w-4 h-4" /> Admin Dashboard
      </Link>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <span className="text-sm text-gray-500">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or SKU..."
            className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00a3e0]"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#00a3e0]"
        >
          <option value="">All Categories</option>
          {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-left">
                <th className="px-4 py-3 font-semibold text-gray-600">Product</th>
                <th className="px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">SKU</th>
                <th className="px-4 py-3 font-semibold text-gray-600">Price</th>
                <th className="px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Stock</th>
                <th className="px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Rating</th>
                <th className="px-4 py-3 font-semibold text-gray-600">Status</th>
                <th className="px-4 py-3 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center text-xl shrink-0">{p.image}</div>
                      <div>
                        <div className="font-medium text-gray-800">{p.name}</div>
                        <div className="text-xs text-gray-400">{p.category} · {p.size}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell font-mono text-xs text-gray-500">{p.sku}</td>
                  <td className="px-4 py-3 font-semibold text-gray-800">£{p.price.toFixed(2)}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className={`font-semibold ${p.stockCount < 30 ? 'text-red-600' : p.stockCount < 60 ? 'text-orange-500' : 'text-green-600'}`}>
                      {p.stockCount}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-xs font-medium text-gray-700">{p.rating}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {p.inStock
                      ? <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full"><CheckCircle className="w-3 h-3" /> In Stock</span>
                      : <span className="inline-flex items-center gap-1 text-xs text-red-700 bg-red-50 px-2 py-0.5 rounded-full"><XCircle className="w-3 h-3" /> Out of Stock</span>}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setEditProduct({ ...p })}
                      className="flex items-center gap-1 text-xs text-[#003d7a] hover:text-[#00a3e0] font-medium"
                    >
                      <Edit2 className="w-3.5 h-3.5" /> Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit modal */}
      {editProduct && (
        <>
          <div className="fixed inset-0 bg-black/40 z-50" onClick={() => setEditProduct(null)} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
              <h2 className="font-bold text-gray-900 text-lg mb-5">Edit Product: {editProduct.name}</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (£)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editProduct.price}
                    onChange={(e) => setEditProduct({ ...editProduct, price: parseFloat(e.target.value) })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a3e0]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Count</label>
                  <input
                    type="number"
                    value={editProduct.stockCount}
                    onChange={(e) => setEditProduct({ ...editProduct, stockCount: parseInt(e.target.value), inStock: parseInt(e.target.value) > 0 })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a3e0]"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={editProduct.featured}
                    onChange={(e) => setEditProduct({ ...editProduct, featured: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-[#003d7a]"
                  />
                  <label htmlFor="featured" className="text-sm font-medium text-gray-700">Featured product</label>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setEditProduct(null)}
                  className="flex-1 border border-gray-200 text-gray-700 font-medium py-2.5 rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 bg-[#003d7a] text-white font-bold py-2.5 rounded-xl hover:bg-[#00a3e0] transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
