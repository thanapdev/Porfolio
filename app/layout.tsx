import type { Metadata } from 'next';
import {
  Space_Grotesk,
  Bricolage_Grotesque,
  Caveat,
  Fredoka,
  Noto_Sans_Thai,
} from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import CursorLabel from '@/components/CursorLabel';
import { SITE_URL } from '@/lib/site';

const body = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-body',
  display: 'swap',
});
const display = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '800'],
  variable: '--font-display',
  display: 'swap',
});
const hand = Caveat({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-hand',
  display: 'swap',
});
const toy = Fredoka({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-toy',
  display: 'swap',
});
const thai = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
  weight: ['400', '600'],
  variable: '--font-thai',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  description:
    'Thanapong Yamkamol is a student UX/UI designer who builds playable web things. Case studies, skills and contact.',
  title: {
    template: '%s · Thanapong Yamkamol',
    default: 'Thanapong Yamkamol · UX/UI Designer',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${display.variable} ${hand.variable} ${toy.variable} ${thai.variable}`}
    >
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Nav />
        <CursorLabel />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
      </body>
    </html>
  );
}
