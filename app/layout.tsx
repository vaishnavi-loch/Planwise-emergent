import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/app/globals.css';
import Header from '@/components/planwise/Header';
import Footer from '@/components/planwise/Footer';
import JsonLd from '@/components/planwise/JsonLd';
import { getSite } from '@/lib/content';

const agenda = localFont({
  src: [
    { path: '../public/fonts/Agenda-Light.ttf', weight: '300', style: 'normal' },
    { path: '../public/fonts/Agenda-LightItalic.ttf', weight: '300', style: 'italic' },
    { path: '../public/fonts/agenda-regular.otf', weight: '400', style: 'normal' },
    { path: '../public/fonts/Agenda-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../public/fonts/Agenda-MediumItalic.ttf', weight: '500', style: 'italic' },
    { path: '../public/fonts/Agenda-Bold.ttf', weight: '700', style: 'normal' }
  ],
  variable: '--font-sans',
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'),
  title: {
    default: 'Planwise Australia — Ageing Well Support',
    template: '%s | Planwise Australia'
  },
  description: 'Independent premium coordination and planning service for ageing well.',
  icons: {
    icon: '/images/Favicon.ico'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const site = getSite();
  const orgLd = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    name: 'Planwise Australia',
    description: site.brandLine,
    email: site.contact.email,
    telephone: site.contact.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.contact.address,
      addressCountry: 'AU'
    },
    url: process.env.NEXT_PUBLIC_BASE_URL || undefined
  };
  return (
    <html lang="en-AU" className={agenda.variable}>
      <body className="min-h-screen bg-white text-navy antialiased flex flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-navy focus:text-white focus:px-4 focus:py-2 focus:rounded-md">Skip to main content</a>
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">{children}</main>
        <Footer />
        <JsonLd data={orgLd} />
      </body>
    </html>
  );
}
