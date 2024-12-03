import { useSelector } from "react-redux";
import PostActivities from "./PostActivities";
import DeleteUpdate from "./DeleteUpdate";
import { useState } from "react";
import { Input } from "../ui/input";
const SinglePost = ({ tweet }) => {
  const user = useSelector((state) => state.auth.userInfo);
  const isUserTweet = user._id === tweet.owner._id;
  const [isUpdate, setIsUpdate] = useState(false);
  const [content, setContent] = useState(tweet.content);
  if (!tweet) return <></>;

  return (
    <div className="flex flex-col sm:gap-2 p-2 border-b-2 overflow-hidden">
      <header className="flex  items-center justify-between px-2 text-sm sm:text-base ">
        <div className="flex items-center gap-3">
          <img
            src={tweet.owner.avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <h2 className="font-semibold">{tweet.owner.username}</h2>
          <span className="hidden sm:block text-muted-foreground">
            {tweet.owner.email}
          </span>
          <span className="text-muted-foreground">
            {new Date(tweet.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div>
          {isUserTweet && (
            <DeleteUpdate
              tweet={tweet}
              update={setIsUpdate}
              content={content}
              isUpdate={isUpdate}
            />
          )}
        </div>
      </header>

      <div className="flex flex-col gap-2">
        {isUpdate ? (
          <Input value={content} onChange={(e) => setContent(e.target.value)} />
        ) : (
          <p className="text-md sm:text-base font-light">{tweet.content}</p>
        )}

        {tweet?.media ? (
          <img
            src={tweet.media}
            alt="tweet media"
            className=" sm:px-2 object-contain rounded-xl sm:rounded-2xl"
          />
        ) : null}
      </div>
      <PostActivities tweet={tweet} />
    </div>
  );
};

export default SinglePost;
