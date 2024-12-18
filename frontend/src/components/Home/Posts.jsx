import { useSelector } from "react-redux";
import SinglePost from "./SinglePost";

const Posts = () => {
  const tweets = useSelector((state) => state.tweet.tweets);
  if (!tweets.length)
    return (
      <div className="text-muted-foreground text-xl text-center mt-48">
        {" "}
        No Tweets Found!
      </div>
    );
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
