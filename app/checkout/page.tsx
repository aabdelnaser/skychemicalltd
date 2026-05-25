'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/lib/cartContext';
import { useAuth } from '@/lib/authContext';
import { useOrders } from '@/lib/ordersContext';
import { ShippingAddress } from '@/lib/types';
import { ArrowLeft, ShieldCheck, Truck } from 'lucide-react';

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const { placeOrder } = useOrders();
  const router = useRouter();

  const shipping = subtotal >= 75 ? 0 : 5.99;
  const total = subtotal + shipping;

  const [form, setForm] = useState<ShippingAddress & { email: string; cardNumber: string; cardExpiry: string; cardCVC: string }>({
    fullName: user?.name || '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    county: '',
    postcode: '',
    phone: '',
    email: user?.email || '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  });

  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState<'details' | 'payment'>('details');

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="text-5xl mb-4">🛒</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Add some products before checking out.</p>
        <Link href="/products" className="bg-[#003d7a] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#00a3e0] transition-colors">
          Browse Products
        </Link>
      </div>
    );
  }

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.fullName.trim()) e.fullName = 'Required';
    if (!form.email.trim() || !form.email.includes('@')) e.email = 'Valid email required';
    if (!form.address1.trim()) e.address1 = 'Required';
    if (!form.city.trim()) e.city = 'Required';
    if (!form.postcode.trim()) e.postcode = 'Required';
    if (!form.phone.trim()) e.phone = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    const e: Partial<typeof form> = {};
    if (form.cardNumber.replace(/\s/g, '').length < 16) e.cardNumber = 'Enter valid card number';
    if (!form.cardExpiry.match(/^\d{2}\/\d{2}$/)) e.cardExpiry = 'Format: MM/YY';
    if (form.cardCVC.length < 3) e.cardCVC = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNextStep = () => {
    if (validate()) setStep('payment');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePayment()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200)); // simulate payment
    const order = placeOrder(
      user?.id || 'guest',
      items,
      { fullName: form.fullName, company: form.company, address1: form.address1, address2: form.address2, city: form.city, county: form.county, postcode: form.postcode, phone: form.phone },
      shipping
    );
    clearCart();
    router.push(`/order-confirmation?orderId=${order.id}`);
  };

  const field = (
    name: keyof typeof form,
    label: string,
    type = 'text',
    placeholder = '',
    maxLength?: number
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={form[name]}
        maxLength={maxLength}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        placeholder={placeholder}
        className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a3e0] transition ${
          errors[name] ? 'border-red-400 bg-red-50' : 'border-gray-200'
        }`}
      />
      {errors[name] && <p className="text-xs text-red-600 mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <Link href="/cart" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Cart
      </Link>

      <h1 className="text-2xl font-bold text-gray-900 mb-7">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 space-y-6">
          {/* Step indicator */}
          <div className="flex items-center gap-3 mb-2">
            {['Shipping Details', 'Payment'].map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  (i === 0 && step === 'details') || (i === 1 && step === 'payment')
                    ? 'bg-[#003d7a] text-white'
                    : i < (['details','payment'].indexOf(step))
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}>{i + 1}</div>
                <span className={`text-sm font-medium ${step === (['details','payment'][i]) ? 'text-gray-900' : 'text-gray-400'}`}>{s}</span>
                {i < 1 && <div className="w-8 h-px bg-gray-200 mx-1" />}
              </div>
            ))}
          </div>

          {step === 'details' && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
              <h2 className="font-semibold text-gray-900 mb-2">Shipping Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {field('fullName', 'Full Name *', 'text', 'Jane Smith')}
                {field('email', 'Email Address *', 'email', 'jane@example.com')}
              </div>
              {field('company', 'Company (optional)', 'text', 'Acme Ltd')}
              {field('address1', 'Address Line 1 *', 'text', '10 High Street')}
              {field('address2', 'Address Line 2', 'text', 'Suite 5')}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {field('city', 'Town / City *', 'text', 'Sheffield')}
                {field('county', 'County', 'text', 'South Yorkshire')}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {field('postcode', 'Postcode *', 'text', 'S1 1AA')}
                {field('phone', 'Phone Number *', 'tel', '07700 900000')}
              </div>
              <button
                type="button"
                onClick={handleNextStep}
                className="w-full bg-[#003d7a] text-white font-bold py-3 rounded-xl hover:bg-[#00a3e0] transition-colors mt-2"
              >
                Continue to Payment →
              </button>
            </div>
          )}

          {step === 'payment' && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold text-gray-900">Payment Details</h2>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-500" /> Secure checkout
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-800 font-medium">
                🧪 Demo mode — use any card details. No real payment will be taken.
              </div>

              {field('cardNumber', 'Card Number', 'text', '4242 4242 4242 4242', 19)}
              <div className="grid grid-cols-2 gap-4">
                {field('cardExpiry', 'Expiry Date', 'text', 'MM/YY', 5)}
                {field('cardCVC', 'CVC', 'text', '123', 4)}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="flex-1 border border-gray-200 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-[#003d7a] text-white font-bold py-3 rounded-xl hover:bg-[#00a3e0] transition-colors disabled:opacity-60"
                >
                  {submitting ? 'Processing...' : `Pay £${total.toFixed(2)}`}
                </button>
              </div>
            </div>
          )}
        </form>

        {/* Order summary */}
        <div className="lg:w-80 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
            <h2 className="font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center text-xl shrink-0">
                    {item.product.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-800 truncate">{item.product.name}</div>
                    <div className="text-xs text-gray-400">Qty: {item.quantity}</div>
                  </div>
                  <div className="text-sm font-semibold shrink-0">£{(item.product.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span><span>£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                {shipping === 0
                  ? <span className="text-green-600 font-medium">Free</span>
                  : <span>£{shipping.toFixed(2)}</span>}
              </div>
              <div className="flex justify-between font-bold text-base text-gray-900 pt-2 border-t border-gray-100">
                <span>Total</span><span>£{total.toFixed(2)}</span>
              </div>
            </div>
            {shipping > 0 && (
              <div className="flex items-center gap-1.5 mt-3 text-xs text-gray-500">
                <Truck className="w-3.5 h-3.5 text-[#00a3e0]" />
                Add £{(75 - subtotal).toFixed(2)} more for free delivery
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
