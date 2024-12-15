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
import useUpdateCoverImage from "@/hooks/useUpdateCoverImage";
import { AiOutlineLoading } from "react-icons/ai";
import { useToast } from "@/hooks/use-toast";

const UpdateCoverImage = () => {
  const { loading, updateCoverImage } = useUpdateCoverImage();
  const [img, setImg] = useState(null);
  const { toast } = useToast();
  const handleUpdate = async () => {
    if (!img) {
      toast({
        variant: "destructive",
        title: "Please select a cover image to upload.",
      });
      return;
    }
    await updateCoverImage({ img });
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-2">
        <AccordionTrigger>Update Cover Image</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-4 px-4 py-2">
            <Label className="flex flex-col gap-2">
              <span>Choose Cover Image:</span>
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
                  "Update Cover Image"
                )}
              </Button>
            </Label>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default UpdateCoverImage;
