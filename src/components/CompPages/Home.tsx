import useLang from "@/hooks/useLang";
import { MultiSelect } from "../FormController/MultipleSelect";
import { useState } from "react";
import { Cat, Dog, Fish, Rabbit, Turtle } from "lucide-react";
import useSelector from "@/store/useSelector";
import useDispatch from "@/store/useDispatch";
import { Button } from "../ui/button";
import { DispatchParams } from "@/ITypes";

const frameworksList = [
  { value: "1", label: "React", icon: Turtle },
  { value: "2", label: "Angular", icon: Cat },
  { value: "3", label: "Vue", icon: Dog },
  { value: "4", label: "Svelte", icon: Rabbit },
  { value: "5", label: "Ember", icon: Fish },
];

export default function Home() {
  const { t, lang } = useLang("common");
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>();

  const { dispatcher, dispatch } = useDispatch();
  const [test, test2] = useSelector(["info", "info2"]);
  const data = useSelector("data");

  const getData = async () => {
    dispatch(async ({ state, addState, update }: DispatchParams) => {
      console.log("state", state);
      const data = state.data;
      if (data.isLoading) return;

      addState({ isLoading: true }, "data");
      addState({ items: [] }, "testData");
      try {
        const response = await new Promise((resolve) =>
          setTimeout(
            () =>
              resolve([
                { id: 1, title: "First" },
                { id: 2, title: "Second" },
                { id: 3, title: "Third" },
                { id: 4, title: "Fourth" },
                { id: 5, title: "Fifth" },
              ]),
            2000
          )
        );

        const json = response;
        update(
          {
            items: json,
            isLoading: false,
          },
          "data"
        );
      } catch (error) {
        console.error(error);
      }
    });
  };

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <div className="h-[calc(100vh-160px)] grid place-content-center">
      <h1>{t("welcome")}</h1>

      <Button
        onClick={() => {
          getData();
          console.log("data", data);
        }}
      >
        Click me
      </Button>

      {data.isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.items.map((item: { id: number; title: string }) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}

      <hr />

      {JSON.stringify(test)}
      <br />
      <hr />
      {JSON.stringify(test2)}

      <button
        onClick={() => {
          dispatcher("setAge", { value: 28 });
          // dispatch("setAge", { value: 22 });
        }}
      >
        Reset
      </button>
      <button
        onClick={() => {
          dispatcher("lang", { lang });
          // dispatch("setAge", { value: 22 });
        }}
      >
        me
      </button>

      <input />
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
