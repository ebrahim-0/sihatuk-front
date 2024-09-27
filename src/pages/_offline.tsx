import Head from "next/head";

const Offline = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      <Head>
        <title>Offline - Your App Name</title>
      </Head>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          You&apos;re Offline
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          It seems you&apos;ve lost your internet connection. Please check your
          network and try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Offline;
