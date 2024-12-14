/* eslint-disable react-hooks/exhaustive-deps */
import useGetUser from "@/hooks/useGetUser";
import { useEffect, useState } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "@/store/authSlice";

const AuthLayout = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const { fetchUser } = useGetUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (authStatus) {
        setLoading(false); // User already authenticated
        return;
      }
      try {
        const data = await fetchUser();
        if (data) {
          dispatch(login(data));
        }
      } catch (error) {
        console.error("Error fetching user:", error.message);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [dispatch, authStatus]);

  useEffect(() => {
    if (!loading) {
      if (authentication && !authStatus) {
        navigate("/login");
      } else if (!authentication && authStatus) {
        navigate("/");
      }
    }
  }, [loading, navigate, authStatus, authentication]);

  return (
    <div>
      {loading ? (
        <div className="h-screen w-screen overflow-hidden bg-black text-white flex justify-center items-center text-5xl  border-2">
          <FaXTwitter className="animate-bounce" />
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export default AuthLayout;
