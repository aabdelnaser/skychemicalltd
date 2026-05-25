'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { Suspense } from 'react';

function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get('redirect') || '/account';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      router.push(redirect);
    } else {
      setError(result.error || 'Login failed');
    }
  };

  const fillDemo = (role: 'admin' | 'customer') => {
    if (role === 'admin') { setEmail('admin@skychemicals.co.uk'); setPassword('admin123'); }
    else { setEmail('demo@example.com'); setPassword('demo123'); }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <Image src="/logo.svg" alt="Sky Chemicals UK Ltd" width={180} height={100} className="h-16 w-auto mx-auto" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Sign in to your account</h1>
          <p className="text-gray-500 mt-1 text-sm">Welcome back to Sky Chemicals UK Ltd</p>
        </div>

        {/* Demo credentials */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 text-sm">
          <p className="font-medium text-blue-800 mb-2">🧪 Demo accounts:</p>
          <div className="flex gap-2">
            <button onClick={() => fillDemo('customer')} className="flex-1 bg-white border border-blue-200 rounded-lg py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100 transition-colors">
              👤 Demo Customer
            </button>
            <button onClick={() => fillDemo('admin')} className="flex-1 bg-white border border-blue-200 rounded-lg py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100 transition-colors">
              🛡️ Admin User
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a3e0]"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">Password</label>
            </div>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a3e0]"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#003d7a] text-white font-bold py-3 rounded-xl hover:bg-[#00a3e0] transition-colors disabled:opacity-60"
          >
            <LogIn className="w-4 h-4" />
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          Don&apos;t have an account?{' '}
          <Link href="/account/register" className="text-[#003d7a] font-semibold hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
