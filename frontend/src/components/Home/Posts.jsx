import { useSelector } from "react-redux";
import SinglePost from "./SinglePost";

const Posts = () => {
  const tweets = useSelector((state) => state.tweet.tweets);
  if (!tweets) return;
  //loop posts
  return (
    <div>
      {tweets?.map((tweet) => (
        <SinglePost key={tweet?._id} tweet={tweet} />
      ))}
    </div>
  );
};

export default Posts;
