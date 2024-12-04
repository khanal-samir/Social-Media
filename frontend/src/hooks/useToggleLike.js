import axios from "axios";

const useToggleLike = () => {
  const toggleLike = async ({ tweetID }) => {
    try {
      const response = await axios.post(`/api/v1/like/${tweetID}`);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return { toggleLike };
};

export default useToggleLike;
