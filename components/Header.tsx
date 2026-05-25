'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cartContext';
import { useAuth } from '@/lib/authContext';
import { ShoppingCart, User, Menu, X, LogOut, LayoutDashboard, Package } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { totalItems, openCart } = useCart();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="bg-[#003d7a] text-white shadow-lg sticky top-0 z-40">
      {/* Top bar */}
      <div className="bg-[#002a55] text-xs text-blue-200 py-1.5 px-4 text-center hidden sm:block">
        🇬🇧 UK-wide delivery · Free shipping on orders over £75 · Call us: 0114 555 0100
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-[#00a3e0] rounded-lg flex items-center justify-center text-white font-bold text-lg shadow">
            S
          </div>
          <div className="leading-tight">
            <div className="font-bold text-lg tracking-tight">Sky Chemicals</div>
            <div className="text-[10px] text-blue-300 -mt-0.5 hidden sm:block">UK Ltd</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <Link href="/products" className="text-blue-100 hover:text-white transition-colors">
            Products
          </Link>
          <Link href="/products?category=infection-control" className="text-blue-100 hover:text-white transition-colors">
            Infection Control
          </Link>
          <Link href="/products?category=animal-care" className="text-blue-100 hover:text-white transition-colors">
            Animal Care
          </Link>
          <Link href="/about" className="text-blue-100 hover:text-white transition-colors">
            About
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Cart button */}
          <button
            onClick={openCart}
            className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#00a3e0] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </button>

          {/* User menu */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-colors text-sm"
              >
                <div className="w-7 h-7 bg-[#00a3e0] rounded-full flex items-center justify-center text-xs font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:block max-w-24 truncate">{user.name.split(' ')[0]}</span>
              </button>

              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute right-0 mt-1 w-52 bg-white rounded-xl shadow-xl py-1 z-20 text-gray-800">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <div className="font-medium text-sm">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                    <Link
                      href="/account"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
                    >
                      <User className="w-4 h-4 text-gray-400" />
                      My Account
                    </Link>
                    <Link
                      href="/account/orders"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
                    >
                      <Package className="w-4 h-4 text-gray-400" />
                      My Orders
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        href="/admin"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 text-blue-700"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Admin Dashboard
                      </Link>
                    )}
                    <hr className="my-1 border-gray-100" />
                    <button
                      onClick={() => { logout(); setUserMenuOpen(false); }}
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 text-red-600 w-full"
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
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-[#00a3e0] rounded-lg hover:bg-[#0090c5] transition-colors"
            >
              <User className="w-4 h-4" />
              Sign In
            </Link>
          )}

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="md:hidden bg-[#002a55] border-t border-blue-800 px-4 py-3 space-y-1">
          <Link href="/products" onClick={() => setMenuOpen(false)} className="block py-2 text-sm text-blue-100 hover:text-white">All Products</Link>
          <Link href="/products?category=infection-control" onClick={() => setMenuOpen(false)} className="block py-2 text-sm text-blue-100 hover:text-white">Infection Control</Link>
          <Link href="/products?category=animal-care" onClick={() => setMenuOpen(false)} className="block py-2 text-sm text-blue-100 hover:text-white">Animal Care</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)} className="block py-2 text-sm text-blue-100 hover:text-white">About</Link>
          {!user && (
            <Link href="/account/login" onClick={() => setMenuOpen(false)} className="block py-2 text-sm text-[#00a3e0] font-medium">Sign In / Register</Link>
          )}
        </div>
      )}
    </header>
  );
}
