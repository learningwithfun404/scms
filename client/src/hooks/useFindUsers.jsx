import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useFindUsers = () => {
  const { axiosSecure } = useAxios();

  const {
    data: allUsers,
    error,
    isLoading,
    refetch: userRefetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/find`);
      return data;
    },
  });

  return { allUsers, error, isLoading, userRefetch };
};

export default useFindUsers;
