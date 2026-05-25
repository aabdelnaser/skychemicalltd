'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/authContext';
import { useOrders } from '@/lib/ordersContext';
import { User, Package, LogOut, ShoppingBag, LayoutDashboard, Calendar } from 'lucide-react';

export default function AccountPage() {
  const { user, logout, isLoading } = useAuth();
  const { getOrdersByUser } = useOrders();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.push('/account/login');
  }, [user, isLoading, router]);

  if (isLoading || !user) return null;

  const orders = getOrdersByUser(user.id);
  const recentOrders = orders.slice(0, 3);

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    processing: 'bg-blue-100 text-blue-700',
    shipped: 'bg-purple-100 text-purple-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {/* Profile card */}
        <div className="md:col-span-1 bg-white rounded-2xl border border-gray-100 p-6">
          <div className="w-16 h-16 bg-[#003d7a] rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-4">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h2 className="font-bold text-gray-900 text-lg">{user.name}</h2>
          <p className="text-sm text-gray-500 mb-1">{user.email}</p>
          {user.role === 'admin' && (
            <span className="inline-block bg-[#003d7a] text-white text-xs px-2.5 py-0.5 rounded-full font-medium">Admin</span>
          )}
          <div className="mt-4 text-xs text-gray-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            Member since {new Date(user.createdAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
          </div>
        </div>

        {/* Quick links */}
        <div className="md:col-span-2 grid grid-cols-2 gap-3">
          {[
            { href: '/products', icon: <ShoppingBag className="w-6 h-6" />, label: 'Browse Products', desc: 'Shop our full range' },
            { href: '/account/orders', icon: <Package className="w-6 h-6" />, label: 'My Orders', desc: `${orders.length} order${orders.length !== 1 ? 's' : ''}` },
            ...(user.role === 'admin' ? [{ href: '/admin', icon: <LayoutDashboard className="w-6 h-6" />, label: 'Admin Dashboard', desc: 'Manage products & orders' }] : []),
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-[#00a3e0] hover:shadow-md transition-all group"
            >
              <div className="text-[#003d7a] group-hover:text-[#00a3e0] transition-colors mb-2">{item.icon}</div>
              <div className="font-semibold text-gray-800 text-sm">{item.label}</div>
              <div className="text-xs text-gray-400 mt-0.5">{item.desc}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900">Recent Orders</h2>
          <Link href="/account/orders" className="text-sm text-[#00a3e0] hover:underline">View all</Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Package className="w-10 h-10 mx-auto mb-2 opacity-40" />
            <p className="text-sm">No orders yet</p>
            <Link href="/products" className="text-sm text-[#00a3e0] hover:underline mt-1 block">Start shopping</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                <div>
                  <div className="font-mono text-sm font-semibold text-gray-800">{order.id}</div>
                  <div className="text-xs text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString('en-GB')} · {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                  <span className="font-bold text-gray-800 text-sm">£{order.total.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sign out */}
      <div className="mt-5 text-right">
        <button
          onClick={() => { logout(); router.push('/'); }}
          className="inline-flex items-center gap-2 text-sm text-red-500 hover:text-red-700 font-medium"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </div>
  );
}
