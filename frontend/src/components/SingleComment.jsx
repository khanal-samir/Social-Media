import { useState } from "react";
import UpdateDeleteComment from "./UpdateDeleteComment";
import { Input } from "./ui/input";
import { Link } from "react-router-dom";

const SingleComment = ({ comment }) => {
  const [update, setUpdate] = useState(false);
  const [content, setContent] = useState(comment?.content);
  return (
    <div className="flex flex-col gap-2 border-b py-4 px-2 font-light ">
      <div className="flex justify-between">
        <Link
          to={`/profile/${comment?.owner._id}`}
          className="flex items-center gap-2 hover:bg-primary-foreground p-2 rounded-lg"
        >
          <img
            src={comment.owner.avatar}
            alt="owner"
            className="w-8 h-8 rounded-full"
          />
          <p className="font-bold">{comment.owner.username}</p>
          <p className="text-xs hidden lg:block">{comment.owner.email}</p>
          <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
        </Link>

        <div>
          <UpdateDeleteComment
            comment={comment}
            content={content}
            isUpdate={update}
            setisUpdate={setUpdate}
          />
        </div>
      </div>

      {!update ? (
        <p className="text-sm">{comment.content}</p>
      ) : (
        <Input value={content} onChange={(e) => setContent(e.target.value)} />
      )}
    </div>
  );
};

export default SingleComment;
