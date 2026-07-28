import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getPage, getFaq } from '@/lib/content';
import PageMDX from '@/components/planwise/PageMDX';
import TeamCards from '@/components/planwise/TeamCards';
import ApproachPillarCards from '@/components/planwise/ApproachPillarCards';
import IndependenceCards from '@/components/planwise/IndependenceCards';
import FAQAccordion from '@/components/planwise/FAQAccordion';
import FadeInSection from '@/components/planwise/FadeInSection';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = getPage('about');
  return { title: frontmatter.metaTitle, description: frontmatter.metaDescription };
}

const noHeadingGap = '[&_h2]:!mt-0';

function slugify(name: string) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function findTeamImage(name: string): string | undefined {
  const dir = path.join(process.cwd(), 'public', 'images', 'team');
  const slug = slugify(name);
  const ext = ['jpg', 'jpeg', 'png', 'webp'].find((e) => fs.existsSync(path.join(dir, `${slug}.${e}`)));
  return ext ? `/images/team/${slug}.${ext}` : undefined;
}

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

export default function AboutPage() {
  const { body } = getPage('about');
  const aboutFaq = getFaq().filter((f) => f.sourcePage === 'about');

  const idxOurStory = body.indexOf('## Our Story');
  const idxOurApproach = body.indexOf('## Our Approach');
  const idxFirstPillarHeading = body.indexOf('### ', idxOurApproach);
  const idxMeetTeam = body.indexOf('## Meet The Team');
  const idxFirstMemberHeading = body.indexOf('### ', idxMeetTeam);
  const idxWhyIndependence = body.indexOf('## Why Independence Matters');
  const idxFirstIndependenceHeading = body.indexOf('### ', idxWhyIndependence);
  const idxReadyToGetStarted = body.indexOf('## Ready To Get Started?');
  const idxFaqHeading = body.indexOf('**Frequently Asked Questions**');

  const hero = body.slice(0, idxOurStory);
  const ourStoryIntro = body.slice(idxOurStory, idxOurApproach);
  const approachIntro = body.slice(idxOurApproach, idxFirstPillarHeading);

  const approachPillarsRaw = body.slice(idxFirstPillarHeading, idxMeetTeam);
  const idxApproachCta = approachPillarsRaw.indexOf('**CTA');
  const approachPillars = splitHeadingBlocks(approachPillarsRaw.slice(0, idxApproachCta)).map((p) => ({
    title: p.heading,
    body: p.body
  }));
  const approachCta = approachPillarsRaw.slice(idxApproachCta);

  const teamIntro = body.slice(idxMeetTeam, idxFirstMemberHeading);
  const teamMembersRaw = body.slice(idxFirstMemberHeading, idxWhyIndependence);
  const teamMembers = splitHeadingBlocks(teamMembersRaw).map((m) => {
    const [name, role] = m.heading.split('|').map((s) => s.trim());
    return { name: name || m.heading, role: role || '', bio: m.body, image: findTeamImage(name || m.heading) };
  });

  const independenceIntro = body.slice(idxWhyIndependence, idxFirstIndependenceHeading);
  const independenceCardsRaw = body.slice(idxFirstIndependenceHeading, idxReadyToGetStarted);
  const idxIndependenceCta = independenceCardsRaw.indexOf('**CTA');
  const independenceCards = splitHeadingBlocks(independenceCardsRaw.slice(0, idxIndependenceCta)).map((c) => ({
    title: c.heading,
    body: c.body
  }));
  const independenceCta = independenceCardsRaw.slice(idxIndependenceCta);

  const closing = body.slice(idxReadyToGetStarted, idxFaqHeading);
  const faqHeading = body.slice(idxFaqHeading, body.indexOf('\n', idxFaqHeading) + 1);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[60vh] md:min-h-[70vh] items-center overflow-hidden">
        <Image
          src="/images/photos/about-hero-garden.jpg"
          alt=""
          fill
          priority
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-navy/30" aria-hidden="true" />
        <div className="absolute -z-10 top-10 -left-24 w-72 h-72 rounded-full bg-pillar-mind-body/25 blur-3xl" aria-hidden="true" />
        <div className="absolute -z-10 bottom-10 right-0 w-96 h-96 rounded-full bg-pillar-purpose/25 blur-3xl" aria-hidden="true" />
        <div className="container relative py-16">
          <FadeInSection>
            <div className="max-w-2xl rounded-3xl bg-white/85 backdrop-blur-md p-8 md:p-10 shadow-xl">
              <PageMDX source={hero} className={noHeadingGap} />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Our Story */}
      <section className="relative overflow-hidden bg-white py-3 md:py-5">
        <div className="absolute -z-10 top-1/3 -right-32 w-96 h-96 rounded-full bg-pillar-legal-financial/10 blur-3xl" aria-hidden="true" />
        <div className="container">
          <FadeInSection>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <PageMDX source={ourStoryIntro} className={noHeadingGap} />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg">
                <Image
                  src="/images/photos/about-our-story-nurse.jpg"
                  alt="A registered nurse sharing a warm moment with an older client"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Our Approach */}
      <section className="relative overflow-hidden bg-white py-3 md:py-5">
        <div className="absolute -z-10 top-0 -left-32 w-96 h-96 rounded-full bg-pillar-where-how/10 blur-3xl" aria-hidden="true" />
        <div className="container">
          <FadeInSection>
            <div className="max-w-3xl">
              <PageMDX source={approachIntro} className={noHeadingGap} />
            </div>
            <div className="mt-8">
              <ApproachPillarCards items={approachPillars} />
            </div>
            <div className="mt-6 text-center">
              <PageMDX source={approachCta} />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Meet The Team */}
      <section className="bg-white py-3 md:py-5">
        <div className="container">
          <FadeInSection>
            <div className="max-w-3xl">
              <PageMDX source={teamIntro} className={noHeadingGap} />
            </div>
            <div className="mt-8">
              <TeamCards members={teamMembers} />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Why Independence Matters */}
      <section className="relative overflow-hidden bg-white py-3 md:py-5">
        <div className="absolute -z-10 top-0 right-0 w-96 h-96 rounded-full bg-pillar-legal-financial/10 blur-3xl" aria-hidden="true" />
        <div className="container">
          <FadeInSection>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg">
                <Image
                  src="/images/photos/about-independence-couple.jpg"
                  alt="A senior couple reviewing their own paperwork together at home"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <PageMDX source={independenceIntro} className={noHeadingGap} />
              </div>
            </div>
            <div className="mt-8">
              <IndependenceCards items={independenceCards} />
            </div>
            <div className="mt-6 text-center">
              <PageMDX source={independenceCta} />
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
              <FAQAccordion items={aboutFaq} />
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
