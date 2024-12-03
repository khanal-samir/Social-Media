import axios from "axios";
import { useState } from "react";
import { useToast } from "./use-toast";

const useUpdateTweet = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const updateTweet = async (tweetId, content) => {
    try {
      setLoading(true);
      const { data } = await axios.patch(
        `/api/v1/tweet/edit-tweet/${tweetId}`,
        content,
      );
      toast({
        title: "✅ Tweet updated Sucessfully!",
      });
      return data.data;
    } catch (error) {
      console.error(error);
      let errorMessage = error.response.data; // html
      // Use regex to extract the error text
      const match = errorMessage.match(/Error: ([\s\S]*?)<br>/);
      if (match) {
        errorMessage = match[1];
      }
      toast({
        variant: "destructive",
        title: errorMessage,
      });
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { loading, updateTweet };
};

export default useUpdateTweet;
