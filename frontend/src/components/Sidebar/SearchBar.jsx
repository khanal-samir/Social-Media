import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FaSearch } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useGetAllUsers from "@/hooks/useGetAllUsers";
import useGetAllTweets from "@/hooks/useGetAllTweets";
import { useDispatch } from "react-redux";
import { setUsers } from "@/store/userSlice";
import { allTweets } from "@/store/tweetSlice";
import { useLocation, useNavigate } from "react-router-dom";
const SearchBar = () => {
  const [query, setQuery] = useState("");
  const { loading: userLoading, getAllUsers } = useGetAllUsers();
  const { loading: tweetLoading, getTweets } = useGetAllTweets();
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    const tweets = JSON.parse(localStorage.getItem("tweets"));
    if (tweets) dispatch(allTweets(tweets));
    if (!tweets) dispatch(allTweets([]));
  }, [dispatch]);
  const navigate = useNavigate();
  const handleClick = async () => {
    if (!query.trim()) return;
    const users = await getAllUsers({ query, limit: 5 });
    const tweets = await getTweets({ query, limit: 10 });
    if (users.length > 0) {
      dispatch(setUsers(users));
      localStorage.setItem("users", JSON.stringify(users));
    }
    if (tweets.length > 0) {
      dispatch(allTweets(tweets));
      localStorage.setItem("tweets", JSON.stringify(tweets));
    }
    if (tweets.length == 0) dispatch(allTweets([]));
    if (location.pathname !== "/search") navigate("/search");
    setQuery("");
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") await handleClick();
  };

  return (
    <div className="flex relative">
      <Input
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        value={query}
        onKeyPress={handleKeyPress}
        disabled={userLoading || tweetLoading}
      />
      <Button
        className="border-none text-xs absolute inset-y-0 end-0 rounded"
        onClick={handleClick}
      >
        {userLoading || tweetLoading ? (
          <AiOutlineLoading3Quarters className="animate-spin" />
        ) : (
          <FaSearch />
        )}
      </Button>
    </div>
  );
};

export default SearchBar;
