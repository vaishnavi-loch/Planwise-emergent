'use server';

import { z } from 'zod';
import { getContactForm } from '@/lib/content';
import { track } from '@/lib/tracking';

const GOOGLE_SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxdo17_jtCYGzZqA_zDEXO-gOWKlZkcKaz2Rn5yyRGCIpsv5tsL3HuU11y6qWxlQRDgsg/exec';
const GOOGLE_SHEETS_SECRET = 'qwerty';

const schema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().email('Please enter a valid email address'),
  phone: z.string().trim().min(1, 'Phone number is required'),
  location: z.string().trim().min(1, 'Location is required'),
  ageGroup: z.string().trim().min(1, 'Age group is required'),
  topics: z.array(z.string()).optional().default([]),
  message: z.string().trim().min(1, 'Please tell us how we can help')
});

export type ContactState = {
  ok: boolean;
  errors: Partial<Record<string, string>>;
  message?: string;
};

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const raw = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    phone: String(formData.get('phone') ?? ''),
    location: String(formData.get('location') ?? ''),
    ageGroup: String(formData.get('ageGroup') ?? ''),
    topics: formData.getAll('topics').map(String),
    message: String(formData.get('message') ?? '')
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'form');
      if (!errors[key]) errors[key] = issue.message;
    }
    return { ok: false, errors };
  }

  // CRM delivery seam — wire to Splose when SPLOSE_API_KEY is set.
  const spKey = process.env.SPLOSE_API_KEY;
  if (spKey) {
    try {
      // Placeholder POST body. Adjust to the CRM's contract when integrating.
      await fetch('https://api.splose.example/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${spKey}` },
        body: JSON.stringify(parsed.data)
      });
    } catch {
      // Do not surface CRM errors to the visitor — log-only and continue.
    }
  } else {
    // eslint-disable-next-line no-console
    console.log('[contact:noop]', getContactForm().trackingForm, parsed.data);
  }

  // Google Sheet delivery — Apps Script web app, see scripts/apps-script-contact-to-sheet.gs.
  try {
    await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...parsed.data, secret: GOOGLE_SHEETS_SECRET })
    });
  } catch {
    // Do not surface Sheets errors to the visitor — log-only and continue.
  }

  track({ name: 'form_submit', form: 'discovery_call', page: '/contact' });

  return { ok: true, errors: {}, message: 'Thank you — we will be in touch shortly.' };
}
