import Loading from "@/components/ui/Loading";
import dynamic from "next/dynamic";

const Login = dynamic(() => import("@/components/CompPages/Login"), {
  loading: () => <Loading />,
});

const index = () => {
  return <Login />;
};

export default index;
