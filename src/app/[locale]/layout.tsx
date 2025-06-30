import NavBar from '@/components/NavBar';
import { NextIntlClientProvider } from 'next-intl';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
   const locale = params?.locale ?? 'en';

  const messages = await import(`../../../messages/${locale}.json`).then(m => m.default);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <NavBar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

