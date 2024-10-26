import { IoMenu } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const More = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {" "}
        <div className="p-2 flex gap-x-2 sm:gap-x-4 overflow-hidden cursor-pointer hover:bg-slate-200 rounded-3xl">
          <IoMenu className="w-full h-full sm:w-auto sm:h-auto text-3xl" />
          <span className="hidden sm:block sm:text-m lg:text-xl">More</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-md focus:outline-none">
        <DropdownMenuItem className="cursor-pointer">
          Account Settings
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">Theme</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default More;
