import { useRouter } from "next/router";

export const IsActiveLink = (link: string) => {
  const router = useRouter();

  if (router.pathname === link) {
    return true;
  }

  return false;
};
