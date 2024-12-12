import axios from "axios";
import { useState } from "react";
const useGetSingleTweet = () => {
  const [loading, setLoading] = useState(true);
  const getSingleTweet = async (id) => {
    try {
      setLoading;
      const { data } = await axios.get(`/api/v1/tweet/single-tweet/${id}`);
      return data.data[0];
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, getSingleTweet };
};

export default useGetSingleTweet;
