// Renders raw markdown from /content verbatim, with brand-styled elements and CTA detection.
// A `**CTA – Label**` inline literal becomes a real CTAButton. Layout hints in parentheses
// ( (LEFT), (RIGHT), (CARDS) ) are stripped from headings/paragraphs — they instruct layout,
// not visible copy (per BUILD_SPEC §1).
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import CTAButton from '@/components/planwise/CTAButton';

const LAYOUT_HINT = /\s*\((?:LEFT|RIGHT|CARDS)\)\s*$/;
const CTA_RE = /^\s*CTA\s*[–—\-:.]\s*(.+)$/i;

// Most CTAs point at /contact by default; a few labels need a different destination.
const CTA_HREF_OVERRIDES: Record<string, string> = {
  'compare memberships in full': '/memberships',
  'explore the 4 pillars': '/pillars',
  'explore the four pillars': '/pillars'
};

function cleanChildren(children: ReactNode): ReactNode {
  if (typeof children === 'string') return children.replace(LAYOUT_HINT, '');
  if (Array.isArray(children)) return children.map((c) => (typeof c === 'string' ? c.replace(LAYOUT_HINT, '') : c));
  return children;
}

function childrenAsText(children: ReactNode): string {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map((c) => (typeof c === 'string' ? c : '')).join('');
  return '';
}

interface Props { source: string; className?: string }

export default function PageMDX({ source, className }: Props) {
  return (
    <div className={`prose-planwise max-w-none ${className ?? ''}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }: ComponentPropsWithoutRef<'h1'>) => (
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-navy mb-6">{cleanChildren(children)}</h1>
          ),
          h2: ({ children }: ComponentPropsWithoutRef<'h2'>) => (
            <div className="mt-14">
              <span className="block h-1.5 w-14 rounded-full bg-gradient-to-r from-pillar-purpose via-pillar-legal-financial to-pillar-where-how mb-4" aria-hidden="true" />
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-navy mb-4">{cleanChildren(children)}</h2>
            </div>
          ),
          h3: ({ children }: ComponentPropsWithoutRef<'h3'>) => (
            <h3 className="text-xl md:text-2xl font-semibold text-navy mt-8 mb-2">{cleanChildren(children)}</h3>
          ),
          p: ({ children }: ComponentPropsWithoutRef<'p'>) => (
            <p className="text-navy/90 leading-relaxed my-4">{cleanChildren(children)}</p>
          ),
          strong: ({ children }: ComponentPropsWithoutRef<'strong'>) => {
            const text = childrenAsText(children).trim();
            const m = text.match(CTA_RE);
            if (m) {
              const label = m[1].trim();
              const href = CTA_HREF_OVERRIDES[label.toLowerCase()] ?? '/contact';
              return (
                <span className="block my-6">
                  <CTAButton label={label} href={href} />
                </span>
              );
            }
            return <strong className="font-semibold text-navy">{children}</strong>;
          },
          em: ({ children }: ComponentPropsWithoutRef<'em'>) => (
            <em className="inline-block not-italic -skew-x-6 text-navy/80">{children}</em>
          ),
          ul: ({ children }: ComponentPropsWithoutRef<'ul'>) => (
            <ul className="my-4 space-y-2">{children}</ul>
          ),
          li: ({ children }: ComponentPropsWithoutRef<'li'>) => (
            <li className="pl-6 relative text-navy/90 before:content-['\u2022'] before:absolute before:left-0 before:top-0 before:text-pillar-purpose before:text-lg before:leading-none">
              {children}
            </li>
          ),
          a: ({ children, href }: ComponentPropsWithoutRef<'a'>) => (
            <a href={href} className="text-pillar-legal-financial underline decoration-2 underline-offset-2 hover:opacity-80">{children}</a>
          ),
          table: ({ children }: ComponentPropsWithoutRef<'table'>) => (
            <div className="my-8 overflow-x-auto rounded-lg border border-navy/10">
              <table className="w-full text-left text-base">{children}</table>
            </div>
          ),
          thead: ({ children }: ComponentPropsWithoutRef<'thead'>) => (
            <thead className="bg-navy text-white">{children}</thead>
          ),
          th: ({ children }: ComponentPropsWithoutRef<'th'>) => (
            <th className="px-4 py-3 font-semibold align-top">{cleanChildren(children)}</th>
          ),
          td: ({ children }: ComponentPropsWithoutRef<'td'>) => (
            <td className="px-4 py-3 border-t border-navy/10 align-top text-navy/90">{cleanChildren(children)}</td>
          ),
          hr: () => <hr className="my-10 border-navy/10" />
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
