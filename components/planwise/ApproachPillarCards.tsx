import Image from 'next/image';
import { getSite } from '@/lib/content';
import PageMDX from '@/components/planwise/PageMDX';

interface Item { title: string; body: string }
interface Props { items: Item[] }

const pillarClasses: Record<string, string> = {
  purpose: 'border-t-pillar-purpose',
  'mind-and-body': 'border-t-pillar-mind-body',
  'legal-and-financial': 'border-t-pillar-legal-financial',
  'where-and-how-you-live': 'border-t-pillar-where-how'
};

export default function ApproachPillarCards({ items }: Props) {
  const { pillars } = getSite();
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, i) => {
        const pillar = pillars[i];
        return (
          <div
            key={item.title}
            className={`rounded-2xl border border-navy/10 border-t-4 ${pillarClasses[pillar?.slug] ?? 'border-t-navy'} bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200`}
          >
            {pillar ? (
              <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-navy/5 mb-4 ring-1 ring-navy/5">
                <Image
                  src={pillar.illustration}
                  alt={`${pillar.name} illustration`}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : null}
            <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
            <div className="mt-2 [&_p]:my-2 [&_p]:text-base">
              <PageMDX source={item.body} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
