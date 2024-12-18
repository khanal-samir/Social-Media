import axios from "axios";
import { useState } from "react";

const useGetUserFollowing = () => {
  const [loading, setLoading] = useState(false);
  const getUserFollowing = async ({ userId }) => {
    try {
      const { data } = await axios.get(`/api/v1/follow/following/${userId}`);
      return data.data;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return { getUserFollowing, loading };
};

export default useGetUserFollowing;
