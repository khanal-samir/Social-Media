import { useState } from "react";
import axios from "axios";
import { useToast } from "./use-toast";
const useDeleteComment = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const deleteComment = async ({ commentId }) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`/api/v1/comment/${commentId}`);
      toast({ title: "✅ Comment Deleted Successfully!" });
      return data;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { loading, deleteComment };
};

export default useDeleteComment;
