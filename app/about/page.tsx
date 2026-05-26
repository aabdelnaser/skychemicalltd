import Link from 'next/link';
import { CheckCircle, Globe, FlaskConical, Leaf, Users, Factory, Ship, ClipboardList } from 'lucide-react';

const team = [
  { name: 'Michael Joseph',  role: 'Managing Director',    initials: 'MJ' },
  { name: 'Paul Trennan',    role: 'Warehouse Manager',    initials: 'PT' },
  { name: 'James Derham',    role: 'R&D Chemist',          initials: 'JD' },
  { name: 'Trista Chen',     role: 'Graphic Designer',     initials: 'TC' },
  { name: 'Jordan Edwards',  role: 'Production Assistant', initials: 'JE' },
  { name: 'Leanne Jackson',  role: 'Bookkeeper',           initials: 'LJ' },
  { name: 'Ashley Smith',    role: 'IT Administrator',     initials: 'AS' },
];

const accreditations = [
  {
    code: 'SBLP',
    title: 'Small Business Leadership Programme',
    body: 'Sheffield Hallam University',
    description:
      'Liam has completed the Small Business Leadership Programme at Sheffield Hallam University. This has supported his development to manage our growing team here at Sky Chemicals and Peracide.',
  },
  {
    code: 'GMP',
    title: 'Good Manufacturing Practice',
    body: 'In-house Quality Management',
    description:
      'As we have developed our manufacturing processes, we have implemented a management system to control these processes and ensure conformity that meets our high standards.',
  },
  {
    code: '70+',
    title: 'Microbiology Efficacy',
    body: 'EN / ASTM / DEFRA',
    description:
      'Peracide has undergone over 70 EN tests, alongside DEFRA approval for General and Poultry orders, and American Standards ASTM to ensure its efficacy across a wide range of bacteria, viruses, fungi, spores, and biofilm-causing bacteria.',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="bg-[#002a55] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
          <p className="text-[#00a3e0] text-sm font-semibold tracking-widest uppercase mb-3">
            Sky Chemicals UK Ltd
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5">
            About Us
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl leading-relaxed">
            Over a decade of experience manufacturing high-quality, eco-friendly cleaning and disinfection
            products for the UK market and global export.
          </p>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-3">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#00a3e0] mb-3">Our Story</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5">
              A little about us
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                With over a decade of experience in the cleaning product industry, we provide high-quality,
                eco-friendly products to suit a range of applications. Serving the UK and exporting globally,
                we fulfil direct, contract, and public sector orders to a range of customers.
              </p>
              <p>
                Our wide product range covers healthcare cleaning and disinfection, odour control, washrooms,
                catering, floors, carpets, animal care, and individual requirements. We strive to provide
                excellent products alongside a specialist service to advise on best practices and product
                recommendations.
              </p>
              <p>
                We specialise in tailoring our services to meet your needs, focusing on delivering bespoke
                solutions. Our in-house expertise in research and development and manufacturing offers a
                complete service from concept to finished product.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#003d7a] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#00a3e0] transition-colors text-sm"
              >
                Get in touch
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="lg:col-span-2 bg-[#002a55] rounded-2xl p-7 text-white">
            <p className="text-blue-300 text-xs font-semibold tracking-widest uppercase mb-5">
              Key facts
            </p>
            <div className="space-y-5">
              {[
                { icon: <CheckCircle className="w-5 h-5 text-[#00a3e0]" />, value: '10+',        label: 'Years of experience' },
                { icon: <Globe       className="w-5 h-5 text-[#00a3e0]" />, value: 'Global',      label: 'Export capability' },
                { icon: <FlaskConical className="w-5 h-5 text-[#00a3e0]" />, value: '70+',       label: 'EN & ASTM tests passed' },
                { icon: <Leaf        className="w-5 h-5 text-[#00a3e0]" />, value: 'Net Zero',    label: 'Track — 2 yrs ahead of target' },
                { icon: <Users       className="w-5 h-5 text-[#00a3e0]" />, value: 'Direct / Contract / Public Sector', label: 'Order fulfilment' },
              ].map((s) => (
                <div key={s.value + s.label} className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">{s.icon}</div>
                  <div>
                    <div className="font-bold text-white leading-tight">{s.value}</div>
                    <div className="text-blue-300 text-sm">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#00a3e0] mb-3">Our Services</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Trusted by diverse industries globally</h2>
          <p className="text-gray-500 mb-10 max-w-xl">
            From consultancy and bespoke manufacturing to global export — we deliver end-to-end cleaning solutions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <ClipboardList className="w-6 h-6 text-[#003d7a]" />,
                title: 'Cleaning Consultancy',
                tag: 'Hygiene specialists',
                body: 'Sky Chemicals is able to facilitate any specific requirements you may have, and can create products to your specifications. We can cater for realising your retail, distribution or wholesaling ideas in a professional and cost effective manner.',
              },
              {
                icon: <Ship className="w-6 h-6 text-[#003d7a]" />,
                title: 'Overseas Shipping',
                tag: 'Export division',
                body: 'Our export arm is experienced in getting our goods into other countries. We understand our overseas customers need to have confidence in the goods they receive, and therefore provide only the highest standard of product.',
              },
              {
                icon: <Factory className="w-6 h-6 text-[#003d7a]" />,
                title: 'Manufacturing & R&D',
                tag: 'Concept to product',
                body: 'Our experience in manufacturing brings expertise and efficiency to a range of processes, providing cost-effective, bulk quantities of products to a range of customers. Available with custom packaging, we are able to meet your requirements. Our in-house R&D delivers bespoke solutions from concept to finished product.',
              },
            ].map((svc) => (
              <div key={svc.title} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col">
                <div className="mb-4">{svc.icon}</div>
                <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1">{svc.tag}</p>
                <h3 className="font-bold text-gray-900 text-lg mb-3">{svc.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">{svc.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sustainability ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#00a3e0] mb-3">Sustainability</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Formulated with care for the user and environment
        </h2>
        <p className="text-gray-500 mb-10 max-w-xl">
          Sustainability is not an afterthought — it is built into our company ethos and underpins every
          product we develop.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#002a55] rounded-xl p-7 text-white">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-5 h-5 text-[#00a3e0]" />
              <h3 className="font-bold text-lg">Environment</h3>
            </div>
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-300 mb-3">
              The forefront of everything we do
            </p>
            <p className="text-blue-200 text-sm leading-relaxed">
              Sustainability is fundamental to what we do. It&apos;s built into our company ethos and strongly
              underpins our product development. We are on track for Net Zero 2 years ahead of target.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-7">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-[#003d7a]" />
              <h3 className="font-bold text-gray-900 text-lg">Social Value</h3>
            </div>
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-3">
              EDI & Modern Slavery commitment
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Sky Chemicals brings a strong social value through its Equality, Diversity and Inclusion policy,
              including a zero tolerance to discrimination. Our supply chain is evaluated through Modern
              Slavery Assessments and audit schedules.
            </p>
          </div>
        </div>
      </section>

      {/* ── Accreditations ── */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#00a3e0] mb-3">Accreditations</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10">Verified standards &amp; certifications</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {accreditations.map((acc) => (
              <div key={acc.code} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="w-12 h-12 bg-[#003d7a] rounded-xl flex items-center justify-center text-white font-bold text-sm mb-4">
                  {acc.code}
                </div>
                <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1">{acc.body}</p>
                <h3 className="font-bold text-gray-900 mb-3">{acc.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{acc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#00a3e0] mb-3">Our People</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10">Meet the Team</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {team.map((member) => (
            <div key={member.name} className="bg-gray-50 border border-gray-100 rounded-xl p-5 text-center">
              <div className="w-14 h-14 rounded-full bg-[#003d7a] flex items-center justify-center text-white font-bold text-base mx-auto mb-3">
                {member.initials}
              </div>
              <div className="font-semibold text-gray-900 text-sm leading-snug">{member.name}</div>
              <div className="text-xs text-gray-500 mt-0.5">{member.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA strip ── */}
      <section className="bg-[#002a55] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-1">Ready to work with us?</h3>
            <p className="text-blue-300 text-sm">Contact our team to discuss your requirements.</p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 bg-[#00a3e0] text-white font-semibold px-7 py-3 rounded-lg hover:bg-white hover:text-[#003d7a] transition-colors text-sm"
          >
            Get in touch
          </Link>
        </div>
      </section>

    </div>
  );
}
