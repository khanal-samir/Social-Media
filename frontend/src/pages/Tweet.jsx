import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import SinglePost from "@/components/Home/SinglePost";
import useGetAllTweets from "@/hooks/useGetAllTweets";
import { allTweets } from "@/store/tweetSlice";
import useGetSingleTweet from "@/hooks/useGetSingleTweet";
import { MoveLeft } from "lucide-react";
import { ShowComment } from "@/components";
const Tweet = () => {
  const { loading, getTweets } = useGetAllTweets();
  const [tweet, setTweet] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { tweets } = useSelector((state) => state.tweet);
  const { getSingleTweet, loading: singleTweetLoading } = useGetSingleTweet();

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
  }, [id, dispatch, tweets]);

  // then only update it
  useEffect(() => {
    const getClickedTweet = async () => {
      const data = await getSingleTweet(id); // for like
      if (data) {
        setTweet(data);
      }
    };
    getClickedTweet();
    const foundTweet = tweets.find((t) => t._id === id);
    if (foundTweet) {
      // for update
      setTweet(foundTweet);
    }
  }, [tweets]);

  if (loading || !tweet || singleTweetLoading)
    return (
      <div className="h-screen flex justify-center items-center text-5xl border-x-2">
        <FaXTwitter className="animate-bounce" />
      </div>
    );

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex gap-10">
        <Link to="/">
          {" "}
          <MoveLeft className="px-1 hover:bg-blue-600 rounded-full cursor-pointer" />
        </Link>
        <h1 className="text-xl font-bold">Tweet</h1>
      </div>

      <SinglePost tweet={tweet} />
      <ShowComment tweetId={id} />
    </div>
  );
};

export default Tweet;
