import { getProcessSteps } from '@/lib/content';
import { PhoneCall, ClipboardList, Users, RefreshCw, type LucideIcon } from 'lucide-react';
import FadeInSection from '@/components/planwise/FadeInSection';

const icons: Record<string, LucideIcon> = { PhoneCall, ClipboardList, Users, RefreshCw };
const badgeClasses = [
  'bg-pillar-purpose/10 text-pillar-purpose',
  'bg-pillar-legal-financial/10 text-pillar-legal-financial',
  'bg-pillar-mind-body/10 text-pillar-mind-body',
  'bg-pillar-where-how/10 text-pillar-where-how'
];

export default function ProcessSteps() {
  const items = getProcessSteps();
  return (
    <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      <div className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-px bg-navy/10 -z-10" aria-hidden="true" />
      {items.map((item, i) => {
        const Icon = icons[item.icon];
        return (
          <FadeInSection key={item.title} delay={i * 0.1}>
            <div className="flex flex-col items-center text-center">
              <div className={`relative grid h-14 w-14 shrink-0 place-items-center rounded-full ring-4 ring-white ${badgeClasses[i % badgeClasses.length]}`}>
                {Icon ? <Icon className="w-6 h-6" aria-hidden="true" /> : null}
                <span className="absolute -top-2 -right-2 grid h-6 w-6 place-items-center rounded-full bg-navy text-xs font-bold text-white shadow-sm">
                  {i + 1}
                </span>
              </div>
              <h4 className="mt-5 text-lg font-semibold text-navy">{item.title}</h4>
              <p className="mt-2 text-navy/80 text-base leading-relaxed max-w-xs">{item.body}</p>
            </div>
          </FadeInSection>
        );
      })}
    </div>
  );
}
