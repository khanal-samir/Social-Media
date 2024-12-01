import { Posts } from "@/components";
import useGetAllTweets from "@/hooks/useGetAllTweets";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { allTweets } from "@/store/tweetSlice";
import { FaXTwitter } from "react-icons/fa6";
const Foryou = () => {
  const { loading, getTweets } = useGetAllTweets();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchTweets = async () => {
      const data = await getTweets();
      if (data) {
        dispatch(allTweets(data));
      }
    };
    fetchTweets();
  }, []);

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center text-5xl  border-2">
        <FaXTwitter className="animate-bounce" />
      </div>
    );

  return <Posts />;
};

export default Foryou;
