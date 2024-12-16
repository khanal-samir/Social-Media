import { useSelector } from "react-redux";
import { Button } from "../ui/button";

const Info = ({ userDetails }) => {
  const user = useSelector((state) => state.auth.userInfo);

  if (!userDetails) return <></>;

  return (
    <div className="flex flex-col gap-2">
      {/* Cover Image */}
      <img
        src={userDetails.coverImage}
        alt="CoverImage"
        className="w-full h-40 object-cover"
      />

      {/* Profile Image */}
      <div className="flex justify-between items-center px-4">
        <div className="flex items-center gap-4">
          <img
            src={userDetails.avatar}
            alt="ProfileImage"
            className="rounded-full w-24 h-24 border-2 border- shadow-lg"
          />
          <div className="flex flex-col gap-1">
            <h1 className="font-bold text-xl">{userDetails.fullName}</h1>
            <h1 className="text-xs font-light">{`@${userDetails.username}`}</h1>
            <h1 className="text-xs text-muted-foreground">
              {userDetails.email}
            </h1>
          </div>
        </div>
        <Button
          variant="outline"
          className="border-blue-500 text-blue-500 rounded-xl"
        >
          Edit Profile
        </Button>
      </div>
    </div>
  );
};

export default Info;
