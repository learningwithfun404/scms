import { useMutation } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useUpdateUserRole = () => {
  const { axiosSecure } = useAxios();

  const {
    mutate: updateUserRole,
    isPending,
    error,
  } = useMutation({
    mutationFn: async ({ id, role }) => {
      const { data } = await axiosSecure.patch(`/user/update-role/${id}`, {
        role,
      });
      return data;
    },
  });

  return { updateUserRole, isPending, error };
};

export default useUpdateUserRole;
