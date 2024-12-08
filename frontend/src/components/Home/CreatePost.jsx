import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { BiWorld } from "react-icons/bi";
import { Image } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import useCreateTweet from "@/hooks/useCreateTweet";
import { addTweet } from "@/store/tweetSlice";
import { AiOutlineLoading } from "react-icons/ai";

const CreatePost = ({ isImage = true }) => {
  const { register, handleSubmit, reset } = useForm();
  const user = useSelector((state) => state.auth.userInfo);
  const { loading, createTweet } = useCreateTweet();
  const dispatch = useDispatch();

  const handleCreateTweet = async (data) => {
    const response = await createTweet(data);

    if (response) {
      dispatch(addTweet(response));
      reset({ content: "", media: null });
    }
  };

  return (
    <div className="flex flex-col gap-2 px-2 py-1 border-b-2">
      <Label htmlFor="input">
        {" "}
        <h1 className="hidden sm:block text-lg text-center font-semibold">
          Tweet your thoughts to the world!
        </h1>
      </Label>
      <div>
        {/* TODO add user avatar here */}
        <Label className="flex gap-5">
          <img
            src={user?.avatar}
            alt="avatar"
            className="w-16 h-16 rounded-full"
          />
          <Input
            id="input"
            className="h-16 border-none "
            placeholder="What is happening?!"
            {...register("content", {
              required: true,
            })}
            disabled={loading}
          />
        </Label>
      </div>

      <div className="flex justify-between items-center">
        <div className="hidden sm:flex gap-1 text-blue-600">
          <BiWorld />
          <h2 className="text-sm">Everyone can reply</h2>
        </div>

        <div className="flex justify-end gap-4 px-4">
          {isImage && (
            <div>
              <label htmlFor="image">
                <Image className="w-10 h-10 text-blue-500 cursor-pointer" />
              </label>
              <Input
                id="image"
                className="hidden"
                type="file"
                disabled={loading}
                {...register("media")}
              />
            </div>
          )}
          <Button
            type="button"
            variant="secondary"
            className=" bg-blue-600 text-white hover:opacity-90 hover:bg-blue-700 rounded-3xl"
            onClick={handleSubmit(handleCreateTweet)}
            disabled={loading}
          >
            {loading ? (
              <AiOutlineLoading className="animate-spin" />
            ) : (
              <>Post</>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
