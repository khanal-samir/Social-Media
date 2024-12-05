import { FaRegComment } from "react-icons/fa";
import Likes from "./Likes";

const PostActivities = ({ tweet }) => {
  return (
    <div className=" sm:text-xl flex justify-around text-muted-foreground">
      <div className=" flex justify-center items-center gap-2 sm:gap-4   cursor-pointer">
        <FaRegComment
          className="hover:text-blue-600"
          // onClick={() =>
          //   setActivites((prev) => ({
          //     ...prev,
          //     comments: prev.comments === 0 ? prev.comments++ : prev.comments--,
          //   }))
          // }
        />
        <span className=" hover:text-blue-600 text-base">
          {/* {activites.comments} */}
        </span>
      </div>
      <Likes tweet={tweet} />
    </div>
  );
};

export default PostActivities;
