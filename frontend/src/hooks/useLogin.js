import axios from "axios";
import { useState } from "react";
import { useToast } from "./use-toast";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const login = async ({ username, email, password }) => {
    try {
      setLoading(true);
      if (!(username || email) && password)
        toast({
          variant: "destructive",
          title: "All Fields are required!",
        });

      const { data } = await axios.post("/api/v1/user/login", {
        username,
        email,
        password,
      });
      toast({
        title: "✅ User login successful.",
      });
      return data;
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
  return { login, loading };
};

export default useLogin;
