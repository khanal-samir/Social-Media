import { MoveLeft, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import useGetNotifications from "@/hooks/useGetNotifications";
import { useEffect, useState } from "react";
import Notifications from "@/components/Inbox/Notifications";
import useGetAllTweets from "@/hooks/useGetAllTweets";
import { useDispatch, useSelector } from "react-redux";
import { allTweets } from "@/store/tweetSlice";

const Inbox = () => {
  const [notifications, setNotifications] = useState([]);
  const { getNotfications, loading } = useGetNotifications();
  const { getTweets } = useGetAllTweets();
  const tweets = useSelector((state) => state.tweet.tweets);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await getNotfications();
      if (data && data.length > 0) {
        setNotifications(data);
        return;
      }
      setNotifications([]);
    };

    const fetchTweets = async () => {
      if (tweets && tweets.length === 0) {
        const data = await getTweets({ page: 1 });
        dispatch(allTweets(data));
      }
    };
    fetchTweets();
    fetchNotifications();
  }, []);
  return (
    <div className="flex flex-col  border-x-2 min-h-screen">
      <div className="flex justify-between items-center p-4 border-b-2">
        <Link to="/">
          {" "}
          <MoveLeft
            size={32}
            className="cursor-pointer hover:bg-blue-600 rounded-full px-1"
          />
        </Link>
        <h1 className="font-bold text-2xl">Inbox</h1>
        <Link to="/settings">
          {" "}
          <Settings
            size={32}
            className="cursor-pointer hover:bg-blue-600 rounded-full px-1"
          />
        </Link>
      </div>
      <div>
        {!loading ? (
          <Notifications notifications={notifications} />
        ) : (
          <div className="space-y-4 p-4">
            {new Array(9).fill(0).map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;
