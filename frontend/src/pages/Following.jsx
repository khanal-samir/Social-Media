/* eslint-disable react-hooks/exhaustive-deps */
import { Posts } from "@/components";
import { FaXTwitter } from "react-icons/fa6";
import useGetFollowingTweets from "@/hooks/useGetFollowingTweets";
import { useDispatch } from "react-redux";
import { allTweets } from "@/store/tweetSlice";
import { useEffect, useState } from "react";
const Following = () => {
  const dispatch = useDispatch();
  const { loading, fetchFollowingTweets } = useGetFollowingTweets();
  const [isFollowing, setIsFollowing] = useState(true);
  useEffect(() => {
    const fetchTweets = async () => {
      const data = await fetchFollowingTweets();
      if (data.length > 0) {
        dispatch(allTweets(data));
        setIsFollowing(true);
        return;
      }
      setIsFollowing(false);
    };
    fetchTweets();
  }, [dispatch]);

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center text-5xl  border-x-2">
        <FaXTwitter className="animate-bounce" />
      </div>
    );
  return (
    <>
      {!isFollowing ? (
        <div className="h-screen border-x-2 py-8 text-center text-muted-foreground font-light text-2xl">
          <p>Welcome to the Following page!!</p>
          <p>
            Follow other users to get there specified feeds on your timeline.
          </p>
        </div>
      ) : (
        <Posts />
      )}
    </>
  );
};

export default Following;
