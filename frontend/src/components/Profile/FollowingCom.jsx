import useGetUserFollowing from "@/hooks/useGetUserFollowing";
import { useState, useEffect } from "react";

import { AiOutlineLoading } from "react-icons/ai";
import { Link } from "react-router-dom";

const FollowingCom = ({ id }) => {
  const { loading, getUserFollowing } = useGetUserFollowing();
  const [following, setFollowing] = useState([]);
  const [isFollowing, setIsFollowing] = useState(true);
  useEffect(() => {
    const fetchFollowing = async () => {
      setIsFollowing(true);
      const data = await getUserFollowing({ userId: id });
      if (data.length > 0) {
        setFollowing(data);
      } else {
        setIsFollowing(false);
      }
    };
    fetchFollowing();
  }, [id]);

  return (
    <div className="flex flex-col gap-2 border-r-2 ">
      <h1 className="text-center font-semibold">Following</h1>
      {loading ? (
        <AiOutlineLoading className="animate-spin" />
      ) : (
        following?.map((user) =>
          user.following ? (
            <Link
              key={user._id}
              className="flex items-center gap-2"
              to={`/profile/${user.following._id}`}
            >
              <img
                src={user.following.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <h1 className="text-muted-foreground hover:underline">
                {user.following.username}
              </h1>
            </Link>
          ) : (
            <div key={user._id} className="text-red-500">
              Invalid following data
            </div>
          ),
        )
      )}
      {following.length === 0 && !isFollowing && (
        <h1 className="text-center">No following</h1>
      )}
    </div>
  );
};

export default FollowingCom;
