import { FaRegHeart } from "react-icons/fa";
import UseGetLikedUser from "@/hooks/UseGetLikedUser";
import useToggleLike from "@/hooks/useToggleLike";
import { useSelector } from "react-redux";
import { useState } from "react";
const Likes = ({ tweet }) => {
  const { getLikedUsers } = UseGetLikedUser();
  const { toggleLike } = useToggleLike();
  const user = useSelector((state) => state.auth.userInfo);
  const [isLiked, setIsLiked] = useState(
    tweet?.tweetLikes.some((like) => like.likedBy === user?._id),
  );

  const [like, setLike] = useState(tweet.likes);
  const handleLike = async () => {
    if (like <= tweet.likes && !isLiked) {
      setLike((prev) => ++prev);
      setIsLiked((prev) => !prev);
    } else {
      setLike((prev) => --prev);
      setIsLiked((prev) => !prev);
    }
    await toggleLike({ tweetID: tweet._id });
  };

  const [likedUsers, setLikedUsers] = useState([]);
  const handleGetLikedUsers = async () => {
    const data = await getLikedUsers({ tweetID: tweet?._id });
    if (data) {
      setLikedUsers(data);
    }
  };

  return (
    <div
      className={`flex justify-center items-center gap-2 sm:gap-4  cursor-pointer`}
    >
      <FaRegHeart
        onClick={handleLike}
        className={`${isLiked ? "text-red-600 hover:text-muted-foreground" : "hover:text-red-600"}`}
      />
      <span
        onClick={handleGetLikedUsers}
        className={`${isLiked ? "text-red-600 hover:text-muted-foreground" : "hover:text-red-600"}`}
      >
        {like}
      </span>
      {likedUsers.length > 0 && (
        <div>
          {likedUsers.map((user) => (
            <>{user.likedBy?.username}</>
          ))}
        </div>
      )}
    </div>
  );
};

export default Likes;
