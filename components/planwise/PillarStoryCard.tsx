import PageMDX from '@/components/planwise/PageMDX';
import CTAButton from '@/components/planwise/CTAButton';
import type { ComponentProps } from 'react';

type CTAVariant = ComponentProps<typeof CTAButton>['variant'];

interface Props {
  title: string;
  situation: string;
  whatWeDid: string;
  outcome: string;
  borderClass: string;
  ctaVariant: CTAVariant;
}

export default function PillarStoryCard({ title, situation, whatWeDid, outcome, borderClass, ctaVariant }: Props) {
  return (
    <div className={`rounded-2xl border border-navy/10 border-l-4 ${borderClass} bg-white p-6 md:p-8 shadow-sm`}>
      <h3 className="text-lg md:text-xl font-semibold text-navy mb-6">{title}</h3>
      <div className="flex flex-col justify-center items-center gap-6 [&_p]:my-0 [&_p]:text-base">
        <PageMDX source={situation} />
        <PageMDX source={whatWeDid} />
        <PageMDX source={outcome} />
      </div>
      <div className="mt-6 flex justify-center">
        <CTAButton label="Read More" href="/client-stories" variant={ctaVariant} size="sm" />
      </div>
    </div>
  );
}
