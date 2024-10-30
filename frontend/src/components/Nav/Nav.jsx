import { FaXTwitter } from "react-icons/fa6";
import { useEffect } from "react";
import Icons from "./Icons";
import Post from "./Post";

import UserInfo from "./UserInfo";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "@/store/theme";
import { useState } from "react";
const Nav = () => {
  // mode toggle
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const [dark, setDark] = useState(theme === "dark");
  //console.log(theme);

  useEffect(() => {
    // no local storage--default dark
    dispatch(setTheme(dark ? "dark" : "light"));
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [dispatch, dark, theme]);

  return (
    <div className="w-full h-full max-h-screen px-2 flex flex-col justify-around">
      <div className="px-2 flex ">
        <FaXTwitter
          className="w-full h-full sm:w-auto sm:h-auto text-3xl cursor-pointer "
          onClick={() => setDark((prev) => !prev)}
        />
      </div>

      <Icons />

      <Post />

      <UserInfo />
    </div>
  );
};

export default Nav;
