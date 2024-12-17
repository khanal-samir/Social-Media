import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useToggleFollow from "@/hooks/useToggleFollow";

const Info = ({ userDetails }) => {
  const user = useSelector((state) => state.auth.userInfo);

  const [isFollowing, setIsFollowing] = useState(false);
  const toggleFollow = useToggleFollow();
  useEffect(() => {
    setIsFollowing(userDetails?.isFollowing);
  }, [userDetails.isFollowing]);

  const handleToggleFollow = async () => {
    setIsFollowing((prev) => !prev);
    await toggleFollow({ userId: userDetails._id });
  };

  if (!userDetails) return <></>;

  return (
    <div className="flex flex-col">
      {/* Cover Image */}
      <Dialog>
        <DialogTrigger>
          {" "}
          <img
            src={
              userDetails.coverImage ||
              "https://via.placeholder.com/150?text=N/A"
            }
            alt="CoverImage"
            className="w-full h-40 object-cover"
          />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cover Image</DialogTitle>
            <DialogDescription>
              <img
                src={
                  userDetails.coverImage ||
                  "https://via.placeholder.com/150?text=N/A"
                }
                alt="CoverImage"
                className="rounded-md w-full h-full object-cover"
              />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Profile Image */}
      <div className="flex justify-between items-center bg-primary-foreground border-b-2 px-4 py-2">
        <div className="flex items-center gap-2">
          <img
            src={userDetails.avatar}
            alt="ProfileImage"
            className="rounded-full w-24 h-24 border-2 border-blue-500 shadow-lg"
          />
          <div className="flex flex-col gap-1 flex-wrap">
            <h1 className="font-bold text-xl cursor-pointer hover:underline">
              {userDetails.fullName}
            </h1>
            <h1 className="text-xs font-light cursor-pointer hover:underline">{`@${userDetails.username}`}</h1>
            <h1 className="text-xs text-muted-foreground cursor-pointer hover:underline">
              {userDetails.email}
            </h1>
            {/* Bio */}
            {userDetails.bio && userDetails.bio !== "undefined" ? (
              <p className="text-sm text-muted-foreground">{userDetails.bio}</p>
            ) : (
              <p className="text-sm text-muted-foreground">No bio available</p>
            )}
          </div>
        </div>

        {userDetails._id === user._id ? (
          <Link to="/settings">
            {" "}
            <Button
              variant="outline"
              className="text-blue-500 border-blue-500 rounded-full"
            >
              Edit Profile
            </Button>
          </Link>
        ) : (
          <Button
            className={`rounded-full ${isFollowing ? "bg-blue-500" : null}`}
            onClick={handleToggleFollow}
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
        )}
      </div>

      {/* Bio */}
    </div>
  );
};

export default Info;
