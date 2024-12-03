import axios from "axios";
import { useState } from "react";
import { useToast } from "./use-toast";

const useDeleteTweet = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const deleteTweet = async (tweetId) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `/api/v1/tweet/delete-tweet/${tweetId}`,
      );
      if (response) {
        toast({
          title: "✅ Tweet deleted Sucessfully!",
        });
        return true;
      }
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { loading, deleteTweet };
};

export default useDeleteTweet;
