import { CreatePost, Header } from "@/components";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full h-full border-x-2 flex flex-col gap-2">
      <Header />
      <CreatePost />
      <Outlet />
    </div>
  );
};

export default Home;
