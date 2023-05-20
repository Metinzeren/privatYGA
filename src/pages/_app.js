import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/globals.css";
import { addLocale, locale } from "primereact/api";
import { getCookie, setCookie } from "../utils/common";
const nextI18nextConfig = require("../../next-i18next.config.js");
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
import { appWithTranslation } from "next-i18next";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps, router }) {
  useEffect(() => {
    const localeCookie = getCookie("NEXT_LOCALE");
    if (router.locale && localeCookie !== router.locale) {
      setCookie("NEXT_LOCALE", router.locale, "/", 24 * 7);
      locale(router.locale);
    }
  }, [router.locale]);

  nextI18nextConfig.i18n.locales.forEach((locale) => {
    if (locale) {
      addLocale(locale, {
        firstDayOfWeek: 1,
      });
    }
  });
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default appWithTranslation(MyApp, nextI18nextConfig);
