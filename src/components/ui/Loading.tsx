import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="min-h-[calc(100vh-160px)] grid place-content-center">
      <Loader size="90" className="animate-spin" />
    </div>
  );
};

export default Loading;
