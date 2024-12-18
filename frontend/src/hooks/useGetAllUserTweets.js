import axios from "axios";
import { useState } from "react";

const useGetAllUserTweets = () => {
  const [loading, setLoading] = useState(false);

  const getAllUserTweets = async ({ userId }) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/tweet/user-tweet/${userId}`);
      if (data.data.length > 0) {
        return data.data;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { loading, getAllUserTweets };
};

export default useGetAllUserTweets;
