import ChangePass from "@/components/Settings/ChangePass";
import UpdateAccount from "@/components/Settings/UpdateAccount";
import { MoveLeft } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Settings = () => {
  const user = useSelector((state) => state.auth.userInfo);

  return (
    <div className="min-h-screen border-x-2 flex flex-col gap-2">
      <div className="flex items-center gap-10 p-4 border-b-2">
        <Link to="/">
          {" "}
          <MoveLeft
            size={32}
            className="cursor-pointer hover:bg-blue-600 rounded-full px-1"
          />
        </Link>
        <h1 className="font-bold text-2xl"> Profile Settings</h1>
      </div>

      <div className="flex flex-col gap-4 p-4">
        <UpdateAccount
          fullName={user?.fullName}
          bio={user?.bio}
          username={user?.username}
        />
        <ChangePass />
        <div>
          <h2 className="text-muted-foreground">Update Avatar</h2>
        </div>

        <div>
          <h2 className="text-muted-foreground">Update CoverImage</h2>
        </div>
      </div>
    </div>
  );
};

export default Settings;
