import Comment from "./Comment";
import Likes from "./Likes";
const PostActivities = ({ tweet }) => {
  return (
    <div className=" sm:text-xl flex justify-around text-muted-foreground">
      <Comment tweet={tweet} />
      <Likes tweet={tweet} />
    </div>
  );
};

export default PostActivities;
