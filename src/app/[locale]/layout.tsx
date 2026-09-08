import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { site } from '@/content/site';
import { SkipLink } from '@/components/SkipLink';
import { getMessages } from '@/i18n/get-messages';
import { Locale } from '@/i18n/types';
import './globals.css';

export const metadata: Metadata = {
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.description,
  referrer: 'no-referrer',
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  const { locale } = await params;
  const messages = getMessages(locale as Locale);
  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body>
          <SkipLink />
          <Header locale={locale as Locale} messages={messages} />
          <main id="conteudo">{children}</main>
          <Footer locale={locale as Locale} messages={messages} />
      </body>
    </html>
  );
}
