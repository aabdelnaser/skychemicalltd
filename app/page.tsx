import Link from 'next/link';
import { ArrowRight, ShieldCheck, Globe, FlaskConical, Truck, ChevronRight } from 'lucide-react';

const sectors = [
  'Healthcare & NHS', 'Care Homes', 'Hospitality', 'Food Production',
  'Agriculture & Farming', 'Veterinary', 'Education', 'Facilities Management',
];

const categories = [
  { label: 'Infection Control',         href: '/products?category=infection-control', desc: 'Virucidal, bactericidal & sporicidal disinfectants' },
  { label: 'Peracide® Range',            href: '/peracide',                            desc: 'ISPAA technology — DEFRA approved, 70+ EN tests' },
  { label: 'Detergents & Janitorial',    href: '/detergents-janitorial',              desc: '48 professional formulations with category filters' },
  { label: 'Floor & Carpet Care',        href: '/products?category=floor-carpet',     desc: 'Shampoos, gels, polishes and stain treatments' },
  { label: 'Washroom & Toilet',          href: '/products?category=washroom-toilet',  desc: 'Cleaning, descaling and deodourising products' },
  { label: 'Animal Care',                href: '/products?category=animal-care',      desc: 'DEFRA-approved veterinary & husbandry disinfectants' },
  { label: 'Hand Care',                  href: '/products?category=hand-care',        desc: 'Sanitisers, soaps and protective creams' },
  { label: 'Catering & Kitchen',         href: '/products?category=catering-kitchen', desc: 'Food-safe sanitisers, degreasers and glasswash' },
];

const trustBadges = [
  { icon: <ShieldCheck className="w-5 h-5" />, label: 'EN certified formulations' },
  { icon: <FlaskConical  className="w-5 h-5" />, label: 'In-house R&D & manufacturing' },
  { icon: <Globe         className="w-5 h-5" />, label: 'Global export capability' },
  { icon: <Truck         className="w-5 h-5" />, label: 'UK-wide delivery from Sheffield' },
];

export default function HomePage() {
  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="bg-[#002a55] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-[#00a3e0] text-sm font-semibold tracking-widest uppercase mb-4">
              Sky Chemicals UK Ltd — Sheffield
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              Professional Cleaning &amp;<br />Disinfection Products
            </h1>
            <p className="text-blue-200 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl">
              High-quality, eco-friendly formulations for healthcare, hospitality, agriculture and industry.
              Manufactured in the UK. Supplied globally.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-[#00a3e0] text-white font-semibold px-7 py-3.5 rounded-lg hover:bg-white hover:text-[#003d7a] transition-colors text-sm"
              >
                Browse Products <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/peracide"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-semibold px-7 py-3.5 rounded-lg hover:bg-white/10 transition-colors text-sm"
              >
                Peracide® Range
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-semibold px-7 py-3.5 rounded-lg hover:bg-white/10 transition-colors text-sm"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {trustBadges.map((b) => (
            <div key={b.label} className="flex items-center gap-2.5 text-sm text-gray-600">
              <span className="text-[#003d7a] shrink-0">{b.icon}</span>
              <span className="font-medium">{b.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Product categories ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#00a3e0] mb-2">Product Ranges</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Browse by category</h2>
          </div>
          <Link href="/products" className="text-sm text-[#003d7a] font-semibold hover:underline hidden sm:flex items-center gap-1">
            All products <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-[#003d7a] hover:shadow-md transition-all duration-200"
            >
              <div className="h-1 w-8 bg-[#003d7a] rounded-full mb-4 group-hover:w-16 transition-all duration-300" />
              <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-[#003d7a] transition-colors">
                {cat.label}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">{cat.desc}</p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#003d7a] opacity-0 group-hover:opacity-100 transition-opacity">
                View range <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Peracide highlight ── */}
      <section className="bg-[#002a55] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[#00a3e0] text-xs font-semibold tracking-widest uppercase mb-3">Featured Range</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Peracide<sup className="text-lg align-super font-normal ml-0.5">®</sup>
            </h2>
            <p className="text-blue-300 text-sm font-medium mb-4">In Situ Peracetic Acid (ISPAA) Technology</p>
            <p className="text-blue-200 leading-relaxed mb-6 text-sm max-w-lg">
              An advanced disinfectant validated to over 70 EN and ASTM tests. DEFRA-approved for use under
              General and Poultry Disease Orders. Proven efficacy against bacteria, viruses, fungi, spores
              and biofilm-forming organisms across healthcare, agriculture and food production sectors.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {['70+ EN Tests', 'DEFRA Approved', 'ASTM Certified', 'GMP Manufactured'].map((badge) => (
                <span key={badge} className="text-xs font-medium text-white border border-white/20 bg-white/10 px-3 py-1.5 rounded">
                  {badge}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/peracide" className="inline-flex items-center gap-2 bg-[#00a3e0] text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-[#003d7a] transition-colors text-sm">
                View Products <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/peracide?tab=documents" className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm">
                Download SDS
              </Link>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '70+',     label: 'EN & ASTM tests' },
              { value: 'DEFRA',   label: 'Approved disinfectant' },
              { value: '13',      label: 'Product formats' },
              { value: 'Global',  label: 'Export reach' },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 border border-white/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold text-white mb-1">{s.value}</div>
                <div className="text-blue-300 text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sectors served ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#00a3e0] mb-3">Sectors</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Trusted by diverse industries globally
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              From NHS trusts and care homes to food manufacturers and livestock farms — we supply the right
              disinfection and cleaning solution for your environment.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#003d7a] hover:underline"
            >
              About Sky Chemicals <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="lg:col-span-3 grid grid-cols-2 gap-3">
            {sectors.map((s) => (
              <div key={s} className="flex items-center gap-2.5 py-3 border-b border-gray-100">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00a3e0] shrink-0" />
                <span className="text-sm text-gray-700 font-medium">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA strip ── */}
      <section className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Need a bespoke formulation?</h3>
            <p className="text-gray-500 text-sm">
              Our in-house R&amp;D team can develop products to your specification. Available with custom packaging.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link href="/contact" className="bg-[#003d7a] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#00a3e0] transition-colors text-sm">
              Contact Sales
            </Link>
            <Link href="/about" className="border border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:bg-white hover:border-[#003d7a] hover:text-[#003d7a] transition-colors text-sm">
              Learn More
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
