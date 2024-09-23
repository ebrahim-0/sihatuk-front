import { useEffect } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import localFont from "next/font/local";
import Root from "@/components/Layouts/Root";

import useLang from "@/hooks/useLang";
import "@/styles/globals.css";
import Suspense from "@/components/ui/Suspense";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function App({ Component, pageProps }: AppProps) {
  const { lang } = useLang();
  const { locale } = useRouter();

  useEffect(() => {
    const persistLocaleCookie = () => {
      const date = new Date();
      const expireMs = 100 * 24 * 60 * 60 * 1000; // 100 days
      date.setTime(date.getTime() + expireMs);
      document.cookie = `NEXT_LOCALE=${locale};expires=${date.toUTCString()};path=/`;
    };
    persistLocaleCookie();
  }, [locale]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <Root>
      <div
        dir={pageProps.__lang === "ar" ? "rtl" : "ltr"}
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <Suspense>
          <Component {...pageProps} />
        </Suspense>
      </div>
    </Root>
  );
}
