// The single content seam. All pages/components read content from here.
// Content is data — adding a file to /content is the whole edit; no component change required.
// Swap the filesystem source for a headless CMS by replacing the two `fs` calls below.
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const CONTENT_ROOT = path.join(process.cwd(), 'content');

export interface PageFrontmatter {
  slug: string;
  route: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  source?: string;
}

export interface ArticleFrontmatter {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  author: string;
  publishedDate: string;
  pillar?: string;
  source?: string;
}

export interface LoadedPage {
  frontmatter: PageFrontmatter;
  body: string;
}

export interface LoadedArticle {
  frontmatter: ArticleFrontmatter;
  body: string;
}

function readMdx(fullPath: string): { data: Record<string, unknown>; content: string } {
  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(raw);
  return { data, content };
}

export function getPage(slug: string): LoadedPage {
  const fullPath = path.join(CONTENT_ROOT, 'pages', `${slug}.mdx`);
  const { data, content } = readMdx(fullPath);
  return { frontmatter: data as unknown as PageFrontmatter, body: content };
}

export function listPages(): PageFrontmatter[] {
  const dir = path.join(CONTENT_ROOT, 'pages');
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => {
      const { data } = readMdx(path.join(dir, f));
      return data as unknown as PageFrontmatter;
    });
}

export function getArticle(slug: string): LoadedArticle | null {
  const fullPath = path.join(CONTENT_ROOT, 'articles', `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;
  const { data, content } = readMdx(fullPath);
  return { frontmatter: data as unknown as ArticleFrontmatter, body: content };
}

export function listArticles(): ArticleFrontmatter[] {
  const dir = path.join(CONTENT_ROOT, 'articles');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => {
      const { data } = readMdx(path.join(dir, f));
      return data as unknown as ArticleFrontmatter;
    });
}

export function loadJson<T>(name: string): T {
  const p = path.join(CONTENT_ROOT, name);
  return JSON.parse(fs.readFileSync(p, 'utf8')) as T;
}

// Convenience typed loaders — additive schema, safe to extend.
export interface SiteJson {
  brandLine: string;
  nav: { label: string; route: string }[];
  contact: { phone: string; email: string; address: string };
  footerCta: string;
  newsletter: { prompt: string; buttonLabel: string };
  social: string[];
  bottomBar: { copyright: string; links: string[] };
  pillars: { slug: string; name: string; color: string; illustration: string }[];
}
export const getSite = () => loadJson<SiteJson>('site.json');

export interface FaqItem { question: string; answer: string; sourcePage: string }
export const getFaq = () => loadJson<{ items: FaqItem[] }>('faq.json').items;

export interface MembershipTier {
  id: string; name: string; overview: string; cost: string;
  whoItSuits: string; howOftenYouConnect: string; whatYouGet: string;
  planUpdatesOverTime: string; providerHelp: string; extras: string;
  whichOptionSummary: string;
}
export interface MembershipsJson {
  allMembershipsInclude: string;
  tiers: MembershipTier[];
  discoveryCall: { label: string; description: string };
}
export const getMemberships = () => loadJson<MembershipsJson>('memberships.json');

export interface ContactField {
  name: string; label: string; required: boolean; type: string;
  placeholder?: string; options?: string[];
}
export interface ContactFormJson {
  trackingForm: string;
  submitLabel: string;
  fields: ContactField[];
}
export const getContactForm = () => loadJson<ContactFormJson>('contact-form.json');

export interface IconCardItem { title: string; body: string; icon: string }
export const getDifferentiators = () => loadJson<{ items: IconCardItem[] }>('differentiators.json').items;
export const getProcessSteps = () => loadJson<{ items: IconCardItem[] }>('process-steps.json').items;
export const getAudiences = () => loadJson<{ items: IconCardItem[] }>('audiences.json').items;
