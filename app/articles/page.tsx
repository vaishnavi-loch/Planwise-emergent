import type { Metadata } from 'next';
import Image from 'next/image';
import { getPage } from '@/lib/content';
import PageMDX from '@/components/planwise/PageMDX';
import ArticlesList from '@/components/planwise/ArticlesList';
import PillarBadgeRow from '@/components/planwise/PillarBadgeRow';
import FeaturedArticleCards from '@/components/planwise/FeaturedArticleCards';
import FAQAccordion from '@/components/planwise/FAQAccordion';
import NewsletterForm from '@/components/planwise/NewsletterForm';
import FadeInSection from '@/components/planwise/FadeInSection';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = getPage('articles');
  return { title: frontmatter.metaTitle, description: frontmatter.metaDescription };
}

const noHeadingGap = '[&_h2]:!mt-0';
const stripBold = (s: string) => s.replace(/\*\*/g, '').trim();

const featuredImages = [
  '/images/photos/articles-featured-planning.jpg',
  '/images/photos/articles-featured-parents.jpg',
  '/images/photos/articles-featured-homecare.jpg'
];

export default function ArticlesPage() {
  const body = getPage('articles').body.replace(/\r\n/g, '\n');

  const idxBrowseByPillar = body.indexOf('## Browse By Pillar');
  const idxFeatured = body.indexOf('## Featured Articles and Guides');
  const idxLatest = body.indexOf('## Latest Articles and Guides');
  const idxStayUpToDate = body.indexOf('## Stay Up To Date');
  const idxFaq = body.indexOf('## Frequently Asked Questions');

  const hero = body.slice(0, idxBrowseByPillar);

  const browseBlocks = body.slice(idxBrowseByPillar, idxFeatured).split(/\n\n+/).filter(Boolean);
  const browseIntro = browseBlocks.slice(0, 2).join('\n\n');
  const pillarNames = browseBlocks.slice(2).map(stripBold);

  const featuredBlocks = body.slice(idxFeatured, idxLatest).split(/\n\n+/).filter(Boolean);
  const featuredIntro = featuredBlocks.slice(0, 2).join('\n\n');
  const featuredItems = [];
  for (let i = 2; i < featuredBlocks.length; i += 3) {
    featuredItems.push({
      title: stripBold(featuredBlocks[i]),
      description: stripBold(featuredBlocks[i + 1] ?? ''),
      readMoreLabel: stripBold(featuredBlocks[i + 2] ?? 'Read More →'),
      image: featuredImages[(i - 2) / 3] ?? featuredImages[0]
    });
  }

  const latestBlocks = body.slice(idxLatest, idxStayUpToDate).split(/\n\n+/).filter(Boolean);
  const latestIntro = latestBlocks.slice(0, 2).join('\n\n');

  const stayUpToDateRaw = body.slice(idxStayUpToDate, idxFaq);
  const idxEmailField = stayUpToDateRaw.indexOf('**Email Address**');
  const stayIntro = stayUpToDateRaw.slice(0, idxEmailField);
  const idxNewsletterCta = stayUpToDateRaw.indexOf('**CTA');
  const newsletterCtaMatch = stayUpToDateRaw.slice(idxNewsletterCta).match(/CTA\s*[–—-]\s*([^*]+)/);
  const newsletterButtonLabel = newsletterCtaMatch ? newsletterCtaMatch[1].trim() : 'Subscribe';

  const idxFaqCta = body.indexOf('**CTA', idxFaq);
  const faqQnaBlocks = body.slice(idxFaq, idxFaqCta).split(/\n\n+/).filter(Boolean);
  const faqHeading = faqQnaBlocks[0];
  const faqItems = [];
  for (let i = 1; i < faqQnaBlocks.length; i += 2) {
    faqItems.push({
      question: stripBold(faqQnaBlocks[i]),
      answer: stripBold(faqQnaBlocks[i + 1] ?? ''),
      sourcePage: 'articles'
    });
  }
  const faqCta = body.slice(idxFaqCta);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[55vh] md:min-h-[65vh] items-center overflow-hidden">
        <Image
          src="/images/photos/articles-hero-journal.jpg"
          alt=""
          fill
          priority
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-navy/30" aria-hidden="true" />
        <div className="absolute -z-10 top-10 -left-24 w-72 h-72 rounded-full bg-pillar-mind-body/25 blur-3xl" aria-hidden="true" />
        <div className="absolute -z-10 bottom-10 right-0 w-96 h-96 rounded-full bg-pillar-legal-financial/25 blur-3xl" aria-hidden="true" />
        <div className="container relative py-16">
          <FadeInSection>
            <div className="max-w-2xl rounded-3xl bg-white/85 backdrop-blur-md p-8 md:p-10 shadow-xl">
              <PageMDX source={hero} className={noHeadingGap} />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Browse By Pillar */}
      <section className="bg-white py-3 md:py-5">
        <div className="container">
          <FadeInSection>
            <PageMDX source={browseIntro} className={noHeadingGap} />
            <div className="mt-6">
              <PillarBadgeRow names={pillarNames} />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Featured Articles and Guides */}
      <section className="relative overflow-hidden bg-white py-3 md:py-5">
        <div className="absolute -z-10 top-0 -right-32 w-96 h-96 rounded-full bg-pillar-purpose/10 blur-3xl" aria-hidden="true" />
        <div className="container">
          <FadeInSection>
            <PageMDX source={featuredIntro} className={noHeadingGap} />
            <div className="mt-8">
              <ArticlesList />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Latest Articles and Guides */}
      <section className="bg-white py-3 md:py-5">
        <div className="container">
          <FadeInSection>
            <PageMDX source={latestIntro} className={noHeadingGap} />
            
            <div className="mt-8">
              <FeaturedArticleCards items={featuredItems} />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Stay Up To Date */}
      <section className="relative overflow-hidden bg-white py-3 md:py-5">
        <div className="absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-[32rem] h-64 rounded-full bg-pillar-mind-body/10 blur-3xl" aria-hidden="true" />
        <div className="container max-w-xl text-center">
          <FadeInSection>
            <PageMDX source={stayIntro} className={noHeadingGap} />
            <div className="mt-6 flex justify-center">
              <div className="w-full max-w-sm text-left [&_input]:border [&_input]:border-navy/15 [&_input]:w-full">
                <NewsletterForm buttonLabel={newsletterButtonLabel} />
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-3 md:py-5">
        <div className="container max-w-4xl">
          <FadeInSection>
            <PageMDX source={faqHeading} className={noHeadingGap} />
            <div className="mt-6">
              <FAQAccordion items={faqItems} />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="container pb-14 md:pb-20">
        <FadeInSection>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy/5 via-pillar-purpose/5 to-pillar-mind-body/5 px-6 py-14 md:py-16 text-center">
            <div className="absolute -z-10 -top-16 -right-16 w-72 h-72 rounded-full bg-pillar-legal-financial/10 blur-3xl" aria-hidden="true" />
            <div className="absolute -z-10 -bottom-16 -left-16 w-72 h-72 rounded-full bg-pillar-purpose/10 blur-3xl" aria-hidden="true" />
            <div className="mx-auto max-w-2xl">
              <PageMDX source={faqCta} />
            </div>
          </div>
        </FadeInSection>
      </section>
    </>
  );
}
