import axios from "axios";
import { useState } from "react";
import { useToast } from "./use-toast";

const useUpdateCoverImage = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const updateCoverImage = async ({ img }) => {
    try {
      setLoading(true);
      const formDataPayload = new FormData();
      formDataPayload.append("coverImage", img); // Use "coverImage" as the key
      const { data } = await axios.patch(
        "/api/v1/user/cover-image",
        formDataPayload,
      ); // Update endpoint
      if (data) {
        toast({
          title: "✅ Cover image updated successfully!",
        });
        return data.data;
      }
    } catch (error) {
      console.error(error);
      let errorMessage = "Something went wrong!";
      if (error.response) {
        if (typeof error.response.data === "string") {
          const match = error.response.data.match(/Error: ([\s\S]*?)<br>/);
          if (match) {
            errorMessage = match[1];
          }
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        }
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

  return { updateCoverImage, loading };
};

export default useUpdateCoverImage;
