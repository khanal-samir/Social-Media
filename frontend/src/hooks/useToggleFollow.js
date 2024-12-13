import axios from "axios";
import { useToast } from "./use-toast";

const useToggleFollow = () => {
  const { toast } = useToast();
  const toggleFollow = async ({ userId }) => {
    try {
      const { data } = await axios.post(`/api/v1/follow/${userId}`);
      if (data.data) {
        toast({ title: "✅ User followed successfully" });
      } else {
        toast({
          title: "❌ User unfollowed successfully",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return toggleFollow;
};

export default useToggleFollow;
