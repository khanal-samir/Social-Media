import useGetAllUserTweets from "@/hooks/useGetAllUserTweets";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { allTweets } from "@/store/tweetSlice";
import { useDispatch } from "react-redux";
import { Posts } from "@/components";
import { AiOutlineLoading } from "react-icons/ai";

const ProfileTweets = () => {
  const { id } = useParams();
  const { loading, getAllUserTweets } = useGetAllUserTweets();
  const [isTweets, setIsTweets] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTweets = async () => {
      const data = await getAllUserTweets({ userId: id });

      if (data) {
        dispatch(allTweets(data));
        setIsTweets(true);
      }
    };
    fetchTweets();
  }, [id]);

  return (
    <div>
      {loading && (
        <div className="flex justify-center items-center h-96">
          <AiOutlineLoading className="animate-spin text-2xl" />
        </div>
      )}
      {isTweets && <Posts />}
      {!isTweets && (
        <div className="h-96 text-center text-muted-foreground font-semibold">
          User has no tweets!
        </div>
      )}
    </div>
  );
};

export default ProfileTweets;
