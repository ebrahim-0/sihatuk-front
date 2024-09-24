import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
// import { http } from "@/config/http";
import { handleError } from "@/utils/handleError";
import InputController from "@/components/FormController/InputController";
import SelectController from "@/components/FormController/SelectController";
import FileUploader from "@/components/FormController/FileUploader";
import { useMemo, useState } from "react";
import useLang from "@/hooks/useLang";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

const createSchema = () =>
  yup.object().shape({
    name: yup.string().required("required"),
    price: yup
      .number()
      .required("required")
      .min(1, { key: "price_length", values: { min: 1 } })
      .test("price_length", "price_length", (value) => {
        if (value < 1) {
          return false;
        }
        return true;
      }),
    category: yup.string().required("required"),
    description: yup.string().required("required"),
    image: yup.array().min(1, "required"),
  });

const Login = () => {
  const { t } = useLang();
  const [loading, setLoading] = useState(false);

  const validationSchema = useMemo(() => createSchema(), []);

  type FormData = yup.InferType<typeof validationSchema>;

  const form = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      price: 0,
      category: "",
      description: "",
      image: [],
    },
  });

  const { control, handleSubmit, setError } = form;

  const formSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    const form = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "image" && Array.isArray(value)) {
        // form.append(key, value[0] as Blob);

        data.image?.forEach((image) => {
          form.append(key, image);
        });
      } else {
        form.append(key, value.toString());
      }
    });

    try {
      // const res = await http.post("product/admin/add", form, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });

      // console.log(res);

      const error = {
        response: {
          data: {
            errors: [
              { key: "name", value: ["This number is already taken."] },
              { key: "price", value: ["This email is already taken."] },
              {
                key: "category",
                value: ["This national ID is already taken."],
              },
              { key: "image", value: ["This national ID is already taken."] },
            ],
          },
        },
      };

      return await Promise.reject(error);
    } catch (error) {
      console.log(error);
      setLoading(false);

      handleError(error, setError);
    }

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <section className="min-h-screen flex flex-col items-center mx-6 sm:mx-0 justify-center py-6">
      <div className="w-full rounded-lg shadow dark:shadow-white sm:max-w-lg p-6 sm:p-8">
        <h1 className="text-2xl font-semibold mb-6">{t("login.title")}</h1>
        <Form {...form}>
          <form className="space-y-7" onSubmit={handleSubmit(formSubmit)}>
            <InputController
              label={t("login.name")}
              name="name"
              type="text"
              control={control}
            />
            <InputController
              label={t("login.price")}
              name="price"
              type="number"
              control={control}
            />
            <SelectController
              label={t("login.category")}
              name="category"
              control={control}
              options={[
                { value: "category1", label: t("login.category1") },
                { value: "category2", label: t("login.category2") },
                { value: "category3", label: t("login.category3") },
              ]}
            />
            <FileUploader label="Image" name="image" control={control} />
            <InputController
              label={t("login.description")}
              name="description"
              type="text"
              control={control}
            />

            <Button
              type="submit"
              disabled={loading}
              loading={loading}
              className="w-full"
            >
              {t("login.submit")}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default Login;
