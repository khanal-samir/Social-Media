import axios from "axios";
import { useState } from "react";

const useGetFollowingTweets = () => {
  const [loading, setLoading] = useState(false);

  const fetchFollowingTweets = async ({
    page,
    limit,
    query,
    sortBy,
    sortType,
  }) => {
    try {
      setLoading(true);
      const { data } = await axios.get(" /api/v1/tweet/following-tweets", {
        params: {
          page,
          limit,
          query,
          sortBy,
          sortType,
        },
      });
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
