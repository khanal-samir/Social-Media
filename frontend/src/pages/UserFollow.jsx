import FollowersCom from "@/components/Profile/FollowersCom";
import FollowingCom from "@/components/Profile/FollowingCom";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const UserFollow = () => {
  const { id } = useParams();

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-2 px-2 py-1 border-b-2">
        <FollowingCom id={id} />
        <FollowersCom id={id} />
      </div>
      <Link to={`/profile/${id}`}>
        <Button className="rounded-full bg-blue-600 text-white">
          <ArrowBigLeft />
          Back
        </Button>
      </Link>
    </div>
  );
};

export default UserFollow;
