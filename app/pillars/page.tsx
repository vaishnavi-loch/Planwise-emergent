import type { Metadata } from 'next';
import Image from 'next/image';
import { getPage, getFaq, getSite } from '@/lib/content';
import PageMDX from '@/components/planwise/PageMDX';
import PillarFeature from '@/components/planwise/PillarFeature';
import PillarConnector from '@/components/planwise/PillarConnector';
import FAQAccordion from '@/components/planwise/FAQAccordion';
import FadeInSection from '@/components/planwise/FadeInSection';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = getPage('pillars');
  return { title: frontmatter.metaTitle, description: frontmatter.metaDescription };
}

const noHeadingGap = '[&_h2]:!mt-0';

function parsePillarBlock(raw: string) {
  const headingMatch = raw.match(/^##\s+(.+)/);
  const heading = headingMatch ? headingMatch[1].trim() : '';
  const name = heading.includes(':') ? heading.split(':')[1].trim() : heading;
  const withoutHeading = raw.replace(/^##\s+.+\n?/, '');
  const idxCta = withoutHeading.indexOf('**CTA');
  const body = idxCta >= 0 ? withoutHeading.slice(0, idxCta) : withoutHeading;
  const cta = idxCta >= 0 ? withoutHeading.slice(idxCta) : '';
  return { heading, name, body, cta };
}

export default function PillarsPage() {
  const { body } = getPage('pillars');
  const { pillars } = getSite();
  const pillarsFaq = getFaq().filter((f) => f.sourcePage === 'pillars');

  const idxWhatAgeingWell = body.indexOf('## What Ageing Well Really Means');
  const idxPillar1 = body.indexOf('## Pillar 1: Purpose');
  const idxPillar2 = body.indexOf('## Pillar 2: Legal & Financial');
  const idxPillar3 = body.indexOf('## Pillar 3: Mind & Body');
  const idxPillar4 = body.indexOf('## Pillar 4: Where & How You Live');
  const idxHowWork = body.indexOf('## How The Pillars Work Together');
  const idxFaq = body.indexOf('## Frequently Asked Questions');

  const hero = body.slice(0, idxWhatAgeingWell);
  const whatAgeingWell = body.slice(idxWhatAgeingWell, idxPillar1);

  const pillarBlocks = [
    parsePillarBlock(body.slice(idxPillar1, idxPillar2)),
    parsePillarBlock(body.slice(idxPillar2, idxPillar3)),
    parsePillarBlock(body.slice(idxPillar3, idxPillar4)),
    parsePillarBlock(body.slice(idxPillar4, idxHowWork))
  ];

  const howWorkRaw = body.slice(idxHowWork, idxFaq);
  const idxHowWorkCta = howWorkRaw.indexOf('**CTA');
  const howWorkIntro = howWorkRaw.slice(0, idxHowWorkCta);
  const howWorkCta = howWorkRaw.slice(idxHowWorkCta);

  const faqHeading = body.slice(idxFaq, body.indexOf('\n', idxFaq) + 1);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[60vh] md:min-h-[70vh] items-center overflow-hidden">
        <Image
          src="/images/photos/pillars-hero-garden.jpg"
          alt=""
          fill
          priority
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-navy/30" aria-hidden="true" />
        <div className="absolute -z-10 top-10 -left-24 w-72 h-72 rounded-full bg-pillar-purpose/25 blur-3xl" aria-hidden="true" />
        <div className="absolute -z-10 bottom-10 right-0 w-96 h-96 rounded-full bg-pillar-where-how/25 blur-3xl" aria-hidden="true" />
        <div className="container relative py-16">
          <FadeInSection>
            <div className="max-w-2xl rounded-3xl bg-white/85 backdrop-blur-md p-8 md:p-10 shadow-xl">
              <PageMDX source={hero} className={noHeadingGap} />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* What Ageing Well Really Means */}
      <section className="bg-white py-6 md:py-9">
        <div className="container max-w-3xl">
          <FadeInSection>
            <PageMDX source={whatAgeingWell} className={noHeadingGap} />
          </FadeInSection>
        </div>
      </section>

      {/* Four pillar features, alternating */}
      {pillarBlocks.map((block, i) => {
        const pillar = pillars.find((p) => p.name === block.name) ?? pillars[i];
        return (
          <FadeInSection key={block.heading}>
            <PillarFeature
              index={i}
              pillar={pillar}
              heading={block.heading}
              body={block.body}
              cta={block.cta}
              reverse={i % 2 === 1}
            />
          </FadeInSection>
        );
      })}

      {/* How The Pillars Work Together */}
      <section className="relative overflow-hidden bg-white py-6 md:py-9">
        <div className="absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-[32rem] h-64 rounded-full bg-navy/5 blur-3xl" aria-hidden="true" />
        <div className="container max-w-3xl text-center">
          <FadeInSection>
            <PageMDX source={howWorkIntro} className={noHeadingGap} />
            <div className="my-8">
              <PillarConnector />
            </div>
            <PageMDX source={howWorkCta} />
          </FadeInSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-6 md:py-9">
        <div className="container max-w-4xl">
          <FadeInSection>
            <PageMDX source={faqHeading} className={noHeadingGap} />
            <div className="mt-6">
              <FAQAccordion items={pillarsFaq} />
            </div>
          </FadeInSection>
        </div>
      </section>
    </>
  );
}
