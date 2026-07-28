'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import CTAButton from '@/components/planwise/CTAButton';
import Image from "next/image";

interface NavItem { label: string; route: string }
interface Props { nav: NavItem[]; footerCta: string }

const pillarAccents = [
  { text: 'group-hover:text-pillar-purpose', bar: 'after:bg-pillar-purpose', border: 'border-pillar-purpose' },
  { text: 'group-hover:text-pillar-legal-financial', bar: 'after:bg-pillar-legal-financial', border: 'border-pillar-legal-financial' },
  { text: 'group-hover:text-pillar-mind-body', bar: 'after:bg-pillar-mind-body', border: 'border-pillar-mind-body' },
  { text: 'group-hover:text-pillar-where-how', bar: 'after:bg-pillar-where-how', border: 'border-pillar-where-how' }
];

export default function HeaderClient({ nav, footerCta }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-navy/10 shadow-sm">
      <div className="h-1 w-full bg-gradient-to-r from-pillar-purpose via-pillar-legal-financial via-pillar-mind-body to-pillar-where-how" aria-hidden="true" />
      <nav aria-label="Primary" className="container flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-xl text-navy" aria-label="Planwise Australia home">
          <Image
            src="/images/Planwise-footer.png"
            alt="Planwise Australia logo"
            width={1600}
            height={900}
            priority
            className="h-14 w-auto md:h-16"
          />
        </Link>
        <ul className="hidden lg:flex items-center gap-2">
          {nav.map((n, i) => {
            const active = pathname === n.route;
            const accent = pillarAccents[i % pillarAccents.length];
            return (
              <li key={n.route}>
                <Link
                  href={n.route}
                  className={`group relative px-3 py-2 text-base font-medium transition-colors after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:transition-all ${accent.text} ${accent.bar} ${active ? 'text-navy after:opacity-100' : 'text-navy/80 after:opacity-0 group-hover:after:opacity-100'}`}
                >
                  {n.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="hidden lg:block">
          <CTAButton label={footerCta} href="/contact" size="sm" />
        </div>
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="lg:hidden rounded-full p-2 text-navy hover:bg-navy/5 transition-colors"
        >
          {open ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
        </button>
      </nav>
      {open && (
        <div id="mobile-nav" className="lg:hidden border-t border-navy/10 bg-white shadow-inner">
          <ul className="container py-4 flex flex-col gap-1">
            {nav.map((n, i) => {
              const active = pathname === n.route;
              const accent = pillarAccents[i % pillarAccents.length];
              return (
                <li key={n.route}>
                  <Link
                    href={n.route}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-3 py-2.5 font-medium border-l-4 transition-colors ${active ? `bg-navy/5 text-navy ${accent.border}` : `border-transparent text-navy/80 hover:bg-navy/5`}`}
                  >
                    {n.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-3">
              <CTAButton label={footerCta} href="/contact" size="sm" className="w-full justify-center" />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
