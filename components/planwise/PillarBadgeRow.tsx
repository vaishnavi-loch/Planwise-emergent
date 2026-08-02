'use client';
import { useState } from 'react';

interface Props { names: string[] }

const badgeClasses: Record<string, string> = {
  'all': 'bg-navy text-white',
  'purpose': 'bg-pillar-purpose/10 text-pillar-purpose',
  'mind-and-body': 'bg-pillar-mind-body/10 text-pillar-mind-body',
  'legal-and-financial': 'bg-pillar-legal-financial/10 text-pillar-legal-financial',
  'where-and-how-you-live': 'bg-pillar-where-how/10 text-pillar-where-how'
};

function matchSlug(name: string): string {
  const n = name.toLowerCase();
  if (n === 'all') return 'all';
  if (n.includes('purpose')) return 'purpose';
  if (n.includes('mind') || n.includes('body')) return 'mind-and-body';
  if (n.includes('financial') || n.includes('legal')) return 'legal-and-financial';
  if (n.includes('where') || n.includes('live')) return 'where-and-how-you-live';
  return 'purpose';
}

export default function PillarBadgeRow({ names }: Props) {
  const [active, setActive] = useState('all');

  return (
    <div className="flex flex-wrap gap-3">
      {names.map((name) => {
        const slug = matchSlug(name);
        const isAll = slug === 'all';
        const isActive = slug === active;
        return (
          <button
            key={name}
            type="button"
            disabled={!isAll}
            aria-pressed={isActive}
            onClick={isAll ? () => setActive('all') : undefined}
            className={`inline-flex items-center rounded-full px-4 py-2 text-base font-semibold transition-colors ${
              isActive ? badgeClasses[slug] : 'bg-navy/5 text-navy/40'
            } ${isAll ? 'cursor-pointer' : 'cursor-not-allowed'}`}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
}
