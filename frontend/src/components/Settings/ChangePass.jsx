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
import useUpdatePassword from "@/hooks/useUpdatePassword";
import { useToast } from "@/hooks/use-toast";
import { AiOutlineLoading } from "react-icons/ai";

const ChangePass = () => {
  const [newPass, setNewPass] = useState("");
  const [oldPass, setOldPass] = useState("");
  const { loading, updatePassword } = useUpdatePassword();
  const { toast } = useToast();
  const isDisabled = loading || !newPass || !oldPass;
  const handleSubmit = async () => {
    if (newPass.length < 6) {
      toast({
        variant: "destructive",
        title: "Password must be atleast 6 characters long",
      });
      return;
    }
    if (!newPass || !oldPass) {
      toast({
        variant: "destructive",
        title: "Please fill all fields",
      });
      return;
    }
    const data = await updatePassword({
      newPassword: newPass,
      oldPassword: oldPass,
    });
    if (data) {
      setNewPass("");
      setOldPass("");
    }
  };
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          {" "}
          <h2>Change Password</h2>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-4  px-4 py-2">
            <Label className="flex flex-col gap-2">
              <span>Current Password:</span>
              <Input
                value={oldPass}
                onChange={(e) => setOldPass(e.target.value)}
              />
            </Label>

            <Label className="flex flex-col gap-2">
              <span>New Password:</span>
              <Input
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />
            </Label>

            <Button onClick={handleSubmit} disabled={isDisabled}>
              {loading ? (
                <AiOutlineLoading className="animate-spin" />
              ) : (
                "Change Password"
              )}
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ChangePass;
