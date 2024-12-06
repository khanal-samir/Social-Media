import FollowBar from "./FollowBar";
import LogoutButton from "./LogoutButton";
import SearchBar from "./SearchBar";

const Sidebar = () => {
  return (
    <div className="w-full h-full flex flex-col justify-between p-4">
      <SearchBar />

      <FollowBar />

      <LogoutButton />
    </div>
  );
};

export default Sidebar;
