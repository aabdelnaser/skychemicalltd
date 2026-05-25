import Link from 'next/link';
import { getFeaturedProducts, categories } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { ShieldCheck, Truck, Phone, Award, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#003d7a] via-[#0055a5] to-[#00a3e0] text-white py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block bg-white/15 rounded-full px-4 py-1.5 text-sm font-medium mb-5 backdrop-blur-sm">
            🇬🇧 Trusted by 5,000+ UK businesses
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-5">
            Professional Cleaning &<br />
            <span className="text-[#7dd3fc]">Disinfection Products</span>
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            High-quality, competitively priced industrial cleaning solutions for healthcare, hospitality, animal care and more. Delivered across the UK.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/products"
              className="bg-white text-[#003d7a] font-bold px-8 py-3.5 rounded-xl hover:bg-blue-50 transition-colors text-base"
            >
              Shop All Products
            </Link>
            <Link
              href="/products?category=infection-control"
              className="bg-white/15 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/25 transition-colors text-base backdrop-blur-sm"
            >
              Infection Control →
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-white border-b border-gray-100 py-5 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: <Truck className="w-5 h-5 text-[#00a3e0]" />, text: 'Free delivery over £75' },
            { icon: <ShieldCheck className="w-5 h-5 text-[#00a3e0]" />, text: 'EN-certified products' },
            { icon: <Award className="w-5 h-5 text-[#00a3e0]" />, text: 'DEFRA approved range' },
            { icon: <Phone className="w-5 h-5 text-[#00a3e0]" />, text: 'Expert technical support' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 justify-center sm:justify-start">
              {item.icon}
              <span className="text-sm font-medium text-gray-700">{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Categories grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-end justify-between mb-7">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Shop by Category</h2>
            <p className="text-gray-500 mt-1">Find the right product for your sector</p>
          </div>
          <Link href="/products" className="text-sm text-[#003d7a] font-medium hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="bg-white rounded-2xl border border-gray-100 p-4 hover:border-[#00a3e0] hover:shadow-md transition-all duration-200 group"
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <div className="font-semibold text-sm text-gray-800 group-hover:text-[#003d7a] transition-colors leading-snug">
                {cat.name}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-white py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-7">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Featured Products</h2>
              <p className="text-gray-500 mt-1">Our most popular lines, trusted by professionals</p>
            </div>
            <Link href="/products" className="text-sm text-[#003d7a] font-medium hover:underline flex items-center gap-1">
              All products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Sectors banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="bg-gradient-to-r from-[#003d7a] to-[#0055a5] rounded-3xl p-8 sm:p-12 text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Products for every sector</h2>
          <p className="text-blue-200 mb-8 max-w-xl">
            From NHS trusts and care homes to food manufacturers, kennels and farms — we supply the right disinfection solution for your environment.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            {['🏥 Healthcare', '🏨 Hospitality', '🐾 Animal Care', '🍽️ Catering', '🏫 Education', '🏭 Manufacturing'].map((s) => (
              <div key={s} className="bg-white/10 rounded-xl px-4 py-2.5 text-sm font-medium backdrop-blur-sm">
                {s}
              </div>
            ))}
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-white text-[#003d7a] font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Browse all products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* About snippet */}
      <section className="bg-white border-t border-gray-100 py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-4xl mb-4">🏭</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">UK Manufacturer & Supplier</h2>
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto mb-6">
            Sky Chemicals UK Ltd manufactures and supplies a wide range of professional cleaning and disinfection products from our facility in Sheffield. All products are formulated and tested to the highest EN standards, giving you confidence in every application.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-[#003d7a] font-semibold hover:underline"
          >
            Learn more about us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
