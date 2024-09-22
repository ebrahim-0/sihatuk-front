import { Translate } from "next-translate";

export const links = (t: Translate) => [
  { label: t("navbar.home"), to: "" },
  { label: t("navbar.login"), to: "/login" },
  { label: t("navbar.register"), to: "/register" },
];
