import { FaRegHeart } from "react-icons/fa";
import useToggleLike from "@/hooks/useToggleLike";
import { useSelector } from "react-redux";
import { useState } from "react";

const Likes = ({ tweet }) => {
  const { toggleLike } = useToggleLike();
  const user = useSelector((state) => state.auth.userInfo);

  const [isLiked, setIsLiked] = useState(
    tweet?.tweetLikes.some((like) => like.likedBy === user?._id),
  );
  const [like, setLike] = useState(tweet.likes);
  const handleLike = async () => {
    if (like <= tweet.likes && !isLiked) {
      setLike((prev) => ++prev);
    } else {
      setLike((prev) => --prev);
    }
    setIsLiked((prev) => !prev);
    await toggleLike({ tweetID: tweet._id });
  };

  return (
    <div
      className={`flex justify-center items-center gap-2 sm:gap-4  cursor-pointer`}
      onClick={handleLike}
    >
      <FaRegHeart
        className={`${isLiked ? "text-red-600 hover:text-muted-foreground" : "hover:text-red-600"}`}
      />
      <span
        className={`${isLiked ? "text-red-600 hover:text-muted-foreground" : "hover:text-red-600"}`}
      >
        {like}
      </span>
    </div>
  );
};

export default Likes;
