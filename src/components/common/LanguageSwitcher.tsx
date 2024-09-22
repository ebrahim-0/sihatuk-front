import { Button } from "@/components/ui/button";
import useLang from "@/hooks/useLang";
import setLanguage from "next-translate/setLanguage";

const LanguageSwitcher = () => {
  const { lang } = useLang();

  const handleLangChange = () => {
    const newLang = lang === "en" ? "ar" : "en";
    setLanguage(newLang);
    // document.documentElement.lang = newLang;
    // document.documentElement.dir = newLang === "en" ? "ltr" : "rtl";
  };

  return (
    <Button variant="outline" size="icon" onClick={handleLangChange}>
      {lang === "en" ? "ع" : "EN"}
    </Button>
  );
};

export default LanguageSwitcher;
