import axios from "axios";
import { useState } from "react";

const useGetUserDetails = () => {
  const [loading, setLoading] = useState(false);

  const getUserDetails = async ({ userId }) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/user/user-details/${userId}`);
      return data.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { getUserDetails, loading };
};

export default useGetUserDetails;
