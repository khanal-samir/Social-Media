import axios from "axios";
import { useToast } from "./use-toast";

const useToggleLike = () => {
  const { toast } = useToast();
  const toggleLike = async ({ tweetID }) => {
    try {
      const { data } = await axios.post(`/api/v1/like/${tweetID}`);
      if (data.data) {
        toast({ title: "✅ Tweet liked successfully" });
      } else {
        toast({
          title: "❌ Tweet unliked successfully",
        });
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  return { toggleLike };
};

export default useToggleLike;
