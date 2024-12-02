import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FaSearch } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false); // make a custom hook

  const handleClick = () => {
    if (!query.trim()) return;
    setQuery("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleClick();
  };

  return (
    <div className="flex relative">
      <Input
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        value={query}
        onKeyPress={handleKeyPress}
      />
      <Button
        className="border-none text-xs absolute inset-y-0 end-0 rounded"
        onClick={handleClick}
      >
        {loading ? (
          <AiOutlineLoading3Quarters className="animate-spin" />
        ) : (
          <FaSearch />
        )}
      </Button>
    </div>
  );
};

export default SearchBar;
