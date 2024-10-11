import { Button } from "@/components/ui/button";
import Head from "next/head";

const Offline = () => {
  return (
    <div className="min-h-[calc(100vh-160px)] bg-background flex flex-col justify-center items-center px-4">
      <Head>
        <title>Offline - Your App Name</title>
      </Head>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">You&apos;re Offline</h1>
        <p className="text-xl mb-8">
          It seems you&apos;ve lost your internet connection. Please check your
          network and try again.
        </p>
        <Button
          variant="primary"
          onClick={() => window.location.reload()}
          className="font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default Offline;
