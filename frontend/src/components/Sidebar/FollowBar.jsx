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
  const [followUser, setFollowUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      if (!user) return;
      getAllUsers({ limit: 10 });
      getFollowingUsers({ userId: user?._id });
    };
    getUsers();
  }, []);

  return (
    <div className="hidden sm:block">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm lg:text-lg">Who to Follow</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:gap-2">
          <CardUser />
          <CardUser />
          <CardUser />
        </CardContent>
      </Card>
    </div>
  );
};

export default FollowBar;
