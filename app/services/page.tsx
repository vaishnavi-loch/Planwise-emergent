import type { Metadata } from 'next';
import { getPage } from '@/lib/content';
import PageMDX from '@/components/planwise/PageMDX';
import FadeInSection from '@/components/planwise/FadeInSection';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = getPage('services');
  return {
    title: frontmatter.metaTitle,
    description: frontmatter.metaDescription,
    // Canonical points to /pillars per BUILD_SPEC §8 (identical copy by decision).
    alternates: { canonical: '/pillars' }
  };
}

export default function ServicesPage() {
  const { body } = getPage('services');
  return (
    <div className="container py-20 md:py-28 max-w-5xl">
      <FadeInSection>
        <PageMDX source={body} />
      </FadeInSection>
    </div>
  );
}
