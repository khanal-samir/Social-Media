/* eslint-disable no-undef */
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
const useGetAllTweets = () => {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.status);
  if (!user) return false;

  const getTweets = async ({ page, limit, query, sortBy, sortType }) => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/tweet/all-tweets", {
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
  return { loading, getTweets };
};

export default useGetAllTweets;
