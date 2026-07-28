import { getMemberships } from '@/lib/content';

export default function WhichOptionCards() {
  const { tiers } = getMemberships();
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {tiers.map((t, i) => (
        <div
          key={t.id}
          className="relative rounded-2xl border border-navy/10 bg-white p-6 md:p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
        >
          <span className="absolute -top-3 -left-3 grid h-9 w-9 place-items-center rounded-full bg-navy text-xs font-bold text-white shadow-md">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className="text-lg font-semibold text-navy">{t.name}</h3>
          <p className="mt-3 text-navy/80 text-base leading-relaxed">{t.whichOptionSummary}</p>
        </div>
      ))}
    </div>
  );
}
