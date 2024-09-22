import Link from "next/link";
import { useRouter } from "next/router";

interface IProps {
  statusCode?: number;
  title?: string;
}

interface IError {
  data: string;
  error: {
    message: string;
    stack: string;
  };
  internal: boolean;
  status: number;
  statusText: string;
}

const ErrorHandler = ({ statusCode = 500, title = "Server Error" }: IProps) => {
  const { pathname } = useRouter();

  // const error = useRouteError() as IError | null;
  const error: IError = {
    data: "An unexpected error occurred.",
    error: {
      message: "An unexpected error occurred.",
      stack: "Error stack trace",
    },
    internal: false,
    status: 500,
    statusText: "Server Error",
  };

  // Optional: Log error details to an external service

  console.log("Error occurred:", error);

  return (
    <div className="fixed inset-0 flex items-center justify-center p-5 w-full bg-white">
      <div className="text-center">
        <div className="inline-flex rounded-full bg-red-100 p-4">
          <div className="rounded-full stroke-red-600 bg-red-200 p-4">
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
        <h2 className="mt-5 text-[36px] font-bold lg:text-[50px]">
          {error?.status || statusCode} -{" "}
          {error?.internal ? error?.statusText : error?.data || title}
        </h2>
        <p className="mt-5 lg:text-lg">
          {error?.internal
            ? error?.error?.message
            : error?.data || "An unexpected error occurred."}
        </p>
        {error?.error?.stack && (
          <pre className="mt-5 lg:text-lg">{error.error.stack}</pre>
        )}
        <div className="flex items-center justify-center gap-4 my-10">
          <Link
            href="/"
            className="inline-block bg-indigo-600 p-2 text-white hover:!text-white rounded-md"
            prefetch={false}
          >
            Home
          </Link>
          <Link
            href={pathname}
            className="inline-block bg-indigo-600 p-2 text-white hover:!text-white rounded-md"
            prefetch
          >
            Refresh
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorHandler;
