import { getSite } from '@/lib/content';

const dotClasses: Record<string, string> = {
  purpose: 'bg-pillar-purpose',
  'mind-and-body': 'bg-pillar-mind-body',
  'legal-and-financial': 'bg-pillar-legal-financial',
  'where-and-how-you-live': 'bg-pillar-where-how'
};

export default function PillarConnector() {
  const { pillars } = getSite();
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4" aria-hidden="true">
      {pillars.map((p, i) => (
        <div key={p.slug} className="flex items-center gap-2 sm:gap-4">
          <div className="flex flex-col items-center gap-2">
            <span className={`h-4 w-4 rounded-full ${dotClasses[p.slug]} shadow-md`} />
            <span className="hidden sm:block text-base font-medium text-navy/60 max-w-[7rem] text-center">{p.name}</span>
          </div>
          {i < pillars.length - 1 && <span className="h-px w-6 sm:w-12 bg-navy/15" />}
        </div>
      ))}
    </div>
  );
}
