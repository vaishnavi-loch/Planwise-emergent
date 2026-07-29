import { Compass, UsersRound, Home, HeartHandshake, type LucideIcon } from 'lucide-react';
import PageMDX from '@/components/planwise/PageMDX';
import FadeInSection from '@/components/planwise/FadeInSection';

interface Props { items: string[] }

const icons: LucideIcon[] = [Compass, UsersRound, Home, HeartHandshake];
const badgeClasses = [
  'bg-pillar-purpose/10 text-pillar-purpose',
  'bg-pillar-legal-financial/10 text-pillar-legal-financial',
  'bg-pillar-mind-body/10 text-pillar-mind-body',
  'bg-pillar-where-how/10 text-pillar-where-how'
];

export default function SituationCards({ items }: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((block, i) => {
        const Icon = icons[i % icons.length];
        return (
          <FadeInSection key={i} delay={i * 0.1}>
            <div className="h-full rounded-2xl bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
              <div className={`grid h-14 w-14 place-items-center rounded-full ${badgeClasses[i % badgeClasses.length]}`}>
                <Icon className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="mt-5 [&_p]:my-2 [&_p:first-child]:mt-0 [&_p]:text-navy/80 [&_strong]:text-lg [&_strong]:font-semibold [&_strong]:text-navy">
                <PageMDX source={block} />
              </div>
            </div>
          </FadeInSection>
        );
      })}
    </div>
  );
}
