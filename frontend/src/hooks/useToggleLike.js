import axios from "axios";

const useToggleLike = () => {
  const toggleLike = async ({ tweetID }) => {
    try {
      await axios.post(`/api/v1/like/${tweetID}`);
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  return { toggleLike };
};

export default useToggleLike;
