import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useLogout from "@/hooks/useLogout";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { logout as sliceLogout } from "@/store/authSlice";

function UserInfo() {
  const { logout } = useLogout();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userInfo);
  if (!user) return; // during querying

  const handleLogout = async () => {
    await logout();
    dispatch(sliceLogout());
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {" "}
        <div className="p-2 flex gap-4 hover:opacity-85 hover:dark:opacity-10 cursor-pointer">
          {/* TODO add user avatar here */}

          <img
            src={user?.avatar}
            alt="avatar"
            className="w-full h-full sm:w-10 sm:h-10 rounded-full"
          />
          <div className="hidden sm:flex flex-col">
            <p className="font-semibold">{user?.username}</p>
            <p className=" text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 font-semibold ">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserInfo;
