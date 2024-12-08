import FollowBar from "./FollowBar";
import LogoutButton from "./LogoutButton";
import SearchBar from "./SearchBar";
import Uploads from "./Uploads";

const Sidebar = () => {
  return (
    <div className="w-full h-full flex flex-col justify-around p-4 border-r-2">
      <SearchBar />

      <Uploads />
      <FollowBar />

      <LogoutButton />
    </div>
  );
};

export default Sidebar;
