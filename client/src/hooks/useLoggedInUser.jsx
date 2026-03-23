import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useLoggedInUser = () => {
  const { axiosSecure } = useAxios();

  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["get-logged-in-user"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/user/me");
      return data;
    },
  });

  return { user, error, isLoading };
};

export default useLoggedInUser;
