import type { Metadata } from 'next';
import { getPage } from '@/lib/content';
import PageMDX from '@/components/planwise/PageMDX';
import FadeInSection from '@/components/planwise/FadeInSection';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = getPage('disclaimer');
  return { title: frontmatter.metaTitle, description: frontmatter.metaDescription };
}

export default function DisclaimerPage() {
  const { body } = getPage('disclaimer');
  return (
    <div className="container py-20 md:py-28 max-w-4xl">
      <FadeInSection>
        <PageMDX source={body} />
      </FadeInSection>
    </div>
  );
}
