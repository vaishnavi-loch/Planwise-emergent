import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface FeaturedArticle { title: string; description: string; readMoreLabel: string; image: string }
interface Props { items: FeaturedArticle[] }

export default function FeaturedArticleCards({ items }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-navy/10 bg-white overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <Image src={item.image} alt="" fill className="object-cover" />
          </div>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
            <p className="mt-2 text-base text-navy/70">{item.description}</p>
            <div className="mt-4 inline-flex items-center gap-1 text-base font-medium text-navy/50">
              {item.readMoreLabel} <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
