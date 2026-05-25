'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/authContext';
import { useOrders } from '@/lib/ordersContext';
import { Package, ArrowLeft } from 'lucide-react';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

const statusIcons: Record<string, string> = {
  pending: '⏳',
  processing: '⚙️',
  shipped: '🚚',
  delivered: '✅',
  cancelled: '❌',
};

export default function OrdersPage() {
  const { user, isLoading } = useAuth();
  const { getOrdersByUser } = useOrders();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.push('/account/login');
  }, [user, isLoading, router]);

  if (isLoading || !user) return null;

  const orders = getOrdersByUser(user.id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Link href="/account" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Account
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
          <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <h3 className="font-semibold text-gray-600 mb-1">No orders yet</h3>
          <p className="text-sm text-gray-400 mb-5">Your orders will appear here after your first purchase.</p>
          <Link
            href="/products"
            className="bg-[#003d7a] text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-[#00a3e0] transition-colors text-sm"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl border border-gray-100 p-5">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-bold text-gray-800">{order.id}</span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusColors[order.status]}`}>
                      {statusIcons[order.status]} {order.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    Placed on {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-xl text-gray-900">£{order.total.toFixed(2)}</div>
                  <div className="text-xs text-gray-400">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</div>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-2 mb-4">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-t border-gray-50">
                    <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center text-xl shrink-0">
                      {item.product.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-800">{item.product.name}</div>
                      <div className="text-xs text-gray-400">{item.product.size} · Qty: {item.quantity}</div>
                    </div>
                    <div className="text-sm font-semibold text-gray-700 shrink-0">
                      £{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping */}
              <div className="bg-gray-50 rounded-xl p-3 text-sm text-gray-600">
                <span className="font-medium">Delivered to:</span> {order.shippingAddress.fullName}, {order.shippingAddress.address1}, {order.shippingAddress.city}, {order.shippingAddress.postcode}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
