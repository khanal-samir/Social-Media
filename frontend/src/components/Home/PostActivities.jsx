import useToggleLike from "@/hooks/useToggleLike";
import { useState } from "react";
import { FaRegComment, FaRegHeart } from "react-icons/fa";

const PostActivities = ({ tweet }) => {
  const [activites, setActivites] = useState({
    comments: tweet.comments || 0,
    likes: tweet.likes || 0,
  });
  const { toggleLike } = useToggleLike();

  const handleLike = async () => {};
  return (
    <div className=" sm:text-xl flex justify-around text-muted-foreground">
      <div className=" flex justify-center items-center gap-2 sm:gap-4   cursor-pointer">
        <FaRegComment
          className="hover:text-blue-600"
          onClick={() =>
            setActivites((prev) => ({
              ...prev,
              comments: prev.comments === 0 ? prev.comments++ : prev.comments--,
            }))
          }
        />
        <span className=" hover:text-blue-600 text-base">
          {activites.comments}
        </span>
      </div>

      <div className=" flex justify-center items-center gap-2 sm:gap-4  cursor-pointer ">
        <FaRegHeart
          className=" hover:text-red-600"
          onClick={() =>
            setActivites((prev) => ({
              ...prev,
              likes:
                prev.likes === (tweet.likes || 0) ? prev.likes++ : prev.likes--,
            }))
          }
        />{" "}
        <span className=" hover:text-red-600 text-base">{activites.likes}</span>
      </div>
    </div>
  );
};

export default PostActivities;
