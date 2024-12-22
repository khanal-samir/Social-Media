import ChangePass from "@/components/Settings/ChangePass";
import UpdateAccount from "@/components/Settings/UpdateAccount";
import UpdateAvatar from "@/components/Settings/UpdateAvatar";
import UpdateCoverImage from "@/components/Settings/UpdateCoverImage";
import useGetAllTweets from "@/hooks/useGetAllTweets";
import { allTweets } from "@/store/tweetSlice";
import { MoveLeft } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Settings = () => {
  const user = useSelector((state) => state.auth.userInfo);
  const tweets = useSelector((state) => state.tweet.tweets);
  const dispatch = useDispatch();
  const { getTweets } = useGetAllTweets();
  useEffect(() => {
    const fetchTweets = async () => {
      if (tweets.length === 0) {
        const data = await getTweets({ page: 1 });
        if (data) {
          dispatch(allTweets(data));
        }
      }
      return;
    };
    fetchTweets();
  }, [dispatch, tweets.length]);

  return (
    <div className="min-h-screen border-x-2 flex flex-col gap-2">
      <div className="flex items-center gap-10 p-4 border-b-2">
        <Link to="/">
          {" "}
          <MoveLeft
            size={32}
            className="cursor-pointer hover:bg-blue-600 rounded-full px-1"
          />
        </Link>
        <h1 className="font-bold text-2xl"> Profile Settings</h1>
      </div>

      <div className="flex flex-col gap-4 p-4">
        <UpdateAccount
          id={user?._id}
          fullName={user?.fullName}
          bio={user?.bio}
          username={user?.username}
        />
        <ChangePass />
        <UpdateAvatar id={user?._id} />
        <UpdateCoverImage />
      </div>
    </div>
  );
};

export default Settings;
