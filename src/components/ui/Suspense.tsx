import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "@/components/ui/Loading";

const Suspense = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [cachePaths, setCachePaths] = useState<string[]>([router.asPath]);

  useEffect(() => {
    const handleStart = (url: string) => {
      // Show loading spinner only if navigating to a different route
      if (!cachePaths.includes(url)) {
        setLoading(true);
      }
    };

    const handleComplete = (url: string) => {
      // Hide loading spinner when the route change is complete
      if (url === router.asPath) {
        setLoading(false);
      }
      // Update cachePaths to include the current path
      if (!cachePaths.includes(url)) {
        setCachePaths((prev) => [...prev, url]);
      }
    };

    // Attach event listeners for route changes
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    // Clean up listeners on unmount
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router, cachePaths]);

  // Display the loading component only when `loading` is true
  return loading ? <Loading /> : <>{children}</>;
};

export default Suspense;
