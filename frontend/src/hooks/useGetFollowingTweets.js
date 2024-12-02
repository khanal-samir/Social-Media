import axios from "axios";
import { useState } from "react";

const useGetFollowingTweets = () => {
  const [loading, setLoading] = useState(false);

  const fetchFollowingTweets = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/tweet/following-tweets");
      return data.data;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { loading, fetchFollowingTweets };
};

export default useGetFollowingTweets;
