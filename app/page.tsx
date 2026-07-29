import type { Metadata } from 'next';
import Image from 'next/image';
import { getPage, getFaq } from '@/lib/content';
import PageMDX from '@/components/planwise/PageMDX';
import PillarCards from '@/components/planwise/PillarCards';
import MembershipTable from '@/components/planwise/MembershipTable';
import DifferentiatorCards from '@/components/planwise/DifferentiatorCards';
import ProcessSteps from '@/components/planwise/ProcessSteps';
import AudienceCards from '@/components/planwise/AudienceCards';
import FAQAccordion from '@/components/planwise/FAQAccordion';
import FadeInSection from '@/components/planwise/FadeInSection';
import { ChevronDown } from 'lucide-react';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = getPage('home');
  return { title: frontmatter.metaTitle, description: frontmatter.metaDescription };
}

// Sections start their own PageMDX slice right at a '## Heading' — the shared prose
// h2 style carries a top margin meant for headings deeper in a long document, which is
// redundant on top of each section's own padding. Cancel it only where it would double up.
const noHeadingGap = '[&_h2]:!mt-0';

export default function HomePage() {
  const { body } = getPage('home');
  const homeFaq = getFaq().filter((f) => f.sourcePage === 'home');

  // Cut points below are exact substrings from content/pages/home.mdx. Each prose
  // block is either handed to PageMDX verbatim or swapped for an equivalent card
  // component whose copy is a verbatim JSON mirror of the same mdx text — nothing
  // is dropped, duplicated, or reworded, only re-laid-out.
  const idxWhatIsPlanwise = body.indexOf('## What Is Planwise?');
  const idxWhyChooseUs = body.indexOf('### Why Clients Choose Us?');
  const idxIndependent = body.indexOf('**Independent**');
  const idxCtaAdviser1 = body.indexOf('**CTA – Speak With A Planwise Adviser**');
  const idxNeedAPlan = body.indexOf('## You Have A Need, We Have A Plan');
  const idxStep1 = body.indexOf('### Step 1.');
  const idxWantToSee = body.indexOf('Want to see the full process?');
  const idxPillars = body.indexOf('## The 4 Pillars Of Ageing Well');
  const idxWhoWeHelp = body.indexOf('## Who We Help');
  const idxOlderAustralians = body.indexOf('### Older Australians Planning For The Future');
  const idxWhetherPlanning = body.indexOf("Whether you're planning for your own future");
  const idxMembership = body.indexOf('## Membership Options');
  const idxClientStories = body.indexOf('## Client Stories');
  const idxFaq = body.indexOf('## Frequently Asked Questions');
  const idxFaqQ1 = body.indexOf('### What is Planwise and how can it help me?');
  const idxLetUsHelp = body.indexOf('## Let Us Help Plan For Your Future');

  const hero = body.slice(0, idxWhatIsPlanwise);
  const aboutIntro = body.slice(idxWhatIsPlanwise, idxWhyChooseUs);
  const whyChooseUsIntro = body.slice(idxWhyChooseUs, idxIndependent);
  const aboutCta = body.slice(idxCtaAdviser1, idxNeedAPlan);
  const stepsIntro = body.slice(idxNeedAPlan, idxStep1);
  const stepsOutro = body.slice(idxWantToSee, idxPillars);
  // Client Stories section is hidden for now — hop straight from Membership to FAQ.
  const pillarsSection = body.slice(idxPillars, idxWhoWeHelp);
  const audienceIntro = body.slice(idxWhoWeHelp, idxOlderAustralians);
  const audienceOutro = body.slice(idxWhetherPlanning, idxMembership);
  const membershipSection = body.slice(idxMembership, idxClientStories);
  const faqHeading = body.slice(idxFaq, idxFaqQ1);
  const closing = body.slice(idxLetUsHelp);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[85vh] md:min-h-screen items-center overflow-hidden">
        <Image
          src="/images/photos/hero.jpg"
          alt=""
          fill
          priority
          className="absolute inset-0 -z-10 h-full w-full object-cover lg:scale-125 lg:object-[15%_center]"
        />
        
        <div className="absolute inset-0 -z-10 bg-navy/30" aria-hidden="true" />
        <div className="absolute -z-10 top-10 -left-24 w-72 h-72 rounded-full bg-pillar-mind-body/25 blur-3xl" aria-hidden="true" />
        <div className="absolute -z-10 bottom-10 right-0 w-96 h-96 rounded-full bg-pillar-purpose/25 blur-3xl" aria-hidden="true" />
        <div className="container relative py-16">
          <FadeInSection>
            <div className="max-w-2xl rounded-3xl bg-white/90 p-8 md:p-10 shadow-xl">
              <PageMDX source={hero} className={noHeadingGap} />
            </div>
          </FadeInSection>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center" aria-hidden="true">
          <ChevronDown className="w-6 h-6 text-navy/50 animate-bounce" />
        </div>
      </section>

      {/* What Is Planwise + Why Clients Choose Us */}
      <section className="relative overflow-hidden bg-white py-6 md:py-9">
        <div className="absolute -z-10 top-1/3 -right-32 w-96 h-96 rounded-full bg-pillar-legal-financial/10 blur-3xl" aria-hidden="true" />
        <div className="container">
          <FadeInSection>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <PageMDX source={aboutIntro} className={noHeadingGap} />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg">
                <Image
                  src="/images/photos/advisor-consultation.jpg"
                  alt="A Planwise adviser meeting with a senior couple"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="mt-14 max-w-3xl">
              <PageMDX source={whyChooseUsIntro} />
            </div>
            <div className="mt-8">
              <DifferentiatorCards />
            </div>
            <div className="mt-6 text-center">
              <PageMDX source={aboutCta} />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* You Have A Need, We Have A Plan */}
      <section className="bg-white py-6 md:py-9">
        <div className="container">
          <FadeInSection>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg lg:order-2">
                <Image
                  src="/images/photos/planning-together.jpg"
                  alt="A senior couple happily planning together"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="lg:order-1">
                <PageMDX source={stepsIntro} className={noHeadingGap} />
              </div>
            </div>
            <div className="mt-10">
              <ProcessSteps />
            </div>
            <div className="mt-6 text-center [&_p]:font-semibold [&_p]:text-navy">
              <PageMDX source={stepsOutro} />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Pillars — rendered text verbatim, then interactive cards below */}
      <section className="relative overflow-hidden container py-6 md:py-9">
        <div className="absolute -z-10 top-0 -left-32 w-96 h-96 rounded-full bg-pillar-where-how/10 blur-3xl" aria-hidden="true" />
        <FadeInSection>
          <PageMDX source={pillarsSection} className={noHeadingGap} />
          <div className="mt-8">
            <PillarCards />
          </div>
        </FadeInSection>
      </section>

      {/* Who We Help */}
      <section className="bg-white py-6 md:py-9">
        <div className="container">
          <FadeInSection>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <PageMDX source={audienceIntro} className={noHeadingGap} />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg">
                <Image
                  src="/images/photos/family-support.jpg"
                  alt="An adult daughter supporting her senior mother"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="mt-8">
              <AudienceCards />
            </div>
            <div className="mt-6 max-w-2xl">
              <PageMDX source={audienceOutro} />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Membership snapshot */}
      <section className="relative overflow-hidden bg-white py-6 md:py-9">
        <div className="absolute -z-10 top-0 right-0 w-96 h-96 rounded-full bg-pillar-legal-financial/10 blur-3xl" aria-hidden="true" />
        <div className="container">
          <FadeInSection>
            <PageMDX source={membershipSection} className={noHeadingGap} />
          </FadeInSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-6 md:py-9">
        <div className="container max-w-4xl">
          <FadeInSection>
            <PageMDX source={faqHeading} className={noHeadingGap} />
            <div className="mt-6">
              <FAQAccordion items={homeFaq} />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="container pb-6 md:pb-9">
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
