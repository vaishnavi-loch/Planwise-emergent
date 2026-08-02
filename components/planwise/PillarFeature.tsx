import Image from 'next/image';
import PageMDX from '@/components/planwise/PageMDX';

interface Pillar { slug: string; name: string; color: string; illustration: string }
interface Props { index: number; pillar: Pillar; heading: string; body: string; cta: string; reverse?: boolean }

const pillarClasses: Record<string, { text: string; ring: string; blob: string; badge: string; ctaVariant: 'pillar-purpose' | 'pillar-legal-financial' | 'pillar-mind-body' | 'pillar-where-how' }> = {
  purpose: { text: 'text-pillar-purpose', ring: 'ring-pillar-purpose/20', blob: 'bg-pillar-purpose/10', badge: 'bg-pillar-purpose', ctaVariant: 'pillar-purpose' },
  'mind-and-body': { text: 'text-pillar-mind-body', ring: 'ring-pillar-mind-body/20', blob: 'bg-pillar-mind-body/10', badge: 'bg-pillar-mind-body', ctaVariant: 'pillar-mind-body' },
  'legal-and-financial': { text: 'text-pillar-legal-financial', ring: 'ring-pillar-legal-financial/20', blob: 'bg-pillar-legal-financial/10', badge: 'bg-pillar-legal-financial', ctaVariant: 'pillar-legal-financial' },
  'where-and-how-you-live': { text: 'text-pillar-where-how', ring: 'ring-pillar-where-how/20', blob: 'bg-pillar-where-how/10', badge: 'bg-pillar-where-how', ctaVariant: 'pillar-where-how' }
};

export default function PillarFeature({ index, pillar, heading, body, cta, reverse }: Props) {
  const c = pillarClasses[pillar.slug] ?? pillarClasses.purpose;
  return (
    <div className="relative overflow-hidden py-3 md:py-5">
      <div className={`absolute -z-10 ${reverse ? 'top-0 -left-32' : 'top-0 -right-32'} w-96 h-96 rounded-full ${c.blob} blur-3xl`} aria-hidden="true" />
      <div className="container">
        <div className={`grid gap-10 lg:grid-cols-2 lg:items-center ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
          <div className={`relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg ring-4 ${c.ring}`}>
            <Image src={pillar.illustration} alt={`${pillar.name} illustration`} fill className="object-cover" />
            <span className={`absolute top-4 left-4 grid h-10 w-10 place-items-center rounded-full ${c.badge} text-white text-sm font-bold shadow-md`}>
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          <div>
            <h2 className={`text-2xl md:text-3xl lg:text-4xl font-semibold ${c.text} mb-4`}>{heading}</h2>
            <PageMDX source={body} />
            <div className="mt-2">
              <PageMDX source={cta} ctaVariant={c.ctaVariant} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
