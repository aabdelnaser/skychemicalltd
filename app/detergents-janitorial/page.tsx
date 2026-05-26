'use client';

import { useState, useMemo } from 'react';
import { Suspense } from 'react';
import Link from 'next/link';
import { djProducts, DJ_CATEGORIES, type DJCategory } from '@/lib/djProducts';
import { Search, ChevronRight } from 'lucide-react';
import { trackEnquiry } from '@/lib/analytics';

const BORDER_MAP: Record<DJCategory, string> = {
  'disinfectants-sanitisers': 'border-l-blue-700',
  'floor-carpet':             'border-l-teal-600',
  'washroom-toilet':          'border-l-violet-600',
  'catering-glasswash':       'border-l-amber-600',
  'animal-care':              'border-l-green-600',
  'hand-care':                'border-l-rose-600',
  'drain-care':               'border-l-slate-500',
  'odour-control':            'border-l-indigo-600',
  'glass-windows':            'border-l-sky-500',
  'multi-purpose':            'border-l-gray-500',
  'beer-cellar':              'border-l-yellow-600',
};

const BG_MAP: Record<DJCategory, string> = {
  'disinfectants-sanitisers': 'bg-blue-50 text-blue-800 border-blue-200',
  'floor-carpet':             'bg-teal-50 text-teal-800 border-teal-200',
  'washroom-toilet':          'bg-violet-50 text-violet-800 border-violet-200',
  'catering-glasswash':       'bg-amber-50 text-amber-800 border-amber-200',
  'animal-care':              'bg-green-50 text-green-800 border-green-200',
  'hand-care':                'bg-rose-50 text-rose-800 border-rose-200',
  'drain-care':               'bg-slate-50 text-slate-700 border-slate-200',
  'odour-control':            'bg-indigo-50 text-indigo-800 border-indigo-200',
  'glass-windows':            'bg-sky-50 text-sky-800 border-sky-200',
  'multi-purpose':            'bg-gray-100 text-gray-700 border-gray-300',
  'beer-cellar':              'bg-yellow-50 text-yellow-800 border-yellow-200',
};

function DJContent() {
  const [activeCategory, setActiveCategory] = useState<DJCategory | ''>('');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = djProducts;
    if (activeCategory) list = list.filter((p) => p.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeCategory, search]);

  const categoryLabel = (slug: DJCategory) =>
    DJ_CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-[#002a55] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <p className="text-[#00a3e0] text-sm font-semibold tracking-widest uppercase mb-3">Sky Chemicals UK Ltd</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Detergents &amp; Janitorial</h1>
          <p className="text-blue-300 text-base max-w-2xl">
            Professional cleaning formulations for every commercial and institutional application. Manufactured in the UK to EN standard and supplied to industries across the globe.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Filter + search bar */}
        <div className="flex flex-col gap-4 mb-8">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                activeCategory === ''
                  ? 'bg-[#003d7a] text-white border-[#003d7a]'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-[#003d7a] hover:text-[#003d7a]'
              }`}
            >
              All Products
            </button>
            {DJ_CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                  activeCategory === cat.slug
                    ? 'bg-[#003d7a] text-white border-[#003d7a]'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-[#003d7a] hover:text-[#003d7a]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search + count row */}
          <div className="flex items-center justify-between gap-4">
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products…"
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003d7a] focus:border-transparent"
              />
            </div>
            <span className="text-sm text-gray-400 whitespace-nowrap shrink-0">
              {filtered.length} product{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Product grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-medium">No products found</p>
            <button onClick={() => { setSearch(''); setActiveCategory(''); }} className="mt-3 text-sm text-[#003d7a] hover:underline">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((p) => (
              <div
                key={p.id}
                className={`bg-white border border-gray-200 border-l-4 ${BORDER_MAP[p.category]} rounded-r-xl rounded-l-none hover:shadow-md transition-shadow flex flex-col`}
              >
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm leading-snug">{p.name}</h3>
                    {!p.inStock && (
                      <span className="shrink-0 text-xs font-semibold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                        Out of Stock
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed flex-1 mb-3">{p.subtitle}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded border ${BG_MAP[p.category]}`}>
                      {categoryLabel(p.category)}
                    </span>
                    <Link
                      href="/contact"
                      onClick={() => trackEnquiry(p.name, 'dj_page')}
                      className="text-xs font-semibold text-[#003d7a] hover:text-[#00a3e0] transition-colors flex items-center gap-0.5"
                    >
                      Enquire <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-14 border-t border-gray-100 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-bold text-gray-900">Looking for something specific?</p>
            <p className="text-sm text-gray-500 mt-1">
              We can formulate products to your specification. Speak to our team about custom manufacturing.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center gap-2 bg-[#003d7a] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#00a3e0] transition-colors text-sm"
          >
            Contact Sales <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function DetergentsJanitorialPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-gray-400 text-sm">Loading products…</div>}>
      <DJContent />
    </Suspense>
  );
}
