import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#002a55] text-blue-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <Link href="/" className="inline-block mb-4">
            <Image
              src="/logo.svg"
              alt="Sky Chemicals UK Ltd"
              width={160}
              height={90}
              className="h-14 w-auto brightness-0 invert"
            />
          </Link>
          <p className="text-sm leading-relaxed text-blue-300">
            Professional cleaning and disinfection products for healthcare, hospitality, animal care and more. Trusted by businesses across the UK.
          </p>
        </div>

        {/* Products */}
        <div>
          <h3 className="text-white font-semibold mb-3">Product Categories</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/products?category=infection-control" className="hover:text-white transition-colors">Infection Control</Link></li>
            <li><Link href="/products?category=floor-carpet" className="hover:text-white transition-colors">Floor & Carpet</Link></li>
            <li><Link href="/products?category=washroom-toilet" className="hover:text-white transition-colors">Washroom & Toilet</Link></li>
            <li><Link href="/products?category=animal-care" className="hover:text-white transition-colors">Animal Care</Link></li>
            <li><Link href="/products?category=hand-care" className="hover:text-white transition-colors">Hand Care</Link></li>
            <li><Link href="/products?category=catering-kitchen" className="hover:text-white transition-colors">Catering & Kitchen</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/about#manufacturing" className="hover:text-white transition-colors">Manufacturing</Link></li>
            <li><Link href="/about#certifications" className="hover:text-white transition-colors">Certifications</Link></li>
            <li><Link href="/account/login" className="hover:text-white transition-colors">My Account</Link></li>
            <li><Link href="/account/orders" className="hover:text-white transition-colors">Order History</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Phone className="w-4 h-4 mt-0.5 text-[#00a3e0] shrink-0" />
              <span>0114 555 0100</span>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="w-4 h-4 mt-0.5 text-[#00a3e0] shrink-0" />
              <span>info@skychemicals.co.uk</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 text-[#00a3e0] shrink-0" />
              <span>Sheffield, South Yorkshire, UK</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-blue-800 py-5 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-blue-400">
        <span>© {new Date().getFullYear()} Sky Chemicals UK Ltd. All rights reserved.</span>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-blue-200">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-blue-200">Terms of Use</Link>
          <Link href="/contact" className="hover:text-blue-200">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
