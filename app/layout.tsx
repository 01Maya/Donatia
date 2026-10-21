import type { Metadata, Viewport } from 'next';
import { Inter_Tight } from 'next/font/google';
import './globals.css';
import { SITE } from '@/lib/site';
import SiteProvider from '@/components/modals/SiteProvider';
import PageEffects from '@/components/effects/PageEffects';

const font = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter-tight',
  display: 'swap',
});

const SOCIAL_IMAGE = '/images/hero-collage.png';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: `%s | ${SITE.name}` },
  description: SITE.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    url: '/',
    images: [{ url: SOCIAL_IMAGE, width: 1536, height: 1024, alt: 'Donatia volunteers' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
    images: [SOCIAL_IMAGE],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#d9d3fb',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  logo: `${SITE.url}${SOCIAL_IMAGE}`,
};

/** Without JavaScript the reveal animations never run, so show everything. */
const NO_JS_STYLES =
  '#curtain{display:none}' +
  '.rv,.rv2{opacity:1;transform:none}' +
  '.cur,.rv .stats,.rv .impact,.rv .testi,.rv .cta{clip-path:none}';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={font.variable}>
      <body>
        <noscript>
          <style>{NO_JS_STYLES}</style>
        </noscript>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <SiteProvider>
          <PageEffects />
          <a className="skip-link" href="#top">
            Skip to content
          </a>
          {children}
        </SiteProvider>
      </body>
    </html>
  );
}
