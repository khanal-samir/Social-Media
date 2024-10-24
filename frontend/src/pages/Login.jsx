import { FaXTwitter } from "react-icons/fa6";
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

const Login = () => {
  const footerLinks = [
    "About",
    "Download the X app",
    "Help Center",
    "Terms of Service",
    "Privacy Policy",
    "Cookie Policy",
    "Accessibility",
    "Ads info",
    "Blog",
    "Careers",
    "Brand Resources",
    "Advertising",
    "Marketing",
    "X for Business",
    "Developers",
    "Directory",
    "Settings",
  ];
  return (
    <div className="w-full h-full min-h-screen bg-black text-white font-sans">
      <div className="flex flex-col sm:flex-row gap-10 sm:justify-around p-10">
        <div className="sm:w-full  sm:flex sm:justify-center sm:items-center">
          <FaXTwitter className="text-5xl sm:text-[20rem]" />
        </div>

        <div className="sm:w-full sm:p-10">
          <h1 className="text-4xl font-extrabold sm:text-7xl tracking-tight">
            Happening now
          </h1>
          <div className=" mt-10">
            <h2 className=" sm:text-3xl text-2xl font-semibold tracking-tight first:mt-0">
              Join today.
            </h2>

            <Button className="w-72 h-12 mt-5 bg-blue-500 font-bold rounded-3xl">
              Create Account
            </Button>
            <p className="w-72 mt-3 text-xs text-muted-foreground">
              By signing up, you agree to the{" "}
              <span className="text-blue-700">Terms of Service </span>and
              <span className="text-blue-700"> Privacy Policy</span>, including{" "}
              <span className="text-blue-700">Cookie Use</span>.
            </p>
          </div>

          <div className="mt-12 font-bold sm:text-2xl">
            <p>Already have an account?</p>

            <Dialog>
              <DialogTrigger>
                <Button
                  variant="outline"
                  className="w-72 h-12 mt-5 font-semibold rounded-3xl text-blue-700 bg-black"
                >
                  Sign in
                </Button>
              </DialogTrigger>

              <DialogContent className="max-w-96 bg-black text-white rounded-md">
                <DialogHeader>
                  <DialogTitle>
                    <FaXTwitter />
                  </DialogTitle>
                  <DialogDescription className="sm:text-2xl text-xl font-bold text-center text-white">
                    Login
                  </DialogDescription>
                </DialogHeader>

                <form className="w-full p-4 flex flex-col gap-5 flex-wrap justify-center">
                  <div>
                    <Label>
                      <p className="text-lg font-semibold">
                        Email or Username:
                      </p>
                      <Input
                        className="bg-black"
                        placeholder="Enter your Email or Username"
                      />
                    </Label>
                  </div>
                  <div>
                    <Label>
                      <p className="text-lg font-semibold">Password:</p>
                      <Input
                        className="bg-black"
                        placeholder="Enter your Password"
                      />
                    </Label>
                  </div>
                  <Button
                    type="submit"
                    className="w-full rounded-3xl mx-auto  bg-white text-black"
                  >
                    Login
                  </Button>
                  <p className="text-center  text-muted-foreground">
                    Don{`'`}t have an account?{" "}
                    <span className="text-blue-700">Sign up</span>
                  </p>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <p className="px-10 py-2 flex flex-wrap flex-grow gap-x-2 gap-y-1 text-xs sm:text-sm sm:justify-center text-gray-500">
        {footerLinks.map((link, index) => (
          <a key={index} href="#" className="hover:underline">
            {link}
          </a>
        ))}
        <span>© 2024 Samir Khanal.</span>
      </p>
    </div>
  );
};

export default Login;
