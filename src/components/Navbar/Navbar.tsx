import { useState, useEffect, useRef, memo } from "react";
import useLang from "@/hooks/useLang";
import { checkClass, cn } from "@/lib/utils";
import { ModeToggle } from "@/components/common/mode-toggle";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import Logo from "@/assets/Logos/Logo";
import MobileMenu from "@/components/Navbar/SideBar";
import { links } from "@/components/Navbar/helper";
import Link from "next/link";
import { IsActiveLink } from "@/utils/IsActiveLink";
import useSelector from "@/store/useSelector";

const Navbar = ({ brandName }: { brandName: string }) => {
  const { t, lang } = useLang();
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);
  const screen = useSelector("screen");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsAtTop(currentScrollY < 10);
      setIsVisible(currentScrollY < lastScrollY.current || currentScrollY < 10);

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex h-20 w-full items-center",
        "px-4 md:px-6 border-b transition-all duration-300",
        checkClass(isVisible, ["translate-y-0", "-translate-y-full"]),
        checkClass(isAtTop, [
          "bg-transparent",
          "bg-background/50 backdrop-blur-md shadow-md",
        ])
      )}
    >
      {["sm-phone", "phone", "tablet"].includes(screen) && (
        <MobileMenu lang={lang} brandName={brandName} />
      )}
      <Link
        href="/"
        className={cn(
          "flex",
          checkClass(["sm-phone", "phone", "tablet"].includes(screen), [
            "order-1 ltr:ml-auto rtl:mr-auto",
          ])
        )}
      >
        <Logo className="h-6 w-6" />
        <span className="sr-only">{brandName}</span>
      </Link>
      <div className="flex items-center ltr:ml-4 rtl:lr-0 md:mx-4 gap-4">
        <ModeToggle />
        <LanguageSwitcher />
      </div>
      <nav
        className={cn(
          "hidden md:flex gap-6",
          checkClass(lang === "ar", ["mr-auto", "ml-auto"])
        )}
        dir="ltr"
      >
        {links(t).map((link, index) => (
          <Link
            key={index}
            href={link.to}
            className={cn(
              "group inline-flex h-9 items-center justify-center",
              "rounded-md px-4 py-2 text-md font-semibold transition-colors",
              "hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100",
              "focus:text-gray-900 focus:outline-none capitalize",
              checkClass(IsActiveLink(link.to), [
                "bg-gray-100 text-gray-900",
                "",
              ])
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default memo(Navbar);
