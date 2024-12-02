import axios from "axios";
import { useState } from "react";
import { useToast } from "./use-toast";
const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const signup = async (formData) => {
    try {
      setLoading(true);
      const correctVal = verifyInput(formData);
      if (!correctVal) {
        toast({
          variant: "destructive",
          title: "Password must be at least six letters",
        });
        return;
      }

      const formDataPayload = new FormData();
      formDataPayload.append("fullName", formData.fullName);
      formDataPayload.append("username", formData.username);
      formDataPayload.append("email", formData.email);
      formDataPayload.append("password", formData.password);
      formDataPayload.append("bio", formData.bio);
      // Add files
      if (formData.avatar && formData.avatar[0]) {
        formDataPayload.append("avatar", formData.avatar[0]);
      }
      if (formData.coverImage && formData.coverImage[0]) {
        formDataPayload.append("coverImage", formData.coverImage[0]);
      }

      const { data } = await axios.post(
        "/api/v1/user/register",
        formDataPayload,
      );

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

  return { signup, loading };
};

export default useSignup;
const verifyInput = (formData) => {
  // add toast
  if (
    [
      formData.fullName,
      formData.email,
      formData.password,
      formData.username,
      formData.avatar,
    ].some((item) => item === "")
  ) {
    return false;
  }
  if (formData.password.length < 6) {
    return false;
  }
  return true;
};
