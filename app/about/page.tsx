import Link from 'next/link';
import { ArrowRight, ShieldCheck, Award, Users, Truck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#003d7a] to-[#0055a5] text-white py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">About Sky Chemicals UK Ltd</h1>
          <p className="text-blue-200 text-lg max-w-2xl">
            UK manufacturer and supplier of professional cleaning and disinfection products for over 25 years. Based in Sheffield, trusted nationwide.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Sky Chemicals UK Ltd was founded with a simple mission: to provide high-quality, professional cleaning and disinfection products at competitive prices. From our manufacturing facility in Sheffield, we supply businesses across the UK — from single-site care homes to national NHS trusts.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our team of chemists, technical advisors and logistics specialists work together to develop, manufacture and deliver products that meet the highest standards. All of our products are rigorously tested to relevant EN standards, giving our customers complete confidence.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Whether you need infection control products for a care home, DEFRA-approved disinfectants for a farm, or food-safe sanitisers for a commercial kitchen — we have the right solution for you.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-sky-100 rounded-3xl p-10 text-center">
            <div className="text-7xl mb-4">🏭</div>
            <div className="text-3xl font-extrabold text-[#003d7a] mb-1">25+ Years</div>
            <div className="text-gray-500">of UK manufacturing</div>
            <div className="grid grid-cols-2 gap-4 mt-6 text-left">
              {[
                { value: '5,000+', label: 'Business customers' },
                { value: '30+', label: 'Product lines' },
                { value: '99.9%', label: 'On-time delivery' },
                { value: '24h', label: 'Technical support' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl p-3">
                  <div className="font-extrabold text-[#003d7a] text-lg">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-14 px-4 sm:px-6" id="certifications">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Choose Sky Chemicals?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: <ShieldCheck className="w-7 h-7" />, title: 'EN Certified', desc: 'All products tested and certified to EN standards including EN1276, EN14476, EN13697 and more.' },
              { icon: <Award className="w-7 h-7" />, title: 'DEFRA Approved', desc: 'Selected products are DEFRA-approved for use in Foot and Mouth Disease and General Orders.' },
              { icon: <Users className="w-7 h-7" />, title: 'Expert Support', desc: 'Our technical team can advise on product selection, dilution rates and compliance.' },
              { icon: <Truck className="w-7 h-7" />, title: 'Fast UK Delivery', desc: 'Orders dispatched same day from Sheffield. Free delivery on orders over £75.' },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 rounded-2xl p-5">
                <div className="text-[#003d7a] mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14" id="manufacturing">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">UK Manufacturing</h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          We manufacture our products in-house at our Sheffield facility. This gives us complete control over quality, formulation and supply chain — ensuring consistent quality batch after batch. We also offer contract manufacturing and OEM services for businesses looking to develop their own branded cleaning products.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-[#003d7a] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#00a3e0] transition-colors"
        >
          Browse Our Products <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
