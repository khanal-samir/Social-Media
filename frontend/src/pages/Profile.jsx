import useGetUserDetails from "@/hooks/useGetUserDetails";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Info from "@/components/Profile/Info";
import { ArrowLeft } from "lucide-react";

const Profile = () => {
  const { id } = useParams();
  const { getUserDetails, loading } = useGetUserDetails();
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserDetails({ userId: id });
      if (data) {
        setUserDetails(data);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="border-x-2 min-h-screen flex flex-col">
      <div className="flex items-center gap-10 border-b-2 p-2 cursor-pointer">
        <Link to="/">
          {" "}
          <ArrowLeft className="px-1 hover:bg-blue-600 rounded-full" />
        </Link>
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>
      <Info userDetails={userDetails} />
    </div>
  );
};

export default Profile;
