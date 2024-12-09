import { useState } from "react";
import { Button } from "../ui/button";
import useToggleFollow from "@/hooks/useToggleFollow";
const CardUser = ({ user }) => {
  const toggleFollow = useToggleFollow();
  const [isLiked, setIsLiked] = useState(false);
  const handleClick = async () => {
    setIsLiked((prev) => !prev);
    await toggleFollow({ userId: user._id });
  };

  if (!user) return null;
  return (
    <div className="flex flex-wrap justify-between">
      <div className="flex justify-around py-2 gap-4">
        <img
          src={user.avatar}
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />

        <div className=" hidden  lg:flex lg:flex-col">
          <p className="font-semibold sm:text-xs lg:text-lg">{user.username}</p>
          <p className="text-[8px] text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <Button
        className={`rounded-3xl ${isLiked ? "bg-gray-700" : null}`}
        onClick={handleClick}
      >
        {!isLiked ? <>Follow</> : <>Followed</>}
      </Button>
    </div>
  );
};

export default CardUser;
