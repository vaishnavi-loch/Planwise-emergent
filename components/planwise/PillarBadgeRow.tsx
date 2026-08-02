import Link from 'next/link';

interface Props { names: string[] }

const badgeClasses: Record<string, string> = {
  'purpose': 'bg-pillar-purpose/10 text-pillar-purpose hover:bg-pillar-purpose/20',
  'mind-and-body': 'bg-pillar-mind-body/10 text-pillar-mind-body hover:bg-pillar-mind-body/20',
  'legal-and-financial': 'bg-pillar-legal-financial/10 text-pillar-legal-financial hover:bg-pillar-legal-financial/20',
  'where-and-how-you-live': 'bg-pillar-where-how/10 text-pillar-where-how hover:bg-pillar-where-how/20'
};

function matchSlug(name: string): string {
  const n = name.toLowerCase();
  if (n.includes('purpose')) return 'purpose';
  if (n.includes('mind') || n.includes('body')) return 'mind-and-body';
  if (n.includes('financial') || n.includes('legal')) return 'legal-and-financial';
  if (n.includes('where') || n.includes('live')) return 'where-and-how-you-live';
  return 'purpose';
}

export default function PillarBadgeRow({ names }: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      {names.map((name) => {
        const slug = matchSlug(name);
        return (
          <Link
            key={name}
            href={`/pillars/${slug}`}
            className={`inline-flex items-center rounded-full px-4 py-2 text-base font-semibold transition-colors ${badgeClasses[slug]}`}
          >
            {name}
          </Link>
        );
      })}
    </div>
  );
}
