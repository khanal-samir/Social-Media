import useGetUserFollowers from "@/hooks/useGetUserFollowers";
import { useState, useEffect } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { Link } from "react-router-dom";

const FollowersCom = ({ id }) => {
  const { loading, getUserFollowers } = useGetUserFollowers();
  const [followers, setFollowers] = useState([]);
  const [isFollowers, setIsFollowers] = useState(true);
  useEffect(() => {
    const fetchFollowers = async () => {
      setIsFollowers(true);
      const data = await getUserFollowers({ userId: id });
      if (data.length > 0) {
        setFollowers(data);
      } else {
        setIsFollowers(false);
      }
    };
    fetchFollowers();
  }, [id]);
  console.log("followers", followers);

  return (
    <div className="flex flex-col gap-2 px-2">
      <h1 className="text-center font-semibold">Followers</h1>
      {loading ? (
        <AiOutlineLoading className="animate-spin" />
      ) : (
        followers.length > 0 &&
        followers?.map((user) =>
          user.follower ? (
            <Link
              key={user._id}
              className="flex items-center gap-2"
              to={`/profile/${user.follower._id}`}
            >
              <img
                src={user.follower.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <h1 className="text-muted-foreground hover:underline">
                {user.follower.username}
              </h1>
            </Link>
          ) : null,
        )
      )}
      {followers.length === 0 && !isFollowers && (
        <h1 className="text-center">No followers</h1>
      )}
    </div>
  );
};

export default FollowersCom;
