import useGetUserDetails from "@/hooks/useGetUserDetails";
import { Link, useParams, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Info from "@/components/Profile/Info";
import { ArrowLeft } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import useGetAllTweets from "@/hooks/useGetAllTweets";
import { allTweets } from "@/store/tweetSlice";
const Profile = () => {
  const { id } = useParams();
  const { getUserDetails, loading } = useGetUserDetails();
  const [userDetails, setUserDetails] = useState({});
  const tweets = useSelector((state) => state.tweet.tweets);
  const { getTweets } = useGetAllTweets();
  const dispatch = useDispatch();
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
    const fetchData = async () => {
      const data = await getUserDetails({ userId: id });
      if (data) {
        setUserDetails(data);
      }
    };
    fetchTweets();
    fetchData();
  }, [id, tweets.length, dispatch]);

  if (loading)
    return (
      <div className="h-screen border-x-2 flex justify-center items-center">
        <FaXTwitter className=" text-5xl animate-bounce " />
      </div>
    );

  return (
    <div className="border-x-2 min-h-screen flex flex-col">
      <div className="flex items-center gap-10 border-b-2 p-2 cursor-pointer">
        <Link to="/">
          {" "}
          <ArrowLeft className="px-1 hover:bg-blue-600 rounded-full" />
        </Link>
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>
      <Info userDetails={userDetails} />
      <Outlet />
    </div>
  );
};

export default Profile;
