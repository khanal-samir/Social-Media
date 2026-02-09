import useGetUserFollowers from "@/hooks/useGetUserFollowers";
import { useState, useEffect } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FollowersCom = ({ id }) => {
  const { loading, getUserFollowers } = useGetUserFollowers();
  const [followers, setFollowers] = useState([]);
  useEffect(() => {
    const fetchFollowers = async () => {
      const data = await getUserFollowers({ userId: id });
      if (data.length > 0) {
        setFollowers(data);
      }
    };
    fetchFollowers();
  }, [id]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Followers</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center">
            <AiOutlineLoading className="animate-spin text-2xl" />
          </div>
        ) : followers.length > 0 ? (
          <div className="space-y-2">
            {followers?.map((user) =>
              user.follower ? (
                <Link
                  key={user._id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                  to={`/profile/${user.follower._id}`}
                >
                  <img
                    src={user.follower.avatar}
                    alt="avatar"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h1 className="font-medium hover:underline">
                      {user.follower.username}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      {user.follower.email}
                    </p>
                  </div>
                </Link>
              ) : null,
            )}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No followers</p>
        )}
      </CardContent>
    </Card>
  );
};

export default FollowersCom;
