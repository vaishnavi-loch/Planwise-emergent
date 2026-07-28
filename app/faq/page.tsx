import type { Metadata } from 'next';
import { getFaq, getSite } from '@/lib/content';
import FAQAccordion from '@/components/planwise/FAQAccordion';
import JsonLd from '@/components/planwise/JsonLd';
import FadeInSection from '@/components/planwise/FadeInSection';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Answers to common questions about Planwise Australia, our services, memberships and how we support older Australians and their families.'
};

export default function FAQPage() {
  const items = getFaq();
  const site = getSite();
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.question,
      acceptedAnswer: { '@type': 'Answer', text: i.answer }
    }))
  };
  return (
    <div className="container py-20 md:py-28 max-w-4xl">
      <FadeInSection>
        <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">Frequently Asked Questions</h1>
        <p className="text-navy/80 mb-10 max-w-2xl">{site.brandLine} Below are answers to the questions we hear most often.</p>
        <FAQAccordion items={items} />
      </FadeInSection>
      <JsonLd data={faqLd} />
    </div>
  );
}
