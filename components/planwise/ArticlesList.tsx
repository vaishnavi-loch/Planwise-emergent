import Link from 'next/link';
import { listArticles } from '@/lib/content';
import { ArrowRight } from 'lucide-react';

const pillarBadgeClass: Record<string, string> = {
  purpose: 'bg-pillar-purpose/10 text-pillar-purpose',
  'mind-and-body': 'bg-pillar-mind-body/10 text-pillar-mind-body',
  'legal-and-financial': 'bg-pillar-legal-financial/10 text-pillar-legal-financial',
  'where-and-how-you-live': 'bg-pillar-where-how/10 text-pillar-where-how'
};

export default function ArticlesList() {
  const articles = listArticles();
  if (articles.length === 0) {
    return <p className="text-navy/70 italic">No articles yet.</p>;
  }
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((a) => (
        <Link
          key={a.slug}
          href={`/articles/${a.slug}`}
          className="group rounded-2xl border border-navy/10 bg-white p-6 shadow-sm hover:border-navy/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
        >
          {a.pillar && (
            <span className={`inline-block text-base font-semibold uppercase tracking-wide px-2 py-1 rounded-full ${pillarBadgeClass[a.pillar] ?? 'bg-navy/10 text-navy'}`}>
              {a.pillar.replace(/-/g, ' ')}
            </span>
          )}
          <h3 className="mt-3 text-lg font-semibold text-navy group-hover:text-pillar-legal-financial transition-colors">{a.title}</h3>
          <p className="mt-2 text-base text-navy/70 line-clamp-3">{a.metaDescription}</p>
          <div className="mt-4 inline-flex items-center gap-1 text-base font-medium text-navy">
            Read More <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </div>
        </Link>
      ))}
    </div>
  );
}
