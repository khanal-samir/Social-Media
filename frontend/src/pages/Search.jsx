import { Posts } from "@/components";
import Users from "@/components/Search/Users";
import SearchBar from "@/components/Sidebar/SearchBar";

const Search = () => {
  return (
    <div className="border-x-2 min-h-screen flex flex-col p-4 gap-4">
      <SearchBar />

      <Users />

      <div>
        <h1 className="font-bold text-muted-foreground text-center text-xl">
          Tweets
        </h1>
        <Posts />
      </div>
    </div>
  );
};

export default Search;
