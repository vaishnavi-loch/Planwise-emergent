import { ShieldCheck, Scale, type LucideIcon } from 'lucide-react';
import PageMDX from '@/components/planwise/PageMDX';

interface Item { title: string; body: string }
interface Props { items: Item[] }

const icons: LucideIcon[] = [ShieldCheck, Scale];
const badgeClasses = ['bg-pillar-purpose/10 text-pillar-purpose', 'bg-pillar-legal-financial/10 text-pillar-legal-financial'];

export default function IndependenceCards({ items }: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {items.map((item, i) => {
        const Icon = icons[i % icons.length];
        return (
          <div
            key={item.title}
            className="h-full rounded-2xl bg-white p-6 md:p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
          >
            <div className={`grid h-14 w-14 place-items-center rounded-full ${badgeClasses[i % badgeClasses.length]}`}>
              <Icon className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-navy">{item.title}</h3>
            <div className="mt-2 [&_p]:my-2 [&_p]:text-navy/80 [&_p]:text-base">
              <PageMDX source={item.body} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
