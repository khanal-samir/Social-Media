import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaXTwitter } from "react-icons/fa6";
import useSignup from "@/hooks/useSignup";
import { useForm } from "react-hook-form";
import useGetUser from "@/hooks/useGetUser";
import useLogin from "@/hooks/useLogin";
import { useDispatch } from "react-redux";
import { login as sliceLogin } from "@/store/authSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { loading: registerLoading, signup } = useSignup();
  const { loading: fetchLoading, fetchUser } = useGetUser();
  const { loading: loginLoading, login } = useLogin();
  const { register, handleSubmit, watch } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const avatar = watch("avatar");
  const handleSignIn = async (data) => {
    const user = await signup(data);

    if (user) {
      const session = await login(data);
      if (session) {
        const data = await fetchUser();
        dispatch(sliceLogin(data));
        navigate("/");
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white sm:grid sm:grid-cols-12 sm:gap-2 overflow-hidden">
      <FaXTwitter className="w-full m-auto hidden sm:col-span-4 sm:block sm:p-10 sm:text-[24em] " />

      <form className="space-y-4 sm:col-span-8 p-4 sm:grid sm:justify-center">
        <Tabs defaultValue="required" className="sm:min-w-[28rem] max-w-96">
          <TabsList className="grid grid-cols-2 font-bold">
            <TabsTrigger value="required">Required</TabsTrigger>
            <TabsTrigger value="optional">Optional</TabsTrigger>
          </TabsList>
          <TabsContent value="required" className="bg-black text-white">
            <Card className="dark">
              <CardHeader>
                <CardTitle>
                  <FaXTwitter />
                </CardTitle>
                <CardDescription>
                  Required information for your Account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="fullname">Full Name:</Label>
                    <Input
                      id="fullname"
                      placeholder="Enter your Full Name"
                      required
                      {...register("fullName", {
                        required: true,
                      })}
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="username">Username:</Label>
                    <Input
                      id="username"
                      placeholder="Enter your Username"
                      required
                      {...register("username", {
                        required: true,
                      })}
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="email">Email:</Label>
                    <Input
                      id="email"
                      required
                      placeholder="Enter your Email"
                      {...register("email", {
                        required: true,
                        validate: {
                          matchPatern: (value) =>
                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                              value,
                            ) || "Email address must be a valid address",
                        },
                      })}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password">Password:</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      placeholder="Enter your Password"
                      {...register("password", {
                        required: true,
                      })}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="avatar" className="flex gap-x-2">
                      Avatar:
                      {!avatar?.length && (
                        <span className="text-red-600 text-xs">
                          Avatar is Required!
                        </span>
                      )}
                    </Label>

                    <Input
                      id="avatar"
                      type="file"
                      required
                      {...register("avatar", {})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="optional">
            <Card className="dark">
              <CardHeader>
                <CardTitle>
                  <FaXTwitter />
                </CardTitle>
                <CardDescription>
                  Optional information for your Account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="bio">Bio:</Label>
                    <textarea
                      id="bio"
                      placeholder="Enter your Bio"
                      className="block h-48 w-full rounded-md p-2 text-black outline-none"
                      {...register("bio")}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="cover">Cover Image:</Label>
                    <Input id="cover" type="file" {...register("coverImage")} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <Button
          variant="outline"
          type="submit"
          className="sm:min-w-[28rem] max-w-96  bg-black"
          onClick={handleSubmit(handleSignIn)}
          disabled={
            loginLoading || registerLoading || fetchLoading || !avatar?.length
          }
        >
          {registerLoading || loginLoading || fetchLoading ? (
            <AiOutlineLoading className="animate-spin text-blue-500" />
          ) : (
            "Submit"
          )}
        </Button>
        <p className="font-bold text-xl">
          Already have a Account?
          <Link to={`/login`}>
            <span className="text-blue-700"> Login</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
