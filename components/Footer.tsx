import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';

const productLinks = [
  { label: 'All Products',            href: '/products' },
  { label: 'Peracide® Range',         href: '/peracide' },
  { label: 'Detergents & Janitorial', href: '/detergents-janitorial' },
  { label: 'Infection Control',       href: '/products?category=infection-control' },
  { label: 'Animal Care',             href: '/products?category=animal-care' },
  { label: 'Hand Care',               href: '/products?category=hand-care' },
];

const companyLinks = [
  { label: 'About Us',        href: '/about' },
  { label: 'Our Services',    href: '/about#services' },
  { label: 'Sustainability',  href: '/about#sustainability' },
  { label: 'Accreditations',  href: '/about#accreditations' },
  { label: 'Meet the Team',   href: '/about#team' },
  { label: 'Contact',         href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-[#001d3d] text-blue-200">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" className="inline-block mb-5">
            <Image
              src="/logo.svg"
              alt="Sky Chemicals UK Ltd"
              width={160}
              height={90}
              className="h-12 w-auto brightness-0 invert"
            />
          </Link>
          <p className="text-sm text-blue-300 leading-relaxed mb-5 max-w-xs">
            UK manufacturer and supplier of professional cleaning and disinfection products. Serving
            healthcare, hospitality, agriculture and industry since 2013.
          </p>
          <ul className="space-y-2.5 text-sm">
            <li className="flex items-center gap-2">
              <Phone  className="w-4 h-4 text-[#00a3e0] shrink-0" />
              <span>0114 555 0100</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail   className="w-4 h-4 text-[#00a3e0] shrink-0" />
              <span>info@skychemicals.co.uk</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#00a3e0] shrink-0" />
              <span>Sheffield, South Yorkshire, UK</span>
            </li>
          </ul>
        </div>

        {/* Products */}
        <div>
          <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Products</h3>
          <ul className="space-y-2 text-sm">
            {productLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Company</h3>
          <ul className="space-y-2 text-sm">
            {companyLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Account</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/account/login"    className="hover:text-white transition-colors">Sign In</Link></li>
            <li><Link href="/account/register" className="hover:text-white transition-colors">Register</Link></li>
            <li><Link href="/account/orders"   className="hover:text-white transition-colors">Order History</Link></li>
            <li><Link href="/cart"             className="hover:text-white transition-colors">Shopping Cart</Link></li>
          </ul>

          <div className="mt-6 bg-[#003d7a]/60 border border-white/10 rounded-xl p-4">
            <p className="text-xs text-blue-300 mb-2 font-medium">Need a quote?</p>
            <Link
              href="/contact"
              className="block text-center text-xs font-semibold bg-[#00a3e0] text-white px-4 py-2 rounded-lg hover:bg-white hover:text-[#003d7a] transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-blue-400">
        <span>© {new Date().getFullYear()} Sky Chemicals UK Ltd. All rights reserved. Registered in England &amp; Wales.</span>
        <div className="flex gap-5">
          <Link href="/privacy" className="hover:text-blue-200 transition-colors">Privacy Policy</Link>
          <Link href="/terms"   className="hover:text-blue-200 transition-colors">Terms of Use</Link>
          <Link href="/contact" className="hover:text-blue-200 transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
