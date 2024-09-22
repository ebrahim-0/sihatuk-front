import { useTranslation } from "react-i18next";

const useLang = (ns = "common") => {
  const { t, i18n, ...reset } = useTranslation(ns);

  const lang = i18n.language;

  return {
    t,
    i18n,
    lang,
    ...reset,
  };
};

export default useLang;
