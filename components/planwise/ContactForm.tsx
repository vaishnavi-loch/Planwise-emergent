'use client';
import { useActionState } from 'react';
import { submitContact, type ContactState } from '@/app/actions';
import type { ContactFormJson } from '@/lib/content';
import { Loader2, CheckCircle2 } from 'lucide-react';

const initial: ContactState = { ok: false, errors: {} };

interface Props { form: ContactFormJson }

export default function ContactForm({ form }: Props) {
  const [state, action, pending] = useActionState(submitContact, initial);

  if (state.ok) {
    return (
      <div className="rounded-2xl border-2 border-pillar-purpose bg-pillar-purpose/5 p-8 text-center" role="status" aria-live="polite">
        <CheckCircle2 className="w-12 h-12 mx-auto text-pillar-purpose" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-semibold text-navy">{state.message}</h3>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5" noValidate>
      {form.fields.map((f) => {
        const errorId = `err-${f.name}`;
        const err = state.errors[f.name];
        const describedBy = err ? errorId : undefined;
        const required = f.required;
        const labelEl = (
          <label htmlFor={f.name} className="block text-base font-semibold text-navy mb-1">
            {f.label}{required && <span aria-hidden="true" className="text-pillar-where-how"> *</span>}
          </label>
        );
        if (f.type === 'textarea') {
          return (
            <div key={f.name}>
              {labelEl}
              <textarea id={f.name} name={f.name} required={required} rows={4} placeholder={f.placeholder}
                aria-describedby={describedBy} aria-invalid={err ? 'true' : undefined}
                className="w-full rounded-md border border-navy/20 px-3 py-2 text-navy placeholder:text-navy/40 focus:border-navy focus:ring-2 focus:ring-navy/20" />
              {err && <p id={errorId} className="mt-1 text-base text-pillar-where-how">{err}</p>}
            </div>
          );
        }
        if (f.type === 'select') {
          return (
            <div key={f.name}>
              {labelEl}
              <select id={f.name} name={f.name} required={required} defaultValue=""
                aria-describedby={describedBy} aria-invalid={err ? 'true' : undefined}
                className="w-full rounded-md border border-navy/20 px-3 py-2 text-navy focus:border-navy focus:ring-2 focus:ring-navy/20">
                <option value="" disabled>Select an option</option>
                {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
              {err && <p id={errorId} className="mt-1 text-base text-pillar-where-how">{err}</p>}
            </div>
          );
        }
        if (f.type === 'checkbox-group') {
          return (
            <fieldset key={f.name}>
              <legend className="block text-base font-semibold text-navy mb-2">{f.label}</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {f.options?.map((o) => (
                  <label key={o} className="flex items-center gap-2 text-navy">
                    <input type="checkbox" name={f.name} value={o} className="w-4 h-4 rounded border-navy/40 text-navy focus:ring-navy" />
                    <span className="text-base">{o}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          );
        }
        return (
          <div key={f.name}>
            {labelEl}
            <input id={f.name} name={f.name} type={f.type} required={required} placeholder={f.placeholder}
              aria-describedby={describedBy} aria-invalid={err ? 'true' : undefined}
              className="w-full rounded-md border border-navy/20 px-3 py-2 text-navy placeholder:text-navy/40 focus:border-navy focus:ring-2 focus:ring-navy/20" />
            {err && <p id={errorId} className="mt-1 text-base text-pillar-where-how">{err}</p>}
          </div>
        );
      })}

      <button type="submit" disabled={pending} className="inline-flex items-center gap-2 rounded-full bg-pillar-purpose text-white font-semibold px-6 py-3 hover:bg-pillar-purpose/90 focus-visible:ring-2 focus-visible:ring-pillar-purpose focus-visible:ring-offset-2 disabled:opacity-60">
        {pending && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
        {pending ? 'Sending…' : form.submitLabel}
      </button>
    </form>
  );
}
