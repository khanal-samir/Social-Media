import axios from "axios";

const useToggleFollow = () => {
  const toggleFollow = async ({ userId }) => {
    try {
      await axios.post(`/api/v1/follow/${userId}`);
    } catch (error) {
      console.log(error);
    }
  };
  return toggleFollow;
};

export default useToggleFollow;
