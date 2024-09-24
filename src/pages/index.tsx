import Loading from "@/components/ui/Loading";
import dynamic from "next/dynamic";

const Home = dynamic(() => import("@/components/CompPages/Home"), {
  loading: () => <Loading />,
});

const index = () => {
  return <Home />;
};

export default index;
