import { useState } from "react";
import axios from "axios";

const useGetNotifications = () => {
  const [loading, setLoading] = useState(false);
  const getNotfications = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/notification/");
      return data.data;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return { getNotfications, loading };
};

export default useGetNotifications;
