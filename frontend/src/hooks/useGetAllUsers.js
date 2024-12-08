import axios from "axios";
import { useState } from "react";

const useGetAllUsers = () => {
  const [loading, setLoading] = useState(false);

  const getAllUsers = async ({ page, limit, query, sortBy, sortType } = {}) => {
    try {
      setLoading(true);

      const response = await axios.get("/api/v1/user/all-users", {
        params: {
          page,
          limit,
          query,
          sortBy,
          sortType,
        },
      });

      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  return { getAllUsers, loading };
};

export default useGetAllUsers;
