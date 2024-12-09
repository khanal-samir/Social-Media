import axios from "axios";
import { useState } from "react";

const useGetAllUsers = () => {
  const [loading, setLoading] = useState(false);

  const getAllUsers = async ({ page, limit, query, sortBy, sortType } = {}) => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/user/all-users", {
        params: {
          page,
          limit,
          query,
          sortBy,
          sortType,
        },
      });

      return data.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { getAllUsers, loading };
};

export default useGetAllUsers;
