import { Button } from "@/components/ui/button";
import useLang from "@/hooks/useLang";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Trans from "next-translate/Trans";

const ErrorHandler = () => {
  const { asPath } = useRouter();
  const { t } = useLang();

  return (
    <>
      <Head>
        <title>{t("404.title")}</title>
      </Head>
      <div className="fixed inset-0 flex items-center justify-center p-5 w-full bg-background">
        <div className="text-center">
          <div className="inline-flex rounded-full bg-blue-100 p-4">
            <div className="rounded-full stroke-blue-600 dark:stroke-blue-900 bg-blue-200 dark:bg-blue-200 p-4">
              <svg
                className="w-16 h-16"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 8H6.01M6 16H6.01M6 12H18C20.2091 12 22 10.2091 22 8C22 5.79086 20.2091 4 18 4H6C3.79086 4 2 5.79086 2 8C2 10.2091 3.79086 12 6 12ZM6 12C3.79086 12 2 13.7909 2 16C2 18.2091 3.79086 20 6 20H14"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M17 16L22 21M22 16L17 21"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
          </div>

          <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100 my-5">
            <Trans
              i18nKey="404.description"
              components={[
                <strong
                  key="0"
                  className="cursor-pointer border-b-2 border-black dark:border-white"
                />,
              ]}
              values={{ path: asPath }}
            />
          </div>

          <div className="flex items-center justify-center gap-4 my-10">
            <Button>
              <Link href="/">{t("404.home")}</Link>
            </Button>
            <Button onClick={() => window.location.reload()}>
              {t("404.refresh")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorHandler;
