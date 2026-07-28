import { getSite } from '@/lib/content';
import HeaderClient from './HeaderClient';

export default function Header() {
  const site = getSite();
  return <HeaderClient nav={site.nav} footerCta={site.footerCta} />;
}
