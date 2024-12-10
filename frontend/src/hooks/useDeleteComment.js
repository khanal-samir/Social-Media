import { useState } from "react";
import axios from "axios";
const useDeleteComment = () => {
  const [loading, setLoading] = useState(false);
  const deleteComment = async ({ commentId }) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`/api/v1/comment/${commentId}`);
      console.log(data);
      return true;
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
