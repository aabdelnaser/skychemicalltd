'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/authContext';
import { useOrders } from '@/lib/ordersContext';
import { products } from '@/lib/products';
import { Package, ShoppingBag, DollarSign, Users, TrendingUp, ArrowRight } from 'lucide-react';

export default function AdminDashboard() {
  const { user, isLoading } = useAuth();
  const { getAllOrders } = useOrders();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      router.push('/account/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== 'admin') return null;

  const orders = getAllOrders();
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const pendingOrders = orders.filter((o) => o.status === 'pending' || o.status === 'processing');
  const lowStock = products.filter((p) => p.stockCount < 50 && p.inStock);

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    processing: 'bg-blue-100 text-blue-700',
    shipped: 'bg-purple-100 text-purple-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back, {user.name}</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: <DollarSign className="w-6 h-6" />, label: 'Total Revenue', value: `£${totalRevenue.toFixed(2)}`, color: 'text-green-600', bg: 'bg-green-50' },
          { icon: <Package className="w-6 h-6" />, label: 'Total Orders', value: orders.length.toString(), color: 'text-blue-600', bg: 'bg-blue-50' },
          { icon: <ShoppingBag className="w-6 h-6" />, label: 'Products', value: products.length.toString(), color: 'text-purple-600', bg: 'bg-purple-50' },
          { icon: <TrendingUp className="w-6 h-6" />, label: 'Pending Orders', value: pendingOrders.length.toString(), color: 'text-orange-600', bg: 'bg-orange-50' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className={`${kpi.bg} ${kpi.color} w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>
              {kpi.icon}
            </div>
            <div className="text-2xl font-extrabold text-gray-900">{kpi.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{kpi.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm text-[#00a3e0] hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="space-y-2">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                <div>
                  <div className="font-mono text-sm font-semibold text-gray-800">{order.id}</div>
                  <div className="text-xs text-gray-400">{order.shippingAddress.fullName} · {new Date(order.createdAt).toLocaleDateString('en-GB')}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                  <span className="font-bold text-sm text-gray-800">£{order.total.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low stock alert */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">Low Stock Alert</h2>
            <Link href="/admin/products" className="text-sm text-[#00a3e0] hover:underline">Manage</Link>
          </div>
          <div className="space-y-3">
            {lowStock.slice(0, 6).map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-lg shrink-0">{p.image}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-800 truncate">{p.name}</div>
                  <div className={`text-xs font-semibold ${p.stockCount < 30 ? 'text-red-600' : 'text-orange-600'}`}>
                    {p.stockCount} left
                  </div>
                </div>
              </div>
            ))}
            {lowStock.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">All products well stocked ✓</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick nav */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {[
          { href: '/admin/products', icon: '📦', title: 'Manage Products', desc: `${products.length} products in catalogue` },
          { href: '/admin/orders', icon: '📋', title: 'Manage Orders', desc: `${orders.length} total orders` },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-[#00a3e0] hover:shadow-md transition-all group flex items-center gap-4"
          >
            <div className="text-3xl">{item.icon}</div>
            <div>
              <div className="font-semibold text-gray-800 group-hover:text-[#003d7a]">{item.title}</div>
              <div className="text-sm text-gray-400">{item.desc}</div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#00a3e0] ml-auto" />
          </Link>
        ))}
      </div>
    </div>
  );
}
