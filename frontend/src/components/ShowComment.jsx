import useGetComments from "@/hooks/useGetComments";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { allComments } from "@/store/tweetSlice";
import { AiOutlineLoading } from "react-icons/ai";

import SingleComment from "./SingleComment";

const ShowComment = ({ tweetId }) => {
  const { loading, getComments } = useGetComments();
  const comments = useSelector((state) => state.tweet.comment);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchComments = async () => {
      const data = await getComments({ tweetId });
      dispatch(allComments(data));
    };
    fetchComments();
  }, [tweetId, dispatch]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        {loading ? (
          <AiOutlineLoading className="animate-spin  w-8 h-8 m-auto" />
        ) : (
          <>
            {comments?.map((comment) => (
              <SingleComment key={comment._id} comment={comment} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ShowComment;
