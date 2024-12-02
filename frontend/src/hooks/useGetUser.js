import { useState } from "react";
import axios from "axios";

const useGetUser = () => {
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/user/current-user");
      return data.data.user;
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, fetchUser };
};

export default useGetUser;
