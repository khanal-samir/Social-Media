import useGetUserFollowing from "@/hooks/useGetUserFollowing";
import { useState, useEffect } from "react";

import { AiOutlineLoading } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Following</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center">
            <AiOutlineLoading className="animate-spin text-2xl" />
          </div>
        ) : following.length > 0 ? (
          <div className="space-y-2">
            {following?.map((user) =>
              user.following ? (
                <Link
                  key={user._id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                  to={`/profile/${user.following._id}`}
                >
                  <img
                    src={user.following.avatar}
                    alt="avatar"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h1 className="font-medium hover:underline">
                      {user.following.username}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      {user.following.email}
                    </p>
                  </div>
                </Link>
              ) : (
                <div key={user._id} className="text-red-500">
                  Invalid following data
                </div>
              ),
            )}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No following</p>
        )}
      </CardContent>
    </Card>
  );
};

export default FollowingCom;
