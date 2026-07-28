import type { Metadata } from 'next';
import { getPage } from '@/lib/content';
import PageMDX from '@/components/planwise/PageMDX';
import StoryCards from '@/components/planwise/StoryCards';
import FadeInSection from '@/components/planwise/FadeInSection';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = getPage('client-stories');
  return { title: frontmatter.metaTitle, description: frontmatter.metaDescription };
}

export default function ClientStoriesPage() {
  const { body } = getPage('client-stories');

  const idxStoryCards = body.indexOf('## Story Cards');
  const idxYourStory = body.indexOf('## Your Story Could Be Next');
  const firstStoryHeadingIdx = body.indexOf('### ', idxStoryCards);

  const before = body.slice(0, firstStoryHeadingIdx);
  const storiesRaw = body.slice(firstStoryHeadingIdx, idxYourStory);
  const after = body.slice(idxYourStory);

  const stories = storiesRaw
    .split(/\n(?=### )/)
    .filter((block) => block.trim().startsWith('###'))
    .map((block) => {
      const titleMatch = block.match(/^###\s+(.+)/);
      return {
        title: titleMatch ? titleMatch[1].trim() : '',
        body: block.replace(/^###\s+.+\n?/, '')
      };
    });

  return (
    <div className="container py-20 md:py-28 max-w-5xl">
      <FadeInSection>
        <PageMDX source={before} />
        <div className="mt-8">
          <StoryCards stories={stories} />
        </div>
        <div className="mt-4">
          <PageMDX source={after} />
        </div>
      </FadeInSection>
    </div>
  );
}
