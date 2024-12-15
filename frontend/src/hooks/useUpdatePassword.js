import { useState } from "react";
import axios from "axios";
import { useToast } from "./use-toast";

const useUpdatePassword = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const updatePassword = async ({ newPassword, oldPassword }) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/v1/user/change-password", {
        newPassword,
        oldPassword,
      });
      toast({
        title: "✅ Password updated Sucessfully!",
      });
      console.log(data);
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
  return { loading, updatePassword };
};

export default useUpdatePassword;
