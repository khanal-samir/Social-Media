import axios from "axios";
import { useState } from "react";
import { useToast } from "./use-toast";

const useUpdateComment = ({ commentId, content }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const updateTweet = async () => {
    try {
      setLoading(true);
      const { data } = axios.patch(`/api/v1/comment/${commentId}`, content);
      console.log(data);
      toast({ title: "✅ Comment updated Sucessfully!" });
      return data.data;
    } catch (error) {
      console.error(error);
      let errorMessage = error.response.data; // html
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

export default useUpdateComment;
