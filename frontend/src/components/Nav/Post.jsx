import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FaFeather } from "react-icons/fa6";
import { CreatePost } from "..";

const Post = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="w-full h-12 rounded-3xl dark:text-white bg-blue-500 hover:opacity-90 hover:bg-blue-500 text-sm sm:text-lg sm:font-bold">
          <span className="hidden sm:block">Post</span>
          <FaFeather className="sm:hidden" />
        </Button>
      </DialogTrigger>

      <DialogContent className="px-2 flex flex-col gap-4">
        <CreatePost />
      </DialogContent>
    </Dialog>
  );
};

export default Post;
