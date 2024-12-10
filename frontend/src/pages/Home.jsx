import { CreatePost, Header } from "@/components";
import { Outlet, useLocation, matchPath } from "react-router-dom";

const Home = () => {
  const location = useLocation();

  // Check if the current pathname matches the "/tweet/:id" route
  const isTweetPage = matchPath("/tweet/:id", location.pathname);

  return isTweetPage ? (
    <div className="min-h-screen border-x-2">
      <Outlet />
    </div>
  ) : (
    <div className="w-full h-full border-x-2 flex flex-col gap-2">
      <Header />
      <CreatePost />
      <Outlet />
    </div>
  );
};

export default Home;
