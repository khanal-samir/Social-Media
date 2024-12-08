import axios from "axios";
import { useState } from "react";

const useGetFollowingUsers = () => {
  const [loading, setLoading] = useState(false);

  const getFollowingUsers = async ({ userId }) => {
    try {
      setLoading(true);
      const user = await axios.get(`/api/v1/follow/following/${userId}`);
      console.log(user.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { getFollowingUsers, loading };
};

export default useGetFollowingUsers;
