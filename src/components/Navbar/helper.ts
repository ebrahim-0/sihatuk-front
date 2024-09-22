import { TFunction } from "i18next";

export const links = (t: TFunction<string, undefined>) => [
  { label: t("navbar.home"), to: "" },
  { label: t("navbar.login"), to: "/login" },
  { label: t("navbar.register"), to: "/register" },
];
