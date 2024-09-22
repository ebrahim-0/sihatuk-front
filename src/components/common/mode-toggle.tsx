import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useLang from "@/hooks/useLang";

import { useTheme } from "next-themes";

const themes = ["light", "dark", "system"] as const;

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const { t, lang } = useLang();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={lang === "ar" ? "end" : "start"}
        className="mt-6"
      >
        {themes.map((item) => (
          <DropdownMenuCheckboxItem
            checked={item === theme}
            onCheckedChange={() => setTheme(item)}
            key={item}
            className="capitalize"
            dir={lang === "ar" ? "rtl" : "ltr"}
          >
            {t(`theme.${item}`)}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
