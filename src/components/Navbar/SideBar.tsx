import MenuIcon from "@/assets/Icons/MenuIcon";
import Logo from "@/assets/Logos/Logo";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { ModeToggle } from "@/components/common/mode-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { links } from "./helper";
import useLang from "@/hooks/useLang";
import { useState } from "react";
import Link from "next/link";

const MobileMenu = ({
  lang,
  brandName,
}: {
  lang: string;
  brandName: string;
}) => {
  const { t } = useLang();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rtl:ml-4 md:hidden">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        className={cn("max-w-[250px] pt-12")}
        side={lang === "en" ? "left" : "right"}
      >
        <DialogTitle className="sr-only">{`${brandName} Menu`}</DialogTitle>
        <DialogDescription className="sr-only">
          {lang === "ar" ? "القائمة الرئيسية" : "Main Menu"}
        </DialogDescription>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <Logo className="h-6 w-6" />
            <span className="sr-only">{brandName}</span>
          </Link>
          <ModeToggle />
          <LanguageSwitcher />
        </div>
        <div className="grid gap-2 py-6">
          {links(t).map((link, index) => (
            <Link
              key={index}
              href={link.to}
              onClick={() => setIsOpen(false)}
              className={cn(
                "group inline-flex h-9 items-center justify-center",
                "rounded-md px-4 py-2 text-md font-semibold transition-colors",
                "hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100",
                "focus:text-gray-900 focus:outline-none capitalize"
                // checkClass(isActive, ["bg-gray-100 text-gray-900", ""])
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
