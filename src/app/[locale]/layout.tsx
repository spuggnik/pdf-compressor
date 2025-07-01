import NavBar from '@/components/NavBar';
import { NextIntlClientProvider } from 'next-intl';
import type { LayoutProps } from 'next';

export default async function LocaleLayout({ children, params }: LayoutProps<{ locale: string }>) {
  const awaitedParams = await params;
  const locale = awaitedParams.locale ?? "en";
  const messages = await import(`../../../messages/${locale}.json`).then(m => m.default);

  return (
    
        <NextIntlClientProvider locale={locale} messages={messages}>
          <NavBar />
          {children}
        </NextIntlClientProvider>
  );
}

