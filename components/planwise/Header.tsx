import { getSite } from '@/lib/content';
import HeaderClient from './HeaderClient';

export default function Header() {
  const site = getSite();
  const nav = site.nav.filter((n) => n.route !== '/articles');
  return <HeaderClient nav={nav} footerCta={site.footerCta} />;
}
