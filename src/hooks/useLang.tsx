import useTranslation from "next-translate/useTranslation";

const useLang = (ns = "common") => {
  const { t, ...reset } = useTranslation(ns);

  return {
    t,
    ...reset,
  };
};

export default useLang;
