"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const sendOtp = async () => {
    if (!name || !contact || !password) {
      setMessage('Please fill in your full name, phone number and password.');
      return;
    }

    setSubmitting(true);
    setMessage('Sending SMS verification...');

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not create account.');

      setOtpSent(true);
      setMessage('OTP sent to your phone number. Please enter it below.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unexpected error.');
    } finally {
      setSubmitting(false);
    }
  };

  const completeSignup = async () => {
    if (!otp) {
      setMessage('Please enter the SMS OTP.');
      return;
    }

    setSubmitting(true);
    setMessage('Verifying your number...');

    try {
      const res = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact, otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Verification failed.');

      setMessage('Account created successfully. You can now sign in.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unexpected error.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-rhody-cream px-4 py-10">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-luxury">
        <div className="mb-6 text-center">
          <div className="mb-3 inline-flex rounded-full bg-rhody-gold px-3 py-1 text-xs font-bold uppercase tracking-[0.3em] text-rhody-navy">
            House of Rhody
          </div>
          <h1 className="font-display text-4xl font-black text-rhody-navy">Create account</h1>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-rhody-brown">Full name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl bg-rhody-cream px-4 py-3" placeholder="Enter your full name" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-rhody-brown">Phone number</label>
            <input type="tel" value={contact} onChange={(e) => setContact(e.target.value)} className="w-full rounded-xl bg-rhody-cream px-4 py-3" placeholder="e.g. +2348123456789" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-rhody-brown">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl bg-rhody-cream px-4 py-3" placeholder="Enter password" />
          </div>

          {!otpSent ? (
            <button
              type="button"
              disabled={submitting}
              onClick={sendOtp}
              className="w-full rounded-full bg-rhody-gold px-4 py-3 font-bold text-rhody-navy transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? 'Sending...' : 'Send SMS OTP'}
            </button>
          ) : (
            <>
              <div>
                <label className="mb-2 block text-sm font-semibold text-rhody-brown">SMS verification code</label>
                <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full rounded-xl bg-rhody-cream px-4 py-3" placeholder="Enter the 6-digit code" />
              </div>

              <button
                type="button"
                disabled={submitting}
                onClick={completeSignup}
                className="w-full rounded-full bg-rhody-navy px-4 py-3 font-bold text-rhody-cream transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Verifying...' : 'Complete signup'}
              </button>
            </>
          )}

          {message ? <p className="rounded-xl bg-rhody-cream p-3 text-sm text-rhody-brown">{message}</p> : null}

          <p className="text-center text-sm text-rhody-brown">
            Already have an account?{' '}
            <Link href="/" className="font-bold text-rhody-gold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
