import NavBar from '@/components/NavBar';
import { NextIntlClientProvider } from 'next-intl';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await import(`../../../messages/${locale}.json`).then(m => m.default);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <NavBar />
      {children}
    </NextIntlClientProvider>
  );
}