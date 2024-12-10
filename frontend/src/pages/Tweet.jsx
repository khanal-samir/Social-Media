import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import SinglePost from "@/components/Home/SinglePost";
import useGetAllTweets from "@/hooks/useGetAllTweets";
import { allTweets } from "@/store/tweetSlice";

const Tweet = () => {
  const { loading, getTweets } = useGetAllTweets();
  const [tweet, setTweet] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { tweets } = useSelector((state) => state.tweet);

  // first fetch tweets
  useEffect(() => {
    const fetchTweets = async () => {
      if (!tweets.length) {
        const data = await getTweets();
        if (data) {
          dispatch(allTweets(data));
        }
      }
    };
    fetchTweets();
  }, [dispatch, getTweets, tweets.length]);

  // then only update it
  useEffect(() => {
    const foundTweet = tweets.find((t) => t._id === id);
    if (foundTweet) {
      setTweet(foundTweet);
    }
  }, [tweets, id]);

  if (loading || !tweet)
    return (
      <div className="h-screen flex justify-center items-center text-5xl border-x-2">
        <FaXTwitter className="animate-bounce" />
      </div>
    );

  return <SinglePost tweet={tweet} />;
};

export default Tweet;
