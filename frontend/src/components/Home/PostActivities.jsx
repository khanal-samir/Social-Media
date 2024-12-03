import { useState } from "react";
import { FaRegComment, FaRegHeart } from "react-icons/fa";

const PostActivities = ({ tweet }) => {
  const [activites, setActivites] = useState({ comments: 0, likes: 0 });
  return (
    <div className=" sm:text-xl flex justify-around text-muted-foreground">
      <div className=" flex justify-center items-center gap-2 hover:text-blue-600  cursor-pointer">
        <FaRegComment />
        <span className=" text-base">
          {tweet.comments || activites.comments}
        </span>
      </div>

      <div className=" flex justify-center items-center gap-2  hover:text-red-600 cursor-pointer ">
        <FaRegHeart />{" "}
        <span className="text-base">{tweet.likes || activites.likes}</span>
      </div>
    </div>
  );
};

export default PostActivities;
