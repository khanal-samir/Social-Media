import axios from "axios";
import { useState } from "react";
import { useToast } from "./use-toast";

const useUpdateAvatar = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const updateAvatar = async ({ img }) => {
    try {
      setLoading(true);
      const formDataPayload = new FormData();
      formDataPayload.append("avatar", img);
      const { data } = await axios.patch(
        "/api/v1/user/avatar",
        formDataPayload,
      );
      if (data) {
        toast({
          title: "✅ Avatar updated Sucessfully!",
        });
        return data.data;
      }
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
  return { updateAvatar, loading };
};

export default useUpdateAvatar;
