import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useFindSingleCourse = (id) => {
  const { axiosSecure } = useAxios();

  const {
    data: course,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["get-single-course", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/course/find/${id}`);
      return data;
    },
  });

  return { course, error, isLoading };
};

export default useFindSingleCourse;
