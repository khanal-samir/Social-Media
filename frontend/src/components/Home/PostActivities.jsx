import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";

const PostActivities = () => {
  return (
    <div className=" sm:text-xl flex justify-around">
      <FaRegComment className="hover:text-blue-600  cursor-pointer" />
      <BiRepost className=" hover:text-green-600 cursor-pointer" />
      <FaRegHeart className="  hover:text-red-600 cursor-pointer " />
    </div>
  );
};

export default PostActivities;
