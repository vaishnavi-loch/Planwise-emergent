'use client';
import Link from 'next/link';
import { track } from '@/lib/tracking';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface Props {
  label: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'inverse' | 'pillar-purpose' | 'pillar-legal-financial' | 'pillar-mind-body' | 'pillar-where-how';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

const variants: Record<NonNullable<Props['variant']>, string> = {
  primary: 'bg-pillar-purpose text-white hover:bg-pillar-purpose/90 focus-visible:ring-pillar-purpose',
  secondary: 'bg-navy text-white hover:bg-navy-80 focus-visible:ring-navy',
  ghost: 'bg-transparent text-navy border border-navy/30 hover:bg-navy/5 focus-visible:ring-navy',
  inverse: 'bg-white text-navy hover:bg-white/90 focus-visible:ring-white',
  'pillar-purpose': 'bg-pillar-purpose text-white hover:bg-pillar-purpose/90 focus-visible:ring-pillar-purpose',
  'pillar-legal-financial': 'bg-pillar-legal-financial text-white hover:bg-pillar-legal-financial/90 focus-visible:ring-pillar-legal-financial',
  'pillar-mind-body': 'bg-pillar-mind-body text-white hover:bg-pillar-mind-body/90 focus-visible:ring-pillar-mind-body',
  'pillar-where-how': 'bg-pillar-where-how text-white hover:bg-pillar-where-how/90 focus-visible:ring-pillar-where-how'
};
const sizes: Record<NonNullable<Props['size']>, string> = {
  sm: 'text-base px-4 py-2',
  md: 'text-base px-5 py-2.5',
  lg: 'text-base px-6 py-3'
};

export default function CTAButton({ label, href = '/contact', variant = 'primary', size = 'md', className, onClick }: Props) {
  const classes = cn(
    'inline-flex items-center gap-2 rounded-full font-semibold shadow-sm transition-all duration-150',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
    variants[variant], sizes[size], className
  );
  const track_ = () => {
    try { track({ name: 'cta_click', label, page: typeof window !== 'undefined' ? window.location.pathname : '' }); } catch {}
    onClick?.();
  };
  if (href) {
    return (
      <Link href={href} className={classes} onClick={track_}>
        <span>{label}</span>
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </Link>
    );
  }
  return (
    <button type="button" onClick={track_} className={classes}>
      <span>{label}</span>
      <ArrowRight className="w-4 h-4" aria-hidden="true" />
    </button>
  );
}
