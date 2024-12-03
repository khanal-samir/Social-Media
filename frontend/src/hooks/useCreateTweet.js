import axios from "axios";
import { useState } from "react";
import { useToast } from "./use-toast";
const useCreateTweet = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const createTweet = async ({ content = "", media = "" }) => {
    try {
      setLoading(true);
      const formDataPayload = new FormData();
      formDataPayload.append("content", content);
      if (media && media[0]) {
        formDataPayload.append("media", media[0]);
      }

      const { data } = await axios.post(
        "/api/v1/tweet/add-tweet",
        formDataPayload,
      );
      toast({
        title: "✅ Tweet created Sucessfully!",
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
    } finally {
      setLoading(false);
    }
  };
  return { loading, createTweet };
};

export default useCreateTweet;
