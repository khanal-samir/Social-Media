import axios from "axios";
import { useState } from "react";
import { useToast } from "./use-toast";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const logout = async () => {
    try {
      setLoading(true);
      await axios.post("/api/v1/user/logout");
      toast({
        title: "✅ User logout successful.",
      });
      return true;
    } catch (error) {
      console.log(error);
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
  return { loading, logout };
};

export default useLogout;
