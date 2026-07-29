import type { Metadata } from 'next';
import { getPage, getContactForm, getSite, getFaq } from '@/lib/content';
import PageMDX from '@/components/planwise/PageMDX';
import ContactForm from '@/components/planwise/ContactForm';
import ContactStepCards from '@/components/planwise/ContactStepCards';
import FAQAccordion from '@/components/planwise/FAQAccordion';
import FadeInSection from '@/components/planwise/FadeInSection';
import { Mail, Phone, MapPin } from 'lucide-react';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = getPage('contact');
  return { title: frontmatter.metaTitle, description: frontmatter.metaDescription };
}

const noHeadingGap = '[&_h2]:!mt-0';
const stripBold = (s: string) => s.replace(/\*\*/g, '').trim();

// The MDX has layout hints (LEFT), (RIGHT), (CARDS). Per spec, they instruct placement.
// We render the verbatim intro (LEFT), the ContactForm (RIGHT, driven by contact-form.json),
// the "What Happens Next?" steps as cards (per the (CARDS) hint), and the remaining
// sections (`Who We Help`, FAQ) below.
export default function ContactPage() {
  const body = getPage('contact').body.replace(/\r\n/g, '\n');
  const form = getContactForm();
  const site = getSite();
  const contactFaq = getFaq().filter((f) => f.sourcePage === 'contact');

  const startCta = body.indexOf('**CTA: Book My Free Discovery Call**');
  const idxWhatHappensNext = body.indexOf('## What Happens Next?');
  const idxWhoWeHelp = body.indexOf('## Who We Help');
  const idxFaq = body.indexOf('## Frequently Asked Questions');

  const rightMarker = body.indexOf('Book Your Free Discovery Call (RIGHT)');
  const introEnd = rightMarker !== -1 ? rightMarker : startCta;
  const introBlock = body.slice(0, introEnd);

  const whatHappensBlocks = body.slice(idxWhatHappensNext, idxWhoWeHelp).split(/\n\n+/).filter(Boolean);
  const whatHappensIntro = whatHappensBlocks.slice(0, 2).join('\n\n');
  const steps = [];
  for (let i = 2; i < whatHappensBlocks.length; i += 2) {
    steps.push({ title: stripBold(whatHappensBlocks[i]), body: stripBold(whatHappensBlocks[i + 1] ?? '') });
  }

  const whoWeHelp = body.slice(idxWhoWeHelp, idxFaq);
  const faqHeading = body.slice(idxFaq, body.indexOf('\n', idxFaq) + 1);

  return (
    <>
      {/* Intro + Form */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute -z-10 top-10 -left-24 w-72 h-72 rounded-full bg-pillar-mind-body/10 blur-3xl" aria-hidden="true" />
        <div className="absolute -z-10 bottom-10 right-0 w-96 h-96 rounded-full bg-pillar-purpose/10 blur-3xl" aria-hidden="true" />
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <FadeInSection>
              <div>
                <PageMDX source={introBlock} className={noHeadingGap} />
                <ul className="mt-8 space-y-4 text-navy">
                  <li className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-pillar-purpose/10 text-pillar-purpose"><Phone className="w-4 h-4" aria-hidden="true" /></span>
                    <a href={`tel:${site.contact.phone.replace(/\s/g, '')}`} className="hover:underline">{site.contact.phone}</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-pillar-legal-financial/10 text-pillar-legal-financial"><Mail className="w-4 h-4" aria-hidden="true" /></span>
                    <a href={`mailto:${site.contact.email}`} className="hover:underline">{site.contact.email}</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-pillar-where-how/10 text-pillar-where-how"><MapPin className="w-4 h-4" aria-hidden="true" /></span>
                    <address className="not-italic">{site.contact.address}</address>
                  </li>
                </ul>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.1}>
              <div className="rounded-3xl border border-navy/10 bg-white p-6 md:p-8 shadow-xl lg:sticky lg:top-24">
                <h2 className="text-2xl font-semibold text-navy mb-6">Book Your Free Discovery Call</h2>
                <ContactForm form={form} />
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* What Happens Next? */}
      <section className="bg-white py-6 md:py-9">
        <div className="container">
          <FadeInSection>
            <div className="max-w-2xl">
              <PageMDX source={whatHappensIntro} className={noHeadingGap} />
            </div>
            <div className="mt-12">
              <ContactStepCards items={steps} />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Who We Help */}
      <section className="relative overflow-hidden bg-white py-6 md:py-9">
        <div className="absolute -z-10 top-0 right-0 w-96 h-96 rounded-full bg-pillar-legal-financial/10 blur-3xl" aria-hidden="true" />
        <div className="container max-w-2xl">
          <FadeInSection>
            <PageMDX source={whoWeHelp} className={noHeadingGap} />
          </FadeInSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-6 md:py-9">
        <div className="container max-w-4xl">
          <FadeInSection>
            <PageMDX source={faqHeading} className={noHeadingGap} />
            <div className="mt-6">
              <FAQAccordion items={contactFaq} />
            </div>
          </FadeInSection>
        </div>
      </section>
    </>
  );
}
