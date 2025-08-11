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
      console.log('Attempting login...');
      const res = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // This is crucial for cookies to work
      });

      console.log('Login response status:', res.status);
      console.log('Login response headers:', Object.fromEntries(res.headers.entries()));

      if (res.ok) {
        const data = await res.json();
        console.log('Login successful:', data);
        console.log('Redirecting to:', callbackUrl);
        router.replace(callbackUrl);
      } else {
        const errorData = await res.json();
        console.log('Login failed:', errorData);
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Something went wrong.');
    } finally {
      setIsPending(false);
    }
  }

  return (
    <section className="flex items-center justify-center min-h-screen hero-gradient">
      <form
        onSubmit={handleSubmit}
        className="card px-8 py-10 w-full max-w-md animate-fade-in"
      >
        <h1 className="mb-6 text-2xl font-bold text-center text-primary-900 animate-slide-up" style={{ animationDelay: '200ms' }}>
          Please log in to continue.
        </h1>
        <div className="mb-4 animate-slide-up" style={{ animationDelay: '300ms' }}>
          <label htmlFor="email" className="block text-xs font-semibold text-primary-700 mb-2">
            Email
          </label>
          <div className="relative">
            <AtSymbolIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary-400" />
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email address"
              className="input-field pl-10 pr-3"
            />
          </div>
        </div>
        <div className="mb-4 animate-slide-up" style={{ animationDelay: '400ms' }}>
          <label htmlFor="password" className="block text-xs font-semibold text-primary-700 mb-2">
            Password
          </label>
          <div className="relative">
            <KeyIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary-400" />
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              placeholder="Enter password"
              className="input-field pl-10 pr-3"
            />
          </div>
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <button
            type="submit"
            className="w-full btn-primary py-2 rounded flex items-center justify-center font-semibold transition-all duration-300 hover:scale-105 animate-slide-up"
            style={{ animationDelay: '500ms' }}
            disabled={isPending}
            >
            Log in
            <ArrowRightIcon className="ml-2 h-5 w-5 text-white" />
        </button>
        {/* Error Message */}
        <div
          className="flex items-center min-h-[24px] mt-2"
          aria-live="polite"
          aria-atomic="true"
        >
          {error && (
            <div className="flex items-center animate-slide-up">
              <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-1" />
              <span className="text-sm text-red-500">{error}</span>
            </div>
          )}
        </div>
        

      </form>
    </section>
  );
}
