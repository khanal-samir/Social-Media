import FollowBar from "./FollowBar";
import LogoutButton from "./LogoutButton";
import SearchBar from "./SearchBar";
import StoriesNav from "./StoriesNav";

const Sidebar = () => {
  return (
    <div className="w-full h-full flex flex-col justify-around p-4">
      <SearchBar />
      <div>
        <StoriesNav />
      </div>

      <FollowBar />

      <LogoutButton />
    </div>
  );
};

export default Sidebar;
