import { FaRegComment, FaRegHeart } from "react-icons/fa";

const PostActivities = () => {
  return (
    <div className=" sm:text-xl flex justify-around">
      <FaRegComment className="hover:text-blue-600  cursor-pointer" />
      <FaRegHeart className="  hover:text-red-600 cursor-pointer " />
    </div>
  );
};

export default PostActivities;
