import type { Metadata } from 'next';
import Image from 'next/image';
import { getPage, getFaq } from '@/lib/content';
import PageMDX from '@/components/planwise/PageMDX';
import StoryCards from '@/components/planwise/StoryCards';
import SituationCards from '@/components/planwise/SituationCards';
import FAQAccordion from '@/components/planwise/FAQAccordion';
import FadeInSection from '@/components/planwise/FadeInSection';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = getPage('client-stories');
  return { title: frontmatter.metaTitle, description: frontmatter.metaDescription };
}

const noHeadingGap = '[&_h2]:!mt-0';

function splitHeadingBlocks(raw: string) {
  return raw
    .split(/\n(?=### )/)
    .filter((block) => block.trim().startsWith('###'))
    .map((block) => {
      const titleMatch = block.match(/^###\s+(.+)/);
      return {
        title: titleMatch ? titleMatch[1].trim() : '',
        body: block.replace(/^###\s+.+\n?/, '')
      };
    });
}

export default function ClientStoriesPage() {
  const { body } = getPage('client-stories');
  const storiesFaq = getFaq().filter((f) => f.sourcePage === 'client-stories');

  const idxHowWeHelped = body.indexOf("## How We've Helped");
  const idxStoriesBySituation = body.indexOf('## Stories By Situation');
  const idxStoryCardsHeading = body.indexOf('## Story Cards');
  const idxFirstStoryHeading = body.indexOf('### ', idxStoryCardsHeading);
  const idxYourStory = body.indexOf('## Your Story Could Be Next');
  const idxFaq = body.indexOf('## Frequently Asked Questions');

  const hero = body.slice(0, idxHowWeHelped);
  const howWeHelped = body.slice(idxHowWeHelped, idxStoriesBySituation);

  const situationsRaw = body.slice(idxStoriesBySituation, idxStoryCardsHeading);
  const idxFirstSituation = situationsRaw.indexOf('**Planning Ahead**');
  const situationsIntro = situationsRaw.slice(0, idxFirstSituation);
  const situationBlocks = situationsRaw
    .slice(idxFirstSituation)
    .split(/\n\n(?=\*\*)/)
    .map((b) => b.trim())
    .filter(Boolean);

  const storyCardsHeading = body.slice(idxStoryCardsHeading, idxFirstStoryHeading);
  const storiesRaw = body.slice(idxFirstStoryHeading, idxYourStory);
  const stories = splitHeadingBlocks(storiesRaw);

  const closing = body.slice(idxYourStory, idxFaq);
  const faqHeading = body.slice(idxFaq, body.indexOf('\n', idxFaq) + 1);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[60vh] md:min-h-[70vh] items-center overflow-hidden">
        <Image
          src="/images/photos/family-support.jpg"
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

      {/* How We've Helped */}
      <section className="relative overflow-hidden bg-white py-3 md:py-5">
        <div className="absolute -z-10 top-1/3 -right-32 w-96 h-96 rounded-full bg-pillar-purpose/10 blur-3xl" aria-hidden="true" />
        <div className="container">
          <FadeInSection>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <PageMDX source={howWeHelped} className={noHeadingGap} />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg">
                <Image
                  src="/images/photos/advisor-consultation.jpg"
                  alt="A family working through their options with a trusted advisor"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Stories By Situation */}
      <section className="relative overflow-hidden bg-white py-3 md:py-5">
        <div className="absolute -z-10 top-0 -left-32 w-96 h-96 rounded-full bg-pillar-where-how/10 blur-3xl" aria-hidden="true" />
        <div className="container">
          <FadeInSection>
            <div className="max-w-3xl">
              <PageMDX source={situationsIntro} className={noHeadingGap} />
            </div>
            <div className="mt-8">
              <SituationCards items={situationBlocks} />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Story Cards */}
      <section className="relative overflow-hidden bg-white py-3 md:py-5">
        <div className="absolute -z-10 top-0 right-0 w-96 h-96 rounded-full bg-pillar-mind-body/10 blur-3xl" aria-hidden="true" />
        <div className="container">
          <FadeInSection>
            <PageMDX source={storyCardsHeading} className={noHeadingGap} />
            <div className="mt-8">
              <StoryCards stories={stories} />
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
              <FAQAccordion items={storiesFaq} />
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
              <PageMDX source={closing} className={noHeadingGap} />
            </div>
          </div>
        </FadeInSection>
      </section>
    </>
  );
}
