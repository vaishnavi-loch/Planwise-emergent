import { NextResponse } from 'next/server';

// ESP seam. Env-gated like lib/tracking.ts — no email provider is wired up yet.
// Once a subscription tool is chosen, set NEWSLETTER_ENDPOINT to its API URL
// (and add any required auth header below) and signups will start forwarding there.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === 'string' ? body.email.trim() : '';

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const endpoint = process.env.NEWSLETTER_ENDPOINT;
  if (!endpoint) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.log('[newsletter:noop]', email);
    }
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    if (!res.ok) throw new Error(`Newsletter endpoint responded ${res.status}`);
  } catch {
    return NextResponse.json({ error: 'Something went wrong. Please try again later.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
