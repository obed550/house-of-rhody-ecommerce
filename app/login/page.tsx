"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState({
    contact: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'error' | 'success' | 'info'>('error');
  const [showDemo, setShowDemo] = useState(false);

  useEffect(() => {
    const error = searchParams.get('error');
    if (error === 'unauthorized') {
      setMessage('⛔ Unauthorized. Only admin can access.');
      setMessageType('error');
    } else if (error === 'invalid') {
      setMessage('❌ Invalid session. Please login again.');
      setMessageType('error');
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async () => {
    if (!form.contact.trim() || !form.password.trim()) {
      setMessage('⚠️ Please enter both phone and password.');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(`❌ ${data.error}`);
        setMessageType('error');
        throw new Error(data.error);
      }

      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setMessage('✅ Login successful! Redirecting...');
      setMessageType('success');

      setTimeout(() => {
        if (data.user.role === 'ADMIN') {
          router.push('/admin');
        } else {
          router.push('/shop');
        }
      }, 1000);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : '❌ An unexpected error occurred'
      );
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setForm({
      contact: '+2348123456789',
      password: 'demo123',
    });
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F1E7] px-4 py-10">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-xl border-2 border-[#C9A227]/20">
        <div className="mb-6 text-center">
          <div className="mb-3 inline-flex rounded-full bg-[#C9A227] px-3 py-1 text-xs font-bold uppercase tracking-[0.3em] text-[#0E1B2A]">
            🏠 House of Rhody
          </div>
          <h1 className="font-display text-4xl font-black text-[#0E1B2A]">Sign in</h1>
          <p className="text-sm text-[#4A2E1F] mt-2">Secure login portal</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#4A2E1F]">Phone number</label>
            <input
              name="contact"
              value={form.contact}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              className="w-full rounded-xl bg-[#F7F1E7] px-4 py-3 border-2 border-[#C9A227]/20 focus:border-[#C9A227] focus:outline-none transition"
              placeholder="Enter phone number"
              disabled={loading}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#4A2E1F]">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              className="w-full rounded-xl bg-[#F7F1E7] px-4 py-3 border-2 border-[#C9A227]/20 focus:border-[#C9A227] focus:outline-none transition"
              placeholder="Enter password"
              disabled={loading}
            />
          </div>

          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="w-full rounded-full bg-[#C9A227] px-4 py-3 font-bold text-[#0E1B2A] hover:opacity-95 disabled:opacity-60 transition shadow-lg"
          >
            {loading ? '⏳ Signing in...' : '🔓 Sign in'}
          </button>

          {message && (
            <div
              className={`rounded-xl p-4 text-sm font-semibold ${
                messageType === 'error'
                  ? 'bg-red-50 text-red-600 border border-red-200'
                  : messageType === 'success'
                    ? 'bg-green-50 text-green-600 border border-green-200'
                    : 'bg-blue-50 text-blue-600 border border-blue-200'
              }`}
            >
              {message}
            </div>
          )}

          {/* Demo credentials - toggle visibility */}
          <div className="pt-4 border-t-2 border-[#C9A227]/20">
            <button
              type="button"
              onClick={() => setShowDemo(!showDemo)}
              className="w-full text-xs text-[#C9A227] font-semibold hover:underline transition"
              disabled={loading}
            >
              {showDemo ? '✕ Hide demo credentials' : '+ Show demo credentials'}
            </button>
            {showDemo && (
              <div className="mt-3 rounded-xl bg-blue-50 p-4 space-y-3 text-sm text-blue-900 border border-blue-200">
                <div>
                  <p className="font-bold mb-2 text-blue-700">📱 Demo Customer Account:</p>
                  <p className="font-mono text-xs mb-1">Phone: +2348123456789</p>
                  <p className="font-mono text-xs mb-3">Password: demo123</p>
                  <button
                    type="button"
                    onClick={fillDemoCredentials}
                    className="w-full rounded-lg bg-blue-600 text-white px-3 py-2 text-xs font-bold hover:bg-blue-700 transition"
                    disabled={loading}
                  >
                    ➜ Use Demo Account
                  </button>
                </div>
              </div>
            )}
          </div>

          <p className="text-center text-xs text-[#4A2E1F]">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => router.push('/signup')}
              className="font-bold text-[#C9A227] hover:underline"
              disabled={loading}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}
