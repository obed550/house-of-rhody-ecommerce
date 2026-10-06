"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    contact: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async () => {
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed.');

      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      if (data.user.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/shop');
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F1E7] px-4 py-10">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-xl">
        <div className="mb-6 text-center">
          <div className="mb-3 inline-flex rounded-full bg-[#C9A227] px-3 py-1 text-xs font-bold uppercase tracking-[0.3em] text-[#0E1B2A]">
            House of Rhody
          </div>
          <h1 className="font-display text-4xl font-black text-[#0E1B2A]">Sign in</h1>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#4A2E1F]">Phone number</label>
            <input
              name="contact"
              value={form.contact}
              onChange={handleChange}
              className="w-full rounded-xl bg-[#F7F1E7] px-4 py-3"
              placeholder="+2348000000000"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#4A2E1F]">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-xl bg-[#F7F1E7] px-4 py-3"
              placeholder="Enter password"
            />
          </div>

          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="w-full rounded-full bg-[#C9A227] px-4 py-3 font-bold text-[#0E1B2A] disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

          {message && <p className="rounded-xl bg-[#F7F1E7] p-3 text-sm text-red-600">{message}</p>}

          <div className="rounded-xl bg-blue-50 p-3 text-sm text-blue-900">
            <p className="mb-2 font-bold">Demo credentials:</p>
            <p>Admin: +2348000000000 / admin123</p>
            <p>Customer: +2348123456789 / demo123</p>
          </div>

          <p className="text-center text-sm text-[#4A2E1F]">
            Don't have an account?{' '}
            <Link href="/signup" className="font-bold text-[#C9A227]">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
