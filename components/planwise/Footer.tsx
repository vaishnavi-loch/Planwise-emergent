import Link from 'next/link';
import { getSite } from '@/lib/content';
import NewsletterForm from '@/components/planwise/NewsletterForm';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, type LucideIcon } from 'lucide-react';
import Image from "next/image";

const socialIcons: Record<string, LucideIcon> = {
  Instagram, Facebook, LinkedIn: Linkedin
};

const socialLinkHrefs: Record<string, string> = {
  Instagram: 'https://www.instagram.com/planwise.australia',
  Facebook: 'https://www.facebook.com/profile.php?id=61586804823367',
  LinkedIn: 'https://www.linkedin.com/company/planwise-australia'
};

const bottomBarLinkHrefs: Record<string, string> = {
  'Terms and Conditions': '/terms-and-conditions',
  'Privacy Policy': '/privacy-policy',
  Disclaimer: '/disclaimer'
};

export default function Footer() {
  const site = getSite();
  const year = new Date().getFullYear();
  const copyright = site.bottomBar.copyright.replace('[Year]', String(year));
  return (
    <footer className="mt-24 bg-navy text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="container py-14 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-3">
         <Link href="/" className="flex items-center gap-2 font-semibold text-xl text-navy" aria-label="Planwise Australia home">
          <Image
            src="/images/Planwise-Logo_new.png"
            alt="Planwise Australia logo"
            width={200}
            height={200}
          />
        </Link>
          <p className="mt-4 text-white/80 max-w-sm">{site.brandLine}</p>
        </div>
        <nav className="lg:col-span-3" aria-label="Footer navigation">
          <h3 className="text-base font-semibold uppercase tracking-wider text-white/70 mb-4">Explore</h3>
          <ul className="space-y-2 text-[1.2375rem]">
            {site.nav.map((n) => (
              <li key={n.route}>
                <Link href={n.route} className="text-white/90 hover:text-white underline decoration-transparent hover:decoration-white underline-offset-4">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h3 className="text-base font-semibold uppercase tracking-wider text-white/70 mb-4">Contact</h3>
          <ul className="space-y-3 text-white/90 text-[1.2375rem]">
            <li className="flex items-start gap-3"><Phone className="w-4 h-4 mt-1 shrink-0" aria-hidden="true" /><a href={`tel:${site.contact.phone.replace(/\s/g, '')}`} className="hover:underline">{site.contact.phone}</a></li>
            <li className="flex items-start gap-3"><Mail className="w-4 h-4 mt-1 shrink-0" aria-hidden="true" /><a href={`mailto:${site.contact.email}`} className="hover:underline">{site.contact.email}</a></li>
            <li className="flex items-start gap-3"><MapPin className="w-4 h-4 mt-1 shrink-0" aria-hidden="true" /><address className="not-italic">{site.contact.address}</address></li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="text-base font-semibold uppercase tracking-wider text-white/70 mb-4">Newsletter</h3>
          <p className="text-white/80">{site.newsletter.prompt}</p>
          <NewsletterForm buttonLabel={site.newsletter.buttonLabel} />
          <div className="mt-5 flex gap-3">
            {site.social.map((s) => {
              const Icon = socialIcons[s];
              return (
                <a
                  key={s}
                  href={socialLinkHrefs[s] ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-150 grid place-items-center"
                >
                  {Icon ? <Icon className="w-4 h-4" aria-hidden="true" /> : null}
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-white/70 text-[17px]">
          <p className="!text-[17px]">{copyright}</p>
          <ul className="flex flex-wrap gap-4">
            {site.bottomBar.links.map((l) => {
              const href = bottomBarLinkHrefs[l] ?? '#';
              return (
                <li key={l}>
                  <Link href={href} className="hover:text-white">{l}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}
