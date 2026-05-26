'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/authContext';
import {
  Users, Eye, MousePointerClick, ShoppingCart, CreditCard,
  TrendingUp, BarChart2, Laptop, Smartphone, Tablet,
  ArrowLeft, RefreshCw, ExternalLink, AlertCircle,
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
  mobile: <Smartphone className="w-4 h-4" />,
  tablet: <Tablet className="w-4 h-4" />,
};

export default function AdminAnalyticsPage() {
  const { user, isLoading } = useAuth();
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-gray-400 hover:text-gray-600">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
            <p className="text-sm text-gray-400 mt-0.5">Last 30 days · Powered by Google Analytics 4</p>
          </div>
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
            href={`https://analytics.google.com/analytics/web/#/p${process.env.NEXT_PUBLIC_GA_PROPERTY_ID ?? ''}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white bg-[#003d7a] rounded-lg px-3 py-2 hover:bg-[#00a3e0] transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Open GA4
          </a>
        </div>
      </div>

      {/* Error state */}
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
              <code className="bg-red-100 px-1 rounded">.env.local</code>.{' '}
              Also ensure the <strong>Google Analytics Data API</strong> is enabled in Google Cloud Console.
            </p>
          </div>
        </div>
      )}

      {/* Loading skeleton */}
      {loading && !data && (
        <div className="space-y-6 animate-pulse">
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
          {/* ── Overview KPIs ── */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {[
              { icon: <Users className="w-5 h-5" />, label: 'Users', value: fmt(data.overview.users), color: 'text-blue-600', bg: 'bg-blue-50' },
              { icon: <TrendingUp className="w-5 h-5" />, label: 'Sessions', value: fmt(data.overview.sessions), color: 'text-purple-600', bg: 'bg-purple-50' },
              { icon: <Eye className="w-5 h-5" />, label: 'Page Views', value: fmt(data.overview.pageViews), color: 'text-sky-600', bg: 'bg-sky-50' },
              { icon: <BarChart2 className="w-5 h-5" />, label: 'Bounce Rate', value: `${(data.overview.bounceRate * 100).toFixed(1)}%`, color: 'text-orange-600', bg: 'bg-orange-50' },
              { icon: <MousePointerClick className="w-5 h-5" />, label: 'Avg. Session', value: duration(data.overview.avgSessionDuration), color: 'text-green-600', bg: 'bg-green-50' },
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* ── Top Pages ── */}
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
                    <div key={i} className="grid grid-cols-12 items-center py-2.5 border-b border-gray-50 last:border-0 group">
                      <div className="col-span-7 relative">
                        <div
                          className="absolute inset-y-0 left-0 bg-blue-50 rounded transition-all"
                          style={{ width: `${(page.views / maxViews) * 100}%` }}
                        />
                        <span className="relative text-sm text-gray-700 font-medium truncate block pr-2">
                          {page.path}
                        </span>
                      </div>
                      <span className="col-span-3 text-right text-sm font-semibold text-gray-800">{fmt(page.views)}</span>
                      <span className="col-span-2 text-right text-xs text-gray-400">{fmt(page.users)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Devices ── */}
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
                        <div
                          className="bg-[#003d7a] h-2 rounded-full transition-all"
                          style={{ width: `${share}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Conversion Funnel ── */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-gray-900 mb-5">Conversion Funnel — Last 30 days</h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {[
                { icon: <Eye className="w-5 h-5" />, label: 'Product Views', value: data.conversions.viewItem, color: 'bg-sky-50 text-sky-600', prev: null },
                { icon: <ShoppingCart className="w-5 h-5" />, label: 'Add to Cart', value: data.conversions.addToCart, color: 'bg-blue-50 text-blue-600', prev: data.conversions.viewItem },
                { icon: <CreditCard className="w-5 h-5" />, label: 'Checkout', value: data.conversions.beginCheckout, color: 'bg-purple-50 text-purple-600', prev: data.conversions.addToCart },
                { icon: <TrendingUp className="w-5 h-5" />, label: 'Purchases', value: data.conversions.purchase, color: 'bg-green-50 text-green-600', prev: data.conversions.beginCheckout },
                { icon: <MousePointerClick className="w-5 h-5" />, label: 'Enquiries', value: data.conversions.generateLead, color: 'bg-amber-50 text-amber-600', prev: null },
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
    </div>
  );
}
