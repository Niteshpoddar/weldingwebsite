'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AtSymbolIcon, KeyIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

export default function AdminLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin/dashboard';

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setIsPending(true);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const res = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.replace(callbackUrl);
      } else {
        setError('Invalid credentials');
      }
    } catch {
      setError('Something went wrong.');
    } finally {
      setIsPending(false);
    }
  }

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-xl px-8 py-10 w-full max-w-md"
      >
        <h1 className="mb-6 text-2xl font-bold text-center">Please log in to continue.</h1>
        <div className="mb-4">
          <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-2">
            Email
          </label>
          <div className="relative">
            <AtSymbolIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email address"
              className="block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-xs font-semibold text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <KeyIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              placeholder="Enter password"
              className="block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <button
            type="submit"
            className="w-full bg-gray-700 hover:bg-gray-900 text-white py-2 rounded flex items-center justify-center font-semibold transition"
            disabled={isPending}
            >
            Log in
            <ArrowRightIcon className="ml-2 h-5 w-5 text-gray-50" />
        </button>
        {/* Error Message */}
        <div
          className="flex items-center min-h-[24px] mt-2"
          aria-live="polite"
          aria-atomic="true"
        >
          {error && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-1" />
              <span className="text-sm text-red-500">{error}</span>
            </>
          )}
        </div>
      </form>
    </section>
  );
}
