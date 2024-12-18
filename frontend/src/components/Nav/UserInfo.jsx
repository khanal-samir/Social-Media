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
import { Link } from "react-router-dom";

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
    <div className="flex justify-between items-center px-2">
      <div className="w-fit p-2 hidden lg:flex  gap-4 ">
        {/* TODO add user avatar here */}

        <img
          src={user?.avatar}
          alt="avatar"
          className="w-full h-full sm:w-10 sm:h-10 rounded-full"
        />
        <div className="hidden lg:flex flex-col">
          <p className="font-semibold">{user?.username}</p>
          <p className=" text-xs text-muted-foreground">{user?.email}</p>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger>
          {" "}
          <div>
            <h1 className="text-3xl hidden lg:block font-bold hover:opacity-85 hover:dark:opacity-10 cursor-pointer">
              ...
            </h1>
            <img
              src={user?.avatar}
              alt="avatar"
              className="mx-auto md:w-1/2 rounded-full lg:hidden"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-2 font-semibold ">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link to={`/profile/${user?._id}`}>
            {" "}
            <DropdownMenuItem className="cursor-pointer">
              Profile
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default UserInfo;
