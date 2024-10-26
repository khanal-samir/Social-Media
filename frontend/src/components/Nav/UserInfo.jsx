import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function UserInfo() {
  return (
    <div className="px-2 hover:bg-slate-200 rounded-3xl">
      {/* TODO add user avatar here */}
      <Label className="flex gap-3">
        <img
          src="https://pbs.twimg.com/profile_images/1802974703453347840/ToZ2m6K1_400x400.jpg"
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p>FullName</p>
          <p className="text-muted-foreground">username</p>
        </div>
      </Label>
    </div>
  );
}

export default UserInfo;
