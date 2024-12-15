import { useState } from "react";
import { useToast } from "./use-toast";
import axios from "axios";

const useUpdateUserDetails = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const updateUserdetails = async ({ username, bio, fullName }) => {
    try {
      setLoading(true);
      if (!username || !bio || !fullName) {
        toast({
          variant: "destructive",
          title: "Please fill all the fields",
        });
        return;
      }
      const { data } = await axios.patch(`/api/v1/user/update-account`, {
        username,
        bio,
        fullName,
      });
      console.log(data.data);
      toast({
        title: "✅User details updated successfully",
      });

      return data.data;
    } catch (error) {
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
  return { updateUserdetails, loading };
};

export default useUpdateUserDetails;
