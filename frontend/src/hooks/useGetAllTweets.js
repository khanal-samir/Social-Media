import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
const useGetAllTweets = () => {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.status);
  if (!user) return false;

  const getTweets = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/tweet/all-tweets`);
      return data.data;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { loading, getTweets };
};

export default useGetAllTweets;
