import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-full grid grid-cols-2 justify-around border-b-2 text-center text-muted-foreground p-2">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-4 py-2 rounded ${isActive ? "text-blue-500 font-bold" : "text-gray-500"} hover:dark:bg-gray-800 hover:bg-gray-200`
        }
      >
        <h1>For you</h1>
      </NavLink>
      <NavLink
        to="/following"
        className={({ isActive }) =>
          `px-4 py-2 rounded ${isActive ? "text-blue-500 font-bold" : "text-gray-500"} hover:dark:bg-gray-800 hover:bg-gray-200
        } `
        }
      >
        <h1>Following</h1>
      </NavLink>
    </div>
  );
};

export default Header;
