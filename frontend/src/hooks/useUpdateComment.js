import axios from "axios";
import { useState } from "react";
import { useToast } from "./use-toast";

const useUpdateComment = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const updateTweet = async ({ commentId, content }) => {
    try {
      if (!content) {
        toast({ title: "❌ Comment content is required!" });
        return false;
      }
      setLoading(true);
      const { data } = await axios.patch(`/api/v1/comment/${commentId}`, {
        content,
      });

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
