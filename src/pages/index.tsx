import useLang from "@/hooks/useLang";

export default function Home() {
  const { t } = useLang("common");

  return (
    <div className="h-[calc(100vh-160px)] grid place-content-center">
      <h1>{t("welcome")}</h1>
    </div>
  );
}
