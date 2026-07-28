import { MessageCircle, Users, CheckCircle2, type LucideIcon } from 'lucide-react';

interface Step { title: string; body: string }
interface Props { items: Step[] }

const icons: LucideIcon[] = [MessageCircle, Users, CheckCircle2];
const badgeClasses = [
  'bg-pillar-purpose/10 text-pillar-purpose',
  'bg-pillar-legal-financial/10 text-pillar-legal-financial',
  'bg-pillar-mind-body/10 text-pillar-mind-body'
];

export default function ContactStepCards({ items }: Props) {
  return (
    <div className="relative grid gap-8 sm:grid-cols-3">
      <div className="hidden sm:block absolute top-7 left-[16.5%] right-[16.5%] h-px bg-navy/10 -z-10" aria-hidden="true" />
      {items.map((item, i) => {
        const Icon = icons[i % icons.length];
        return (
          <div key={item.title} className="flex flex-col items-center text-center">
            <div className={`relative grid h-14 w-14 shrink-0 place-items-center rounded-full ring-4 ring-white ${badgeClasses[i % badgeClasses.length]}`}>
              <Icon className="w-6 h-6" aria-hidden="true" />
              <span className="absolute -top-2 -right-2 grid h-6 w-6 place-items-center rounded-full bg-navy text-xs font-bold text-white shadow-sm">
                {i + 1}
              </span>
            </div>
            <h3 className="mt-5 text-lg font-semibold text-navy">{item.title}</h3>
            <p className="mt-2 text-navy/80 text-base leading-relaxed max-w-xs">{item.body}</p>
          </div>
        );
      })}
    </div>
  );
}
