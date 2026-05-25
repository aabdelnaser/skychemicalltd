'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { Suspense } from 'react';

function ConfirmationContent() {
  const params = useSearchParams();
  const orderId = params.get('orderId') || 'ORD-UNKNOWN';

  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <div className="flex justify-center mb-5">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
      </div>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Order Confirmed!</h1>
      <p className="text-gray-500 mb-1">Thank you for your order.</p>
      <div className="inline-block bg-gray-100 rounded-xl px-5 py-2 my-5 font-mono text-[#003d7a] font-bold text-lg">
        {orderId}
      </div>
      <p className="text-sm text-gray-500 mb-8">
        You will receive an email confirmation shortly. Your order will be dispatched within 1–2 business days.
      </p>

      <div className="bg-blue-50 rounded-2xl p-5 mb-8 text-left space-y-3">
        {[
          { icon: '📦', text: 'Picking and packing in Sheffield' },
          { icon: '🚚', text: 'UK-wide delivery in 1–3 working days' },
          { icon: '📱', text: 'Tracking info sent by email' },
        ].map((item) => (
          <div key={item.icon} className="flex items-center gap-3 text-sm text-gray-700">
            <span className="text-xl">{item.icon}</span>
            {item.text}
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/account/orders"
          className="flex items-center justify-center gap-2 bg-[#003d7a] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#00a3e0] transition-colors"
        >
          <Package className="w-4 h-4" />
          View My Orders
        </Link>
        <Link
          href="/products"
          className="flex items-center justify-center gap-2 border border-gray-200 text-gray-700 font-medium px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors"
        >
          Continue Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
