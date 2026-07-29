import type { Metadata } from 'next';
import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';
import { getPage, getFaq, getMemberships } from '@/lib/content';
import PageMDX from '@/components/planwise/PageMDX';
import MembershipTable from '@/components/planwise/MembershipTable';
import WhichOptionCards from '@/components/planwise/WhichOptionCards';
import FAQAccordion from '@/components/planwise/FAQAccordion';
import FadeInSection from '@/components/planwise/FadeInSection';
import CTAButton from '@/components/planwise/CTAButton';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = getPage('memberships');
  return { title: frontmatter.metaTitle, description: frontmatter.metaDescription };
}

const noHeadingGap = '[&_h2]:!mt-0';

export default function MembershipsPage() {
  const { body } = getPage('memberships');
  const membershipsFaq = getFaq().filter((f) => f.sourcePage === 'memberships');

  const idxStartFreeCall = body.indexOf('## Start With A Free Discovery Call');
  const idxCompareOptions = body.indexOf('## Compare Our Membership Options');
  const idxTable = body.indexOf('\n|', idxCompareOptions);
  const idxTableCta = body.indexOf('**CTA', idxTable);
  const idxWhichOption = body.indexOf('## Which Option Is Right For You?');
  const idxUnsure = body.indexOf("If you're unsure which option", idxWhichOption);
  const idxTransparentPricing = body.indexOf('## Transparent Pricing, Independent Advice');
  const idxReadyToGetStarted = body.indexOf('## Ready To Get Started?');
  const idxFaq = body.indexOf('## Frequently Asked Questions');

  const hero = body.slice(0, idxStartFreeCall);
  const discoveryCallSection = body.slice(idxStartFreeCall, idxCompareOptions);
  const compareIntro = body.slice(idxCompareOptions, idxTable);
  const tableCta = body.slice(idxTableCta, idxWhichOption);

  const whichOptionHeadingEnd = body.indexOf('\n', idxWhichOption) + 1;
  const whichOptionHeading = body.slice(idxWhichOption, whichOptionHeadingEnd);
  const whichOptionOutro = body.slice(idxUnsure, idxTransparentPricing);

  const transparentPricing = body.slice(idxTransparentPricing, idxReadyToGetStarted);
  const closing = body.slice(idxReadyToGetStarted, idxFaq);
  const faqHeading = body.slice(idxFaq, body.indexOf('\n', idxFaq) + 1);
  const { discoveryCall } = getMemberships();

  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[55vh] md:min-h-[65vh] items-center overflow-hidden">
        <Image
          src="/images/photos/memberships-hero-planning.jpg"
          alt=""
          fill
          priority
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-navy/30" aria-hidden="true" />
        <div className="absolute -z-10 top-10 -left-24 w-72 h-72 rounded-full bg-pillar-legal-financial/25 blur-3xl" aria-hidden="true" />
        <div className="absolute -z-10 bottom-10 right-0 w-96 h-96 rounded-full bg-pillar-purpose/25 blur-3xl" aria-hidden="true" />
        <div className="container relative py-16">
          <FadeInSection>
            <div className="max-w-2xl rounded-3xl bg-white/85 backdrop-blur-md p-8 md:p-10 shadow-xl">
              <PageMDX source={hero} className={noHeadingGap} />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Start With A Free Discovery Call */}
      <section className="relative overflow-hidden bg-white py-3 md:py-5">
        <div className="absolute -z-10 top-1/3 -right-32 w-96 h-96 rounded-full bg-pillar-mind-body/10 blur-3xl" aria-hidden="true" />
        <div className="container">
          <FadeInSection>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <PageMDX source={discoveryCallSection} className={noHeadingGap} />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg">
                <Image
                  src="/images/photos/memberships-discovery-call.jpg"
                  alt="An older woman smiling during a friendly phone call at home"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Compare Our Membership Options */}
      <section className="relative overflow-hidden bg-white py-3 md:py-5">
        <div className="absolute -z-10 top-0 right-0 w-96 h-96 rounded-full bg-pillar-legal-financial/10 blur-3xl" aria-hidden="true" />
        <div className="container">
          <FadeInSection>
            <div className="max-w-3xl">
              <PageMDX source={compareIntro} className={noHeadingGap} />
            </div>
            <div className="mt-8">
              <MembershipTable />
            </div>
            <div className="mt-6 text-center">
              <PageMDX source={tableCta} />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Which Option Is Right For You? */}
      <section className="bg-white py-3 md:py-5">
        <div className="container">
          <FadeInSection>
            <PageMDX source={whichOptionHeading} className={noHeadingGap} />
            <div className="mt-8">
              <WhichOptionCards />
            </div>
            <div className="mt-6 max-w-2xl">
              <PageMDX source={whichOptionOutro} />
            </div>
            <div className="mt-6 text-center">
              <CTAButton label={discoveryCall.label} href="/contact" size="sm" />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Transparent Pricing, Independent Advice */}
      <section className="relative overflow-hidden bg-white py-3 md:py-5">
        <div className="absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-[32rem] h-64 rounded-full bg-pillar-legal-financial/10 blur-3xl" aria-hidden="true" />
        <div className="container max-w-3xl text-center">
          <FadeInSection>
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-pillar-legal-financial/10 text-pillar-legal-financial mb-4">
              <ShieldCheck className="w-7 h-7" aria-hidden="true" />
            </span>
            <PageMDX source={transparentPricing} className={noHeadingGap} />
          </FadeInSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-3 md:py-5">
        <div className="container max-w-4xl">
          <FadeInSection>
            <PageMDX source={faqHeading} className={noHeadingGap} />
            <div className="mt-6">
              <FAQAccordion items={membershipsFaq} />
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
