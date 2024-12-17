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
import useUpdateUserDetails from "@/hooks/useUpdateUserDetails";
import { useNavigate } from "react-router-dom";
import useGetUser from "@/hooks/useGetUser";
import { useDispatch } from "react-redux";
import { login } from "@/store/authSlice";
import { AiOutlineLoading } from "react-icons/ai";

const UpdateAccount = ({ id, fullName, bio, username }) => {
  const [newFullName, setNewFullName] = useState(fullName || "");
  const [newBio, setNewBio] = useState(bio || "");
  const [newUsername, setNewUsername] = useState(username || "");

  const { loading, updateUserdetails } = useUpdateUserDetails();
  const { loading: userLoading, fetchUser } = useGetUser();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isDisabled =
    (newFullName === fullName && newBio === bio && newUsername === username) ||
    loading ||
    userLoading;

  const handleUpdate = async () => {
    const data = await updateUserdetails({
      fullName: newFullName,
      bio: newBio,
      username: newUsername,
    });
    if (data) {
      const user = await fetchUser();
      dispatch(login(user));
      navigate(`/profile/${id}`);
    }
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          {" "}
          <h2>Update Account Information</h2>
        </AccordionTrigger>

        <AccordionContent>
          <div className="flex flex-col gap-4 px-4 py-2">
            <div>
              <p className="text-red-600 text-xs">
                {isDisabled ? "Please update current Details" : ""}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="flex flex-col gap-1">
                {" "}
                <span>FullName:</span>
                <Input
                  type="text"
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  placeholder="Full Name"
                  className="p-2 border-2 rounded-lg placeholder:text-muted-foreground"
                />
              </Label>
              <Label className="flex flex-col gap-1">
                {" "}
                Bio:{" "}
                <Input
                  type="text"
                  value={newBio}
                  onChange={(e) => setNewBio(e.target.value)}
                  placeholder="Bio"
                  className="p-2 border-2 rounded-lg placeholder:text-muted-foreground"
                />
              </Label>
              <Label className="flex flex-col gap-1">
                {" "}
                Username:
                <Input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="Username"
                  className="p-2 border-2 rounded-lg placeholder:text-muted-foreground"
                />
              </Label>
              <Button onClick={handleUpdate} disabled={isDisabled}>
                {loading || userLoading ? (
                  <AiOutlineLoading className="animate-spin" />
                ) : (
                  <>Update</>
                )}
              </Button>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default UpdateAccount;
