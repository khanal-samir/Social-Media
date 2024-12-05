import axios from "axios";
import { useState } from "react";
const UseGetLikedUser = () => {
  const [loading, setLoading] = useState(false);
  const getLikedUsers = async ({ tweetID }) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/like/${tweetID}`);
      console.log(data);

      return data.data;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, getLikedUsers };
};

export default UseGetLikedUser;
