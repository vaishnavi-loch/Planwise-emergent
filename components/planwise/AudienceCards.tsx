import { getAudiences } from '@/lib/content';
import { UserRound, UsersRound, Compass, type LucideIcon } from 'lucide-react';
import FadeInSection from '@/components/planwise/FadeInSection';

const icons: Record<string, LucideIcon> = { UserRound, UsersRound, Compass };
const badgeClasses = [
  'bg-pillar-purpose/10 text-pillar-purpose',
  'bg-pillar-legal-financial/10 text-pillar-legal-financial',
  'bg-pillar-mind-body/10 text-pillar-mind-body'
];

export default function AudienceCards() {
  const items = getAudiences();
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {items.map((item, i) => {
        const Icon = icons[item.icon];
        return (
          <FadeInSection key={item.title} delay={i * 0.1}>
            <div className="h-full rounded-2xl bg-white p-6 md:p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
              <div className={`grid h-14 w-14 place-items-center rounded-full ${badgeClasses[i % badgeClasses.length]}`}>
                {Icon ? <Icon className="w-6 h-6" aria-hidden="true" /> : null}
              </div>
              <h4 className="mt-5 text-lg font-semibold text-navy">{item.title}</h4>
              <p className="mt-2 text-navy/80 text-base leading-relaxed">{item.body}</p>
            </div>
          </FadeInSection>
        );
      })}
    </div>
  );
}
