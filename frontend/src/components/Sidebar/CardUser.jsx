import { Button } from "../ui/button";

const CardUser = () => {
  return (
    <div className="flex flex-wrap justify-between">
      <div className="flex justify-around p-2 gap-4">
        <img
          src="https://pbs.twimg.com/profile_images/1802974703453347840/ToZ2m6K1_400x400.jpg"
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />

        <div className=" hidden  lg:flex lg:flex-col">
          <p className="font-semibold sm:text-xs lg:text-lg">Fullname</p>
          <p className="text-xs text-muted-foreground">Username</p>
        </div>
      </div>

      <Button className="rounded-3xl">Follow</Button>
    </div>
  );
};

export default CardUser;
