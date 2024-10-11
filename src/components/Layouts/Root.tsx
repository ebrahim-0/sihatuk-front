import React, { useEffect } from "react";
import Navbar from "@/components/Navbar/Navbar";
import { cn } from "@/lib/utils";
import RenderMeta from "@/components/common/RenderMeta";
import useLang from "@/hooks/useLang";
import useDispatch from "@/store/useDispatch";

const Root = ({ children }: { children: React.ReactNode }) => {
  const { t } = useLang();
  const { dispatch } = useDispatch();

  useEffect(() => {
    const observerResize = () => {
      switch (true) {
        case window.innerWidth > 1279:
          dispatch({ screen: "desktop" });
          break;
        case window.innerWidth <= 1279 && window.innerWidth > 1024:
          dispatch({ screen: "laptop" });
          break;
        case window.innerWidth <= 1024 && window.innerWidth > 640:
          dispatch({ screen: "tablet" });
          break;

        case window.innerWidth <= 640 && window.innerWidth > 420:
          dispatch({ screen: "phone" });
          break;

        default:
          dispatch({ screen: "sm-phone" });
          break;
      }
    };

    observerResize();
    window.addEventListener("resize", observerResize);
    return () => {
      window.removeEventListener("resize", observerResize);
    };
  }, []);

  return (
    <>
      <RenderMeta title={t("app.title")} description={t("app.description")} />
      <div className="bg-background min-h-screen">
        <Navbar brandName="test" />
        <main className="min-h-[calc(100vh-160px)]">{children}</main>
        <footer
          className={cn(
            "border-t border-border dark:border-border-dark",
            "text-center p-4 h-20 w-full"
          )}
        >
          Footer
        </footer>
      </div>
    </>
  );
};

export default Root;
