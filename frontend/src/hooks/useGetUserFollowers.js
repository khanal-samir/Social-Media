import axios from "axios";
import { useState } from "react";

const useGetUserFollowers = () => {
  const [loading, setLoading] = useState(false);
  const getUserFollowers = async ({ userId }) => {
    try {
      const { data } = await axios.get(`/api/v1/follow/followers/${userId}`);
      return data.data;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return { getUserFollowers, loading };
};

export default useGetUserFollowers;
