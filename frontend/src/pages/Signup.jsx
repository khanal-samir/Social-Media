import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaXTwitter } from "react-icons/fa6";

const Signup = () => {
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
            <Card className=" bg-black text-white">
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
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="username">Username:</Label>
                    <Input
                      id="username"
                      placeholder="Enter your Username"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email:</Label>
                    <Input id="email" required placeholder="Enter your Email" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password">Password:</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      placeholder="Enter your Email"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="avatar">Avatar:</Label>
                    <Input
                      id="avatar"
                      type="file"
                      className="text-black"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="optional">
            <Card className="bg-black text-white">
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
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="cover">Cover Image:</Label>
                    <Input id="cover" type="file" className="text-black" />
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
        >
          Submit
        </Button>
        <p className="font-bold text-xl">
          Already have a Account? <span className="text-blue-700"> Login</span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
