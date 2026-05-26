'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/authContext';
import { useOrders } from '@/lib/ordersContext';
import { products } from '@/lib/products';
import {
  Users, Eye, MousePointerClick, ShoppingCart, CreditCard,
  TrendingUp, BarChart2, Laptop, Smartphone, Tablet,
  RefreshCw, ExternalLink, AlertCircle, DollarSign,
  Package, ArrowRight, Search,
} from 'lucide-react';

interface AnalyticsData {
  overview: {
    sessions: number;
    users: number;
    pageViews: number;
    bounceRate: number;
    avgSessionDuration: number;
  };
  topPages: { path: string; views: number; users: number }[];
  conversions: {
    viewItem: number;
    addToCart: number;
    beginCheckout: number;
    purchase: number;
    generateLead: number;
  };
  devices: { device: string; sessions: number }[];
}

function fmt(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n.toString();
}
function duration(secs: number) {
  const m = Math.floor(secs / 60);
  const s = Math.round(secs % 60);
  return `${m}m ${s}s`;
}
function pct(a: number, b: number) {
  if (!b) return '—';
  return `${((a / b) * 100).toFixed(1)}%`;
}

const DEVICE_ICONS: Record<string, React.ReactNode> = {
  desktop: <Laptop className="w-4 h-4" />,
  mobile:  <Smartphone className="w-4 h-4" />,
  tablet:  <Tablet className="w-4 h-4" />,
};

const statusColors: Record<string, string> = {
  pending:    'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped:    'bg-purple-100 text-purple-700',
  delivered:  'bg-green-100 text-green-700',
  cancelled:  'bg-red-100 text-red-700',
};

