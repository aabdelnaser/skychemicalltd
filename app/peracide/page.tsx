'use client';

import { useState } from 'react';
import Link from 'next/link';
import { peracideProducts, peracideDocuments, type PeracideProduct } from '@/lib/peracideProducts';
import { FileDown, ChevronRight, FlaskConical, Award, Microscope, ShieldCheck } from 'lucide-react';

const DOC_TYPE_STYLES: Record<string, string> = {
  SDS:           'bg-red-50 text-red-700 border-red-200',
  TDS:           'bg-blue-50 text-blue-700 border-blue-200',
  Certificate:   'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Test Report': 'bg-purple-50 text-purple-700 border-purple-200',
  Guide:         'bg-amber-50 text-amber-700 border-amber-200',
  Approval:      'bg-teal-50 text-teal-700 border-teal-200',
};

export default function PeracidePage() {
  const [tab, setTab] = useState<'products' | 'documents'>('products');

  const featured = peracideProducts.filter((p) => p.featured);
  const rest = peracideProducts.filter((p) => !p.featured);

  return (
    <div className="bg-white">
      {/* ── Hero ── */}
      <section className="bg-[#002a55] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-[#00a3e0] text-sm font-semibold tracking-widest uppercase mb-3">
              Sky Chemicals UK Ltd
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Peracide<sup className="text-xl font-normal align-super ml-0.5">®</sup>
            </h1>
            <p className="text-blue-200 text-lg mb-3 font-medium">
              In Situ Peracetic Acid (ISPAA) Technology
            </p>
            <p className="text-blue-300 text-base leading-relaxed mb-8 max-w-2xl">
              Peracide is an advanced ISPAA-based disinfectant with proven efficacy against bacteria, viruses,
              fungi, spores and biofilm-forming organisms. DEFRA-approved and validated to over 70 EN and ASTM
              standard tests — trusted by healthcare, agriculture and food production sectors globally.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: <Microscope className="w-4 h-4" />, label: '70+ EN Tests' },
                { icon: <ShieldCheck className="w-4 h-4" />, label: 'DEFRA Approved' },
                { icon: <Award className="w-4 h-4" />, label: 'ASTM Certified' },
                { icon: <FlaskConical className="w-4 h-4" />, label: 'GMP Manufactured' },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                  {s.icon}
                  {s.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Tab bar ── */}
      <div className="border-b border-gray-200 bg-white sticky top-16 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex gap-0">
          {(['products', 'documents'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors capitalize ${
                tab === t
                  ? 'border-[#003d7a] text-[#003d7a]'
                  : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
              }`}
            >
              {t === 'products' ? 'Products' : 'Documents & Certifications'}
            </button>
          ))}
        </div>
      </div>

      {/* ── Products tab ── */}
      {tab === 'products' && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          {/* Featured */}
          {featured.length > 0 && (
            <div className="mb-10">
              <h2 className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-5">
                Featured Products
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {featured.map((p) => (
                  <ProductCard key={p.id} product={p} featured />
                ))}
              </div>
            </div>
          )}

          {/* All others */}
          <h2 className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-5">
            Full Range
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {/* Enquiry CTA */}
          <div className="mt-12 bg-gray-50 border border-gray-200 rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Need a bespoke solution?</h3>
              <p className="text-gray-500 text-sm mt-1">
                Contact our technical team to discuss volume pricing, custom formats and application advice.
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
      )}

      {/* ── Documents tab ── */}
      {tab === 'documents' && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10" id="documents">
          <p className="text-gray-500 text-sm mb-6">
            All documents are available for download. Contact us if you require a document not listed below.
          </p>

          {/* Desktop table */}
          <div className="hidden md:block bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-left">
                  <th className="px-5 py-3.5 font-semibold text-gray-600 w-2/5">Document</th>
                  <th className="px-5 py-3.5 font-semibold text-gray-600">Type</th>
                  <th className="px-5 py-3.5 font-semibold text-gray-600">Updated</th>
                  <th className="px-5 py-3.5 font-semibold text-gray-600">Size</th>
                  <th className="px-5 py-3.5 font-semibold text-gray-600 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {peracideDocuments.map((doc, i) => (
                  <tr key={doc.id} className={i % 2 === 1 ? 'bg-gray-50/60' : ''}>
                    <td className="px-5 py-4">
                      <div className="font-semibold text-gray-900">{doc.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">{doc.description}</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded border ${DOC_TYPE_STYLES[doc.type]}`}>
                        {doc.type}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-500 text-xs whitespace-nowrap">{doc.updatedAt}</td>
                    <td className="px-5 py-4 text-gray-500 text-xs whitespace-nowrap">{doc.fileSize}</td>
                    <td className="px-5 py-4 text-right">
                      <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#003d7a] border border-[#003d7a] px-3 py-1.5 rounded-lg hover:bg-[#003d7a] hover:text-white transition-colors">
                        <FileDown className="w-3.5 h-3.5" />
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {peracideDocuments.map((doc) => (
              <div key={doc.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="font-semibold text-gray-900 text-sm">{doc.title}</span>
                  <span className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded border ${DOC_TYPE_STYLES[doc.type]}`}>
                    {doc.type}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-3 leading-relaxed">{doc.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{doc.fileSize} · {doc.updatedAt}</span>
                  <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#003d7a] border border-[#003d7a] px-3 py-1.5 rounded-lg hover:bg-[#003d7a] hover:text-white transition-colors">
                    <FileDown className="w-3.5 h-3.5" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-sm text-gray-400 border-t border-gray-100 pt-6">
            Documents are provided for reference. For the most current version of any document, please{' '}
            <Link href="/contact" className="text-[#003d7a] hover:underline">contact our technical team</Link>.
          </div>
        </div>
      )}
    </div>
  );
}

function ProductCard({ product, featured }: { product: PeracideProduct; featured?: boolean }) {
  return (
    <div className={`bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col ${featured ? 'border-[#003d7a]' : 'border-gray-200'}`}>
      {/* Top accent bar */}
      <div className={`h-1 w-full ${featured ? 'bg-[#003d7a]' : 'bg-gray-200'}`} />

      <div className="p-5 flex flex-col flex-1">
        {featured && (
          <span className="self-start mb-3 text-xs font-semibold text-[#003d7a] bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded">
            Featured
          </span>
        )}
        <div className="mb-1">
          <h3 className="font-bold text-gray-900 text-base leading-snug">{product.name}</h3>
          <p className="text-xs text-gray-400 font-medium mt-0.5 uppercase tracking-wide">{product.format}</p>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed mt-2 mb-4 flex-1 line-clamp-3">
          {product.description}
        </p>
        {product.applications && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.applications.map((a) => (
              <span key={a} className="text-xs text-gray-500 border border-gray-200 rounded px-2 py-0.5">
                {a}
              </span>
            ))}
          </div>
        )}
        <div className="flex gap-2 mt-auto">
          <Link
            href="/contact"
            className="flex-1 text-center text-xs font-semibold bg-[#003d7a] text-white px-3 py-2 rounded-lg hover:bg-[#00a3e0] transition-colors"
          >
            Enquire
          </Link>
          <button
            onClick={() => {}}
            className="text-xs font-semibold text-[#003d7a] border border-[#003d7a] px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap"
          >
            View SDS
          </button>
        </div>
      </div>
    </div>
  );
}
