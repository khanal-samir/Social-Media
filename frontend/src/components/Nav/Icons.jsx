import {
  FaBell,
  FaEnvelope,
  FaHome,
  FaSearch,
  FaUser,
  FaImage,
} from "react-icons/fa";

const Icons = () => {
  // w-full h-full works on inner eleement or icons better
  const navItems = [
    {
      label: "Home",
      icon: <FaHome className="w-full h-full sm:w-auto sm:h-auto text-3xl" />,
    },

    {
      label: "Stories",
      icon: <FaImage className=" w-full h-full sm:w-auto sm:h-auto text-3xl" />,
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
      label: "Messages",
      icon: (
        <FaEnvelope className=" w-full h-full sm:w-auto sm:h-auto text-3xl" />
      ),
    },
    {
      label: "Profile",
      icon: <FaUser className=" w-full h-full sm:w-auto sm:h-auto text-3xl" />,
    },
  ];

  return (
    <>
      {navItems.map((item, index) => (
        <div
          key={index}
          className="p-2 flex gap-x-2 sm:gap-x-4 overflow-hidden cursor-pointer hover:bg-slate-200 rounded-3xl"
        >
          {item.icon}
          <span className="hidden sm:block sm:text-m lg:text-xl">
            {item.label}
          </span>
        </div>
      ))}
    </>
  );
};

export default Icons;
