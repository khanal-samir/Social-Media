import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaFeather } from "react-icons/fa6";
import CreatePost from "../Home/CreatePost";

const Post = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="w-full h-12 rounded-3xl dark:text-white bg-blue-600 hover:opacity-90 hover:bg-blue-500 text-sm sm:text-lg sm:font-bold">
          <span className="hidden sm:block">Post</span>
          <FaFeather className="sm:hidden" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create a Post</DialogTitle>
        <CreatePost isImage={false} />
      </DialogContent>
    </Dialog>
  );
};

export default Post;
