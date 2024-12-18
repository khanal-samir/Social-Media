import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AiOutlineLoading } from "react-icons/ai";
import useDeleteTweet from "@/hooks/useDeleteTweet";
import useUpdateTweet from "@/hooks/useUpdateTweet";
import { rmTweet, updateTweet as sliceUpdateTweet } from "@/store/tweetSlice";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { useLocation, useNavigate } from "react-router-dom";
const DeleteUpdate = ({ tweet, update, content, isUpdate }) => {
  const { loading: deleteLoading, deleteTweet } = useDeleteTweet();
  const { loading: updateLoading, updateTweet } = useUpdateTweet();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const handleDelete = async () => {
    const response = await deleteTweet(tweet._id);
    if (response) {
      dispatch(rmTweet(tweet));
      if (location !== "/") {
        navigate("/");
      }
    }
  };

  const handleUpdate = async () => {
    if (tweet.content === content) {
      update(false);
      return;
    }
    const data = await updateTweet(tweet._id, { content });
    if (data) {
      update(false);
      dispatch(sliceUpdateTweet(data));
    }
  };

  if (isUpdate)
    return (
      <>
        <Button
          onClick={handleUpdate}
          className="px-2 rounded-full bg-blue-600 text-white hover:bg-blue-800"
        >
          {updateLoading ? (
            <AiOutlineLoading className="animate-spin" />
          ) : (
            <>Update</>
          )}
        </Button>
      </>
    );
  return (
    <>
      {deleteLoading ? (
        <AiOutlineLoading className="animate-spin" />
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <p className="text-bold text-2xl">...</p>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Edit your Tweet</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => update(true)}>
              Update
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default DeleteUpdate;
