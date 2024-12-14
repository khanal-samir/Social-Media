import { FaBell, FaHome, FaSearch, FaUser } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { Link } from "react-router-dom";
const Icons = () => {
  // w-full h-full works on inner eleement or icons better
  const navItems = [
    {
      label: "Home",
      to: "/",
      icon: <FaHome className="w-full h-full sm:w-auto sm:h-auto text-3xl" />,
    },

    {
      label: "Inbox",
      to: "/inbox",
      icon: <FaBell className=" w-full h-full sm:w-auto sm:h-auto text-3xl" />,
    },
    {
      label: "Search",
      to: "/search",
      icon: (
        <FaSearch className=" w-full h-full sm:w-auto sm:h-auto text-3xl" />
      ),
    },

    {
      label: "Profile",
      to: "/profile",
      icon: <FaUser className=" w-full h-full sm:w-auto sm:h-auto text-3xl" />,
    },
    {
      label: "Settings",
      to: "/settings",
      icon: (
        <IoSettings className=" w-full h-full sm:w-auto sm:h-auto text-3xl" />
      ),
    },
  ];

  return (
    <>
      {navItems.map((item, index) => (
        <Link
          to={item.to}
          key={index}
          className="w-fit p-4 flex gap-x-2 sm:gap-x-4 overflow-hidden cursor-pointer hover:bg-gray-200  dark:hover:bg-primary-foreground rounded-full"
        >
          {item.icon}
          <span className="hidden sm:block  lg:text-lg font-semibold">
            {item.label}
          </span>
        </Link>
      ))}
    </>
  );
};

export default Icons;
