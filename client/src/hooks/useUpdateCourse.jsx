import { useMutation } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useUpdateCourse = () => {
  const { axiosSecure } = useAxios();

  const {
    mutate: updateCourse,
    isPending,
    error,
  } = useMutation({
    mutationFn: async ({ id, courseData }) => {
      const { data } = await axiosSecure.put(
        `/course/update/${id}`,
        courseData,
      );
      return data;
    },
  });

  return { updateCourse, isPending, error };
};

export default useUpdateCourse;
