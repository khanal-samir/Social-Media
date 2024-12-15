import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useUpdateAvatar from "@/hooks/useUpdateAvatar";
import { AiOutlineLoading } from "react-icons/ai";
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "@/store/authSlice";
import useGetUser from "@/hooks/useGetUser";
const UpdateAvatar = () => {
  const { loading, updateAvatar } = useUpdateAvatar();
  const [img, setImg] = useState(null);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fetchUser } = useGetUser();
  const handleUpdate = async () => {
    if (!img) {
      toast({
        variant: "destructive",
        title: "Please select an avatar to upload.",
      });
      return;
    }
    const data = await updateAvatar({ img });
    if (data) {
      const user = await fetchUser();
      dispatch(login(user));
      navigate("/profile");
    }
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Update Avatar</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-4 px-4 py-2">
            <Label className="flex flex-col gap-2">
              <span>Choose Avatar:</span>
              <Input
                type="file"
                onChange={(e) => setImg(e.target.files[0])}
                disabled={loading}
              />
              <Button
                className="w-36 rounded-full"
                onClick={handleUpdate}
                disabled={loading}
              >
                {loading ? (
                  <AiOutlineLoading className="animate-spin" />
                ) : (
                  "Update Avatar"
                )}
              </Button>
            </Label>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default UpdateAvatar;
