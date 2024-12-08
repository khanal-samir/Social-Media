import { FaBell, FaHome, FaSearch, FaUser } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
const Icons = () => {
  // w-full h-full works on inner eleement or icons better
  const navItems = [
    {
      label: "Home",
      icon: <FaHome className="w-full h-full sm:w-auto sm:h-auto text-3xl" />,
    },

    {
      label: "Inbox",
      icon: <FaBell className=" w-full h-full sm:w-auto sm:h-auto text-3xl" />,
    },
    {
      label: "Search",
      icon: (
        <FaSearch className=" w-full h-full sm:w-auto sm:h-auto text-3xl" />
      ),
    },

    {
      label: "Profile",
      icon: <FaUser className=" w-full h-full sm:w-auto sm:h-auto text-3xl" />,
    },
    {
      label: "Settings",
      icon: (
        <IoSettings className=" w-full h-full sm:w-auto sm:h-auto text-3xl" />
      ),
    },
  ];

  return (
    <>
      {navItems.map((item, index) => (
        <div
          key={index}
          className="w-fit p-2 flex gap-x-2 sm:gap-x-4 overflow-hidden cursor-pointer hover:text-blue-600 hover:bg-transparent rounded-md"
        >
          {item.icon}
          <span className="hidden sm:block  lg:text-lg font-semibold">
            {item.label}
          </span>
        </div>
      ))}
    </>
  );
};

export default Icons;
