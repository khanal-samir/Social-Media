import { useState } from "react";
import axios from "axios";

const useGetUser = () => {
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/user/current-user");
      console.log(data);
      console.log(data.data);
      return data.data;
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, fetchUser };
};

export default useGetUser;
