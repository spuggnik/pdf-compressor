import { ReactNode } from "react";
import NavBar from '@/components/NavBar';
import { NextIntlClientProvider } from 'next-intl';

type Props = {
  children: ReactNode;
  params: { locale: string};
};

export default async function LocaleLayout({ children, params }: Props) {
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

