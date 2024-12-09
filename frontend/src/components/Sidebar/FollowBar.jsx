import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CardUser from "./CardUser";
import { useEffect, useState } from "react";
import useGetAllUsers from "@/hooks/useGetAllUsers";
import useGetFollowingUsers from "@/hooks/useGetFollowingUsers";
import { useSelector } from "react-redux";

const FollowBar = () => {
  const { getAllUsers } = useGetAllUsers();
  const { getFollowingUsers } = useGetFollowingUsers();
  const user = useSelector((state) => state.auth.userInfo);
  const [followUsers, setFollowUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      if (!user) return;
      if (followUsers.length !== 0) return;
      const allUsers = (await getAllUsers({ limit: 10 })) || [];

      const followingUsers =
        (await getFollowingUsers({ userId: user?._id })) || [];

      // extract Id
      const followingUserIds = followingUsers?.map((u) => u.following._id);

      setFollowUsers(
        allUsers
          ?.sort(() => Math.random() - 0.5) // Shuffle the array
          ?.filter((u) => !followingUserIds?.includes(u._id)) // Filter out users already followed
          ?.slice(0, 3),
      );
    };
    getUsers();
  }, [user]);

  return (
    <div className="hidden sm:block">
      {followUsers && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm lg:text-lg">Who to Follow</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:gap-2">
            {followUsers.map((u) => (
              <CardUser key={u._id} user={u} />
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FollowBar;
