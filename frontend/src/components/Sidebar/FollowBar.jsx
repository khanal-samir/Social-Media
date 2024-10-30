import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CardUser from "./CardUser";

const FollowBar = () => {
  return (
    <div className="hidden sm:block">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm lg:text-lg">Who to Follow</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:gap-2">
          <CardUser />
          <CardUser />
          <CardUser />
        </CardContent>
      </Card>
    </div>
  );
};

export default FollowBar;
