import axios from "axios";
import { useState } from "react";

const useGetFollowingUsers = () => {
  const [loading, setLoading] = useState(false);

  const getFollowingUsers = async ({ userId }) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/follow/following/${userId}`);
      return data.data;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { getFollowingUsers, loading };
};

export default useGetFollowingUsers;
