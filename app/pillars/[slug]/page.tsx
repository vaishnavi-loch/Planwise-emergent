import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Briefcase, Users, Frown, UserMinus, HeartHandshake, GraduationCap,
  HelpCircle, Brain, AlertTriangle, ShieldAlert, PiggyBank, ShieldCheck, FileText,
  Pill, Activity, AlertCircle, Stethoscope, Footprints,
  Home, ClipboardList, Car, Compass, Building2, Bus
} from 'lucide-react';
import { getPage, getSite } from '@/lib/content';
import PageMDX from '@/components/planwise/PageMDX';
import PillarSubCards from '@/components/planwise/PillarSubCards';
import StoryCards from '@/components/planwise/StoryCards';
import FadeInSection from '@/components/planwise/FadeInSection';

export const revalidate = 3600;
export const dynamicParams = false;

const noHeadingGap = '[&_h2]:!mt-0';

function splitHeadingBlocks(raw: string) {
  return raw
    .split(/\n(?=### )/)
    .filter((block) => block.trim().startsWith('###'))
    .map((block) => {
      const headingMatch = block.match(/^###\s+(.+)/);
      return {
        heading: headingMatch ? headingMatch[1].trim() : '',
        body: block.replace(/^###\s+.+\n?/, '')
      };
    });
}

// Per-pillar visual language — literal Tailwind class strings (no dynamic
// interpolation) so the JIT scanner picks every one of them up at build time.
const PILLAR_UI = {
  purpose: {
    headingTint: '[&_h1]:!text-pillar-purpose [&_h2]:!text-pillar-purpose [&_h3]:!text-pillar-purpose [&_.li-bullet]:!text-pillar-purpose',
    headingTintNoGap: '[&_h1]:!text-pillar-purpose [&_h2]:!text-pillar-purpose [&_h3]:!text-pillar-purpose [&_.li-bullet]:!text-pillar-purpose [&_h2]:!mt-0',
    textColor: 'text-pillar-purpose',
    ring: 'ring-pillar-purpose/20',
    blobStrong: 'bg-pillar-purpose/25',
    blobSoft: 'bg-pillar-purpose/10',
    badgeBg: 'bg-pillar-purpose/10 text-pillar-purpose',
    iconAccent: 'bg-pillar-purpose/10 text-pillar-purpose',
    ctaVariant: 'pillar-purpose' as const,
    closingGradient: 'bg-gradient-to-br from-navy/5 via-pillar-purpose/10 to-pillar-purpose/5',
    heroImage: '/images/photos/hero-copule-happy-barcelona.jpg',
    heroAlt: 'A happy senior couple travelling and spending time together',
    accentToken: 'purpose' as const
  },
  'legal-and-financial': {
    headingTint: '[&_h1]:!text-pillar-legal-financial [&_h2]:!text-pillar-legal-financial [&_h3]:!text-pillar-legal-financial [&_.li-bullet]:!text-pillar-legal-financial',
    headingTintNoGap: '[&_h1]:!text-pillar-legal-financial [&_h2]:!text-pillar-legal-financial [&_h3]:!text-pillar-legal-financial [&_.li-bullet]:!text-pillar-legal-financial [&_h2]:!mt-0',
    textColor: 'text-pillar-legal-financial',
    ring: 'ring-pillar-legal-financial/20',
    blobStrong: 'bg-pillar-legal-financial/25',
    blobSoft: 'bg-pillar-legal-financial/10',
    badgeBg: 'bg-pillar-legal-financial/10 text-pillar-legal-financial',
    iconAccent: 'bg-pillar-legal-financial/10 text-pillar-legal-financial',
    ctaVariant: 'pillar-legal-financial' as const,
    closingGradient: 'bg-gradient-to-br from-navy/5 via-pillar-legal-financial/10 to-pillar-legal-financial/5',
    heroImage: '/images/photos/advisor-consultation.jpg',
    heroAlt: 'A Planwise adviser meeting with a senior couple',
    accentToken: 'legal-financial' as const
  },
  'mind-and-body': {
    headingTint: '[&_h1]:!text-pillar-mind-body [&_h2]:!text-pillar-mind-body [&_h3]:!text-pillar-mind-body [&_.li-bullet]:!text-pillar-mind-body',
    headingTintNoGap: '[&_h1]:!text-pillar-mind-body [&_h2]:!text-pillar-mind-body [&_h3]:!text-pillar-mind-body [&_.li-bullet]:!text-pillar-mind-body [&_h2]:!mt-0',
    textColor: 'text-pillar-mind-body',
    ring: 'ring-pillar-mind-body/20',
    blobStrong: 'bg-pillar-mind-body/25',
    blobSoft: 'bg-pillar-mind-body/10',
    badgeBg: 'bg-pillar-mind-body/10 text-pillar-mind-body',
    iconAccent: 'bg-pillar-mind-body/10 text-pillar-mind-body',
    ctaVariant: 'pillar-mind-body' as const,
    closingGradient: 'bg-gradient-to-br from-navy/5 via-pillar-mind-body/10 to-pillar-mind-body/5',
    heroImage: '/images/photos/hero-couple-park-walk.jpg',
    heroAlt: 'A senior couple enjoying an active walk together',
    accentToken: 'mind-body' as const
  },
  'where-and-how-you-live': {
    headingTint: '[&_h1]:!text-pillar-where-how [&_h2]:!text-pillar-where-how [&_h3]:!text-pillar-where-how [&_.li-bullet]:!text-pillar-where-how',
    headingTintNoGap: '[&_h1]:!text-pillar-where-how [&_h2]:!text-pillar-where-how [&_h3]:!text-pillar-where-how [&_.li-bullet]:!text-pillar-where-how [&_h2]:!mt-0',
    textColor: 'text-pillar-where-how',
    ring: 'ring-pillar-where-how/20',
    blobStrong: 'bg-pillar-where-how/25',
    blobSoft: 'bg-pillar-where-how/10',
    badgeBg: 'bg-pillar-where-how/10 text-pillar-where-how',
    iconAccent: 'bg-pillar-where-how/10 text-pillar-where-how',
    ctaVariant: 'pillar-where-how' as const,
    closingGradient: 'bg-gradient-to-br from-navy/5 via-pillar-where-how/10 to-pillar-where-how/5',
    heroImage: '/images/photos/about-independence-couple.jpg',
    heroAlt: 'A senior couple reviewing their own paperwork together at home',
    accentToken: 'where-how' as const
  }
} as const;

type PillarSlug = keyof typeof PILLAR_UI;

// Exact heading markers used in each content/pages/<slug>.mdx file, plus the
// icon sets for the "Common Challenges" and "How Planwise Helps You…" cards.
const PILLAR_CONTENT: Record<PillarSlug, {
  whyHeading: string;
  helpsYouHeading: string;
  practiceHeading: string;
  challengeIcons: typeof Briefcase[];
  helpsYouIcons: typeof Briefcase[];
}> = {
  purpose: {
    whyHeading: '## Why Purpose Matters as We Age',
    helpsYouHeading: '## How Planwise Helps You Find Purpose',
    practiceHeading: '## Purpose in Practice',
    challengeIcons: [Briefcase, Users, Frown, UserMinus],
    helpsYouIcons: [Users, HeartHandshake, GraduationCap]
  },
  'legal-and-financial': {
    whyHeading: '## Why Financial & Legal Planning Matters as We Age',
    helpsYouHeading: '## How Planwise Helps You Plan with Confidence',
    practiceHeading: '## Financial & Legal in Practice',
    challengeIcons: [HelpCircle, Brain, AlertTriangle, ShieldAlert],
    helpsYouIcons: [PiggyBank, ShieldCheck, FileText]
  },
  'mind-and-body': {
    whyHeading: '## Why Health and Wellbeing Matter as We Age',
    helpsYouHeading: '## How Planwise Helps You Stay Well',
    practiceHeading: '## Mind & Body in Practice',
    challengeIcons: [Pill, Activity, AlertCircle, Brain],
    helpsYouIcons: [Stethoscope, HeartHandshake, Footprints, Brain]
  },
  'where-and-how-you-live': {
    whyHeading: '## Why Where and How You Live Matters as We Age',
    helpsYouHeading: '## How Planwise Helps You Choose Where to Live',
    practiceHeading: '## Where & How You Live in Practice',
    challengeIcons: [Home, ClipboardList, Car, Compass],
    helpsYouIcons: [ShieldCheck, ClipboardList, Building2, Bus]
  }
};

export async function generateStaticParams() {
  return getSite().pillars.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!(slug in PILLAR_CONTENT)) return {};
  const { frontmatter } = getPage(slug);
  return { title: frontmatter.metaTitle, description: frontmatter.metaDescription };
}

export default async function PillarDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cfg = PILLAR_CONTENT[slug as PillarSlug];
  const ui = PILLAR_UI[slug as PillarSlug];
  if (!cfg || !ui) notFound();

  const { pillars } = getSite();
  const pillar = pillars.find((p) => p.slug === slug) ?? pillars[0];
  const { body } = getPage(slug);

  const idxWhy = body.indexOf(cfg.whyHeading);
  const idxChallenges = body.indexOf('## Common Challenges');
  const idxHelp = body.indexOf('## How Planwise Can Help');
  const idxHelpsYou = body.indexOf(cfg.helpsYouHeading);
  const idxPractice = body.indexOf(cfg.practiceHeading);

  const hero = body.slice(0, idxWhy);
  const whySection = body.slice(idxWhy, idxChallenges);

  const challengesRaw = body.slice(idxChallenges, idxHelp);
  const idxFirstChallengeHeading = challengesRaw.indexOf('### ');
  const idxChallengesOutro = challengesRaw.indexOf('None of these');
  const challengesIntro = challengesRaw.slice(0, idxFirstChallengeHeading);
  const challengesBlocksRaw = challengesRaw.slice(idxFirstChallengeHeading, idxChallengesOutro);
  const challengesOutro = challengesRaw.slice(idxChallengesOutro);
  const challenges = splitHeadingBlocks(challengesBlocksRaw).map((c) => ({ title: c.heading, body: c.body }));

  const helpRaw = body.slice(idxHelp, idxHelpsYou);
  const idxDisclaimer = helpRaw.indexOf('*Planwise');
  const helpIntroAndList = idxDisclaimer >= 0 ? helpRaw.slice(0, idxDisclaimer) : helpRaw;
  const helpDisclaimer = idxDisclaimer >= 0 ? helpRaw.slice(idxDisclaimer) : '';

  const helpsYouRaw = body.slice(idxHelpsYou, idxPractice);
  const idxFirstHelpsYouHeading = helpsYouRaw.indexOf('### ');
  const helpsYouIntro = helpsYouRaw.slice(0, idxFirstHelpsYouHeading);
  const helpsYouBlocks = splitHeadingBlocks(helpsYouRaw.slice(idxFirstHelpsYouHeading)).map((h) => ({ title: h.heading, body: h.body }));

  const practiceRaw = body.slice(idxPractice);
  const idxStoryHeading = practiceRaw.indexOf('### ');
  const idxClosingCta = practiceRaw.indexOf('**CTA– Book Your Free Discovery Call**');
  const storyBlockRaw = practiceRaw.slice(idxStoryHeading, idxClosingCta);
  const closingCta = practiceRaw.slice(idxClosingCta);
  const storyBlocks = splitHeadingBlocks(storyBlockRaw);
  const story = storyBlocks[0] ? { title: storyBlocks[0].heading, body: storyBlocks[0].body, accent: ui.accentToken } : null;

  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[60vh] md:min-h-[70vh] items-center overflow-hidden">
        <Image
          src={ui.heroImage}
          alt=""
          fill
          priority
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-navy/30" aria-hidden="true" />
        <div className={`absolute -z-10 top-10 -left-24 w-72 h-72 rounded-full ${ui.blobStrong} blur-3xl`} aria-hidden="true" />
        <div className={`absolute -z-10 bottom-10 right-0 w-96 h-96 rounded-full ${ui.blobStrong} blur-3xl`} aria-hidden="true" />
        <div className="container relative py-16">
          <Link
            href="/pillars"
            className="mb-6 inline-flex items-center gap-2 text-base font-medium text-white/90 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> All 4 Pillars
          </Link>
          <FadeInSection>
            <div className="max-w-2xl rounded-3xl bg-white/85 backdrop-blur-md p-8 md:p-10 shadow-xl">
              <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-wide mb-4 ${ui.badgeBg}`}>
                {pillar.name}
              </span>
              <PageMDX source={hero} className={ui.headingTintNoGap} ctaVariant={ui.ctaVariant} />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="bg-white py-6 md:py-9">
        <div className="container max-w-3xl">
          <FadeInSection>
            <PageMDX source={whySection} className={ui.headingTintNoGap} />
          </FadeInSection>
        </div>
      </section>

      {/* Common Challenges */}
      <section className="relative overflow-hidden bg-white py-6 md:py-9">
        <div className={`absolute -z-10 top-0 -right-32 w-96 h-96 rounded-full ${ui.blobSoft} blur-3xl`} aria-hidden="true" />
        <div className="container">
          <FadeInSection>
            <div className="max-w-3xl">
              <PageMDX source={challengesIntro} className={ui.headingTintNoGap} />
            </div>
            <div className="mt-8">
              <PillarSubCards items={challenges} icons={cfg.challengeIcons} accentClass={ui.iconAccent} columns={4} />
            </div>
            <div className="mt-6 max-w-2xl">
              <PageMDX source={challengesOutro} />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* How Planwise Can Help */}
      <section className="bg-white py-6 md:py-9">
        <div className="container max-w-3xl">
          <FadeInSection>
            <PageMDX source={helpIntroAndList} className={ui.headingTintNoGap} />
            {helpDisclaimer && <PageMDX source={helpDisclaimer} />}
          </FadeInSection>
        </div>
      </section>

      {/* Deep-dive: How Planwise helps you through each stage */}
      <section className="relative overflow-hidden bg-white py-6 md:py-9">
        <div className={`absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-[32rem] h-64 rounded-full ${ui.blobSoft} blur-3xl`} aria-hidden="true" />
        <div className="container">
          <FadeInSection>
            <div className="max-w-3xl">
              <PageMDX source={helpsYouIntro} className={ui.headingTintNoGap} />
            </div>
            <div className="mt-8">
              <PillarSubCards items={helpsYouBlocks} icons={cfg.helpsYouIcons} accentClass={ui.iconAccent} columns={helpsYouBlocks.length >= 4 ? 4 : 3} />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* In Practice — client story */}
      {story && (
        <section className={`relative overflow-hidden ${ui.blobSoft} py-6 md:py-9`}>
          <div className="container max-w-4xl">
            <FadeInSection>
              <h2 className={`text-2xl md:text-3xl font-semibold mb-6 ${ui.textColor}`}>
                {pillar.name} in Practice
              </h2>
              <StoryCards stories={[story]} />
              <div className="mt-6">
                <Link href="/client-stories" className="inline-flex items-center gap-2 text-base font-semibold text-navy/70 hover:text-navy">
                  See more client stories <ArrowLeft className="w-4 h-4 rotate-180" aria-hidden="true" />
                </Link>
              </div>
            </FadeInSection>
          </div>
        </section>
      )}

      {/* Closing CTA */}
      <section className="container py-6 md:py-9">
        <FadeInSection>
          <div className={`relative overflow-hidden rounded-3xl ${ui.closingGradient} px-6 py-14 md:py-16 text-center`}>
            <div className={`absolute -z-10 -top-16 -right-16 w-72 h-72 rounded-full ${ui.blobSoft} blur-3xl`} aria-hidden="true" />
            <div className={`absolute -z-10 -bottom-16 -left-16 w-72 h-72 rounded-full ${ui.blobSoft} blur-3xl`} aria-hidden="true" />
            <div className="mx-auto max-w-2xl">
              <PageMDX source={closingCta} className={noHeadingGap} ctaVariant={ui.ctaVariant} />
            </div>
          </div>
        </FadeInSection>
      </section>
    </>
  );
}
