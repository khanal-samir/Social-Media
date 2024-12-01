import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaFeather, FaImage } from "react-icons/fa6";
import { useSelector } from "react-redux";

const Post = () => {
  const user = useSelector((state) => state.auth.userInfo);
  // console.log(user);

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="w-full h-12 rounded-3xl dark:text-white bg-blue-500 hover:opacity-90 hover:bg-blue-500 text-sm sm:text-lg sm:font-bold">
          <span className="hidden sm:block">Post</span>
          <FaFeather className="sm:hidden" />
        </Button>
      </DialogTrigger>

      <DialogContent className="px-2 pt-10 flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle>Create Tweet</DialogTitle>
          <DialogDescription>
            Tweet your thoughts to the world!
          </DialogDescription>
        </DialogHeader>

        <div>
          {/* TODO add user avatar here */}
          <Label className="flex gap-5">
            <img
              src={user?.avatar}
              alt="avatar"
              className="w-16 h-16 rounded-full"
            />
            <Input
              className="h-16 border-none "
              placeholder="What is happening?!"
            />
          </Label>
        </div>
        <hr />
        <div className="flex justify-between px-4">
          <div>
            <label htmlFor="image">
              <FaImage className="w-10 h-10 text-blue-600 cursor-pointer" />
            </label>
            <Input id="image" className="hidden" type="file" />
          </div>
          <Button
            type="button"
            variant="secondary"
            className=" bg-blue-600 text-white hover:opacity-90 hover:bg-blue-700 rounded-3xl"
          >
            Post
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Post;
