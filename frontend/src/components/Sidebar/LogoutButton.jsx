import { Button } from "../ui/button";
import { MdLogout } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDispatch } from "react-redux";
import { logout as sliceLogout } from "@/store/authSlice";
import { AiOutlineLoading } from "react-icons/ai";
import useLogout from "@/hooks/useLogout";
const LogoutButton = () => {
  const { loading, logout } = useLogout();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const response = await logout();
    if (response) {
      dispatch(sliceLogout());
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex justify-end">
          <Button variant="outline" className="p-2">
            {loading ? (
              <AiOutlineLoading className="animate-spin" />
            ) : (
              <>
                Logout <MdLogout />
              </>
            )}
          </Button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently logout your
            account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutButton;
