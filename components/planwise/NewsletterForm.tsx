'use client';
import { useState, type FormEvent } from 'react';
import { track } from '@/lib/tracking';

interface Props { buttonLabel: string }

export default function NewsletterForm({ buttonLabel }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus('error');
        setErrorMessage(data.error ?? 'Something went wrong. Please try again.');
        return;
      }
      track({ name: 'form_submit', form: 'newsletter', page: typeof window !== 'undefined' ? window.location.pathname : '' });
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return <p className="mt-3 text-base font-medium">Thanks for subscribing — you're on the list.</p>;
  }

  return (
    <form className="mt-3 flex flex-col gap-2" onSubmit={handleSubmit}>
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="px-3 py-2 rounded-md text-navy text-base"
      />
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="bg-pillar-purpose text-white text-base font-semibold px-4 py-2 rounded-md hover:opacity-90 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Submitting…' : buttonLabel}
      </button>
      {status === 'error' && <p className="text-base text-destructive" role="alert">{errorMessage}</p>}
    </form>
  );
}
