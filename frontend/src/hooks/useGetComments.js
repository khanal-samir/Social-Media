import axios from "axios";
import { useState } from "react";

const useGetComments = () => {
  const [loading, setLoading] = useState(false);
  const getComments = async ({ tweetId }) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/comment/${tweetId}`);
      console.log(data);
      return data.data;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, getComments };
};

export default useGetComments;
