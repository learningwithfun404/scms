import { useMutation } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useCreateCourse = () => {
  const { axiosSecure } = useAxios();

  const {
    mutate: createCourse,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (courseData) => {
      const { data } = await axiosSecure.post("/course/create", courseData);
      return data;
    },
  });

  return { createCourse, isPending, error };
};

export default useCreateCourse;


// http://localhost:4000/api/v1/course/create