'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/authContext';
import {
  Search, MousePointerClick, Eye, TrendingUp, TrendingDown,
  ArrowLeft, RefreshCw, ExternalLink, AlertCircle, Minus,
} from 'lucide-react';

interface SeoData {
  overview: { clicks: number; impressions: number; ctr: number; position: number };
  queries:  { query: string; clicks: number; impressions: number; ctr: number; position: number }[];
  pages:    { page: string;  clicks: number; impressions: number; ctr: number; position: number }[];
  trend:    { date: string;  clicks: number; impressions: number }[];
}

function fmt(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n.toString();
}

function PositionBadge({ pos }: { pos: number }) {
  const color = pos <= 3 ? 'text-green-700 bg-green-50 border-green-200'
              : pos <= 10 ? 'text-blue-700 bg-blue-50 border-blue-200'
              : pos <= 20 ? 'text-amber-700 bg-amber-50 border-amber-200'
              : 'text-gray-500 bg-gray-50 border-gray-200';
  const Icon = pos <= 10 ? TrendingUp : pos <= 20 ? Minus : TrendingDown;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded border ${color}`}>
      <Icon className="w-3 h-3" />
      {pos.toFixed(1)}
    </span>
  );
}

export default function AdminSeoPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [data, setData]   = useState<SeoData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView]   = useState<'queries' | 'pages'>('queries');

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      router.push('/account/login');
    }
  }, [user, isLoading, router]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res  = await fetch('/api/seo');
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Failed to load SEO data');
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

  // Normalise trend bars
  const maxClicks = Math.max(...(data?.trend.map((t) => t.clicks) ?? [1]), 1);
  const maxImpressions = Math.max(...(data?.trend.map((t) => t.impressions) ?? [1]), 1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-gray-400 hover:text-gray-600">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">SEO Dashboard</h1>
            <p className="text-sm text-gray-400 mt-0.5">Last 28 days · Powered by Google Search Console</p>
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
            href="https://search.google.com/search-console"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white bg-[#003d7a] rounded-lg px-3 py-2 hover:bg-[#00a3e0] transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Open Search Console
          </a>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-6 flex gap-3 items-start">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-800 text-sm">Could not load SEO data</p>
            <p className="text-red-600 text-xs mt-1">{error}</p>
            <p className="text-red-500 text-xs mt-2">
              Make sure <code className="bg-red-100 px-1 rounded">SEARCH_CONSOLE_SITE_URL</code> is set in{' '}
              <code className="bg-red-100 px-1 rounded">.env.local</code> and the site is verified in Google Search Console.
              Also ensure <code className="bg-red-100 px-1 rounded">GOOGLE_REFRESH_TOKEN</code> includes the{' '}
              <code className="bg-red-100 px-1 rounded">webmasters.readonly</code> scope.
            </p>
          </div>
        </div>
      )}

      {/* Skeleton */}
      {loading && !data && (
        <div className="space-y-6 animate-pulse">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => <div key={i} className="bg-gray-100 rounded-2xl h-24" />)}
          </div>
          <div className="bg-gray-100 rounded-2xl h-40" />
          <div className="bg-gray-100 rounded-2xl h-64" />
        </div>
      )}

      {data && (
        <>
          {/* ── Overview KPIs ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { icon: <MousePointerClick className="w-5 h-5" />, label: 'Total Clicks',      value: fmt(data.overview.clicks),                           color: 'text-blue-600',   bg: 'bg-blue-50'   },
              { icon: <Eye              className="w-5 h-5" />, label: 'Impressions',        value: fmt(data.overview.impressions),                      color: 'text-purple-600', bg: 'bg-purple-50' },
              { icon: <TrendingUp       className="w-5 h-5" />, label: 'Avg. CTR',           value: `${(data.overview.ctr * 100).toFixed(1)}%`,          color: 'text-green-600',  bg: 'bg-green-50'  },
              { icon: <Search           className="w-5 h-5" />, label: 'Avg. Position',      value: data.overview.position.toFixed(1),                   color: 'text-amber-600',  bg: 'bg-amber-50'  },
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

          {/* ── 28-day Trend ── */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">Performance Trend — Last 28 Days</h2>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#003d7a] inline-block" />Clicks</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#00a3e0]/40 inline-block" />Impressions</span>
              </div>
            </div>
            {data.trend.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">No trend data yet — visit your site from search to populate this chart.</p>
            ) : (
              <div className="flex items-end gap-0.5 h-28">
                {data.trend.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-0.5 group relative">
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      {d.date}<br />{d.clicks} clicks · {fmt(d.impressions)} imp.
                    </div>
                    <div className="w-full flex flex-col justify-end gap-0.5 h-24">
                      <div
                        className="w-full bg-[#00a3e0]/30 rounded-sm"
                        style={{ height: `${(d.impressions / maxImpressions) * 80}%`, minHeight: d.impressions > 0 ? '2px' : '0' }}
                      />
                      <div
                        className="w-full bg-[#003d7a] rounded-sm"
                        style={{ height: `${(d.clicks / maxClicks) * 80}%`, minHeight: d.clicks > 0 ? '2px' : '0' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Queries / Pages tab ── */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {/* Tab bar */}
            <div className="flex border-b border-gray-100">
              {(['queries', 'pages'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setView(t)}
                  className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors capitalize ${
                    view === t
                      ? 'border-[#003d7a] text-[#003d7a]'
                      : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
                  }`}
                >
                  {t === 'queries' ? 'Top Search Queries' : 'Top Pages'}
                </button>
              ))}
            </div>

            {/* Table — desktop */}
            <div className="hidden md:block">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-left">
                    <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide w-1/2">
                      {view === 'queries' ? 'Query' : 'Page'}
                    </th>
                    <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide text-right">Clicks</th>
                    <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide text-right">Impressions</th>
                    <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide text-right">CTR</th>
                    <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide text-right">Position</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {(view === 'queries' ? data.queries : data.pages).map((row, i) => {
                    const label = view === 'queries' ? (row as typeof data.queries[0]).query : (row as typeof data.pages[0]).page;
                    const maxRow = (view === 'queries' ? data.queries : data.pages)[0]?.clicks ?? 1;
                    return (
                      <tr key={i} className="hover:bg-gray-50/60 transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 relative">
                              <div
                                className="absolute inset-y-0 left-0 bg-blue-50 rounded"
                                style={{ width: `${(row.clicks / maxRow) * 100}%` }}
                              />
                              <span className="relative font-medium text-gray-800 text-sm truncate block max-w-xs">{label}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-right font-semibold text-gray-800">{fmt(row.clicks)}</td>
                        <td className="px-5 py-3.5 text-right text-gray-500">{fmt(row.impressions)}</td>
                        <td className="px-5 py-3.5 text-right text-gray-500">{row.ctr}%</td>
                        <td className="px-5 py-3.5 text-right"><PositionBadge pos={row.position} /></td>
                      </tr>
                    );
                  })}
                  {(view === 'queries' ? data.queries : data.pages).length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-5 py-12 text-center text-gray-400 text-sm">
                        No data yet — your site needs to appear in Google Search results first.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Cards — mobile */}
            <div className="md:hidden divide-y divide-gray-100">
              {(view === 'queries' ? data.queries : data.pages).map((row, i) => {
                const label = view === 'queries' ? (row as typeof data.queries[0]).query : (row as typeof data.pages[0]).page;
                return (
                  <div key={i} className="p-4">
                    <div className="font-medium text-gray-800 text-sm mb-2 truncate">{label}</div>
                    <div className="grid grid-cols-4 gap-2 text-center">
                      {[
                        { l: 'Clicks',  v: fmt(row.clicks)       },
                        { l: 'Impr.',   v: fmt(row.impressions)   },
                        { l: 'CTR',     v: `${row.ctr}%`          },
                        { l: 'Position',v: row.position.toFixed(1)},
                      ].map((m) => (
                        <div key={m.l}>
                          <div className="text-xs text-gray-400">{m.l}</div>
                          <div className="text-sm font-semibold text-gray-800">{m.v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              {(view === 'queries' ? data.queries : data.pages).length === 0 && (
                <p className="p-8 text-center text-sm text-gray-400">No data yet.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
