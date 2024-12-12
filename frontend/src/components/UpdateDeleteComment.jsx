import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { updateComments, rmComments } from "@/store/tweetSlice";
import useUpdateComment from "@/hooks/useUpdateComment";
import useDeleteComment from "@/hooks/useDeleteComment";
import { Button } from "./ui/button";
import { AiOutlineLoading } from "react-icons/ai";

const UpdateDeleteComment = ({ comment, content, isUpdate, setisUpdate }) => {
  const user = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const { loading: updateLoading, updateTweet } = useUpdateComment();
  const { loading: deleteLoading, deleteComment } = useDeleteComment();

  const handleUpdate = async () => {
    if (content === comment.content) {
      setisUpdate(false);
      return;
    }
    const data = await updateTweet({ commentId: comment._id, content });
    if (data) {
      dispatch(updateComments(data));
      setisUpdate(false);
    }
  };

  const handleDelete = async () => {
    const response = await deleteComment({ commentId: comment._id });
    if (response) {
      dispatch(rmComments(comment));
    }
  };
  if (isUpdate)
    return (
      <div>
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
      </div>
    );
  return (
    <>
      {" "}
      {!deleteLoading ? (
        <>
          {user?._id === comment?.owner._id && (
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <p className="text-bold text-2xl">...</p>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Edit your Comment</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setisUpdate(true)}>
                    Update
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDelete}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </>
      ) : (
        <AiOutlineLoading className="animate-spin" />
      )}{" "}
    </>
  );
};

export default UpdateDeleteComment;
