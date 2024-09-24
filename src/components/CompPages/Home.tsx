import useLang from "@/hooks/useLang";
import { MultiSelect } from "../FormController/MultipleSelect";
import { useState } from "react";
import { Cat, Dog, Fish, Rabbit, Turtle } from "lucide-react";

const frameworksList = [
  { value: "1", label: "React", icon: Turtle },
  { value: "2", label: "Angular", icon: Cat },
  { value: "3", label: "Vue", icon: Dog },
  { value: "4", label: "Svelte", icon: Rabbit },
  { value: "5", label: "Ember", icon: Fish },
];

export default function Home() {
  const { t } = useLang("common");
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>();

  return (
    <div className="h-[calc(100vh-160px)] grid place-content-center">
      <h1>{t("welcome")}</h1>
      <MultiSelect
        options={frameworksList}
        onValueChange={setSelectedFrameworks}
        defaultValue={selectedFrameworks}
        placeholder={t("select.placeholder")}
        variant="inverted"
        animation={2}
        maxCount={1}
      />
    </div>
  );
}
