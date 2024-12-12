import { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { addComments } from "@/store/tweetSlice";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import useCreateComment from "@/hooks/useCreateComment";
import { AiOutlineLoading } from "react-icons/ai";
const Comment = ({ tweet }) => {
  const { loading, createComment } = useCreateComment();
  const [countComment, setCountComment] = useState(tweet?.comments);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const handleCreateComment = async () => {
    if (!comment.trim()) return;
    const data = await createComment({
      tweetId: tweet._id,
      content: { content: comment },
    });
    dispatch(addComments(data));
    setComment("");
    setCountComment(countComment + 1);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className=" flex justify-center items-center gap-2 sm:gap-4   cursor-pointer">
          <FaRegComment className="hover:text-blue-600" />
          <span className=" hover:text-blue-600 text-base">{countComment}</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add Comment</DialogTitle>
        <div className="flex flex-col gap-4">
          <textarea
            className="border text-black border-gray-300 p-2 rounded-md"
            placeholder="Add Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <Button onClick={handleCreateComment} disabled={loading}>
            {loading ? (
              <AiOutlineLoading className="animate-spin" />
            ) : (
              <>Add Comment</>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Comment;
