import Link from 'next/link';
import Image from 'next/image';
import { getSite } from '@/lib/content';
import { ArrowRight } from 'lucide-react';

const pillarClasses: Record<string, string> = {
  purpose: 'text-pillar-purpose border-pillar-purpose',
  'mind-and-body': 'text-pillar-mind-body border-pillar-mind-body',
  'legal-and-financial': 'text-pillar-legal-financial border-pillar-legal-financial',
  'where-and-how-you-live': 'text-pillar-where-how border-pillar-where-how'
};

export default function PillarCards() {
  const site = getSite();
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {site.pillars.map((p, i) => (
        <Link
          key={p.slug}
          href={`/pillars/${p.slug}`}
          className={`group relative rounded-2xl border-2 bg-white p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-200 ${pillarClasses[p.slug]}`}
        >
          <span className="absolute -top-3 -left-3 grid h-9 w-9 place-items-center rounded-full bg-white text-xs font-bold shadow-md ring-2 ring-current">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-navy/5 mb-4 ring-1 ring-navy/5">
            <Image
              src={p.illustration}
              alt={`${p.name} illustration`}
              width={400}
              height={300}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <h3 className="text-xl font-semibold">{p.name}</h3>
          <div className="mt-3 inline-flex items-center gap-1 text-base font-medium">
            Learn more <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </div>
        </Link>
      ))}
    </div>
  );
}
