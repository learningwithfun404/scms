import { useMutation } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useDeleteCourse = () => {
  const { axiosSecure } = useAxios();

  const {
    mutate: deleteCourse,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/course/delete/${id}`);
      return data;
    },
  });

  return { deleteCourse, isPending, error };
};

export default useDeleteCourse;
