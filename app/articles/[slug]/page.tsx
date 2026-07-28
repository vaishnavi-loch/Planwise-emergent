import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticle, listArticles } from '@/lib/content';
import PageMDX from '@/components/planwise/PageMDX';
import { ArrowLeft } from 'lucide-react';

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  return listArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const art = getArticle(slug);
  if (!art) return {};
  return { title: art.frontmatter.metaTitle, description: art.frontmatter.metaDescription };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const art = getArticle(slug);
  if (!art) notFound();
  const { frontmatter, body } = art;
  return (
    <article className="container py-20 md:py-28 max-w-3xl">
      <Link href="/articles" className="inline-flex items-center gap-2 text-base text-navy/70 hover:text-navy mb-8">
        <ArrowLeft className="w-4 h-4" aria-hidden="true" /> All articles
      </Link>
      <div className="mb-6 flex flex-wrap items-center gap-3 text-base text-navy/60">
        {frontmatter.pillar && (
          <span className="inline-block rounded-full bg-navy/5 px-2.5 py-1 text-base font-semibold uppercase tracking-wide text-navy/80">
            {frontmatter.pillar.replace(/-/g, ' ')}
          </span>
        )}
        <span>{frontmatter.author}</span>
        <span aria-hidden="true">·</span>
        <span>{frontmatter.publishedDate}</span>
      </div>
      <PageMDX source={body} />
    </article>
  );
}
