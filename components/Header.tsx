'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/cartContext';
import { useAuth } from '@/lib/authContext';
import {
  ShoppingCart, User, Menu, X, LogOut,
  LayoutDashboard, Package, ChevronDown,
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const NAV: { label: string; href?: string; children?: { label: string; href: string; desc: string }[] }[] = [
  {
    label: 'Products',
    children: [
      { label: 'All Products',              href: '/products',                desc: 'Browse the full product catalogue' },
      { label: 'Peracide®',                 href: '/peracide',                desc: 'ISPAA disinfectant range & documents' },
      { label: 'Detergents & Janitorial',   href: '/detergents-janitorial',   desc: 'Full cleaning product range with filters' },
    ],
  },
  { label: 'About',    href: '/about' },
  { label: 'Contact',  href: '/contact' },
];

export default function Header() {
  const { totalItems, openCart } = useCart();
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  return (
    <header className="bg-[#003d7a] text-white shadow-md sticky top-0 z-40">
      {/* Utility bar */}
      <div className="bg-[#002a55] border-b border-white/5 text-xs text-blue-300 py-1.5 px-4 text-center hidden sm:block">
        UK-wide delivery &nbsp;·&nbsp; Free shipping on orders over £75 &nbsp;·&nbsp; Tel: 0114 555 0100 &nbsp;·&nbsp; info@skychemicals.co.uk
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logo.svg"
            alt="Sky Chemicals UK Ltd"
            width={130}
            height={74}
            className="h-10 w-auto brightness-0 invert"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav ref={dropdownRef} className="hidden md:flex items-center gap-1 text-sm font-medium">
          {NAV.map((item) =>
            item.children ? (
              <div key={item.label} className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                    openDropdown === item.label ? 'bg-white/15 text-white' : 'text-blue-100 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                </button>

                {openDropdown === item.label && (
                  <div className="absolute left-0 top-full mt-1 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpenDropdown(null)}
                        className={`block px-4 py-3 hover:bg-gray-50 transition-colors ${isActive(child.href) ? 'bg-blue-50' : ''}`}
                      >
                        <div className={`font-semibold text-sm ${isActive(child.href) ? 'text-[#003d7a]' : 'text-gray-800'}`}>
                          {child.label}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">{child.desc}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  isActive(item.href!) ? 'bg-white/15 text-white' : 'text-blue-100 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          {/* Cart */}
          <button
            onClick={openCart}
            className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#00a3e0] text-white text-[10px] rounded-full w-4.5 h-4.5 min-w-[18px] min-h-[18px] flex items-center justify-center font-bold leading-none px-1">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </button>

          {/* User */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:bg-white/10 transition-colors text-sm"
              >
                <div className="w-7 h-7 bg-[#00a3e0] rounded-full flex items-center justify-center text-xs font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:block max-w-[6rem] truncate text-blue-100">{user.name.split(' ')[0]}</span>
                <ChevronDown className="w-3.5 h-3.5 text-blue-300 hidden sm:block" />
              </button>

              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute right-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-20 text-gray-800">
                    <div className="px-4 py-2.5 border-b border-gray-100">
                      <div className="font-semibold text-sm text-gray-900">{user.name}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{user.email}</div>
                    </div>
                    {[
                      { href: '/account',        icon: <User className="w-4 h-4" />,             label: 'My Account' },
                      { href: '/account/orders', icon: <Package className="w-4 h-4" />,          label: 'My Orders' },
                      ...(user.role === 'admin' ? [{ href: '/admin', icon: <LayoutDashboard className="w-4 h-4" />, label: 'Admin Dashboard' }] : []),
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setUserMenuOpen(false)}
                        className={`flex items-center gap-2.5 px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${item.href === '/admin' ? 'text-[#003d7a] font-medium' : 'text-gray-700'}`}
                      >
                        <span className="text-gray-400">{item.icon}</span>
                        {item.label}
                      </Link>
                    ))}
                    <hr className="my-1 border-gray-100" />
                    <button
                      onClick={() => { logout(); setUserMenuOpen(false); }}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link
              href="/account/login"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
            >
              <User className="w-4 h-4" />
              Sign In
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden bg-[#002a55] border-t border-white/10 px-4 py-3 space-y-0.5">
          <Link href="/products"              onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm text-blue-100 hover:text-white rounded-lg hover:bg-white/10">All Products</Link>
          <Link href="/peracide"              onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm text-blue-100 hover:text-white rounded-lg hover:bg-white/10">Peracide®</Link>
          <Link href="/detergents-janitorial" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm text-blue-100 hover:text-white rounded-lg hover:bg-white/10">Detergents &amp; Janitorial</Link>
          <Link href="/about"                 onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm text-blue-100 hover:text-white rounded-lg hover:bg-white/10">About</Link>
          <Link href="/contact"               onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm text-blue-100 hover:text-white rounded-lg hover:bg-white/10">Contact</Link>
          {!user && (
            <Link href="/account/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-semibold text-[#00a3e0]">Sign In</Link>
          )}
        </div>
      )}
    </header>
  );
}
