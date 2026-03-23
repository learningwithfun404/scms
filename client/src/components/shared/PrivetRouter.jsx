import { Outlet, Navigate } from "react-router";
import useLoggedInUser from "../../hooks/useLoggedInUser";

const PrivetRouter = () => {
  const { user, isLoading } = useLoggedInUser();
  const userRole = user?.data?.role;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (userRole !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivetRouter;
