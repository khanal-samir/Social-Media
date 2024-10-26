import { FaXTwitter } from "react-icons/fa6";

import { Button } from "../ui/button";
import Icons from "./Icons";
import Post from "./Post";
import More from "./More";
import UserInfo from "./UserInfo";
const Nav = () => {
  return (
    <div className="w-full h-full max-h-screen px-2 flex flex-col justify-around border-2 border-red-500">
      <div className="px-2 flex ">
        <FaXTwitter className="w-full h-full sm:w-auto sm:h-auto text-3xl cursor-pointer " />
      </div>

      <Icons />

      <Post />

      <More />
      <UserInfo />
    </div>
  );
};

export default Nav;