export default function AdminDashboard() {
  const { user, isLoading } = useAuth();
  const { getAllOrders } = useOrders();
  const router = useRouter();

  const [data, setData] = useState<AnalyticsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      router.push('/account/login');
    }
  }, [user, isLoading, router]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/analytics');
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Failed to load analytics');
      setData(json);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (isLoading || !user || user.role !== 'admin') return null;

  const orders = getAllOrders();
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const pendingOrders = orders.filter((o) => o.status === 'pending' || o.status === 'processing');
  const lowStock = products.filter((p) => p.stockCount < 50 && p.inStock);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-400 mt-0.5">Welcome back, {user.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchData}
            disabled={loading}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <a
            href="https://analytics.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white bg-[#003d7a] rounded-lg px-3 py-2 hover:bg-[#00a3e0] transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Open GA4
          </a>
        </div>
      </div>

      {/* ── Store KPIs ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { icon: <DollarSign className="w-5 h-5" />, label: 'Total Revenue',   value: `£${totalRevenue.toFixed(2)}`, color: 'text-green-600',  bg: 'bg-green-50'  },
          { icon: <Package     className="w-5 h-5" />, label: 'Total Orders',    value: orders.length.toString(),      color: 'text-blue-600',   bg: 'bg-blue-50'   },
          { icon: <ShoppingCart className="w-5 h-5"/>, label: 'Products',        value: products.length.toString(),    color: 'text-purple-600', bg: 'bg-purple-50' },
          { icon: <TrendingUp  className="w-5 h-5" />, label: 'Pending Orders',  value: pendingOrders.length.toString(),color: 'text-orange-600', bg: 'bg-orange-50' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className={`${kpi.bg} ${kpi.color} w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>
              {kpi.icon}
            </div>
            <div className="text-2xl font-extrabold text-gray-900">{kpi.value}</div>
            <div className="text-xs text-gray-400 mt-0.5">{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* ── Analytics error ── */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-6 flex gap-3 items-start">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-800 text-sm">Could not load analytics data</p>
            <p className="text-red-600 text-xs mt-1">{error}</p>
            <p className="text-red-500 text-xs mt-2">
              Make sure <code className="bg-red-100 px-1 rounded">GA4_PROPERTY_ID</code>,{' '}
              <code className="bg-red-100 px-1 rounded">GOOGLE_CLIENT_ID</code>,{' '}
              <code className="bg-red-100 px-1 rounded">GOOGLE_CLIENT_SECRET</code> and{' '}
              <code className="bg-red-100 px-1 rounded">GOOGLE_REFRESH_TOKEN</code> are set in{' '}
              <code className="bg-red-100 px-1 rounded">.env.local</code>.
            </p>
          </div>
        </div>
      )}

      {/* ── Analytics loading skeleton ── */}
      {loading && !data && (
        <div className="space-y-6 animate-pulse mb-6">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-2xl h-24" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-gray-100 rounded-2xl h-64" />
            <div className="bg-gray-100 rounded-2xl h-64" />
          </div>
          <div className="bg-gray-100 rounded-2xl h-48" />
        </div>
      )}

      {data && (
        <>
          {/* ── GA4 Traffic KPIs ── */}
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
            Traffic · Last 30 days
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {[
              { icon: <Users            className="w-5 h-5" />, label: 'Users',       value: fmt(data.overview.users),                                  color: 'text-blue-600',   bg: 'bg-blue-50'   },
              { icon: <TrendingUp       className="w-5 h-5" />, label: 'Sessions',    value: fmt(data.overview.sessions),                               color: 'text-purple-600', bg: 'bg-purple-50' },
              { icon: <Eye              className="w-5 h-5" />, label: 'Page Views',  value: fmt(data.overview.pageViews),                              color: 'text-sky-600',    bg: 'bg-sky-50'    },
              { icon: <BarChart2        className="w-5 h-5" />, label: 'Bounce Rate', value: `${(data.overview.bounceRate * 100).toFixed(1)}%`,         color: 'text-orange-600', bg: 'bg-orange-50' },
              { icon: <MousePointerClick className="w-5 h-5"/>, label: 'Avg. Session',value: duration(data.overview.avgSessionDuration),                color: 'text-green-600',  bg: 'bg-green-50'  },
            ].map((kpi) => (
              <div key={kpi.label} className="bg-white rounded-2xl border border-gray-100 p-4">
                <div className={`${kpi.bg} ${kpi.color} w-9 h-9 rounded-xl flex items-center justify-center mb-3`}>
                  {kpi.icon}
                </div>
                <div className="text-2xl font-extrabold text-gray-900">{kpi.value}</div>
                <div className="text-xs text-gray-400 mt-0.5">{kpi.label}</div>
              </div>
            ))}
          </div>

          {/* ── Top Pages + Devices ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-4">Top Pages</h2>
              <div className="space-y-1">
                <div className="grid grid-cols-12 text-xs font-semibold text-gray-400 uppercase tracking-wide pb-2 border-b border-gray-100">
                  <span className="col-span-7">Page</span>
                  <span className="col-span-3 text-right">Views</span>
                  <span className="col-span-2 text-right">Users</span>
                </div>
                {data.topPages.map((page, i) => {
                  const maxViews = data.topPages[0]?.views ?? 1;
                  return (
                    <div key={i} className="grid grid-cols-12 items-center py-2.5 border-b border-gray-50 last:border-0">
                      <div className="col-span-7 relative">
                        <div className="absolute inset-y-0 left-0 bg-blue-50 rounded" style={{ width: `${(page.views / maxViews) * 100}%` }} />
                        <span className="relative text-sm text-gray-700 font-medium truncate block pr-2">{page.path}</span>
                      </div>
                      <span className="col-span-3 text-right text-sm font-semibold text-gray-800">{fmt(page.views)}</span>
                      <span className="col-span-2 text-right text-xs text-gray-400">{fmt(page.users)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-4">Devices</h2>
              <div className="space-y-3">
                {data.devices.map((d) => {
                  const total = data.devices.reduce((s, x) => s + x.sessions, 0);
                  const share = total > 0 ? (d.sessions / total) * 100 : 0;
                  return (
                    <div key={d.device}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <div className="flex items-center gap-2 text-gray-700 font-medium capitalize">
                          {DEVICE_ICONS[d.device] ?? <Laptop className="w-4 h-4" />}
                          {d.device}
                        </div>
                        <span className="text-gray-500 text-xs">{share.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-[#003d7a] h-2 rounded-full" style={{ width: `${share}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Conversion Funnel ── */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
            <h2 className="font-bold text-gray-900 mb-5">Conversion Funnel — Last 30 days</h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {[
                { icon: <Eye            className="w-5 h-5" />, label: 'Product Views', value: data.conversions.viewItem,      color: 'bg-sky-50 text-sky-600',       prev: null },
                { icon: <ShoppingCart  className="w-5 h-5" />, label: 'Add to Cart',   value: data.conversions.addToCart,     color: 'bg-blue-50 text-blue-600',     prev: data.conversions.viewItem },
                { icon: <CreditCard    className="w-5 h-5" />, label: 'Checkout',      value: data.conversions.beginCheckout, color: 'bg-purple-50 text-purple-600', prev: data.conversions.addToCart },
                { icon: <TrendingUp    className="w-5 h-5" />, label: 'Purchases',     value: data.conversions.purchase,      color: 'bg-green-50 text-green-600',   prev: data.conversions.beginCheckout },
                { icon: <MousePointerClick className="w-5 h-5"/>,label: 'Enquiries',   value: data.conversions.generateLead,  color: 'bg-amber-50 text-amber-600',   prev: null },
              ].map((step, i) => (
                <div key={i} className="text-center">
                  <div className={`${step.color} w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-2`}>
                    {step.icon}
                  </div>
                  <div className="text-2xl font-extrabold text-gray-900">{fmt(step.value)}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{step.label}</div>
                  {step.prev !== null && (
                    <div className={`text-xs font-semibold mt-1.5 ${step.value > 0 ? 'text-green-600' : 'text-gray-300'}`}>
                      {pct(step.value, step.prev)} conversion
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ── Recent Orders + Low Stock ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
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

      {/* ── Quick Nav ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { href: '/admin/products', icon: <Package     className="w-7 h-7 text-[#003d7a]" />, title: 'Manage Products', desc: `${products.length} products in catalogue` },
          { href: '/admin/orders',   icon: <ShoppingCart className="w-7 h-7 text-[#003d7a]" />, title: 'Manage Orders',   desc: `${orders.length} total orders` },
          { href: '/admin/seo',      icon: <Search       className="w-7 h-7 text-[#003d7a]" />, title: 'SEO Dashboard',   desc: 'Search Console insights' },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-[#00a3e0] hover:shadow-md transition-all group flex items-center gap-4"
          >
            {item.icon}
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
